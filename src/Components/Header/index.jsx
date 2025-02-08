import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      sx={{
        width: "100%",
        // backgroundColor: "#FFF2F2",
        backgroundColor: "#C4D9FF",
        color: "white",
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          width: "100%",
          padding: "5px",
        }}
      >
        <Tabs
          value={(() => {
            if (location.pathname === "/home") return 0;
            if (
              location.pathname === "/report" ||
              location.pathname === "/report/name" ||
              location.pathname === "/report/name-date" ||
              location.pathname === "/report/overall"
            )
              return 1;
            if (location.pathname === "/about") return 2;
            return 0;
          })()}
          aria-label="basic tabs example"
        >
          <Tab
            label="Home"
            onClick={() => navigate("/home")}
            {...a11yProps(0)}
          />
          <Tab
            label="Report"
            onClick={() => navigate("/report")}
            {...a11yProps(1)}
          />
          <Tab
            label="About"
            onClick={() => navigate("/about")}
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
    </Box>
  );
}
