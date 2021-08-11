import React from "react";

export default function Instructions(props) {
  return (
    <div className="instructions-box">
      <h2>Set up</h2>
      <p>
        Want to learn how to read squiggles on paper and somehow know what key
        to press? Me too!
      </p>
      <p>You'll need a MIDI capable piano to make the most of this site.</p>
      <p>
        Currently, only Chrome and Edge have MIDI Input capability supported in
        the browser.
      </p>
      <p>Enter the number of notes you want to play and hit start!</p>
      <p>
        If the MIDI input isn't being detected for whatever reason, simply
        unplug and plug it back into your computer.
      </p>
      <p>
        The image below shows various connection types. The USB connection is
        the most straightforward, though other types work as well.
      </p>
      <img
        src="https://www.doctormix.com/blog/wp-content/uploads/2016/05/What-Audio-Cable-Is-Best.jpg"
        alt="diagram of various MIDI Connection types"
      />
      <button onClick={props.back}>Back to Game</button>
    </div>
  );
}
