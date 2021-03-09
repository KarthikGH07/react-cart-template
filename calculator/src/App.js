import React, { useState } from "react";
import "./App.css";
import Calculator from "./components/Calculator";
import {
  isNumeric,
  isOperator,
  isOutputTooLong,
  evaluate,
} from "./components/Compute";

const App = () => {
  const [output, setOutput] = useState("0");
  //   const [firstNum, setFirstNum] = useState("0");
  //   const [secondNum, setSecondNum] = useState(null);
  //   const [operator, setOperator] = useState(null);

  let firstNum = "0";
  let secondNum = null;
  let operator = null;

  const clearCalc = () => {
    // setFirstNum("0");
    // setSecondNum(null);
    // setOperator(null);
    setOutput("0");
    firstNum = "0";
    secondNum = null;
    operator = null;
  };

  const handleInput = (e) => {
    const value = e.target.value;
    const firstNum = firstNum;
    const secondNum = secondNum;
    const operator = operator;
    console.log(value);

    if (isOperator(value)) {
      if (secondNum) {
        const firstResult = evaluate(firstNum, secondNum, operator);
        // setFirstNum(firstResult);
        // setSecondNum(null);
        // setOutput(firstResult);
        // setOperator(value);
        firstNum = firstResult;
        secondNum = null;
        operator = value;
        return;
      } else {
        // setOperator(value);
        operator = value;
        return;
      }
    }

    if (value === "=") {
      const returnValue = evaluate(firstNum, secondNum, operator);
      setOutput(returnValue);
      //   setFirstNum("0");
      //   setSecondNum(null);
      //   setOperator(null);
      firstNum = "0";
      secondNum = null;
      operator = null;
      return;
    }

    if (value === "clear") {
      clearCalc();
      return;
    }

    if (isNumeric(value) || value === ".") {
      if (isOutputTooLong(output)) return;
      if (operator === null) {
        // firstNum === "0" ? setFirstNum(value) : setFirstNum(firstNum + value);
        firstNum = firstNum === "0" ? value : firstNum + value;
        setOutput(firstNum);
      } else {
        // secondNum === "0"
        //   ? setSecondNum(value)
        //   : setSecondNum(secondNum + value);
        secondNum = secondNum === null ? value : firstNum + value;
        setOutput(secondNum);
      }
      return;
    }

    if (value === "delete") {
      if (operator) {
        // setSecondNum((prevNum) => prevNum.slice(0, -1));
        secondNum = secondNum.slice(0, -1);
        setOutput(secondNum);
      } else {
        // setFirstNum((prevNum) => prevNum.slice(0, -1));
        firstNum = firstNum.slice(0, -1);
        setOutput(firstNum);
      }
    }
  };

  return (
    <div className="App">
      <Calculator data={output} buttonHandler={handleInput} />
    </div>
  );
};

export default App;
