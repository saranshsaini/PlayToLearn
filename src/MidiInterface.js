import React, { useEffect, useState } from "react";
import Game from "./Game";
import SheetMusic from "./SheetMusic";
import miditoabcmap from "./miditoabc";
import "./App.css";

export default function MidiInterface() {
  var midi;
  var inputs;
  var outputs;
  const ENDNOTE = 128;
  const BEGINNOTE = 144;

  const [note, setNote] = useState("C");
  const [clef, setClef] = useState("treble");
  const [render,setRender]=useState(false)
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    connectmidi();
  }, []);

  function connectmidi() {
    if (navigator.requestMIDIAccess) {
      console.log("This browser supports WebMIDI!");
    } else {
      console.log("WebMIDI is not supported in this browser.");
    }
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
  }

  function onMIDISuccess(midiAccess) {
    midi = midiAccess;
    inputs = midiAccess.inputs;
    outputs = midiAccess.outputs;

    connectMidiFunctions(midi);
  }

  function connectMidiFunctions() {
    inputs.forEach((entry) => (entry.onmidimessage = onMIDIMessage));
  }

  function onMIDIMessage(event) {
    console.log(event.data);
    changeNote(event.data);
  }

  function setIndFunc() {
    setGameOver(true);
  }

  function changeNote(n) {
    const note = n[1];
    if (n[0] === BEGINNOTE && note >= 33 && note <= 88) {
      /*if (note < 60) {
        setClef("bass");
      } else {
        setClef("treble");
      }*/
      setNote(miditoabcmap[note]);
    }
  }



  function onMIDIFailure() {
    console.log("Could not access your MIDI devices.");
  }

  return (
    <div className="sheetholder">
      {/*<SheetMusic notes={"K:clef=" + clef + " \n L:1/4 \n |" + note} />*/}
      {!gameOver && (
        <Game setGameOver={() => setGameOver(true)} inputNote={note}  />
      )}
      {gameOver && <h1>Over</h1>}
    </div>
  );
}
