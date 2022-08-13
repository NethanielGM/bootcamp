import React, { useState } from "react";
import Stam from "./Stam";

function Checkbox() {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };
  return (
    <div>
      <input type="checkbox" onChange={handleChange} />
      {checked && <Stam />}
    </div>
  );
}

export default Checkbox;
