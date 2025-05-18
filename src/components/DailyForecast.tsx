import React from "react";
import type { ForecastDay, WeatherLocation } from "../types/allTypes";
import { CiCloudDrizzle } from "react-icons/ci";
import { FaDroplet } from "react-icons/fa6";
import { AnimatePresence, motion } from "motion/react";

export interface DailyForecastProps {
  forecastData: ForecastDay[];
  location: WeatherLocation;
  selectedDay: number;
  onDaySelect: (day: number) => void;
}

const DailyForecast: React.FC<DailyForecastProps> = ({
  forecastData,
  location,
  selectedDay,
  onDaySelect,
}) => {
  const staggerAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    selected: {
      opacity: 1,
      y: 10,
      scale: 1.05,
      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };
  return (
    <div>
      <h3 className="text-lg mb-3 text-black font-semibold">3-Day Forecast</h3>
      <div className="flex  overflow-auto px-3 pb-8 pt-3 gap-5">
        {forecastData.map((day, index) => {
          const date = new Date(day.date);
          const dayName = date.toLocaleDateString("en-US", {
            weekday: "short",
          });
          const dayMonth = date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
          });

          const {
            day: {
              maxtemp_c: maxTemp,
              mintemp_c: minTemp,
              condition: { text: condition, icon: iconUrl },
              daily_chance_of_rain: chanceOfRain,
              avghumidity: humidity,
            },
          } = day;

          return (
            <AnimatePresence key={`${location.name}-${index}`} mode="wait">
              <motion.div
                key={`${location.name}-${index}`}
                initial="hidden"
                animate={selectedDay === index ? "selected" : "visible"}
                exit="exit"
                transition={{ delay: index * 0.1 }}
                variants={staggerAnimation}
                whileHover="hover"
                className="text-center flex flex-wrap justify-center items-center bg-white cursor-pointer min-w-64 p-3 border-1  rounded-2xl"
                onClick={() => onDaySelect(index)}
              >
                <div className="flex justify-between w-full mb-2 items-center">
                  <div className="font-semibold text-primary">{dayName}</div>
                  <div className="text-gray-500">{dayMonth}</div>
                </div>
                <div className="flex justify-around grow-1 flex-col items-center">
                  <img
                    src={`https:${iconUrl}`}
                    alt={condition}
                    className="mb-2 size-16"
                  />
                  <div className="small text-black mb-2" title={condition}>
                    {condition}
                  </div>
                </div>
                <div className="fw-medium mb-2 grow-1">
                  <span className="text-black">{Math.round(maxTemp)}°</span> /
                  <span className="text-gray-600">{Math.round(minTemp)}°</span>
                  <div className="flex justify-between w-full text-gray-600 mt-2 pt-2 border-top">
                  <div
                    title="Humidity"
                    className="flex place-items-center gap-0.5"
                  >
                    <FaDroplet className="w-5" /> <span>{humidity}%</span>
                  </div>
                  <div
                    title="Chance of Rain"
                    className="flex place-items-center gap-0.5"
                  >
                    <CiCloudDrizzle className="text-2xl"/>{" "}
                    <span>{chanceOfRain}%</span>
                  </div>
                </div>
                </div>
                
              </motion.div>
            </AnimatePresence>
          );
        })}
      </div>
    </div>
  );
};

export default DailyForecast;
