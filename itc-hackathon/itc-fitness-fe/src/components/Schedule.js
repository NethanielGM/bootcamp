import * as React from "react";
import Paper from "@mui/material/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";
import { useScheduleContext } from "../context/ScheduleContext";

const Appointment = ({ children, style, data, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      ...style,
      backgroundColor: data.backgroundColor,
      borderRadius: "8px",
    }}
  >
    {children}
  </Appointments.Appointment>
);

const currentDate = "2018-11-01T09:45";
// const schedulerData = [
//   {
//     startDate: "2018-11-01T09:45",
//     endDate: "2018-11-01T11:00",
//     title: "Meeting",
//     backgroundColor: "red",
//   },
//   {
//     startDate: "2018-11-01T12:00",
//     endDate: "2018-11-01T13:30",
//     title: "Go to a gym",
//   },
// ];

export default function Schedule() {
  const { classData, date } = useScheduleContext();
  const schedulerData = classData;

  return (
    <Paper>
      <Scheduler data={schedulerData}>
        <ViewState currentDate={date} />
        <DayView startDayHour={8} endDayHour={22} />
        <Appointments appointmentComponent={Appointment} />
      </Scheduler>
    </Paper>
  );
}
