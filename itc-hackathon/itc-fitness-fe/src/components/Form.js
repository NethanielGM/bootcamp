import React, { useState } from "react";
import { useScheduleContext } from "../context/ScheduleContext";
import Modal from "@mui/material/Modal";

function Form(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [check, setCheck] = useState(false);
  const [type, setType] = useState("ballroom dancing");
  const [length, setLength] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [max, setMax] = useState("");
  const [time, setTime] = useState("");

  const { date } = props;

  const { getPrediction } = useScheduleContext();

  // json we nee dto make:
  // {
  //   TimeOfDay:
  //   "TypeOfClass": "Yoga",
  //   "MaxParticipants": 1,
  //   "Duration": 1,
  //   "DayOfWeek": 1,
  //   "Month": 1
  // }

  function handleClose() {
    setIsOpen(false);
  }

  async function submitForm(evt) {
    evt.preventDefault();
    const toSend = {
      // BookingStartTime: parseInt(time),
      MaxBookees: parseInt(max),
      // Month: parseInt(month),
      // DayOfWeek: parseInt(day),
      Date: date.toUTCString(),
      Duration: parseInt(length),
      Name: type,
    };
    try {
      // console.log(toSend);
      await getPrediction(toSend);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      {/* <button onClick={() => setIsOpen(true)}>Form</button> */}
      {/* <Modal className="modal" isOpen={isOpen}> */}
      <form className ="form" style={{display:"flex", gap:"8px"}}
        onSubmit={(evt) => {
          submitForm(evt);
        }}
      >
        {/* <button className="closeBtn" onClick={handleClose}></button> */}
        <select onChange={(evt) => {
            setType(evt.target.value);
          }}>
  <option value="ballroom dancing">Ballroom Dancing</option>
  <option value="aerobics">Aerobics</option>
  <option value="body sculpt">Body Sculpt</option>
  <option value="20:20:20">20:20:20</option>
  <option value="yoga">Yoga</option>
  <option value="aquafit">Aquafit</option>
  <option value="legs bums tums">Legs Bums Tums</option>
      </select>
        {/* <select
          id="month"
          name="month"
          // value={month.value}
          onChange={(evt) => {
            setMonth(evt.target.value);
          }}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
          <option value={11}>11</option>
          <option value={12}>12</option>
        </select>
        <select
          id="Day of Week"
          name="Day of Week"
          // value={day.value}
          onChange={(evt) => {
            setDay(evt.target.value);
          }}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
        </select> */}
        <input
          placeholder="Max Participants"
          // value={max.value}
          onChange={(evt) => {
            setMax(evt.target.value);
          }}
        />
        {/* <input
          placeholder="Time of Day"
          // value={time.value}
          onChange={(evt) => {
            setTime(evt.target.value);
          }}
        /> */}
        <input
          placeholder="Duration"
          // value={length.value}
          onChange={(evt) => {
            setLength(evt.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>
      {/* </Modal> */}
    </div>
  );
}

export default Form;
