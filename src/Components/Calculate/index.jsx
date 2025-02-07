import React, { useEffect, useState } from "react";
import database from "../../assets/data";

function calculateSecondsWorked(inTime, outTime) {
  const [inHour, inMinute, inSecond] = inTime.split(":").map(Number);
  const [outHour, outMinute, outSecond] = outTime.split(":").map(Number);

  const inTimeInSec = inHour * 3600 + inMinute * 60 + inSecond;
  const outTimeInSec = outHour * 3600 + outMinute * 60 + outSecond;

  return outTimeInSec - inTimeInSec;
}

function humanReadableTime(totalSecondsWorked) {
  const days = Math.floor(totalSecondsWorked / 86400);
  const hours = Math.floor((totalSecondsWorked % 86400) / 3600);
  const minutes = Math.floor((totalSecondsWorked % 3600) / 60);
  const seconds = totalSecondsWorked % 60;

  const timeString = [
    days > 0 ? `${days} day${days > 1 ? "s" : ""}` : "",
    hours > 0 ? `${hours} hr${hours > 1 ? "s" : ""}` : "",
    minutes > 0 ? `${minutes} min${minutes > 1 ? "s" : ""}` : "",
    seconds > 0 ? `${seconds} sec${seconds > 1 ? "s" : ""}` : "",
  ]
    .filter(Boolean)
    .join(", ");

  return timeString || "0 sec";
}

const Calculate = () => {
  const [calculatedTime, setCalculatedTime] = useState([]);

  useEffect(() => {
    // Group entries by staffID and date
    const staffData = {};

    database.data.forEach((day) => {
      day.entries.forEach((entry) => {
        const staffID = entry.staffID;
        const date = day.date;

        if (!staffData[staffID]) {
          staffData[staffID] = {
            staffName: entry.staffName,
            dates: {},
          };
        }

        if (!staffData[staffID].dates[date]) {
          staffData[staffID].dates[date] = {
            times: [],
          };
        }

        staffData[staffID].dates[date].times.push(entry.time);
      });
    });

    // Calculate total time for each staff member
    const totalTimeByStaff = {};

    Object.keys(staffData).forEach((staffID) => {
      const staff = staffData[staffID];
      let totalSeconds = 0;

      Object.keys(staff.dates).forEach((date) => {
        const times = staff.dates[date].times;
        if (times.length > 1) {
          const inTime = times[0];
          const outTime = times[times.length - 1];
          const secondsWorked = calculateSecondsWorked(inTime, outTime);
          if (secondsWorked > 0) {
            totalSeconds += secondsWorked;
          }
        }
      });

      if (totalSeconds > 0) {
        totalTimeByStaff[staffID] = {
          staffID,
          staffName: staff.staffName,
          totalWorkedTime: humanReadableTime(totalSeconds),
        };
      }
    });

    setCalculatedTime(Object.values(totalTimeByStaff));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        padding: "0px 20px",
      }}
    >
      <table
        style={{
          margin: "auto",
          borderCollapse: "collapse",
          width: "80%",
          maxWidth: "800px",
          backgroundColor: "#ffffff",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#f8f9fa",
              borderBottom: "2px solid #dee2e6",
            }}
          >
            <th style={{ padding: "12px 15px", textAlign: "left" }}>
              Staff ID
            </th>
            <th style={{ padding: "12px 15px", textAlign: "left" }}>
              Staff Name
            </th>
            <th style={{ padding: "12px 15px", textAlign: "left" }}>
              Total Worked Time
            </th>
          </tr>
        </thead>
        <tbody>
          {calculatedTime.map((entry) => (
            <tr
              key={entry.staffID}
              style={{
                borderBottom: "1px solid #dee2e6",
                transition: "background-color 0.3s",
                ":hover": {
                  backgroundColor: "#f8f9fa",
                },
              }}
            >
              <td style={{ padding: "12px 15px", textAlign: "left" }}>
                {entry.staffID}
              </td>
              <td style={{ padding: "12px 15px", textAlign: "left" }}>
                {entry.staffName}
              </td>
              <td style={{ padding: "12px 15px", textAlign: "left" }}>
                {entry.totalWorkedTime}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calculate;
