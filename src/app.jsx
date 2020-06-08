import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { createGlobe, updateGlobe, parseData, getMarks } from "./utils";
import Slidebar from "./components/slidebar/Slidebar";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import Settings from "./components/settings/Settings";
import "./app.scss";

const INITIAL_TIME = 1;
const url =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";

const Box = ({ children }) => {
  return (
    <div className="box">
      <div className="menu">{children}</div>
    </div>
  );
};

export default function App() {
  const [data, setData] = useState(null);
  const [fullData, setFullData] = useState(null);
  const containerEl = useRef(null);
  const [globe, setGlobe] = useState(null);
  const [marks, setMarks] = useState([]);
  const [scale, setScale] = useState("log");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isRotating, setIsRotating] = useState(true);

  let time = 1;

  useEffect(() => {
    axios.get(url).then((response) => {
      let [parsedLin, parsedLog] = parseData(response.data);
      setData(parsedLin);
      setFullData([...parsedLin, ...parsedLog]);
    });
  }, []);

  useEffect(() => {
    if (fullData && containerEl) {
      let g = createGlobe(fullData, containerEl.current, 1);
      setGlobe(g);
      updateGlobe(g, INITIAL_TIME, false);
    }
  }, [fullData, containerEl]);

  useEffect(() => {
    if (data) {
      let m = getMarks(data);
      setMarks(m);
    }
  }, [data]);

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

  const toggleRot = (evemt, value) => {
    if (value !== null) {
      setIsRotating(value);
      globe.setRot(value);
    }
  };

  return (
    <div className="main">
      <div ref={containerEl} className="main__container" />
      <Box>
        <Slidebar updateTime={updateTime} data={data} marks={marks} />
      </Box>
      <div className="main__corner">
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
          placement="right-start"
          open={settingsOpen}
          onClick={onTooltipClick}
        >
          <IconButton>
            <SettingsIcon className="main__corner__button" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}
