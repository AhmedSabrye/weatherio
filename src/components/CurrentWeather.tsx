import React from "react";
import { getLargeWeatherIcon } from "../services/api/weatherApi";
import type { WeatherData } from "../types/allTypes";
import { AnimatePresence, motion } from "motion/react";
import { FaThermometerThreeQuarters, FaWind } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
export interface CurrentWeatherProps {
  weatherData: WeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weatherData }) => {
  const { location, current } = weatherData;
  const { name: locationName, country } = location;
  const {
    temp_c: temperature,
    feelslike_c: feelsLike,
    condition: { text: description, icon: iconUrl },
    humidity,
    wind_kph: windSpeed,
  } = current;
  return (
    <motion.div>
      <div>
        <div className="flex flex-column flex-md-row justify-between align-start mb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={locationName}
              id="weatherResults"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{
                x: 50,
                opacity: 0,
                transition: {
                  duration: 0.4,
                },
              }}
              transition={{ duration: 1.4 }}
              className="mb-12 md:mb-0"
            >
              <h2 className="text-3xl font-semibold mb-3 text-black">
                {locationName}, {country}
              </h2>
              <div className="flex align-start">
                <img
                  src={`https:${iconUrl}`}
                  alt="Weather Icon"
                  className="me-3"
                />
                <div>
                  <div className="font-bold">{Math.round(temperature)}°C</div>
                  <div className="text-gray-500 text-capitalize">
                    {description}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap mt-12 gap-6">
                <div className="text-start">
                  <div className="text-emerald-500 text-2xl mb-1">
                    <FaThermometerThreeQuarters />{" "}
                  </div>
                  <div className="font-semibold text-2xl">
                    {Math.round(feelsLike)}°C
                  </div>
                  <div className="text-gray-600">Feels Like</div>
                </div>

                <div className="text-start">
                  <div className="text-emerald-500 text-2xl mb-1">
                    <FaDroplet />{" "}
                  </div>
                  <div className="font-semibold text-2xl">{humidity}%</div>
                  <div className="text-gray-600">Humidity</div>
                </div>

                <div className="text-start">
                  <div className="text-emerald-500 text-2xl mb-1">
                    <FaWind />{" "}
                  </div>
                  <div className="font-semibold text-2xl">{windSpeed} km/h</div>
                  <div className="text-gray-600">Wind Speed</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.img
              key={locationName}
              id="weatherResults"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{
                x: -50,
                opacity: 0,
                transition: {
                  duration: 0.4,
                },
              }}
              transition={{ duration: 1.4 }}
              src={getLargeWeatherIcon(description)}
              alt="Weather Icon"
              className="w-64 hidden md:block"
            />
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default CurrentWeather;
