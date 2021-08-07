import React, { useState, useEffect } from "react";
import SheetMusic from "./SheetMusic";
import GameData from "./GameData";
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
    console.log("in effect");
    console.log("curr ind: ", currInd);
    //function stuff() {
    if (gameStarted && notesList.length === 0) {
      setGameOver();
    } else if (inputNote === notesList[currInd]) {
      console.log("correct note played: ", inputNote);
      setCurrInd((prev) => prev + 1);
      console.log("new ind: ", currInd);
      //const newnotes= notesList.slice(1);
      //setNotesList(notesList.slice(1));
      //setNotesList(newnotes)
      console.log("effect list: ", notesList);
      //change();
      changeNote(notesList[currInd]);
      console.log("new first: ", note);
      //changeNote("C");
      //setNote(notesList[0]);
      //setNote(notesList[currInd])}
    }
    //}stuff();
    console.log("new ind: ", currInd);
    console.log("effect list: ", notesList);
    //rr();
    //console.log("new first: ", note);
    //rerender()
  }, [currInd, gameStarted, notesList, inputNote, setGameOver, note]);

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
      let rand = getRandomInt(48, 83);
      let no = miditoabcmap[rand];
      n.push(no);
    }
    return n;
  }

  function startGame() {
    const n = getNotesList();
    console.log("created new list: ", n);
    setNotesList(n);
    setNote(notesList[0]);
    setGameStarted(true);
  }

  if (!gameStarted) {
    return <button onClick={startGame}>Start Game</button>;
  } else {
    return (
      <>
        <h2>Go!</h2>
        <div className="gameHolder">
          <SheetMusic note={note} clef={clef} />
          <GameData />
        </div>
      </>
    );
  }
}
