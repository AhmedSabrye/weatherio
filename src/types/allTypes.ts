export interface WeatherLocation {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  localtime: string;
}

export interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

export interface CurrentWeather {
  temp_c: number;
  feelslike_c: number;
  condition: WeatherCondition;
  humidity: number;
  wind_kph: number;
  last_updated: string;
}

export interface DayForecast {
  maxtemp_c: number;
  mintemp_c: number;
  avgtemp_c: number;
  condition: WeatherCondition;
  daily_chance_of_rain: number;
  avghumidity: number;
}

export interface HourForecast {
  time: string;
  temp_c: number;
  condition: WeatherCondition;
  chance_of_rain: number;
  feelslike_c: number;
  wind_kph: number;
}

export interface ForecastDay extends CurrentWeather{
  date: string;
  day: DayForecast;
  hour: HourForecast[];
}

export interface WeatherForecast {
  forecastday: ForecastDay[];
  
} 

export interface WeatherData {
  location: WeatherLocation;
  current: CurrentWeather;
  forecast: WeatherForecast;
}
