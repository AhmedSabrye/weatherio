import { useState } from "react";
import "./App.css";

import SearchForm from "./components/SearchForm";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import { useWeather } from "./hooks/useWeather";

import useGeolocation from "./hooks/useGeolocation";

function App() {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<number>(0);
  function handleDaySelection(day: number) {
    setSelectedDay(day);
  }
  function handleSearchQuery(query: string) {
    setSearchQuery(query);
  }
  const { data: weatherData, isPending: isLoading } = useWeather(searchQuery);

  const searchWeather = (query: string) => {
    if (!query.trim()) {
      setErrorMessage("Please enter a location");
      return;
    }
    setErrorMessage(null);
    setSearchQuery(query);
  };

  useGeolocation({ handleSearchQuery });
  return (
    <div className="container mx-auto my-4 px-4 md:px-0">
      {/* <LocationHeader
        locationText={
          weatherData?.location.name
            ? `${weatherData.location.name},${weatherData.location.country}`
            : "Cairo, Egypt"
        }
      /> */}

      <SearchForm onSearch={searchWeather} loading={isLoading} />

      {errorMessage && (
        <div className="alert alert-danger text-center" role="alert">
          {errorMessage}
        </div>
      )}

      {isLoading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status"></div>
          <div className="mt-2">Loading weather data...</div>
        </div>
      )}

      {!isLoading && weatherData && (
        <div className="weather-container">
          <CurrentWeather key={searchQuery} weatherData={weatherData} />

          <DailyForecast
            selectedDay={selectedDay}
            forecastData={weatherData.forecast.forecastday}
            location={weatherData.location}
            onDaySelect={handleDaySelection}
          />
          <HourlyForecast
            selectedDay={selectedDay}
            location={weatherData.location}
            hourlyData={weatherData.forecast.forecastday[selectedDay].hour}
          />
        </div>
      )}
    </div>
  );
}

export default App;
