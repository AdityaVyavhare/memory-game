"use client";
import Button from "./Utilities/Button";
import classes from "./Form.module.css";
import { FormEvent, ChangeEvent } from "react";
import { Formtype } from "../Types";

const Form = ({ drawGrid }: { drawGrid: (val: Formtype) => void }) => {
  const configuration: Formtype = {
    theme: "numbers",
    players: "1",
    size: "4",
  };
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    drawGrid(configuration);
  };
  const themeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    configuration.theme = e.target.value;
  };
  const playersHandlers = (e: ChangeEvent<HTMLInputElement>) => {
    configuration.players = e.target.value;
  };
  const gridsizeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    configuration.size = e.target.value;
  };
  return (
    <div className={classes["form-container"]}>
      <form className={classes.form} onSubmit={submitHandler}>
        <div>
          <p>Select Theme</p>
          <div className={classes["label-container"]}>
            <input
              defaultChecked
              id="numbers"
              type="radio"
              name="theme"
              value="numbers"
              onChange={themeHandler}
            />
            <label className="first" htmlFor="numbers">
              Numbers
            </label>
            <input
              id="icons"
              type="radio"
              name="theme"
              value="icons"
              onChange={themeHandler}
            />
            <label htmlFor="icons">Icons</label>
          </div>
        </div>
        <div>
          <p>Number of Players</p>
          <div className={classes["label-container"]}>
            <input
              defaultChecked
              id="1"
              type="radio"
              name="players"
              value="1"
              onChange={playersHandlers}
            />
            <label className="first" htmlFor="1">
              1
            </label>
            <input
              onChange={playersHandlers}
              id="2"
              type="radio"
              name="players"
              value="2"
            />
            <label htmlFor="2">2</label>
            <input
              onChange={playersHandlers}
              id="3"
              type="radio"
              name="players"
              value="3"
            />
            <label htmlFor="3">3</label>
            <input
              onChange={playersHandlers}
              id="4"
              type="radio"
              name="players"
              value="4"
            />
            <label htmlFor="4">4</label>
          </div>
        </div>
        <div>
          <p>Grid Size</p>
          <div className={classes["label-container"]}>
            <input
              onChange={gridsizeHandler}
              defaultChecked
              id="4x4"
              type="radio"
              name="size"
              value="4"
            />
            <label className="first" htmlFor="4x4">
              4x4
            </label>
            <input
              onChange={gridsizeHandler}
              id="6x6"
              type="radio"
              name="size"
              value="6"
            />
            <label htmlFor="6x6">6x6</label>
          </div>
        </div>
        <Button>Start Game</Button>
      </form>
    </div>
  );
};

export default Form;
