import React from "react";
import axios from "axios";

export default function App() {
  axios.get('https://api.github.com/repos/CSSEGISandData/COVID-19/contents/csse_covid_19_data/csse_covid_19_daily_reports')
  .then((response) => {
    console.log(response);
  });

  return (
    <div>hello world</div>
  );
}
