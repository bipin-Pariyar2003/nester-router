import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SelectName from "../../../Components/SelectName";
import moment from "moment";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useFileteredEntriesByDate from "../../../customHooks/useFilteredEntriesByDate";
import { ad2bs, bs2ad } from "../../../Components/RNepaliCalendar";
import RNepaliDatePicker from "../../../Components/RNepaliDatePicker/index";
import { ad2bsHandler, bs2adHandler } from "../../../utils";
import { useName } from "../../../context/NameContext";
import { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

/**
 * Page to display data according to Name and Date.
 * @returns A component that renders a page with a name selection dropdown,
 * a date selection using both English and Nepali date pickers, and displays
 * all the data entries that match the selected name and date.
 */
export default function NameDate() {
  const navigate = useNavigate();
  // const { selectedName, setSelectedName, nameSet } = useName();  it syncs the name change in nameDate and namereport so
  const [localSelectedName, setLocalSelectedName] = useState("");
  const [selectedDate, setSelectedDate] = React.useState("2024/12/16");
  const [nepaliDate, setNepaliDate] = React.useState(
    ad2bsHandler("2024/12/16")
  );
  const { nameSet } = useName();

  const filteredEntries = useFileteredEntriesByDate(
    localSelectedName,
    selectedDate
  );

  console.log("2024/12/16", ad2bs("2024/12/16"), ad2bsHandler("2024/12/16"));
  console.log("2081/09/01", bs2ad("2081/09/01"));

  const handleNameChange = (event) => {
    setLocalSelectedName(event.target.value);
  };

  // English Date Change Handler (MUI Date Picker)
  const handleEnglishDateChange = (date) => {
    if (!date) return;
    const adDate = date.format("YYYY/MM/DD");

    const bsDate = ad2bsHandler(adDate);

    setSelectedDate(adDate);
    setNepaliDate(bsDate);
  };

  // Nepali Date Change Handler (Custom Date Picker)
  const handleNepaliDateChange = (event) => {
    // const bsDate = date.format("YYYY/MM/DD");
    const bsDate = event.target.value;
    const adDate = bs2adHandler(bsDate);
    setNepaliDate(bsDate);

    setSelectedDate(adDate);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>
          <span className="heading">See data according to Name and Date</span>
        </h1>
      </div>

      <div style={{ textAlign: "left", marginTop: "20px" }}>
        <Button onClick={handleGoBack}>
          <ArrowBackIosIcon />
          Go Back
        </Button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {/* Name Selection */}
        <SelectName
          title={"Select Name"}
          handleChange={handleNameChange}
          value={localSelectedName}
          options={[...(nameSet || new Set())]}
        />

        {/* MUI Date Picker (English) */}
        <div>
          {/*  */}
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Date in A.D."
                value={moment(selectedDate, "YYYY/MM/DD")}
                format="YYYY/MM/DD"
                onChange={handleEnglishDateChange}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              textAlign: "center",
              // fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            Date in B.S.
          </label>

          {/* Nepali Date Picker (Custom) */}
          <RNepaliDatePicker
            // value={moment(nepaliDate, "YYYY/MM/DD")}
            value={nepaliDate}
            format="YYYY/MM/DD"
            onChange={handleNepaliDateChange}
            // onChange={(newDate) => setSelectedDate(newDate)}
          />
        </div>
      </div>

      {/* Display Data */}
      <br />
      <br />
      <hr />
      <div>
        {filteredEntries.length > 0 ? (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead
              style={{
                fontSize: "20px",
                backgroundColor: "#C5BAFF",
                margin: "30px",
              }}
            >
              <tr>
                <th
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    fontSize: "20px",
                    padding: "10px",
                  }}
                >
                  Staff ID
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    fontSize: "20px",
                    padding: "10px",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    fontSize: "20px",
                    padding: "10px",
                  }}
                >
                  In/Out Type
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    fontSize: "20px",
                    padding: "10px",
                  }}
                >
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry, index) => (
                <tr key={index}>
                  <td
                    style={{
                      border: "1px solid black",
                      textAlign: "right",
                      padding: "7px",
                      paddingRight: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    {entry.staffID}
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      textAlign: "right",
                      padding: "7px",
                      paddingRight: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    {entry.staffName}
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      textAlign: "right",
                      padding: "7px",
                      paddingRight: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    {entry.inOutType}
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      textAlign: "right",
                      padding: "7px",
                      paddingRight: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    {entry.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: "center" }}>No data available</p>
        )}
      </div>
    </>
  );
}
