import React, { useState, useEffect } from "react";
import "./index.css";

//Rus

//БЕЗ ПОДСКАЗОК:
//Создайте интерфейс для конвертации валют с загрузкой данных валют из API Frankfurter в state, динамическим отображением options в select, обработкой выбранных валют, ввода суммы, расчётом конвертации через асинхронную функцию с try/catch/finally, отображением результата в UI, проверкой, что сумма больше 0, и состояниями для загрузки и ошибок.

//C ПОДСКАЗКАМИ:
/*
// 1 - Получите массив всех валют из API Frankfurter и запишите его в state.
// 2 - Используя map, динамически создайте options внутри select.
// 3 - Получите значения выбранных валют из обоих select и запишите их в state fromCurrency и toCurrency.
// 4 - Создайте state для записи amount из input. Запишите данные из input в этот state.
// 5 - Создайте вторую асинхронную функцию для получения значения конвертации двух валют. Запишите результат конвертации в новый state - convertedAmount. Покажите результат в интерфейсе.
// 6 - Добавьте в обе функции блоки try/catch/finally. Создайте state для loading (true/false) и error ("Сообщение ошибки").
// 7 - Внедрите логику отображения загрузки и ошибок в интерфейсе.
// 8 - Добавьте проверку, чтобы amount был больше 0.
*/

//Eng

// WITHOUT HINTS:
// Create a currency conversion interface that fetches currency data from the Frankfurter API into the state, dynamically renders options in the select dropdown, processes selected currencies and input amount, performs the conversion using an asynchronous function with try/catch/finally, displays the result in the UI, validates that the amount is greater than 0, and manages loading and error states.

// WITH HINTS:

/*
// 1 - Fetch an array of all currencies from the Frankfurter API and save it to the state.
// 2 - Use the map method to dynamically create <option> elements inside the select dropdown.
// 3 - Get the selected currency values from both select elements and save them to the state variables fromCurrency and toCurrency.
// 4 - Create a state variable to store the amount from the input field and save the input value to this state.
// 5 - Create a second asynchronous function in useEffect to fetch the conversion rate between the two currencies. Save the conversion result to a new state variable - convertedAmount. Display the result in the UI.
// 6 - Add try/catch/finally blocks to both functions. Create states for loading (true/false) and error ("Error message as a string").
// 7 - Implement the logic for displaying loading indicators and error messages in the UI.
// 8 - Add a validation to ensure that the amount is greater than 0.
*/

//https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD

const API_URL = "https://api.frankfurter.app";
function App() {
  // State to hold the list of currencies fetched from the API
  const [currencies, setCurrencies] = useState([]);
  // State to hold the selected "from" currency
  const [fromCurrency, setFromCurrency] = useState("EUR");
  // State to hold the selected "to" currency
  const [toCurrency, setToCurrency] = useState("USD");
  // State to hold the amount to be converted
  const [amount, setAmount] = useState(1);
  // State to hold the converted amount
  const [convertedAmount, setConvertedAmount] = useState(null);
  // State to hold any error messages
  const [error, setError] = useState(null);
  // State to indicate loading status
  const [isLoading, setIsLoading] = useState(false);

  // Fetch the list of available currencies on component mount
  useEffect(() => {
    async function getCurrencies() {
      try {
        const res = await fetch(`${API_URL}/latest`);
        const data = await res.json();
        // Store the currency keys (like "USD", "EUR") in the state
        setCurrencies(Object.keys(data.rates));
      } catch {
        setError("Failed to fetch currencies"); // Set an error message if the fetch fails
      }
    }
    getCurrencies(); // Call the function to fetch currencies
  }, []); // Empty dependency array ensures this runs only once

  // Handle the conversion process when the user clicks "Convert"
  async function handleConvert() {
    // Validate that the amount is greater than 0
    if (!amount || amount <= 0) {
      setError("Amount must be greater than zero");
      return;
    }
    setError(null); // Clear any previous error messages
    setIsLoading(true); // Set loading state to true
    try {
      // Fetch the conversion rate between the selected currencies
      const res = await fetch(
        `${API_URL}/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();
      console.log(data); // Log the API response for debugging
      // Set the converted amount in the state
      setConvertedAmount(data.rates[toCurrency]);
    } catch {
      setError("Failed to convert currencies"); // Set an error message if the fetch fails
    } finally {
      setIsLoading(false); // Set loading state to false once the process is done
    }
  }

  return (
    <div className="app">
      <h1>Currency Exchange Calculator</h1>

      <div className="converter-container">
        {/* Display error messages if there are any */}
        {error && <p className="error">{error}</p>}

        <div className="input-group">
          {/* Input field for the amount to be converted */}
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)} // Update state when input changes
            type="number"
            placeholder="Amount"
            className="input-field"
          />

          {/* Dropdown for selecting the "from" currency */}
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)} // Update state when selection changes
            className="dropdown"
          >
            {currencies.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <span className="arrow">→</span>

          {/* Dropdown for selecting the "to" currency */}
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)} // Update state when selection changes
            className="dropdown"
          >
            {currencies.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Button to trigger the conversion */}
        <button className="convert-button" onClick={handleConvert}>
          Convert
        </button>

        {/* Display a loading message when conversion is in progress */}
        {isLoading && <p className="loading">Converting...</p>}

        {/* Display the conversion result once available */}
        {convertedAmount !== null && !isLoading && (
          <p className="result">
            {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
