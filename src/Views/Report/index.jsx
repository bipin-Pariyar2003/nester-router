import React from "react";
import Header from "../../Components/Header";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

const Report = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleName = () => {
    navigate("/report/name");
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
      {location.pathname === "/report" ? (
        <>
          <h1>
            <span className="heading">Report Page</span>
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              flexWrap: "wrap",
              marginTop: "80px",
            }}
          >
            {/* name card */}
            <Card
              sx={{
                maxWidth: 345,
                margin: "20px auto",
                textAlign: "center",
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  Click to see Report according to Staff Name
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleName}
                  style={{ marginTop: "10px" }}
                >
                  Name Report
                </Button>
              </CardContent>
            </Card>

            {/* name date card */}
            <Card
              sx={{
                maxWidth: 345,
                margin: "20px auto",
                textAlign: "center",
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  Click to see Report according to Staff Name and Date
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleNameDate}
                  style={{ marginTop: "10px" }}
                >
                  Name Date Report
                </Button>
              </CardContent>
            </Card>

            {/* overall card */}
            <Card
              sx={{
                maxWidth: 345,
                margin: "20px auto",
                textAlign: "center",
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  Click to see Overall Report
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleOverall}
                  style={{ marginTop: "10px" }}
                >
                  Overall Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Report;
