import React, { ReactNode } from "react";
import classes from "./Overlay.module.css";
const Overlay = ({ children }: { children: ReactNode }) => {
  return <div className={classes.overlay}>{children}</div>;
};

export default Overlay;
