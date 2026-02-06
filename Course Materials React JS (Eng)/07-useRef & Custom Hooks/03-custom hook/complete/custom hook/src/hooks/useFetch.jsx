import { useEffect, useState } from "react";

// Custom hook to fetch data from a given URL
function useFetch(url) {
  // State to store the fetched data
  const [data, setData] = useState(null);
  // State to track the loading status
  const [loading, setLoading] = useState(true);
  // State to store any error that occurs during the fetch
  const [error, setError] = useState(null);

  useEffect(() => {
    // Async function to handle the data fetching
    async function fetchData(url) {
      try {
        // Send a request to the provided URL
        const res = await fetch(url);
        // Check if the response is not OK (e.g., 404 or 500)
        if (!res.ok) {
          throw new Error(`HTTP ERROR: ${res.status}`); // Throw an error with the HTTP status code
        }
        // Parse the JSON response
        const data = await res.json();
        // Save the fetched data to the state
        setData(data);
      } catch (err) {
        // If an error occurs, save the error message to the state
        setError(err.message);
      } finally {
        // Always set loading to false after the request finishes
        setLoading(false);
      }
    }
    // Call the fetchData function with the provided URL
    fetchData(url);
  }, [url]); // Re-run the effect when the URL changes

  // Return the fetched data, loading status, and error
  return { data, loading, error };
}

export default useFetch;
