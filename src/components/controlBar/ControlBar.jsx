import React, { useState, useEffect } from "react";
import Slidebar from "../slidebar/Slidebar";
import Settings from "../settings/Settings";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { updateGlobe } from "../../utils";
import "./ControlBar.scss";

const ANIMATION_SPEED = 150;

export default function ControlBar({ data, globe }) {
  const [scale, setScale] = useState("log");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const [time, setTime] = useState(Number.MAX_VALUE);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let id;
    if (isAnimating) {
      id = setInterval(animateTimeline, ANIMATION_SPEED);
    }
    return () => clearInterval(id);
  }, [isAnimating]);

  useEffect(() => {
    if (time === Number.MAX_VALUE) return;
    let translatedTime = translateTime(time, scale);
    let ease = (globe.time < 0.5) ^ (translatedTime > 0.5);
    updateGlobe(globe, translatedTime, ease);
  }, [time, scale]);

  const translateTime = (t, s) => {
    let t2 = t / (data.length - 1);
    return s === "linear"
      ? Math.min(t2 / 2, 0.49)
      : Math.max(t2 / 2 + 0.5, 0.51);
  };

  const updateTime = (t) => {
    setTime(t);
  };

  const toggleLinLog = (event, value) => {
    if (value !== null) {
      setScale(value);
    }
  };

  const onTooltipClick = () => {
    if (!settingsOpen) {
      setSettingsOpen(true);
      setIsAnimating(false);
    }
  };

  const toggleRot = (event, value) => {
    if (value !== null) {
      setIsRotating(value);
      globe.setRot(value);
    }
  };

  const animateTimeline = () => {
    setTime((p) => {
      if (p === data.length - 1) {
        setIsAnimating(false);
        return p;
      } else {
        return p + 1;
      }
    });
  };

  const togglePlayPause = () => {
    if (time >= data.length - 1) {
      setTime(0);
      setIsAnimating(true);
    } else if (!isAnimating) {
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  };

  return (
    <div className="control">
      <IconButton className="control__button" onClick={togglePlayPause}>
        {!isAnimating ? (
          <PlayArrowIcon className="control__icon" />
        ) : (
          <PauseIcon className="control__icon" />
        )}
      </IconButton>
      <Slidebar updateTime={updateTime} data={data} time={time} />
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
