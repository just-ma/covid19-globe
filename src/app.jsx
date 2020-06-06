import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { createGlobe, updateGlobe, parseData, formatDate, extractMonth } from "./utils";
import Slidebar from "./components/slidebar/Slidebar";
import "./app.scss";

const url =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";

const Box = ({ children, start, end }) => {
  return <div className="box">
    <div className="menu">
      {children}
    </div>
  </div>
};

export default function App() {
  const [data, setData] = useState(null);
  const containerEl = useRef(null);
  const [globe, setGlobe] = useState(null);
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    axios.get(url).then((response) => {
      let parsed = parseData(response.data);
      setData(parsed);
    });
  }, []);

  useEffect(() => {
    if (data && containerEl) {
      let g = createGlobe(data, containerEl.current, 1)
      setGlobe(g)
        let lastMonth = 10;
        let tempMarks = [];
        for (let i = 10; i < data.length; ++i) {
          let currMonth = data[i][0].split("/")[0];
          if (currMonth !== lastMonth) {
            lastMonth = currMonth;
            tempMarks.push({
              value: i,
              label: extractMonth(currMonth),
            })
          }
        } 
    setMarks(tempMarks);
  } 
  }, [data, containerEl]);    

  const updateTime = (time) => {
    updateGlobe(globe, time)
  };

  return (
    <div className="main">
      <div ref={containerEl} className="container"/>
      <Box>
        <Slidebar updateTime={updateTime} data={data} marks={marks}/>
      </Box>
    </div>
  );
}
