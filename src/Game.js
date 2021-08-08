import React, { useState, useEffect } from "react";
import SheetMusic from "./SheetMusic";
import GameData from "./GameData";
import Instructions from "./Instructions";
import abctomidimap from "./abctomidi";
import miditoabcmap from "./miditoabc";

export default function Game(props) {
  const { inputNote, numPressed, changeInput, setOver } = props;
  const [gameStarted, setGameStarted] = useState(false);
  const [notesList, setNotesList] = useState([]);
  const [currInd, setCurrInd] = useState(0);
  const [note, setNote] = useState("");
  const [clef, setClef] = useState("treble");
  const [showModal, setShowModal] = useState("");
  const [numNotes, setNumNotes] = useState(10);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (gameStarted && notesList.length === currInd) {
      setOver();
      setGameOver(true);

      //props.connectMidiFunctions(null);
    } else if (!gameOver && inputNote === notesList[currInd]) {
      setCurrInd((prev) => prev + 1);

      changeInput();

      changeNote(notesList[currInd]);
    }
  }, [
    currInd,
    gameStarted,
    notesList,
    inputNote,
    setGameOver,
    note,
    gameOver,
    changeInput,
    setOver,
  ]);

  useEffect(() => {
    if (!gameOver) {
      changeNote(notesList[currInd]);
    }
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
    return n;
  }

  function startGame() {
    if (numNotes < 10) {
      return;
    }
    const n = getNotesList();
    //console.log("created new list: ", n);
    setNotesList(n);
    setNote(notesList[0]);
    setGameStarted(true);
    setCurrInd(0);
    props.connectMidi();
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
    return (
      <GameData final numPressed={numPressed} total={numNotes} curr={currInd} />
    );
  }
}
