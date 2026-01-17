import TextField from "@mui/material/TextField"; // Material UI input field
import Button from "@mui/material/Button";       // Material UI button
import "./SearchBox.css";                        // Custom CSS for styling
import { useState } from "react";               // React hook for state management

// SearchBox Component
// Receives `updateInfo` function as a prop from parent (WeatherApp)
export default function SearchBox({ updateInfo }) {
  
  // -----------------------------
  // State variables
  // -----------------------------
  let [city, setCity] = useState(""); // Stores current city input by user
  let [error, setError] = useState(""); // Stores error message if API fails

  // -----------------------------
  // OpenWeather API configuration
  // -----------------------------
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "f2bf4df7bba490c6ea41c369c7fe5866";

  // -----------------------------
  // Function to fetch weather data from API
  // -----------------------------
  let getWeatherInfo = async () => {
    // Fetch weather for the entered city in metric units (°C)
    let response = await fetch(
      `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
    );

    let jsonResponse = await response.json(); // Convert response to JSON

    // -----------------------------
    // Handle error: if city not found in API
    // -----------------------------
    if (jsonResponse.cod !== 200) {
      throw new Error("City not found");
    }

    // -----------------------------
    // Extract required info from API response
    // -----------------------------
    let result = {
      city: city,                       // City name
      temp: jsonResponse.main.temp,     // Current temperature
      tempMin: jsonResponse.main.temp_min, // Min temperature
      tempMax: jsonResponse.main.temp_max, // Max temperature
      humidity: jsonResponse.main.humidity, // Humidity %
      feelslike: jsonResponse.main.feels_like, // Feels like temperature
      weather: jsonResponse.weather[0].description, // Weather description
    };

    return result; // Return extracted info
  };

  // -----------------------------
  // Handle input change
  // -----------------------------
  let handleChange = (evt) => {
    setCity(evt.target.value); // Update city as user types
    setError("");              // Clear previous error when typing
  };

  // -----------------------------
  // Handle form submission
  // -----------------------------
  let handleSubmit = async (evt) => {
    evt.preventDefault(); // Prevent page reload

    try {
      // Fetch weather info
      let newInfo = await getWeatherInfo();

      // Update parent state with new weather info
      updateInfo(newInfo);

      setCity(""); // Clear input field
    } catch (err) {
      // Show error message if city not found or API fails
      setError("No such place in our API ❌");
    }
  };

  // -----------------------------
  // JSX: Render the search box
  // -----------------------------
  return (
    <div className="SearchBox">
      <h3>Search for weather</h3>

      {/* Form to enter city name */}
      <form onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          value={city}           // Controlled input
          onChange={handleChange} // Update state on change
          required
        />
        <br /><br />

        <Button variant="contained" type="submit">
          Search
        </Button>
      </form>

      {/* Display error message if any */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
