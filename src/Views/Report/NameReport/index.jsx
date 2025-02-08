import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import database from "../../../assets/data";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

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
    <>
      <div style={{ textAlign: "center" }}>
        <h1>
          <span className="heading">See data according to Name</span>
        </h1>
      </div>
      <Button onClick={() => navigate(-1)} style={{ margin: "20px" }}>
        <ArrowBackIosIcon />
        Go Back
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
            <div key={date} style={{ margin: "10px" }}>
              <h3 style={{ textAlign: "center", textDecoration: "underline" }}>
                Date: {date}
              </h3>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead style={{ fontSize: "20px", backgroundColor: "#C5BAFF" }}>
                  <tr>
                    <th
                      style={{
                        border: "1px solid black",
                        textAlign: "center",
                        fontSize: "20px",
                      }}
                    >
                      ID
                    </th>
                    <th
                      style={{
                        border: "1px solid black",
                        textAlign: "center",
                        fontSize: "20px",
                      }}
                    >
                      Name
                    </th>
                    <th
                      style={{
                        border: "1px solid black",
                        textAlign: "center",
                        fontSize: "20px",
                      }}
                    >
                      In/Out Type
                    </th>
                    <th
                      style={{
                        border: "1px solid black",
                        textAlign: "center",
                        fontSize: "20px",
                      }}
                    >
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {entriesByDate[date].map((entry, index) => (
                    <tr key={index}>
                      <td
                        style={{
                          border: "1px solid black",
                          textAlign: "right",
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
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>
          <b style={{ fontSize: "1.5rem" }}>Select a name to see report</b>
        </p>
      )}
    </>
  );
};

export default NameReport;
