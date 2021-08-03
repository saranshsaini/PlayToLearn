import React, { useEffect } from "react";
import SheetMusic from "./SheetMusic";
import "./App.css";

export default function MidiInterface() {
  var midi;
  var inputs;
  var outputs;

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
    console.log(event.timeStamp);
  }

  function onMIDIFailure() {
    console.log("Could not access your MIDI devices.");
  }

  return (
    <div className="sheetholder">
      <SheetMusic notes={"K:clef=bass \n L:1/4 \n |F,,"} />
    </div>
  );
}
