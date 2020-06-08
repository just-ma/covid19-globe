import React from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import "./Settings.scss";

export default function Settings({ toggleLinLog, scale, setOpen, toggleRot, isRotating }) {
  const onClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <div className="settings">
        <div className="settings__row">
          <span className="settings__label">SCALE:</span>
          <ToggleButtonGroup value={scale} exclusive onChange={toggleLinLog}>
            <ToggleButton value="log">LOG</ToggleButton>
            <ToggleButton value="linear">LINEAR</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="settings__row">
          <span className="settings__label">AUTO-ROTATE:</span>
          <ToggleButtonGroup value={isRotating} exclusive onChange={toggleRot}>
            <ToggleButton value={true}>ON</ToggleButton>
            <ToggleButton value={false}>OFF</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
    </ClickAwayListener>
  );
}
