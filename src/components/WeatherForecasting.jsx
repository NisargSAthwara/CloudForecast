import "./WeatherForecasting.css";
import clearImage from "../assets/clear.png";
import cloudImage from "../assets/cloud.png";
import drizzleImage from "../assets/drizzle.png";
import humidityImage from "../assets/humidity.png";
import rainImage from "../assets/rain.png";
import searchImage from "../assets/search.png";
import snowImage from "../assets/snow.png";
import windImage from "../assets/wind.png";
import { useEffect, useState } from "react";
const WeatherForecasting = () => {
  const [weatherData, setWeatherData] = useState(false);
  const [city, setCity] = useState(null);
  const allIcons = {
    "01d": clearImage,
    "02d": cloudImage,
    "03d": cloudImage,
    "04d": cloudImage,
    "09d": rainImage,
    "10d": rainImage,
    "11d": drizzleImage,
    "13d": snowImage,
    "50d": cloudImage,
    "01n": clearImage,
    "02n": cloudImage,
    "03n": cloudImage,
    "04n": cloudImage,
    "09n": rainImage,
    "10n": rainImage,
    "11n": drizzleImage,
    "13n": snowImage,
    "50n": cloudImage,
  };
  const search = async (city) => {
    if (city.trim() === "") {
      alert("Please Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      const icon = allIcons[data.weather[0].icon];
      console.log(data);
      setWeatherData({
        humidity: data.main.humidity,
        tempreature: Math.floor(data.main.temp),
        windSpeed: data.wind.speed,
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    search(city);
    setCity("");
  };
  return (
    <>
      <div className="container">
        <div className="title">
          <h1>Weather Forecasting</h1>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter your city here..."
            value={city}
            onChange={(e) => handleInputChange(e)}
          />
          <div className="search-icon">
            <img src={searchImage} alt="" onClick={handleOnClick} />
          </div>
        </div>
        {weatherData ? (
          <>
            <div className="img-container">
              <img src={weatherData.icon} alt="" />
            </div>
            <div className="tempreature">
              <p className="temp-text">{weatherData.tempreature}°C</p>
            </div>
            <div className="city-name">
              <p className="city-text">{weatherData.location}</p>
            </div>
            <div className="data-container">
              <div className="humidity-container">
                <img src={humidityImage} alt="" />
                <div className="humidity-text">
                  <p className="humidity-percentages">
                    {weatherData.humidity}%
                  </p>
                  <p className="humidity-name">Humidity</p>
                </div>
              </div>
              <div className="wind-container">
                <img src={windImage} alt="" />
                <div className="wind-text">
                  <p className="wind-percentages">
                    {weatherData.windSpeed} km/h
                  </p>
                  <p className="wind-name">Wind Speed</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default WeatherForecasting;
