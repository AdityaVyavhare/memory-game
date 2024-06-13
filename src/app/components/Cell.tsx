"use client";
import React, { useEffect } from "react";
import classes from "./Cell.module.css";
import { useState } from "react";
import { RootState, setNextTurn } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setScores } from "../store/store";
let counter = 0;
let previous: {
  previousCell: React.ReactNode | null;
  stateUpdatingFunction: React.Dispatch<React.SetStateAction<string>> | null;
} = {
  previousCell: null,
  stateUpdatingFunction: null,
};
const makeNull = () => {
  previous.previousCell = null;
  previous.stateUpdatingFunction = null;
};

const Cell = ({
  children,
  setMoves,
  moves,
  players,
  size,
  setShowoverlay,
  clearTimer,
}: {
  children: React.ReactNode;
  setMoves: React.Dispatch<React.SetStateAction<number>>;
  moves: number;
  players: string;
  size: number;
  setShowoverlay: React.Dispatch<React.SetStateAction<boolean>>;
  clearTimer: () => void;
}) => {
  const dispatch = useDispatch();
  const currentTurn = useSelector((state: RootState) => state.currentTurn);
  const [state, setState] = useState<string>("deselected");
  const clickHandler = () => {
    if (state !== "match" && state !== "selected") {
      setState("selected");
      if (!previous.previousCell && !previous.stateUpdatingFunction) {
        previous.previousCell = children;
        previous.stateUpdatingFunction = setState;
      } else if (previous.previousCell === children) {
        dispatch(setScores(currentTurn));
        +players === 1 && setMoves((moves) => moves + 1);
        counter++;
        setTimeout(() => {
          setState("match");
          previous.stateUpdatingFunction &&
            previous.stateUpdatingFunction("match");
          makeNull();
          if (counter === size) {
            counter = 0;
            +players === 1 && clearTimer();
            setShowoverlay(true);
          }
        }, 500);
      } else {
        +players === 1 && setMoves((moves) => moves + 1);
        setTimeout(() => {
          dispatch(setNextTurn((currentTurn + 1) % +players));
          previous.stateUpdatingFunction &&
            previous.stateUpdatingFunction("deselected");
          setState("deselected");
          makeNull();
        }, 500);
      }
    }
  };
  return (
    <div
      onClick={clickHandler}
      className={`${classes.cell} ${
        state === "deselected" && classes.deselected
      } ${state === "match" && classes.match} ${
        state === "selected" && classes.selected
      }`}
    >
      {children}
    </div>
  );
};

export default Cell;
