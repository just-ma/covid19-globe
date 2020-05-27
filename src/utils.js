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
  return timeline;
};
