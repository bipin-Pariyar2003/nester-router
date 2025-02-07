import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import RNepaliCalendar, { getCurrentBS } from "../RNepaliCalendar";
import "./index.css";

const currentDate = getCurrentBS();
const todayBS = `${currentDate.year}/${currentDate.month}/${currentDate.date}`;

function Popup(props) {
  const calendar = new RNepaliCalendar("np");
  const { className, range, toggle, dropDownPad } = props;

  const splitted = (props.date || todayBS).split("/");
  const selectedDate = {
    year: +splitted[0],
    month: +splitted[1],
    date: +splitted[2],
  };
  const [viewDate, setViewDate] = useState(selectedDate);
  const [selectedRange, setSelectedRange] = useState({ from: "", to: "" });

  const daysInMonth = calendar.getDaysInMonth(viewDate.year, viewDate.month);
  const startingDay = calendar.getInitialNepaliDay(
    viewDate.year,
    viewDate.month
  );

  //For Calendar Display
  const lastPosition = daysInMonth + startingDay;
  const factor = Math.ceil(lastPosition / 7);
  const cellsRequred = factor * 7;
  let displayDate = [];

  const allMonths = calendar.getAllMonthsName().full;
  const allDays = calendar.getAllDaysName().short;
  const allYears = calendar.getAllYears();
  let _temp = 0;
  for (let i = 1; i <= cellsRequred; i++) {
    if (_temp >= daysInMonth) {
      displayDate.push(null);
    } else if (i <= startingDay) {
      displayDate.push(null);
    } else {
      displayDate.push(++_temp);
    }
  }

  const filteredYearsForDropDown = filterYearsInDropDown(dropDownPad);

  const handleChange = {
    month: (i) => {
      setViewDate({ ...viewDate, month: i + 1 });
    },
    year: (i) => {
      setViewDate({
        ...viewDate,
        year: calendar.toEnglishNumber(filteredYearsForDropDown[i]),
      });
    },
  };

  const handleClick = {
    setDate: (date) => {
      if (date === null) return;
      const formattedDate = `${viewDate.year}/${viewDate.month}/${date}`;
      if (range) {
        const isFromEmpty = selectedRange.from.length ? false : true;
        const isToEmpty = selectedRange.to.length ? false : true;

        if (!isFromEmpty && isToEmpty) {
          const propDateOffset = calendar.countBSDays(formattedDate);
          const selectedDateOffset = calendar.countBSDays(selectedRange.from);

          if (propDateOffset > selectedDateOffset) {
            setSelectedRange({ ...selectedRange, to: formattedDate });
          } else {
            setSelectedRange({ from: formattedDate, to: selectedRange.from });
          }
        } else setSelectedRange({ from: formattedDate, to: "" });
      } else {
        props.updateDate(formattedDate);
      }
      toggle();
    },
    goPrev: () => {
      if (viewDate.month > 1) {
        setViewDate({ ...viewDate, month: viewDate.month - 1 });
      } else {
        if (viewDate.year === +allYears[0]) {
          alert("Year not supported");
          return;
        }
        setViewDate({ ...viewDate, year: +viewDate.year - 1, month: 12 });
      }
    },
    goNext: () => {
      if (viewDate.month < 12) {
        setViewDate({ ...viewDate, month: viewDate.month + 1 });
      } else {
        if (viewDate.year === +allYears.slice(-1)[0]) {
          alert("The year is not supported");
          return;
        }
        setViewDate({ ...viewDate, year: +viewDate.year + 1, month: 1 });
      }
    },
  };

  const isToday = (date) =>
    currentDate.date === date &&
    viewDate.year === currentDate.year &&
    viewDate.month === currentDate.month;

  const isSelected = (date) =>
    selectedDate.date === date &&
    selectedDate.year === viewDate.year &&
    selectedDate.month === viewDate.month;

  return (
    <div className={className.root}>
      <div className={className.header}>
        <IconButton onClick={handleClick.goPrev}>
          <ArrowBackIos sx={{ color: "white" }} />
        </IconButton>

        <div className={className.headerCenter}>
          <DropDown
            list={filteredYearsForDropDown}
            onChange={handleChange.year}
            selected={viewDate.year}
            className={className}
          />
          <DropDown
            list={allMonths}
            onChange={handleChange.month}
            selected={allMonths[viewDate.month - 1]}
            className={className}
          />
        </div>

        <IconButton onClick={handleClick.goNext}>
          <ArrowForwardIos sx={{ color: "white" }} />
        </IconButton>
      </div>

      <div
        className={className.body}
        style={{
          padding: "0px 20px",
          paddingBottom: "50px",
        }}
      >
        {allDays.map((data) => (
          <div
            onClick={(e) => e.stopPropagation()}
            key={data}
            className={`${className.bodyDate} ${className.bodyWeek}`}
            style={{
              padding: "10px",
              borderRadius: "0px",
            }}
          >
            {data}
          </div>
        ))}
        {displayDate.map((date, i) => (
          <div
            key={i}
            className={`${className.bodyDate} ${
              isToday(date) ? className.currentDate : ""
            } ${isSelected(date) ? className.selectedDate : ""}`}
            onClick={() => handleClick.setDate(date)}
            style={{
              padding: "8px",
            }}
          >
            {date ? calendar.toNepaliNumber(date) : ""}
          </div>
        ))}
      </div>
    </div>
  );
}

function DropDown({ list, onChange, selected, styles, className }) {
  const calendar = new RNepaliCalendar();

  let value;
  if (isNaN(+selected)) {
    value = selected?.toString();
  } else value = calendar.toNepaliNumber(selected).toString();

  return (
    <select
      style={{ ...styles }}
      className={className.dropDownContainer}
      onChange={(e) => {
        onChange(list.indexOf(e.currentTarget.value));
      }}
      value={value}
    >
      {list.map((item, index) => (
        <option key={item} className={className.dropDownOption}>
          {item}
        </option>
      ))}
    </select>
  );
}

function filterYearsInDropDown(dropDownPad) {
  const calendar = new RNepaliCalendar();
  const filteredYearsForDropDown = [];
  const firstYearInDropDown = +dropDownPad[2] - +dropDownPad[0];
  if (
    +dropDownPad[0] === "NaN" ||
    +dropDownPad[1] === "NaN" ||
    +dropDownPad[2] === "NaN"
  ) {
    throw new Error("The parameters of dropDownPad is expected to be a number");
  }
  const totalNumberOfYearsToDisplay = +dropDownPad[0] + +dropDownPad[1] + 1;
  for (
    let i = firstYearInDropDown;
    i <= firstYearInDropDown + totalNumberOfYearsToDisplay;
    i++
  ) {
    filteredYearsForDropDown.push(calendar.toNepaliNumber(i));
  }
  return filteredYearsForDropDown;
}

export default Popup;
