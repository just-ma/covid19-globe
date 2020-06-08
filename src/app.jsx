import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ControlBar from "./components/controlBar/ControlBar";
import InfoIcon from "@material-ui/icons/Info";
import Info from "./components/info/Info";
import { createGlobe, updateGlobe, parseData } from "./utils";
import "./app.scss";

const INITIAL_TIME = 1;
const url =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";

export default function App() {
  const [data, setData] = useState(null);
  const [fullData, setFullData] = useState(null);
  const containerEl = useRef(null);
  const [globe, setGlobe] = useState(null);

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

  return (
    <div className="main">
      <div ref={containerEl} className="main__container" />
      <div className="main__bottom">
        <ControlBar data={data} globe={globe} />
      </div>
      <div className="main__corner">
        <Tooltip title={<Info />} interactive placement="right">
          <IconButton>
            <InfoIcon className="main__corner__icon" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}
