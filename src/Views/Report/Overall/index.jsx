import React from "react";
import Calculate from "../../../Components/Calculate";
import { Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const Overall = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      {location.pathname === "/report/overall" && (
        <>
          <div
            style={{
              textAlign: "left",
              padding: "20px",
              margin: "0px",
              marginTop: "0px",
            }}
          >
            <Button variant="contained" onClick={handleGoBack}>
              Go Back
            </Button>
          </div>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              marginTop: "0px",
              gap: "50px",
            }}
          >
            <h1>
              <span className="heading"> Overall Report</span>
            </h1>
          </div>
          <Calculate />
        </>
      )}
      ;
    </>
  );
};

export default Overall;
