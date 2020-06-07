import Globe from "./components/globe/globe";

let TWEEN = require("./components/globe/third-party/Tween");

export const createGlobe = (data, container, startTime) => {
  if (data.length === 0 || !container) return;

  let globe = new Globe(container);
  TWEEN.start();

  for (var i = 0; i < data.length; i++) {
    globe.addData(data[i][1], {
      format: "magnitude",
      name: data[i][0],
      animated: true,
    });
  }

  globe.createPoints();
  updateGlobe(startTime);
  globe.animate();

  return globe;
};

export const updateGlobe = (globe, time) => {
  new TWEEN.Tween(globe)
    .to({ time: time }, 500)
    .easing(TWEEN.Easing.Cubic.EaseOut)
    .start();
};

export const parseData = (d) => {
  let arr = d.split("\n");
  let header = arr.shift().split(",");
  let len = header.length;
  let timeline = [];

  let max = 0;
  arr.forEach((row) => {
    let rowArr = row.split(",");
    for (let i = 4; i < rowArr.length; i++) {
      max = Math.max(parseInt(rowArr[i]), max);
    }
  });

  let maxLog = Math.log(max / 5000);
  for (let i = 4; i < len; i++) {
    let day = [];
    arr.forEach((row) => {
      let rowArr = row.split(",");
      day.push(
        rowArr[2],
        rowArr[3],
        Math.log(rowArr[i] / 5000) / maxLog
        //1.5 * rowArr[i] / max
      );
    });
    timeline.push([header[i], [...day]]);
  }
  return timeline;
};

export const formatDate = (numDate) => {
  const date = new Date(numDate);
  const dateTimeFormat = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  const [
    { value: month },
    ,
    { value: day },
    ,
    { value: year },
  ] = dateTimeFormat.formatToParts(date);

  return `${month.toUpperCase()} ${day}, ${year}`;
};

export const extractMonth = (numDate) => {
  const date = new Date(numDate);
  const dateTimeFormat = new Intl.DateTimeFormat("en", {
    month: "short",
  });
  const [{ value: month }] = dateTimeFormat.formatToParts(date);

  return month.toUpperCase();
};
