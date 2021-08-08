import React, { useEffect, useState } from "react";
import Game from "./Game";
import miditoabcmap from "./miditoabc";
import "./App.css";

export default function MidiInterface() {
  
  const BEGINNOTE = 144;
  const [midiInputs, setMidiInputs] = useState();
  const [note, setNote] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [numPressed, setNumPressed] = useState(0);
  const [gameAllowed, setGameAllowed] = useState(true);
  const [midiAllowed, setMidiAllowed] = useState(true);

  useEffect(() => {
    testMidi();
  }, []);

  useEffect(() => {
    if (midiInputs != null) {
      connectMidiFunctions(midiInputs, null);
    }
  }, [gameOver,midiInputs]);

  function testMidi() {
    if (navigator.requestMIDIAccess) {
      //console.log("This browser supports WebMIDI!");
      setMidiAllowed(true);
    } else {
      //console.log("WebMIDI is not supported in this browser.");
      setMidiAllowed(false);
    }
  }

  function connectMidi() {
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
  }

  function onMIDISuccess(midiAccess) {
    setMidiInputs(midiAccess.inputs);

    setGameAllowed(true);
    connectMidiFunctions(midiAccess.inputs, onMIDIMessage);
  }

  function connectMidiFunctions(inputs, func) {
    inputs.forEach((entry) => (entry.onmidimessage = func));
  }

  function onMIDIMessage(event) {
    console.log("notes", event.data);
    changeNote(event.data);
  }

  function changeNote(n) {
    const note = n[1];

    if (n[0] === BEGINNOTE) {
      setNumPressed((prev) => prev + 1);
      setNote(miditoabcmap[note]);
    }
  }

  function onMIDIFailure() {
    //console.log("Could not access your MIDI devices.");
    setGameAllowed(false);
  }

  function refresh() {
    window.location.reload();
  }

  return (
    <div className="sheetholder">
      {!midiAllowed && (
        <div className="error">
          <h1>It looks like this browser doesn't allow for MIDI input...</h1>
          <p>
            Currently, only Chrome and Edge have MIDI Input capability
            supported.
          </p>
          <button onClick={refresh}>Try Again</button>
        </div>
      )}
      {midiAllowed && !gameAllowed && (
        <div className="error">
          <h1>It looks like you denied MIDI input in the browser...</h1>
          <button onClick={refresh}>Try Again</button>
        </div>
      )}
      {midiAllowed && gameAllowed && (
        <Game
          setOver={() => setGameOver(true)}
          inputNote={note}
          numPressed={numPressed}
          changeInput={() => setNote("")}
          connectMidi={connectMidi}
          connectMidiFunctions={connectMidiFunctions}
        />
      )}
    </div>
  );
}
