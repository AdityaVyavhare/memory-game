import React, { ReactNode } from "react";
import classes from "./Model.module.css";
import Button from "./Utilities/Button";
interface ModelProps {
  title: string;
  description: string;
  content: ReactNode;
  restartHandler: () => void;
  newgameHandler: React.Dispatch<React.SetStateAction<boolean>>;
  setShowoverlay: React.Dispatch<React.SetStateAction<boolean>>;
}
const Model = ({
  title,
  description,
  content,
  restartHandler,
  newgameHandler,
  setShowoverlay,
}: ModelProps) => {
  return (
    <div className={classes.model}>
      <h1>{title}</h1>
      <p>{description}</p>
      <div>{content}</div>
      <div className={classes.btns}>
        <Button
          onClick={() => {
            restartHandler();
            setShowoverlay(false);
          }}
        >
          Restart
        </Button>
        <Button
          onClick={() => {
            newgameHandler(true);
            setShowoverlay(false);
          }}
        >
          Set New Game
        </Button>
      </div>
    </div>
  );
};

export default Model;
