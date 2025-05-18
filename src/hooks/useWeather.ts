import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { fetchWeatherData } from '../services/api/weatherApi';
import type { WeatherData } from '../types/allTypes';


export const useWeather = (
  query: string | null,
  options?: Omit<UseQueryOptions<WeatherData, Error, WeatherData, string[]>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['weather', query || ''],
    queryFn: () => {
      if (!query) {
        throw new Error('No query provided');
      }
      return fetchWeatherData(query);
    },
    placeholderData:(previousData)=>previousData,
    enabled: !!query,
    staleTime: 30 * 60 * 1000,
    ...options
  });
};
