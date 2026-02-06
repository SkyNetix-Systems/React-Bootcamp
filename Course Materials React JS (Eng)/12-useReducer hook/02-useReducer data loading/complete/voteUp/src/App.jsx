import { useEffect, useReducer } from "react";

// Initial state of the application
// candidates: array of candidate objects
// newCandidate: name of the new candidate being added
// status: indicates the current loading/error/ready state
const initialState = {
  candidates: [],
  newCandidate: "",
  status: "loading",
};

/**
 * Main reducer function to handle different action types.
 * Returns new state based on the dispatched action.
 */
function reducer(state, action) {
  switch (action.type) {
    // Resets all candidates' votes to 0
    case "reset_votes":
      return {
        ...state,
        candidates: state.candidates.map((candidate) => ({
          ...candidate,
          votes: 0,
        })),
      };

    // Updates the newCandidate field with the text entered by the user
    case "update_new_candiadate":
      return { ...state, newCandidate: action.payload };

    // Adds a new candidate to the list if the name isn't empty or duplicated
    case "add_candidate":
      if (
        !action.payload.trim() ||
        state.candidates.some((candidate) => candidate.name === action.payload)
      ) {
        // If the input is empty/whitespace or already exists, return current state
        return state;
      }
      // Otherwise, add the new candidate and reset newCandidate to an empty string
      return {
        ...state,
        candidates: [...state.candidates, { name: action.payload, votes: 0 }],
        newCandidate: "",
      };

    // Increases vote count for a specific candidate by 1
    case "vote_up":
      return incrementVote(state, action.payload);

    // Decreases vote count for a specific candidate by 1, not going below 0
    case "vote_down":
      return decrementVote(state, action.payload);

    // Called when data is successfully fetched from the server
    case "dataReceived":
      return {
        ...state,
        candidates: action.payload,
        status: "ready",
      };

    // Called when there is an error fetching data
    case "dataFaild":
      return { ...state, status: "error" };

    // By default, return the current state (or throw an error if you prefer)
    default:
      return state;
  }
}

/**
 * Helper function to increment votes for a candidate.
 * It maps through candidates, finding the one with the matching name,
 * and returns a new array with the updated votes.
 */
function incrementVote(state, name) {
  return {
    ...state,
    candidates: state.candidates.map((candidate) =>
      candidate.name === name ? { ...candidate, votes: candidate.votes + 1 } : candidate
    ),
  };
}

/**
 * Helper function to decrement votes for a candidate.
 * Ensures that votes do not go below 0 using Math.max.
 */
function decrementVote(state, name) {
  return {
    ...state,
    candidates: state.candidates.map((candidate) =>
      candidate.name === name
        ? { ...candidate, votes: Math.max(candidate.votes - 1, 0) }
        : candidate
    ),
  };
}

/**
 * Main component for the Vote Tracker feature.
 * Fetches data on mount, manages state with useReducer, and renders UI.
 */
function VoteTracker() {
  const [state, dispath] = useReducer(reducer, initialState);

  // Fetches candidate data from the server on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:9000/candidates");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        dispath({ type: "dataReceived", payload: data });
      } catch (error) {
        dispath({ type: "dataFaild" });
      }
    }
    fetchData();
  }, []);

  // If still loading, display a loading message
  if (state.status === "loading") {
    return <p>Loading data, please wait...</p>;
  }

  // If there was an error, display an error message
  if (state.status === "error") {
    return <p>Failed to fetch data. Please try again</p>;
  }

  // Otherwise, render the list of candidates and interaction options
  return (
    <>
      <h1>Vote Tracker</h1>
      <ul>
        {state.candidates.map((candidate) => (
          <li key={candidate.id}>
            {candidate.name}: {candidate.votes} votes{" "}
            <button onClick={() => dispath({ type: "vote_up", payload: candidate.name })}>+</button>
            <button onClick={() => dispath({ type: "vote_down", payload: candidate.name })}>
              -
            </button>
          </li>
        ))}
      </ul>

      {/* Reset all votes to 0 */}
      <button onClick={() => dispath({ type: "reset_votes" })}>Reset Votes</button>

      <div>
        <h2>Add Candidate</h2>
        <input
          type="text"
          value={state.newCandidate}
          placeholder="Candidate name"
          onChange={(event) =>
            dispath({ type: "update_new_candiadate", payload: event.target.value })
          }
        />
        <button onClick={() => dispath({ type: "add_candidate", payload: state.newCandidate })}>
          Add
        </button>
      </div>
    </>
  );
}

export default VoteTracker;
