// Import required hooks from React
import { useEffect, useState } from "react";

// Define the main App component
export default function App() {
  // State for the amount to be converted
  const [amount, setAmount] = useState(1);

  // State for the "from" currency (default: EUR)
  const [fromCurrency, setFromCurrency] = useState("EUR");

  // State for the "to" currency (default: USD)
  const [toCurrency, setToCurrency] = useState("USD");

  // State for the converted value
  const [converted, setConverted] = useState("");

  // useEffect hook to trigger conversion whenever amount, fromCurrency, or toCurrency changes
  useEffect(() => {
    // Function to handle currency conversion
    async function convert() {
      // If both currencies are the same, no API call is needed
      if (fromCurrency === toCurrency) {
        setConverted(amount); // Set converted value to the input amount
        return;
      }

      // Fetch conversion data from the API
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );

      // Parse the response to JSON
      const data = await res.json();

      // Set the converted value based on the API response
      setConverted(data.rates[toCurrency]);

      // Log the converted value to the console (for debugging purposes)
      console.log(converted);
    }

    // Call the conversion function
    convert();
  }, [amount, fromCurrency, toCurrency]); // Dependencies: re-run effect when any of these change

  // Render the user interface
  return (
    <div>
      {/* Input field for entering the amount */}
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)} // Update amount state on input change
      />

      {/* Dropdown for selecting the "from" currency */}
      <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>

      {/* Dropdown for selecting the "to" currency */}
      <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>

      {/* Display the converted amount */}
      <p>{converted}</p>
    </div>
  );
}
