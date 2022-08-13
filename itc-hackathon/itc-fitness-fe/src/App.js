import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ScheduleContextProvider } from "../src/context/ScheduleContext";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ScheduleContextProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </LocalizationProvider>
        </ScheduleContextProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
