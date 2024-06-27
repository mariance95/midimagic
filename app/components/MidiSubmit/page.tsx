'use client';

import React, { useState, useEffect } from "react";
import StylizedButton from "../Button/page";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;

const Label = styled.label`
    display: flex;
    margin-top: 10px;
    font-weight: bold;
    color: #000;
`;

const Select = styled.select`
    background-color: white;
    color: rgb(76, 42, 107);
    text-align: center;
    width: 90%;
    padding: 10px;
    margin-top: 5px;
    border-radius: 25px;
    border: 0px solid #ccc;
    font-size: 24px;
    font-weight: bold;
`;

const Dropdown = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: white;
    z-index: 1000;
`;

const SendMidiMessage = () => {
    const [channel, setChannel] = useState(6);
    const [note, setNote] = useState(0);
    const [velocity, setVelocity] = useState(3);
    const [velocity1, setVelocity1] = useState(3);
    const [velocity2, setVelocity2] = useState(5);

    useEffect(() => {
        sendInitialMidiMessages();
    }, []); 

    const sendInitialMidiMessages = () => {
        navigator.requestMIDIAccess()
            .then((midiAccess) => {
                const outputs = Array.from(midiAccess.outputs.values());
                const statusByte = 0x90 + 4;

                 const exampleN1 = Array.from(Array(32).keys())
                 .map(num => num * 2)
                 .filter(num => num <= 63);

             const exampleN2 = Array.from(Array(32).keys())
                 .map(num => num * 2 + 1)
                 .filter(num => num <= 63);

                const velocities = [velocity1, velocity2];

                const initialNotesArrays = [exampleN1, exampleN2].map((notesArray, index) => ({
                    notesArray,
                    velocity: velocities[index]
                }));

                outputs.forEach(output => {
                    initialNotesArrays.forEach(({ notesArray, velocity }) => {
                        notesArray.forEach(note => {
                            sendMidiMessage(output, statusByte, note, velocity);
                        });
                    });
                });

                setTimeout(() => {
                    navigator.requestMIDIAccess()
            .then((midiAccess) => {
                const outputs = midiAccess.outputs.values();
                const statusByte = 0x90 + channel; 
                for (const output of outputs) {
                    for (let note = 0; note < 64; note++) {
                        sendMidiMessage(output, statusByte, note, velocity);
                    }
                }
            })
            .catch((error) => {
                console.error("Error accessing MIDI devices:", error);
            });
                }, 1000);
            })
            .catch((error) => {
                console.error("Error accessing MIDI devices:", error);
            });
    };
    
    const sendMidiMessage = (output, statusByte, note, velocity) => {
        if (!output) {
            console.error('No MIDI output available');
            return;
        }
        const message = [statusByte, note, velocity];
        output.send(message);
    };

    const handleSubmit = () => {
        navigator.requestMIDIAccess()
            .then((midiAccess) => {
                const outputs = midiAccess.outputs.values();
                const statusByte = 0x90 + channel; 
                for (const output of outputs) {
                    sendMidiMessage(output, statusByte, note, velocity);
                }
            })
            .catch((error) => {
                console.error("Error accessing MIDI devices:", error);
            });
    };

    const handleSubmitAll = () => {
        navigator.requestMIDIAccess()
            .then((midiAccess) => {
                const outputs = midiAccess.outputs.values();
                const statusByte = 0x90 + channel; 
                for (const output of outputs) {
                    for (let note = 0; note < 64; note++) {
                        sendMidiMessage(output, statusByte, note, velocity);
                    }
                }
            })
            .catch((error) => {
                console.error("Error accessing MIDI devices:", error);
            });
    };

    return (
        <Container>
            <Label>Select MIDI Channel:</Label>
            <Select value={channel} onChange={(e) => setChannel(parseInt(e.target.value))}>
                {[...Array(16).keys()].map((value) => (
                    <option key={value} value={value}>{value + 1}</option>
                ))}
            </Select>

            <Label>Select Note:</Label>
            <Select value={note} onChange={(e) => setNote(parseInt(e.target.value))}>
                {[...Array(64).keys()].map((value) => (
                    <option key={value} value={value}>{value}</option>
                ))}
            </Select>

            <Label>Select Velocity:</Label>
            <Select value={velocity} onChange={(e) => setVelocity(parseInt(e.target.value))}>
                {[...Array(128).keys()].map((value) => (
                    <option key={value} value={value}>{value}</option>
                ))}
            </Select>

            <StylizedButton onClick={handleSubmit}>Send MIDI Message to All Devices</StylizedButton>
            <StylizedButton onClick={handleSubmitAll}>Send MIDI Message to All Notes</StylizedButton>
        </Container>
    );
};

export default SendMidiMessage;
