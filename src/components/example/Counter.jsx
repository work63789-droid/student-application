import { useState } from "react";
import { ChnageNumber } from "./ChnageNumber";
import { TestComponent } from "./TestComponent";
import { Link } from "react-router-dom";
import "./example.css";

const Counter = () => {
  const [number, setNumber] = useState(0);

  function updatedNumber(val) {
    setNumber(number + val);
  }

  return (
    <div className="example-page">
      <Link className="page-link" to="/getTodo">Get Todo</Link>

      <ChnageNumber updatedNumber={updatedNumber} />
      <TestComponent number={number} />
    </div>
  );
};

export default Counter;
