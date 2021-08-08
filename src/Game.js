import React, { useState, useEffect } from "react";
import SheetMusic from "./SheetMusic";
import GameData from "./GameData";
import Instructions from "./Instructions";
import abctomidimap from "./abctomidi";
import miditoabcmap from "./miditoabc";

export default function Game(props) {
  const { inputNote, numPressed, changeInput } = props;
  const [gameStarted, setGameStarted] = useState(false);
  const [notesList, setNotesList] = useState([]);
  const [currInd, setCurrInd] = useState(0);
  const [note, setNote] = useState("");
  const [clef, setClef] = useState("treble");
  const [showModal, setShowModal] = useState("");
  const [numNotes, setNumNotes] = useState(10);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    console.log("in effect");
    console.log("curr ind: ", currInd);

    if (gameStarted && notesList.length === currInd) {
      setGameOver(true);
    } else if (inputNote === notesList[currInd]) {
      console.log("correct note played: ", inputNote);
      setCurrInd((prev) => prev + 1);
      console.log("new ind: ", currInd);
      changeInput();

      console.log("effect list: ", notesList);

      changeNote(notesList[currInd]);
      console.log("new first: ", note);
    }
    console.log("new ind: ", currInd);
    console.log("effect list: ", notesList);
  }, [
    currInd,
    gameStarted,
    notesList,
    inputNote,
    setGameOver,
    note,
    changeInput,
  ]);

  useEffect(() => {
    changeNote(notesList[currInd]);
  });

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function changeNote(note) {
    const n = abctomidimap[note];
    if (true /*n >= 33 && n <= 88*/) {
      if (n < 60) {
        setClef("bass");
      } else {
        setClef("treble");
      }
      setNote(note);
    }
  }

  function getNotesList() {
    var n = [];
    for (let i = 0; i < numNotes; i++) {
      let rand = getRandomInt(48, 83);
      let no = miditoabcmap[rand];
      n.push(no);
    }
    return ["C", "C", "C", "C", "C", "C", "C", "C", "C", "C"];
  }

  function startGame() {
    if (numNotes < 10) {
      return;
    }
    const n = getNotesList();
    console.log("created new list: ", n);
    setNotesList(n);
    setNote(notesList[0]);
    setGameStarted(true);
  }

  function toMainMenu() {
    setShowModal("");
    setGameStarted(false);
  }

  if (!gameStarted && showModal.length === 0) {
    return (
      <div className="menuHolder">
        Number of keys (minimum 10):
        <input
          type="number"
          name="num"
          value={numNotes}
          onChange={(e) => setNumNotes(e.target.value)}
        />
        <button onClick={startGame}>
          <h3>Start Game</h3>
        </button>
        <button onClick={() => setShowModal("instructions")}>
          <h3>How to Use</h3>
        </button>
      </div>
    );
  } else if (!gameStarted && showModal === "instructions") {
    return <Instructions back={toMainMenu} />;
  } else if (gameStarted && !gameOver) {
    return (
      <>
        <h2>Start Playing!</h2>
        <div className="gameHolder">
          <SheetMusic note={note} clef={clef} />
          <GameData numPressed={numPressed} total={numNotes} curr={currInd} />
          <button onClick={toMainMenu}>Back to Main Menu</button>
        </div>
      </>
    );
  } else {
    return <GameData final numPressed={numPressed} total={numNotes} curr={currInd} />;
  }
}
