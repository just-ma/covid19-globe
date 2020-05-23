import React, { useState, useEffect } from "react";
import axios from "axios";
import Globe from "./globe/globe";
import "./app.scss";

// let Detector = require("./globe/third-party/Detector");
let TWEEN = require("./globe/third-party/Tween");

const url =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(url).then((response) => {
      parseData(response.data);
    });
  }, []);

  var globe;

  const parseData = (d) => {
    let arr = d.split("\n");
    let header = arr.shift().split(",");
    let len = header.length;
    let timeline = [];

    for (let i = 4; i < len; i++) {
      let day = [];
      arr.forEach((row) => {
        let rowArr = row.split(",");
        day.push(
          rowArr[2],
          rowArr[3],
          Math.log(rowArr[i] / 1000) / 10
          //rowArr[i] / 1000000
        );
      });
      timeline.push([header[i], [...day]]);
    }
    setData(timeline);
  };

  const updateGlobe = (num) => {
    new TWEEN.Tween(globe)
      .to({ time: num / 4 }, 500)
      .easing(TWEEN.Easing.Cubic.EaseOut)
      .start();
  };

  useEffect(() => {
    if (data.length === 0) return;

    var container = document.getElementById("container");
    globe = new Globe(container);
    TWEEN.start();

    for (var i = 0; i < data.length; i++) {
      globe.addData(data[i][1], {
        format: "magnitude",
        name: data[i][0],
        animated: true,
      });
    }

    globe.createPoints();
    updateGlobe(4);
    globe.animate();
  }, [data]);

  return (
    <div id="container" className="container">
      <div className="container__menu">
        <button onClick={() => updateGlobe(0)}>0</button>
        <button onClick={() => updateGlobe(1)}>1</button>
        <button onClick={() => updateGlobe(2)}>2</button>
        <button onClick={() => updateGlobe(3)}>3</button>
        <button onClick={() => updateGlobe(4)}>4</button>
      </div>
    </div>
  );
}
