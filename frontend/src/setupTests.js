// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

const text = "my name is dinesh baraiya";
const res = text.split("");

res.forEach((item) => item.charAt(0).toUpperCase());

const getResult = (text) => {
  const res = text.split(" ").forEach((item) => item.charAt(0).toUpperCase());

  console.log(res);
};

getResult(text);
