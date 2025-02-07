import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { getCurrentBS } from "../RNepaliCalendar";
import Popup from "./Popup";

import "./index.css";
import { Box, Popper, TextField } from "@mui/material";

/**
 * To override Inspect the component.
 * For example if the class is RNepaliDatePicker-header-icon & RNepali-input
 * Then to override pass a prop classes={{headerIcon:YourCustomHeaderIconClass,input:YourCustomInputClass}}
 * styles will override input element only.
 * All Other Props passed will be applied to Input element only.
 */

const RNepaliDatePicker = React.forwardRef((props, ref) => {
  const [toggleOn, setToggleOn] = React.useState(false);
  const rootRef = useRef();
  const popupRef = useRef();
  let inputRef = null;
  const currentDate = getCurrentBS();

  //dropDownPad to display the dropdown dates third value indicates the base date
  //first value indicates the number of years before the base year to be displayed
  //Second value indicates the number of years after the base year to be displayed.
  //if third value = 2020 then if first and second values are 3 and 2 then dropdown shows
  // 2017,2018,2019,2020,2021,2022
  const {
    styles,
    value,
    range = false,
    classes = {},
    options = { dropDownPad: [5, 5, "2077"] },
    ...otherProps
  } = props;

  const [date, setDate] = React.useState(
    value || `${currentDate.year}/${currentDate.month}/${currentDate.date}`
  );

  useEffect(() => setNativeValue(inputRef, date), []);
  useEffect(() => {
    setDate(value);
    setNativeValue(inputRef, value);
  }, [value]);

  //For CSS overrides
  const className = {
    inputRoot: `RNepaliDatePicker-input-root ${classes.inputRoot || ""}`,
    input: `RNepaliDatePicker-input ${classes.input || ""}`,
    inputIcon: `RNepaliDatePicker-input-icon ${classes.inputIcon || ""}`,
    dropDownContainer: `RNepaliDatePicker-dropDown-container ${
      classes.dropDownContainer || ""
    }`,
    dropDownOption: `RNepaliDatePicker-dropDown-option ${
      classes.dropDownOption || ""
    }`,
    root: `RNepaliDatePicker-root ${classes.root || ""}`,
    header: `RNepaliDatePicker-header ${classes.header || ""}`,
    headerIcon: `RNepaliDatePicker-header-icon ${classes.headerIcon || ""}`,
    headerCenter: `RNepaliDatePicker-header-center ${
      classes.headerCenter || ""
    }`,
    body: `RNepaliDatePicker-body ${classes.body || ""}`,
    bodyWeek: `RNepaliDatePicker-body-week ${classes.bodyWeek || ""}`,
    bodyDate: `RNepaliDatePicker-body-date ${classes.bodyDate || ""}`,
    currentDate: `RNepaliDatePicker-current-date ${classes.currentDate || ""}`,
    selectedDate: `RNepaliDatePicker-selected-date ${
      classes.selectedDate || ""
    }`,
  };

  const handleClick = {
    toggle: () => setToggleOn(!toggleOn),
  };
  /**Calls the Native  value setter*/
  /**To Trigger onChange of input */
  const setNativeValue = (element, value) => {
    const valueSetter = Object.getOwnPropertyDescriptor(element, "value").set;
    const prototype = Object.getPrototypeOf(element);
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(
      prototype,
      "value"
    ).set;

    if (valueSetter && valueSetter !== prototypeValueSetter) {
      prototypeValueSetter.call(element, value);
    } else {
      valueSetter.call(element, value);
    }
  };

  /**Updates from the calendar */
  const updateDate = (date) => {
    let formattedDate;
    let splitted = date.split("/");
    if (splitted) {
      formattedDate =
        String(splitted[0]) +
        "/" +
        String(splitted[1]).padStart(2, 0) +
        "/" +
        String(splitted[2]).padStart(2, 0);
    }
    setDate(formattedDate || date);
    setNativeValue(inputRef, formattedDate || date);
    inputRef.dispatchEvent(new Event("input", { bubbles: true }));
  };

  return (
    <>
      <div className={className.inputRoot} ref={rootRef}>
        <TextField
          variant="standard"
          InputProps={{
            readOnly: true,
            endAdornment: (
              <span
                ref={ref}
                style={{ cursor: "pointer" }}
                role="img"
                aria-label="Calendar"
                onClick={handleClick.toggle}
              >
                &#128197;
              </span>
            ),
          }}
          fullWidth
          inputRef={(ref) => (inputRef = ref)}
          onClick={handleClick.toggle}
          {...otherProps}
          sx={{ ...styles }}
          className={otherProps.className || className.input}
          value={value}
        />
        <Popper
          id="calendar-popper"
          open={toggleOn}
          anchorEl={props?.componentRef?.current || rootRef?.current}
          style={{ zIndex: 9999999 }}
        >
          <Box ref={popupRef}>
            <Popup
              date={date}
              className={className}
              range={range}
              toggle={handleClick.toggle}
              updateDate={updateDate}
              dropDownPad={options.dropDownPad}
            />
          </Box>
        </Popper>
      </div>
    </>
  );
});

// function typeChecker=()
RNepaliDatePicker.propTypes = {
  styles: PropTypes.objectOf(PropTypes.string),
};
export default RNepaliDatePicker;
