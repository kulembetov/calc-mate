import React, { useState, useEffect } from "react";
import { Button } from "./@/src/ui/button";

const Calculator = () => {
  const [input, setInput] = useState("");

  const handleButtonClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleEqual = () => {
    try {
      setInput(eval(input).toString());
    } catch (error) {
      setInput("Error");
    }
  };

  const handleKeyPress = (event) => {
    const { key } = event;
    if (/[0-9/*+\-]/.test(key)) {
      handleButtonClick(key);
    } else if (key === "Enter") {
      handleEqual();
    } else if (key === "Backspace") {
      setInput((prev) => prev.slice(0, -1));
    } else if (key === "Escape") {
      handleClear();
    } else if (key === ".") {
      handleButtonClick(".");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center mt-20">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="mb-4">
            <input
              type="text"
              value={input}
              readOnly
              className="w-full text-right p-2 border rounded"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {["7", "8", "9", "/"].map((char) => (
              <Button key={char} onClick={() => handleButtonClick(char)}>
                {char}
              </Button>
            ))}
            {["4", "5", "6", "*"].map((char) => (
              <Button key={char} onClick={() => handleButtonClick(char)}>
                {char}
              </Button>
            ))}
            {["1", "2", "3", "-"].map((char) => (
              <Button key={char} onClick={() => handleButtonClick(char)}>
                {char}
              </Button>
            ))}
            {["0", ".", "=", "+"].map((char) => (
              <Button
                key={char}
                onClick={() =>
                  char === "=" ? handleEqual() : handleButtonClick(char)
                }
              >
                {char}
              </Button>
            ))}
            <Button className="col-span-4" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
