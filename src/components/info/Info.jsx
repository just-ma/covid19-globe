import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import "./Info.scss";

const REPO_LINK = "https://github.com/just-ma/covid19-globe";
const CSSE_LINK =
  "https://github.com/CSSEGISandData/COVID-19/blob/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";
const GLOBE_LINK = "https://experiments.withgoogle.com/chrome/globe";
const MUI_LINK = "https://material-ui.com/";

const InfoLink = ({ link, name }) => {
  return (
    <a href={link} target="_blank" className="infoLink">
      {name}
    </a>
  );
};

export default function Info() {
  return (
    <div className="info">
      <p>
        COVID-19 Globe is a 3D visualizer for coronavirus cases around the
        world.
      </p>
      <p>
        <GitHubIcon
          className="info__icon"
          onClick={() => window.open(REPO_LINK, "_blank")}
        />
        <InfoLink link={REPO_LINK} name="GitHub Repo" />
      </p>
      <p>
        {"Data from "}
        <InfoLink link={CSSE_LINK} name="JHU CSSE" />
      </p>
      <p>
        {"Powered by "}
        <InfoLink link={GLOBE_LINK} name="WebGL Globe" />
        {" and "}
        <InfoLink link={MUI_LINK} name="Material UI" />
      </p>
    </div>
  );
}
