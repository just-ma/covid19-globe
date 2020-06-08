import React from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import "./Settings.scss";

const scaleButtons = [
  { value: "log", name: "LOG" },
  { value: "linear", name: "LINEAR" },
];

const rotButtons = [
  { value: true, name: "ON" },
  { value: false, name: "OFF" },
];

const SettingsRow = ({ label, value, toggleButtons, onChange }) => {
  return (
    <div className="settings__row">
      <span className="settings__label">{label}</span>
      <ToggleButtonGroup value={value} exclusive onChange={onChange}>
        {toggleButtons.map((i) => (
          <ToggleButton value={i.value}>{i.name}</ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
};

export default function Settings({
  toggleLinLog,
  scale,
  setOpen,
  toggleRot,
  isRotating,
}) {
  const onClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <div className="settings">
        <SettingsRow
          label="SCALE:"
          value={scale}
          toggleButtons={scaleButtons}
          onChange={toggleLinLog}
        />
        <SettingsRow
          label="AUTO-ROTATE:"
          value={isRotating}
          toggleButtons={rotButtons}
          onChange={toggleRot}
        />
      </div>
    </ClickAwayListener>
  );
}
