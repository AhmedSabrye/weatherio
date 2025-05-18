import { useEffect } from "react";
import { handleGeolocationSuccess, handleGeoLocationError } from "../services/geolocation/geolocation";
type Geolocation = {
  handleSearchQuery: (query: string) => void;
};


export const getGeolocation = (handleSearchQuery: (query: string) => void) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => handleGeolocationSuccess(position, handleSearchQuery),
      (error) => handleGeoLocationError(error, handleSearchQuery)
    );
  } else {
    handleSearchQuery("Cairo, Egypt");  
  }
}


export default function useGeolocation({
  handleSearchQuery,
}: Geolocation) {
  useEffect(() => {
    getGeolocation(handleSearchQuery);
  }, []);
  return null;
}
