import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import database from "../../../assets/data";
import { useName } from "../../../context/NameContext";

const NameReport = () => {
  const navigate = useNavigate();
  // const [selectedName, setSelectedName] = useState("");
  // const [nameSet, setNameSet] = useState(new Set());
  const { selectedName, setSelectedName, nameSet } = useName();
  const [filteredEntries, setFilteredEntries] = useState([]);

  // useEffect(() => {
  //   // Get unique names from database
  //   const names = new Set();
  //   database.data.forEach((day) => {
  //     day.entries.forEach((entry) => {
  //       names.add(entry.staffName);
  //     });
  //   });
  //   setNameSet(names);
  // }, []);

  const handleNameChange = (e) => {
    const name = e.target.value;
    setSelectedName(name);

    // Filter entries by selected name
    const filtered = [];
    database.data.forEach((day) => {
      const entries = day.entries.filter((entry) => entry.staffName === name);
      if (entries.length > 0) {
        filtered.push({
          date: day.date,
          entries,
        });
      }
    });
    setFilteredEntries(filtered);
  };

  // Group entries by date
  const entriesByDate = filteredEntries.reduce((acc, entry) => {
    if (!acc[entry.date]) {
      acc[entry.date] = [];
    }
    acc[entry.date].push(...entry.entries);
    return acc;
  }, {});

  return (
    <div>
      <h1>
        <span className="heading">See data according to Name</span>
      </h1>
      <Button
        variant="contained"
        onClick={() => navigate(-1)}
        style={{ margin: "20px" }}
      >
        Back
      </Button>
      <div style={{ margin: "20px auto", width: "300px" }}>
        <select
          value={selectedName}
          onChange={handleNameChange}
          style={{
            width: "100%",
            padding: "8px",
            fontSize: "16px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">Select Staff Name</option>
          {[...nameSet].map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {selectedName && Object.keys(entriesByDate).length > 0 ? (
        <div>
          {Object.keys(entriesByDate).map((date) => (
            <div
              key={date}
              style={{
                padding: "10px",
                margin: "10px",
                fontSize: "1.5rem",
                marginLeft: "15%",
                listStyleType: "none",
              }}
            >
              <h3>Date: {date}</h3>
              <ul>
                {entriesByDate[date].map((entry, index) => (
                  <React.Fragment key={index}>
                    <li>
                      <b>ID: {entry.staffID}</b>
                    </li>
                    <li>
                      <b>Name: {entry.staffName}</b>
                    </li>
                    <li>
                      <b>In/Out Type: {entry.inOutType}</b>
                    </li>
                    <li>
                      <b>Time: {entry.time}</b>
                    </li>
                    <hr />
                  </React.Fragment>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>
          <b style={{ fontSize: "1.5rem" }}>Select a name to see report</b>
        </p>
      )}
    </div>
  );
};

export default NameReport;
