export const handleGeolocationSuccess = (
  position: GeolocationPosition,
  handleSearchQuery: (query:string)=>void
) => {
  const { latitude, longitude } = position.coords;
  const query = `${latitude},${longitude}`;
  handleSearchQuery(query);
};

export const handleGeoLocationError = (
  error: GeolocationPositionError,
  handleSearchQuery: (query:string)=>void
) => {
  const DEFAULT_LOCATION = "Cairo, Egypt";

  if (error.code === 1) {
    console.log("Location permission denied. Using default location.");
  } else {
    console.log(`Geolocation error (${error.code}): ${error.message}`);
  }
  handleSearchQuery(DEFAULT_LOCATION);
};
