import { useState } from "react";
import "./index.css";

//Rus
//1 - Создайте состояние input, которое будет отображать результат вычислений в калькуляторе.
//2 - Создайте 2 функции для увеличения или уменьшения значения input на +1 или -1 и назначьте их на кнопки +1 / -1.
//3 - Создайте функцию, которая будет выполнять определенную операцию на калькуляторе в зависимости от нажатой кнопки. В результате работы этой функции должен получиться полностью рабочий калькулятор. Используйте эту функцию в обработчиках событий для всех кнопок.

//P.S. Если сложно продумать одну универсальную функцию, можете создать столько функций, сколько нужно. Не переживайте о чистоте кода.

//P.P.S. В JavaScript есть метод eval(), который преобразует любую строку в JavaScript-выражение.
//Пример: eval("console.log('Hello')") — выполнит этот код.
// Используйте этот метод для всех операций в калькуляторе.

//Eng

//Eng
//1 - Create a state variable input to display the result of calculations in the calculator.
//2 - Create two functions to increase or decrease the value of input by +1 or -1, and assign them to the +1 / -1 buttons.
//3 - Create a function that will perform a specific operation in the calculator based on the button pressed. This function should result in a fully functional calculator. Use this function in the event handlers for all buttons.

//P.S. If it’s difficult to design a universal function, feel free to create as many functions as you need. Don’t worry about code cleanliness.

//P.P.S. JavaScript has a method eval() that transforms any string into a JavaScript expression.
//Example: eval("console.log('Hello')") will execute this code.
// Use this method for all operations in the calculator.

// Calculator component to perform basic arithmetic operations
function Calculator() {
  // State variable to store the current input or result of the calculations
  const [input, setInput] = useState("0");

  // Function to increase the input value by 1
  function addOne() {
    const currentInput = eval(input);
    setInput((currentInput + 1).toString());
  }

  // Function to decrease the input value by 1
  function subtractOne() {
    const currentInput = eval(input);
    setInput((currentInput - 1).toString());
  }

  // Main function to handle button clicks and perform operations
  function handleClick(value) {
    if (value === "C") {
      // Reset input to zero on 'C' button click
      setInput("0");
      return;
    } else if (value === "=") {
      // Calculate and display the result on '=' button click
      setInput(eval(input).toString());
      return;
    }
    // Append clicked value to input unless it's zero
    setInput((prev) => (prev === "0" ? value : prev + value));
  }

  return (
    <div className="calculator-container">
      <h1 className="calculator-title">UseState Calculator</h1>

      {/* Display for showing the current input or result */}
      <div className="calculator">
        <div className="display">{input}</div>

        {/* Increment and decrement buttons */}
        <div className="increment-buttons">
          <button className="increment" onClick={addOne}>
            +1
          </button>
          <button className="decrement" onClick={subtractOne}>
            -1
          </button>
        </div>

        {/* Buttons for digits, operators, clear, and equals */}
        <div className="buttons">
          <button onClick={() => handleClick("1")}>1</button>
          <button onClick={() => handleClick("2")}>2</button>
          <button onClick={() => handleClick("3")}>3</button>
          <button className="operator" onClick={() => handleClick("+")}>
            +
          </button>
          <button onClick={() => handleClick("4")}>4</button>
          <button onClick={() => handleClick("5")}>5</button>
          <button onClick={() => handleClick("6")}>6</button>
          <button className="operator" onClick={() => handleClick("-")}>
            -
          </button>
          <button onClick={() => handleClick("7")}>7</button>
          <button onClick={() => handleClick("8")}>8</button>
          <button onClick={() => handleClick("9")}>9</button>
          <button className="operator" onClick={() => handleClick("*")}>
            ×
          </button>
          <button onClick={() => handleClick("0")}>0</button>
          <button onClick={() => handleClick(".")}>,</button>
          <button className="equals" onClick={() => handleClick("=")}>
            =
          </button>
          <button className="operator" onClick={() => handleClick("/")}>
            ÷
          </button>
          <button className="clear" onClick={() => handleClick("C")}>
            C
          </button>
        </div>
      </div>

      {/* Section displaying the technologies used */}
      <div className="technologies-used">
        <p>
          <strong>Technologies used:</strong> React, JSX, CSS Modules, JavaScript (useState, event
          handling)
        </p>
      </div>
    </div>
  );
}

export default Calculator;
