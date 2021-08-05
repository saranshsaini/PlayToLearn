import React, { useState, useEffect } from "react";
import SheetMusic from "./SheetMusic";
import abctomidimap from "./abctomidi";
import miditoabcmap from "./miditoabc";

export default function Game(props) {
  const { inputNote, setGameOver } = props;
  const ENDNOTE = 128;
  const BEGINNOTE = 144;
  const [gameStarted, setGameStarted] = useState(false);
  const [notesList, setNotesList] = useState([]);
  const [currInd, setCurrInd] = useState(0);
  const [note, setNote] = useState("C");
  const [clef, setClef] = useState("treble");

  useEffect(() => {
      console.log("in effect")
    if (currInd > 10) {
      setGameOver();
    } else if (inputNote === notesList[currInd]) {
        console.log("in case")
      setCurrInd((prev) => prev + 1);
      changeNote(notesList[currInd]);
      //setNote(notesList[currInd])
    }
  }, [inputNote, notesList, currInd, setGameOver]);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function changeNote(note) {
    const n = abctomidimap[note];
    if (n >= 33 && n <= 88) {
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
    for (let i = 0; i < 10; i++) {
      let rand = getRandomInt(33, 88);
      let no = miditoabcmap[rand];
      n.push(no);
    }
    setNotesList(n);
    
  }

  function startGame() {
    getNotesList();
    setCurrInd(0);
    setGameStarted(true);

    changeNote(notesList[2]);
  }
  function change(){
      console.log(notesList)
      changeNote(notesList[0]);
  }

  if (!gameStarted) {
    return <button onClick={startGame}>Start Game</button>;
  } else {
    return (
      <>
        <h1>Started Game</h1>
        <SheetMusic notes={"K:clef=" + clef + " \n L:1/4 \n |" + note} />
        < button onClick={change}>changeNote</button>
      </>
    );
  }
}
