import React, {useState, useEffect} from "react";
import Slider from '@material-ui/core/Slider';
import "./Slidebar.scss"
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import { formatDate } from "../../utils";

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: 'white',
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 13,
    border: '1px solid #dadde9',
  },
}))(Tooltip);

function ValueLabelComponent(props) {
  const { children, open, value } = props;
  return (
    <HtmlTooltip className="tooltip"
      open={open} 
      enterTouchDelay={0} 
      placement="top" 
      title={value}>
       {children}
    </HtmlTooltip>
  );
}

export default function Slidebar({ updateTime, data, marks}) {
  const [value, setValue] = useState(0);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
    updateTime(newValue / (data.length - 1))
  };

  const valueLabelFormat = (value) => {
    if (data) 
    return formatDate(data[value][0]);
  } 

  ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
  };
  
return (
    <div className="slidebar">
      <Slider className="slider"
        value={value}
        min={10}
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
      />
    </div>
  );
}