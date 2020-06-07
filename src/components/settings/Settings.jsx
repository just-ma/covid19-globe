import React from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import "./Settings.scss";

export default function Settings({ toggleLinLog, scale, setOpen }) {
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
      </div>
    </ClickAwayListener>
  );
}
