import React from "react";
import Header from "../../Components/Header";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();

  const handleReport = () => {
    navigate("/report");
  };

  return (
    <>
      <Header />
      <div style={{ textAlign: "center" }}>
        <h1>
          <span className="heading">Home Page</span>
        </h1>
      </div>
      <div style={{ textAlign: "center" }}>
        <p>
          Welcome to the Home Page. This is a simple React application that
          demonstrates how to use React Router to create a Single Page
          Application (SPA).
        </p>
      </div>
      <div
        style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}
      >
        <p>Click the button below to see Reports</p>
      </div>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <Button
          variant="outlined"
          onClick={handleReport}
          sx={{
            backgroundColor: "#345187",
            color: "white",
            padding: "10px",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          Reports
        </Button>
      </div>
    </>
  );
};

export default Home;
