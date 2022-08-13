import React, { useEffect, useState } from "react";
import Schedule from "../components/Schedule";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TextField } from "@mui/material";
import Form from "../components/Form";
import { useScheduleContext } from "../context/ScheduleContext";

const Home = () => {
  const { date, setDate } = useScheduleContext();

  // useEffect(() => console.log(date), [date]);

  return (
    <div className="home">
      <h1 className="title" style={{ fontFamily: "Permanent Marker" }}>
        Skedjy
      </h1>
      <div>
        <div className="divForm">
          <Form date={date} />
          <DateTimePicker
            renderInput={(props) => (
              <TextField {...props} style={{ margin: "1rem 0rem" }} />
            )}
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
            }}
          />
        </div>
        <div className="scheduleDiv">
          <Schedule />
        </div>
      </div>
    </div>
  );
};

export default Home;
