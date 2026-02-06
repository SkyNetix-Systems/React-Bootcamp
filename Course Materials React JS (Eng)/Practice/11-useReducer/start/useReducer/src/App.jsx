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

function App() {
  return (
    <div className="app-container">
      <p className="date-text">Today</p>

      <button className="btn">Reset</button>

      <div className="input-group">
        <input className="input" type="number" placeholder="Days after today" />
        <button className="btn primary-btn">Show result</button>
      </div>
    </div>
  );
}

export default App;
