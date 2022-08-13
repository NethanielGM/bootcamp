import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const ScheduleContext = React.createContext();

export function useScheduleContext() {
  return useContext(ScheduleContext);
}

export function ScheduleContextProvider({ children }) {
  const [classData, setClassData] = useState([]);
  const [date, setDate] = useState(new Date(Date.now()));

  const getPrediction = async (input) => {
    // const response = axios.post("http://localhost:8080/", input);

    console.log(input);
    // const unix_date = console.log(input);
    const response = await axios.post("http://172.16.0.97:8080/model", input);
    // const response = await axios.post(
    //   "http://ec2-3-73-99-75.eu-central-1.compute.amazonaws.com:8080/model",
    //   input
    // );
    console.log(response);
    const new_class = {
      startDate: date.getTime(),
      endDate: date.getTime() + input.Duration * 60000,
      title: input.Name,
    };
    console.log(new_class);
    let val = response.data.expected;
    console.log(val);
    if (val < 0.4) {
      new_class.backgroundColor = "#DA0026";
    } else if (val < 0.5) {
      new_class.backgroundColor = "#F8381E";
    } else if (val < 0.55) {
      new_class.backgroundColor = "#FE4201";
    } else if (val < 0.6) {
      new_class.backgroundColor = "#FFAB00";
    } else if (val < 0.65) {
      new_class.backgroundColor = "#F7C213";
    } else if (val < 0.7) {
      new_class.backgroundColor = "#F9D303";
    } else if (val < 0.75) {
      new_class.backgroundColor = "#BBDA00";
    } else if (val > 0.75) {
      new_class.backgroundColor = "#4FBB02";
    }
    // switch (val) {
    //   case val < 0.5:
    //     console.log(val);
    //     new_class.backgroundColor = "red";
    //     break;
    //   case val < 0.75:
    //     new_class.backgroundColor = "orange";
    //     console.log(val);
    //     break;
    //   case val <= 1:
    //     new_class.backgroundColor = "green";
    //     console.log(val);
    //     break;
    // }
    console.log(new_class);
    // console.log(classData);
    setClassData([...classData, new_class]);
  };

  useEffect(() => console.log(classData), [classData]);

  return (
    <ScheduleContext.Provider
      value={{
        getPrediction,
        classData,
        setClassData,
        date,
        setDate,
      }}
    >
      {" "}
      {children}
    </ScheduleContext.Provider>
  );
}
