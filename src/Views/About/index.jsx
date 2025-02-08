import React from "react";
import Header from "../../Components/Header";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const About = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  const handleName = () => {
    navigate("/");
  };

  const handleNameDate = () => {
    navigate("/report/name-date");
  };

  const handleOverall = () => {
    navigate("/report/overall");
  };

  return (
    <>
      <Header />
      <div style={{ textAlign: "center" }}>
        <h1>
          <span className="heading">About Page</span>
        </h1>
        <p style={{ fontSize: "20px" }}>
          <li>This project shows the data of the staffs.</li>
          <br />
          <br />
          <li>The data is shown in the form of a report.</li>
          <br />
          <br />
          <li>The report is divided into three parts:</li>
          <br />
          <br />
        </p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Button onClick={handleName}>1. Name Report</Button>
      </div>
      <div style={{ textAlign: "center" }}>
        <Button onClick={handleNameDate}>2. Name and Date Report</Button>
      </div>
      <div style={{ textAlign: "center" }}>
        <Button onClick={handleOverall}>3. Overall Report</Button>
      </div>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Button onClick={handleHome}>Go To Home Page</Button>
      </div>
    </>
  );
};

export default About;
