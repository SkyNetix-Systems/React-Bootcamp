// import { useState } from "react";

import { useReducer } from "react";

// function App() {
//   const [count, setCount] = useState(0);
//   return (
//     <div>
//       <p>{count}</p>
//       <button
//         onClick={() => {
//           setCount((prev) => prev + 1);
//         }}
//       >
//         +
//       </button>
//       <button
//         onClick={() => {
//           setCount((prev) => prev - 1);
//         }}
//       >
//         -
//       </button>
//       <button
//         onClick={() => {
//           setCount(0);
//         }}
//       >
//         Reset
//       </button>
//     </div>
//   );
// }

// export default App;

// Initial state for the useReducer
const initialState = {
  count: 0, // Stores the counter value
  inputValue: "", // Stores the current value from the input field
};

// Reducer function to manage state based on action types
function reducer(state, action) {
  console.log(action); // Log the action for debugging
  console.log(state); // Log the current state for debugging

  switch (action.type) {
    case "increment":
      // Increase the count by 1
      return { ...state, count: state.count + 1 };

    case "decrement":
      // Decrease the count by 1
      return { ...state, count: state.count - 1 };

    case "reset":
      // Reset the count to 0
      return { ...state, count: 0 };

    case "incrementByFive":
      // Increase the count by a fixed value (5 in this case)
      return { ...state, count: state.count + action.payload };

    case "incrementBy":
      // Increase the count by a dynamic value provided in the payload
      return { ...state, count: state.count + action.payload };

    case "updateInput":
      // Update the inputValue in the state with the value from the input field
      return { ...state, inputValue: action.payload };

    default:
      // Return an error if the action type is invalid
      throw new Error("Invalid action type");
  }
}

function App() {
  // useReducer hook to manage state and dispatch actions
  const [state, dispatch] = useReducer(reducer, initialState);

  // Function to handle dynamic increment based on input value
  function handleIncrementBy() {
    const value = parseInt(state.inputValue, 10); // Convert input value to an integer

    if (!isNaN(value)) {
      // Dispatch an action to increment the count by the input value
      dispatch({ type: "incrementBy", payload: value });
    }

    // Clear the input field after dispatching the action
    dispatch({ type: "updateInput", payload: "" });
  }

  return (
    <div>
      {/* Display the current count */}
      <p>{state.count}</p>

      {/* Buttons to increment, decrement, reset, or increment by 5 */}
      <button
        onClick={() => {
          dispatch({ type: "increment" });
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          dispatch({ type: "decrement" });
        }}
      >
        -
      </button>
      <button
        onClick={() => {
          dispatch({ type: "reset" });
        }}
      >
        Reset
      </button>
      <button
        onClick={() => {
          dispatch({ type: "incrementByFive", payload: 5 });
        }}
      >
        +5
      </button>

      {/* Input field and button to increment by a dynamic value */}
      <div>
        <input
          type="number"
          value={state.inputValue} // Bind the input value to the state
          onChange={
            (e) => dispatch({ type: "updateInput", payload: e.target.value }) // Dispatch an action to update inputValue
          }
        />
        <button onClick={handleIncrementBy}>incrementBy</button>
      </div>
    </div>
  );
}

export default App;
