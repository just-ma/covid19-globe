import React, { useState } from "react";
import Slidebar from "../slidebar/Slidebar";
import Settings from "../settings/Settings";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { updateGlobe } from "../../utils";
import "./ControlBar.scss";

export default function ControlBar({ data, globe }) {
  const [scale, setScale] = useState("log");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isRotating, setIsRotating] = useState(true);

  let time = 1;

  const translateTime = (t, s) => {
    return s === "linear" ? Math.min(t / 2, 0.49) : Math.max(t / 2 + 0.5, 0.51);
  };

  const updateTime = (t) => {
    let translatedTime = translateTime(t, scale);
    updateGlobe(globe, translatedTime, true);
    time = t;
  };

  const toggleLinLog = (event, value) => {
    if (value !== null) {
      setScale(value);
      let translatedTime = translateTime(time, value);
      updateGlobe(globe, translatedTime, false);
    }
  };

  const onTooltipClick = () => {
    if (!settingsOpen) {
      setSettingsOpen(true);
    }
  };

  const toggleRot = (event, value) => {
    if (value !== null) {
      setIsRotating(value);
      globe.setRot(value);
    }
  };

  return (
    <div className="control">
      <IconButton className="control__button">
        <PlayArrowIcon className="control__icon" />
      </IconButton>
      <Slidebar updateTime={updateTime} data={data} />
      <Tooltip
        title={
          <Settings
            scale={scale}
            toggleLinLog={toggleLinLog}
            setOpen={setSettingsOpen}
            toggleRot={toggleRot}
            isRotating={isRotating}
          />
        }
        interactive
        open={settingsOpen}
        onClick={onTooltipClick}
      >
        <IconButton className="control__button">
          <MoreVertIcon className="control__icon" />
        </IconButton>
      </Tooltip>
    </div>
  );
}
