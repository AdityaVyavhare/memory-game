"use client";
import Form from "./Form";
import { useState } from "react";
import { Formtype } from "../Types";
import Grid from "./Grid";
import styles from "../page.module.css";
import { useSelector, useDispatch } from "react-redux";
import Button from "./Utilities/Button";
import { RootState } from "../store/store";
import { setInitial, setNextTurn } from "../store/store";
import { CiMenuFries } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
type Time = {
  min: number;
  sec: number;
};
export default function Home() {
  const [formdata, setFormData] = useState<Formtype>({
    theme: "numbers",
    players: "1",
    size: "4",
  });
  const dispatch = useDispatch();
  const [newgame, setNewGame] = useState<boolean>(true);
  const [show, setShow] = useState<boolean>(false);
  const currentTurn = useSelector((state: RootState) => state.currentTurn);
  const [key, setKey] = useState<number>(Math.random());
  const [moves, setMoves] = useState<number>(0);
  const [time, setTime] = useState<Time>({ min: 0, sec: 0 });
  const drawGrid = (val: Formtype) => {
    setFormData(val);
    setNewGame(false);
  };
  const restartHandler = () => {
    setShow(false);
    setKey(Math.random());
    if (+formdata.players > 1) {
      dispatch(setInitial());
      dispatch(setNextTurn(0));
    } else {
      setMoves(0);
      setTime({ min: 0, sec: 0 });
    }
  };
  return (
    <main className={styles.main}>
      <div id="overlay"></div>
      <header className={`${styles.header} ${!newgame && styles.between}`}>
        <h1>Memory Game</h1>
        {!newgame &&
          (!show ? (
            <CiMenuFries
              color="white"
              className={styles.icon}
              onClick={() => setShow(true)}
              size={"1.5rem"}
            />
          ) : (
            <MdCancel
              color="white"
              className={styles.icon}
              onClick={() => setShow(false)}
              size={"1.5rem"}
            />
          ))}
        {!newgame && (
          <div className={`${styles["btns-container"]} ${show && styles.show}`}>
            <Button onClick={restartHandler}>Restart</Button>
            <Button
              onClick={() => {
                setShow(false);
                setNewGame(true);
              }}
            >
              New Game
            </Button>
          </div>
        )}
      </header>
      {newgame ? (
        <Form drawGrid={drawGrid} />
      ) : (
        <Grid
          id={key}
          info={formdata}
          currentTurn={currentTurn}
          restartHandler={restartHandler}
          setNewGame={setNewGame}
          moves={moves}
          setMoves={setMoves}
          time={time}
          setTime={setTime}
        />
      )}
    </main>
  );
}
