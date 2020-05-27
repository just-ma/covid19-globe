import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {createGlobe, updateGlobe, parseData} from "./utils";
import "./app.scss";

const url =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";



export default function App() {
  const [data, setData] = useState(null);
  const containerEl = useRef(null);

  let globe;

  useEffect(() => {
    axios.get(url).then((response) => {
      let parsed = parseData(response.data);
      setData(parsed);
    });
  }, []);

  useEffect(() => {
    if (data && containerEl) {
      console.log(data, containerEl)
      globe = createGlobe(data, containerEl.current, 1)
    }
  }, [data, containerEl]);

  const updateTime = (time) => {
    updateGlobe(globe, time)
  };

  return (
    <div>
      <div ref={containerEl} className="container"/>
      <div className="menu">
        <button onClick={() => updateTime(0)}>0</button>
        <button onClick={() => updateTime(0.25)}>0.25</button>
        <button onClick={() => updateTime(0.5)}>0.5</button>
        <button onClick={() => updateTime(0.75)}>0.75</button>
        <button onClick={() => updateTime(1)}>1</button>
      </div>
    </div>
  );
}
