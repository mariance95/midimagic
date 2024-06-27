'use client'
import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.png"
import SendMidiMessage from "./components/MidiSubmit/page";

const containerStyle = {
  paddingTop: "35px",
  height: "100vh",
  display: "flex",
  gap: "45px",
  fontFamily: "Roboto, Arial, sans-serif",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(to top, rgb(251, 202, 255), rgb(255, 255, 255))",
  color: "#000"
};

const textStyle = {
  fontSize: "42px",
  color: "#010a17"
  
};

const logoStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "25px",
};

const aboutStyle = {
  justifyContent: "right",
  width: "350px",
}

const ulStyle = {
  paddingLeft: "10px",
  paddingTop: "10px"
}

const footerStyle = {
  color: "rgb(92, 92, 92)",
  paddingTop: "25px"
}

export default function Home() {
  return (
    <main style={containerStyle}>
      <div>
      <div style={logoStyle}><Image 
      src={logo} 
      alt="MIDI Magic"
      width={125}
      height={125}
      ></Image></div>
      <div><h1 style={textStyle}>MIDI MAGIC-APP</h1></div>
      <div><SendMidiMessage/></div>
      </div>
      <div style={aboutStyle}>
        <h3>About MIDI Magic-App</h3>
        <p style={{paddingLeft: "20px"}}>
          This app is tested with a Akai APC Mini Mk2 So it may not work properly with your device.
          Any advice or suggestion is highly welcome, although be patient, I'm no expert.
          </p>

        <ul style={ulStyle}> How to use? Very simple
          <ul style={ulStyle}>
            <li>Only your intended device should be connected (The app sends message to ALL device connected, will add device selector later)</li>
            <li>Check this table for color reference for velocity <Link href="https://forum.bome.com/uploads/default/original/2X/b/bec6ef1cad2b5f100babf5780609739a8aeee1cf.png">(Akai APCMini mk2)</Link> </li>
            <li>First button will send Channel and Velocity to the selected Note.</li>
            <li>Second button will send Channel and Velocity to every note.</li>
          </ul>
        </ul>
        <p>Wasn't that hard, wasn't it?</p>
        <p>More updates coming soon.</p>
        <p style={footerStyle}>Copyright © <Link href="https://github.com/mariance95"> Mariano Cerdá </Link>2024</p>
      </div>
    </main>
    
  );
}
