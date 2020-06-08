import React, { useState, useEffect } from "react";
import Slider from "@material-ui/core/Slider";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import PropTypes from "prop-types";
import { formatDate, getMarks } from "../../utils";
import "./Slidebar.scss";

const HtmlTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: "#363636",
    color: "white",
    fontSize: 13,
  },
}))(Tooltip);

const ValueLabelComponent = ({ children, open, value }) => {
  return (
    <HtmlTooltip
      className="tooltip"
      open={open}
      enterTouchDelay={0}
      placement="top"
      title={value}
    >
      {children}
    </HtmlTooltip>
  );
};

export default function Slidebar({ updateTime, data }) {
  const [value, setValue] = useState(Number.MAX_VALUE);
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    if (data) {
      let m = getMarks(data);
      setMarks(m);
    }
  }, [data]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    updateTime(newValue / (data.length - 1));
  };

  const valueLabelFormat = (value) => {
    if (data) return formatDate(data[value][0]);
  };

  ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
  };

  return (
    <div className="slidebar">
      <Slider
        className="slider"
        value={value}
        min={0}
        max={data && data.length - 1}
        step={1}
        getAriaValueText={valueLabelFormat}
        valueLabelFormat={valueLabelFormat}
        onChange={handleChange}
        aria-labelledby="continuous-slider"
        valueLabelDisplay="auto"
        marks={marks}
        ValueLabelComponent={ValueLabelComponent}
        aria-label="custom thumb label"
        track={false}
      />
    </div>
  );
}
