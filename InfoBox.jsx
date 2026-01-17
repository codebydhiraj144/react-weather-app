import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "./InfoBox.css";

export default function InfoBox({ info }) {
  // Only 5 URLs
  const WEATHER_IMAGES = {
    hot: "https://images.unsplash.com/photo-1501973801540-537f08ccae7b",
    cold: "https://images.unsplash.com/photo-1608889175250-c3e7b4f8a9e4",
    rainy: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
    cloudy: "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31",
    clear: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  };

  // Always pick an image based on weather description or temperature
  let weather = info.weather.toLowerCase();
  let imageURL = WEATHER_IMAGES.clear; // default

  if (weather.includes("rain") || info.humidity > 80) {
    imageURL = WEATHER_IMAGES.rainy;
  } else if (weather.includes("cloud")) {
    imageURL = WEATHER_IMAGES.cloudy;
  } else if (weather.includes("snow") || info.temp < 15) {
    imageURL = WEATHER_IMAGES.cold;
  } else if (weather.includes("hot") || info.temp > 30) {
    imageURL = WEATHER_IMAGES.hot;
  } else {
    imageURL = WEATHER_IMAGES.clear;
  }

  return (
    <div className="InfoBox">
      <div className="cardcontainer">
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={imageURL} // dynamic image
            title="weather"
            onError={(e) => { e.target.src = WEATHER_IMAGES.clear }} // fallback
          />
          <CardContent>
            <Typography gutterBottom variant="h5">
              {info.city}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Temperature: {info.temp}°C <br />
              Feels Like: {info.feelslike}°C <br />
              Humidity: {info.humidity}% <br />
              Condition: {info.weather}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
