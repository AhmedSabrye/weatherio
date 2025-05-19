import { useEffect, useRef } from "react";
import type { HourForecast, WeatherLocation } from "../types/allTypes";
import { FaThermometerHalf, FaWind } from "react-icons/fa";
import { CiCloudDrizzle } from "react-icons/ci";
import { motion, AnimatePresence } from "motion/react";

export interface HourlyForecastProps {
  hourlyData: HourForecast[];
  selectedDay: number;
  location: WeatherLocation;
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({
  hourlyData,
  selectedDay,
  location,
}) => {
  const now = new Date();
  const currentHour = now.getHours();
  const hourlyContainer = useRef<HTMLDivElement>(null);
  const currentHourRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hourlyContainer.current && currentHourRef.current) {
      hourlyContainer.current.scrollLeft =
        currentHourRef.current.offsetLeft -
        hourlyContainer.current.offsetWidth / 2;
    }
  }, [selectedDay]);

  if (hourlyData.length === 0) {
    return <NoHourlyData />;
  }

  return (
    <div className="p-4 mb-4">
      <h3 className="text-2xl mb-3 text-dark fw-semibold">Hourly Forecast</h3>
      <AnimatePresence mode="wait">
        <motion.div
          ref={hourlyContainer}
          key={`${selectedDay}-${location.name}`}
          className="flex overflow-x-auto overflow-y-hidden p-3 gap-3"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
            exit: { opacity: 0 },
          }}
        >
          {hourlyData.map((hourData, index) => {
            const hourTime = new Date(hourData.time);
            const displayHour = hourTime.getHours();
            const isCurrentHour = displayHour === currentHour;

            const hour12 = displayHour % 12 || 12;
            const ampm = displayHour >= 12 ? "PM" : "AM";
            let timeDisplay;
            if (selectedDay == 0) {
              timeDisplay = isCurrentHour ? "Now" : `${hour12}${ampm}`;
            } else {
              timeDisplay = `${hour12}${ampm}`;
            }

            const {
              temp_c: temp,
              condition: { text: condition, icon: iconUrl },
              chance_of_rain: chanceOfRain,
              feelslike_c: feelsLike,
              wind_kph: windSpeed,
            } = hourData;

            return (
              <motion.div
                ref={index === currentHour ? currentHourRef : null}
                key={`${selectedDay}-${index}`}
                variants={{
                  hidden: { y: 50, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      duration: 0.5,
                      ease: "easeOut",
                    },
                  },
                  exit: { y: -50, opacity: 0 },
                }}
                className={`text-center p-4 border-4 rounded-xl ${
                  selectedDay !== 0
                    ? "text-black"
                    : isCurrentHour
                    ? "border-l-4 border-black"
                    : "border-l-0"
                }`}
                style={{
                  opacity:
                    selectedDay !== 0
                      ? "1"
                      : hourTime.getHours() < currentHour
                      ? "0.7"
                      : "1",
                }}
              >
                <div
                  className={`font-semibold ${
                    isCurrentHour ? "text-black" : "text-gray-600"
                  }`}
                >
                  {timeDisplay}
                </div>
                <img
                  src={`https:${iconUrl}`}
                  alt={condition}
                  className="my-2 mx-auto size-16"
                />
                <div
                  className={`font-bold text-2xl mb-1 ${
                    isCurrentHour ? "text-black" : "text-gray-600"
                  }`}
                >
                  {Math.round(temp)}°
                </div>
                <div
                  className={`text-gray-600 min-h-10 ${
                    isCurrentHour ? "text-black" : "text-gray-600"
                  }`}
                  title={condition}
                >
                  {condition}
                </div>
                <div
                  className={`flex justify-between items-center gap-2 text-gray-600 mt-1 pt-2 border-t ${
                    selectedDay !== 0
                      ? "text-black"
                      : isCurrentHour
                      ? "text-black"
                      : "text-gray-600"
                  }`}
                >
                  <div
                    title="Feels Like"
                    className="flex items-center justify-start"
                  >
                    <FaThermometerHalf className="w-5" />{" "}
                    {Math.round(feelsLike)}°
                  </div>
                  <div
                    title="Chance of Rain"
                    className="flex items-center justify-end"
                  >
                    <CiCloudDrizzle className="text-2xl" /> {chanceOfRain}%
                  </div>
                </div>
                <div
                  className={`flex justify-center items-center text-gray-600 mt-1 ${
                    selectedDay !== 0
                      ? "text-black"
                      : isCurrentHour
                      ? "text-black"
                      : "text-gray-600"
                  }`}
                  title="Wind Speed"
                >
                  <FaWind className="w-5" /> {Math.round(windSpeed)} km/h
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HourlyForecast;

function NoHourlyData() {
  return (
    <div className="py-4 mb-4">
      <h3 className="text-2xl mb-3 text-dark fw-semibold">
        Today's Hourly Forecast (Full Day)
      </h3>
      <div className="text-center w-100 p-3">
        <p className="text-secondary mb-0">
          No hourly data available for today.
        </p>
      </div>
    </div>
  );
}
