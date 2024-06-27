import React, { useState } from "react";


const MidiMessageLogger = () => {
  const [midiMessages, setMidiMessages] = useState([]);


  const addMidiMessage = (channel, note, velocity) => {
    const newMidiMessage = { channel, note, velocity };
    setMidiMessages([...midiMessages, newMidiMessage]);
  };

  return (
    <div>
      <h2>MIDI Message Log</h2>
      <table>
        <thead>
          <tr>
            <th>Channel</th>
            <th>Note</th>
            <th>Velocity</th>
          </tr>
        </thead>
        <tbody>
          {midiMessages.map((message, index) => (
            <tr key={index}>
              <td>{message.channel}</td>
              <td>{message.note}</td>
              <td>{message.velocity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MidiMessageLogger;
