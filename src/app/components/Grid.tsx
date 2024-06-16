"use client";
import {
  VscMicFilled,
  VscNewFolder,
  VscVscode,
  VscWand,
  VscRepoForked,
  VscRocket,
  VscGithubInverted,
  VscGlobe,
  VscHistory,
  VscHome,
  VscLayout,
  VscMail,
  VscPassFilled,
  VscMusic,
  VscShield,
  VscSymbolNamespace,
  VscPulse,
  VscSymbolProperty,
} from "react-icons/vsc";
import { Formtype } from "../Types";
import Cell from "./Cell";

import classes from "./Grid.module.css";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import Overlay from "./Overlay";
import Model from "./Model";
import ReactDOM from "react-dom";
const numbers: Array<React.ReactNode> = Array.from({ length: 18 }, (_, i) => (
  <p key={`p${i}`}>{i + 1}</p>
));
let key = 1;
const icons: Array<React.ReactNode> = [
  <VscShield key={`icon${key++}`} />,
  <VscMusic key={`icon${key++}`} />,
  <VscNewFolder key={`icon${key++}`} />,
  <VscSymbolProperty key={`icon${key++}`} />,
  <VscMicFilled key={`icon${key++}`} />,
  <VscPassFilled key={`icon${key++}`} />,
  <VscVscode key={`icon${key++}`} />,
  <VscWand key={`icon${key++}`} />,
  <VscPulse key={`icon${key++}`} />,
  <VscRepoForked key={`icon${key++}`} />,
  <VscRocket key={`icon${key++}`} />,
  <VscGithubInverted key={`icon${key++}`} />,
  <VscGlobe key={`icon${key++}`} />,
  <VscHistory key={`icon${key++}`} />,
  <VscHome key={`icon${key++}`} />,
  <VscLayout key={`icon${key++}`} />,
  <VscMail key={`icon${key++}`} />,
  <VscSymbolNamespace key={`icon${key++}`} />,
];
type Time = {
  min: number;
  sec: number;
};
let timeId: NodeJS.Timeout;
const clearTimer = () => {
  clearInterval(timeId);
};
const SinglePlayer = ({
  moves,
  time,
  setTime,
}: {
  moves: number;
  time: Time;
  setTime: React.Dispatch<React.SetStateAction<Time>>;
}) => {
  useEffect(() => {
    const id = setInterval(() => {
      setTime((time: Time) => {
        return {
          min: time.sec === 59 ? time.min + 1 : time.min,
          sec: time.sec < 59 ? time.sec + 1 : 0,
        };
      });
    }, 1000);
    timeId = id;
    return () => {
      clearInterval(id);
    };
  }, [time]);

  return (
    <>
      <div>
        <p>Time</p>
        <b>
          <p>
            {time.min}:{time.sec}
          </p>
        </b>
      </div>
      <div>
        <p>Moves</p>
        <b>
          <p>{moves}</p>
        </b>
      </div>
    </>
  );
};
const SingleWinnerModel = ({ time, moves }: { time: Time; moves: number }) => {
  return (
    <div className={classes.modelItemContainer}>
      <div className={classes.modelItem}>
        <p>Time Elapsed</p>
        <b>
          <p>{`${time.min}:${time.sec}`}</p>
        </b>
      </div>
      <div className={classes.modelItem}>
        <p>Moves Taken</p>
        <b>
          <p>{moves} Moves</p>
        </b>
      </div>
    </div>
  );
};
const MultiplePlayer = ({
  playerCount,
  currentTurn,
}: {
  playerCount: string;
  currentTurn: number;
}) => {
  const players = useSelector((state: RootState) => state.scoresSlice).slice(
    0,
    +playerCount
  );
  return (
    <>
      {players.map((val: number, ind: number) => {
        return (
          <div
            key={`player${ind + 1}`}
            className={`${currentTurn === ind && classes["current-turn"]} `}
          >
            <p>{`P ${ind + 1}`}</p>
            <b>
              <p>{val}</p>
            </b>
          </div>
        );
      })}
    </>
  );
};
const MultipleWinnerModel = ({ players }: { players: Array<number> }) => {
  type score = {
    playerno: number;
    score: number;
  };
  const tempp = [...players];
  let final: Array<score> = useMemo(() => {
    const temp: Array<score> = [];
    while (players.length) {
      const max = Math.max(...players);
      temp.push({ playerno: tempp.indexOf(max) + 1, score: max });
      players.splice(players.indexOf(max), 1);
    }
    return temp;
  }, []);
  return (
    <div className={classes.modelItemContainer}>
      {final.map((val: score, ind: number) => {
        return (
          <div
            key={`multple-player ${ind}`}
            className={`${classes.modelItem} && ${
              ind === 0 && classes.winner
            } `}
          >
            <b>
              <p>{`Player ${val.playerno} ${ind === 0 ? "(Winner!)" : ""} `}</p>
            </b>
            <b>
              <p>{`${val.score} Pairs`}</p>
            </b>
          </div>
        );
      })}
    </div>
  );
};
type GridType = {
  info: Formtype;
  id: number;
  currentTurn: number;
  restartHandler: () => void;
  setNewGame: React.Dispatch<React.SetStateAction<boolean>>;
  moves: number;
  setMoves: React.Dispatch<React.SetStateAction<number>>;
  time: Time;
  setTime: React.Dispatch<React.SetStateAction<Time>>;
};
const Grid = ({
  info,
  id,
  currentTurn,
  restartHandler,
  setNewGame,
  moves,
  setMoves,
  time,
  setTime,
}: GridType) => {
  const [cells, setCells] = useState<Array<React.ReactNode>>([]);
  const players = useSelector((state: RootState) => state.scoresSlice).slice(
    0,
    +info.players
  );
  const [showoverlay, setShowoverlay] = useState<boolean>(false);

  const cellsGenerator: () => Array<React.ReactNode> = useCallback(() => {
    let temp: Array<number> = Array.from(
      { length: (+info.size * +info.size) / 2 },
      (_, i) => i
    );

    let final: Array<React.ReactNode> = [];
    let copy: Array<React.ReactNode> =
      info.theme === "numbers" ? [...numbers] : [...icons];

    while (temp.length) {
      const num: number = Math.floor(Math.random() * temp.length);
      final.push(copy[num]);
      copy.splice(num, 1);
      temp.splice(num, 1);
    }

    temp = Array.from({ length: +info.size * +info.size }, (_, i) => i);
    let cells: Array<React.ReactNode> = new Array(+info.size * +info.size);
    let key = 1;
    while (final.length) {
      const index: number = Math.floor(Math.random() * final.length);
      const first: number = Math.floor(Math.random() * temp.length);
      cells[temp[first]] = (
        <Cell
          key={`cell${key++}`}
          setMoves={setMoves}
          moves={moves}
          players={info.players}
          size={(+info.size * +info.size) / 2}
          setShowoverlay={setShowoverlay}
          clearTimer={clearTimer}
        >
          {final[index]}
        </Cell>
      );
      temp.splice(first, 1);
      const second: number = Math.floor(Math.random() * temp.length);
      cells[temp[second]] = (
        <Cell
          key={`cell${key++}`}
          setMoves={setMoves}
          moves={moves}
          players={info.players}
          size={(+info.size * +info.size) / 2}
          setShowoverlay={setShowoverlay}
          clearTimer={clearTimer}
        >
          {final[index]}
        </Cell>
      );
      temp.splice(second, 1);
      final.splice(index, 1);
    }
    return cells;
  }, [id]);
  useEffect(() => {
    setCells([]);
    setTimeout(() => {
      setCells(cellsGenerator());
    }, 1);
  }, [id]);

  return (
    <>
      {showoverlay &&
        ReactDOM.createPortal(
          <Overlay>
            {+info.players === 1 ? (
              <Model
                title="You did it!"
                description="Game over! Here's how you got on…"
                content={<SingleWinnerModel time={time} moves={moves} />}
                restartHandler={restartHandler}
                newgameHandler={setNewGame}
                setShowoverlay={setShowoverlay}
              />
            ) : (
              <Model
                title={`Player ${
                  players.indexOf(Math.max(...players)) + 1
                } Win!`}
                description="Game over! Here are the results…"
                content={<MultipleWinnerModel players={players} />}
                restartHandler={restartHandler}
                newgameHandler={setNewGame}
                setShowoverlay={setShowoverlay}
              />
            )}
          </Overlay>,
          document.getElementById("overlay")! as HTMLDivElement
        )}
      <div className={classes["grid-container"]}>
        <div
          className={classes.grid}
          style={{ gridTemplateColumns: `repeat(${+info.size},1fr` }}
        >
          {cells}
        </div>
        <div className={classes["players-container"]}>
          {+info.players === 1 ? (
            <SinglePlayer moves={moves} time={time} setTime={setTime} />
          ) : (
            <MultiplePlayer
              currentTurn={currentTurn}
              playerCount={info.players}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Grid;
