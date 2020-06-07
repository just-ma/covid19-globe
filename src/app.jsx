import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { createGlobe, updateGlobe, parseData, getMarks } from "./utils";
import Slidebar from "./components/slidebar/Slidebar";
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

  let time = 0;
  let isLin = false;

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

  const translateTime = (t) => {
    return isLin ? Math.min(t / 2, 0.49) : Math.max(t / 2 + 0.5, 0.51);
  };

  const updateTime = (t) => {
    let translatedTime = translateTime(t);
    updateGlobe(globe, translatedTime, true);
    time = t;
  };

  const toggleLinLog = () => {
    isLin = !isLin;
    let translatedTime = translateTime(time);
    updateGlobe(globe, translatedTime, false);
  };

  return (
    <div className="main">
      <div ref={containerEl} className="container" />
      <Box>
        <Slidebar updateTime={updateTime} data={data} marks={marks} />
      </Box>
      <button onClick={toggleLinLog} style={{ position: "fixed" }}>
        lin/log
      </button>
    </div>
  );
}
