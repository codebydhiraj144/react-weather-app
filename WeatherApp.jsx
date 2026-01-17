// WeatherApp.jsx
import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import { useState } from "react";

// Main Weather App component
export default function WeatherApp() {
  // State to hold current weather info
  const [weatherInfo, setWeatherInfo] = useState({
    feelslike: 24.84,
    temp: 25.05,
    tempMin: 25.05,
    tempMax: 25.05,
    humidity: 47,
    weather: "haze",
    city: "Delhi",
  });

  // Function to update weather info from SearchBox
  let updateInfo = (newInfo) => {
    setWeatherInfo(newInfo); // Update state
  };

  return (
    <div style={{ textAlign: "center" }}>
      {/* App Title */}
      <h2>Weather App by Delta</h2>

      {/* SearchBox component */}
      <SearchBox updateInfo={updateInfo} />

      {/* InfoBox component */}
      <InfoBox info={weatherInfo} />
    </div>
  );
}
