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
      <h1>
        <span className="heading">About Page</span>
      </h1>
      <p>
        This project shows the data of the staffs.
        <br />
        <br />
        The data is shown in the form of a report.
        <br />
        <br />
        The report is divided into three parts:
        <br />
        <br />
      </p>
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
