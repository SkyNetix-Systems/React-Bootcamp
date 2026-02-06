import { useReducer } from "react";
import "./index.css";

//Rus
// 1. С помощью хука useReducer создайте виджет для отображения текущей даты.
// 2. В параграфе должна отображаться текущая дата в формате: Fri Dec 27 2025.
// 3. Кнопка Reset должна сбрасывать дату на текущую.
// 4. В поле ввода (input) пользователь вводит количество дней, которые нужно прибавить к текущей дате.
// 5. При нажатии на кнопку Show result должна отображаться дата, полученная после прибавления введённого количества дней к текущей дате.

//Eng
/*
  // 1. Using the useReducer hook, create a widget to display the current date.
// 2. The paragraph should display the current date in the format: Fri Dec 27 2025.
// 3. The Reset button should reset the date to the current one.
// 4. In the input field, the user enters the number of days to add to the current date.
// 5. When the Show result button is clicked, the date obtained after adding the entered number of days to the current date should be displayed.
*/

const initialState = { date: new Date(), inputValue: "" };

function reducer(state, action) {
  switch (action.type) {
    case "reset":
      return { ...state, date: new Date() };
    case "updateInput":
      return { ...state, inputValue: action.payload };
    case "updateDate": {
      const days = parseInt(state.inputValue, 10);
      if (isNaN(days)) return state;

      const updatedDate = new Date(state.date);
      updatedDate.setDate(updatedDate.getDate() + days);

      return { ...state, date: updatedDate, inputValue: "" };
    }
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="app-container">
      <p className="date-text">{state.date.toDateString()}</p>

      <button className="btn" onClick={() => dispatch({ type: "reset" })}>
        Reset
      </button>

      <div className="input-group">
        <input
          className="input"
          type="number"
          value={state.inputValue}
          placeholder="Days after today"
          onChange={(e) => dispatch({ type: "updateInput", payload: e.target.value })}
        />
        <button className="btn primary-btn" onClick={() => dispatch({ type: "updateDate" })}>
          Show result
        </button>
      </div>
    </div>
  );
}

export default App;
