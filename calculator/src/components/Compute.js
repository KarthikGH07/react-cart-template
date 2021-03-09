export function evaluate(firNum, secondNum, operator) {
  const first = Number(firNum);
  const second = Number(secondNum);

  const operators = {
    "+": first + second,
    "-": second - first,
    "/": first / second,
    "*": first * second,
    null: first,
  };

  return operators[operator];
}

export function isOperator(input) {
  switch (input) {
    case "+":
      return true;
    case "-":
      return true;
    case "*":
      return true;
    case "/":
      return true;
    default:
      return false;
  }
}

export function isNumeric(input) {
  if (typeof input != "string") return false;
  return !isNaN(input) && !isNaN(parseFloat(input));
}

export function isOutputTooLong(input) {
  try {
    return input.length >= 11 ? true : false;
  } catch (e) {
    console.log(e);
  }
}
