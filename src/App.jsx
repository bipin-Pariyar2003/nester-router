import Home from "./Views/Home";
import About from "./Views/About";
import Report from "./Views/Report";
import NameReport from "./Views/Report/NameReport";
import NameDate from "./Views/Report/NameDate";
import Overall from "./Views/Report/Overall";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NameProvider } from "./context/NameContext";
import { ThemeProvider } from "@emotion/react";
import theme from "./Components/MuiTheme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NameProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/report" element={<Report />}>
              <Route path="name" element={<NameReport />} />
              <Route path="name-date" element={<NameDate />} />
              <Route path="overall" element={<Overall />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </NameProvider>
    </ThemeProvider>
  );
}
export default App;
