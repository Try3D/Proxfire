let latitude: number, longitude: number;

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function updateLocation() {
  try {
    const position: GeolocationPosition = await getCurrentPosition();
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
  } catch (error) {
    console.error("Error getting location:", error);
  }
}

updateLocation();

export { latitude, longitude };
