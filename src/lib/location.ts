let latitude: number, longitude: number;

function getCurrentPosition(): Promise<GeolocationPosition> {
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
    alert("This app requires your location to function properly");
  }
}

updateLocation();

export { latitude, longitude };

export function haversineDistance(
  lat_1: number,
  lon_1: number,
  lat_2: number,
  lon_2: number,
): number {
  const d_lat = ((lat_2 - lat_1) * Math.PI) / 180;
  const d_lon = ((lon_2 - lon_1) * Math.PI) / 180;
  const cal =
    Math.sin(d_lat / 2) * Math.sin(d_lat / 2) +
    Math.cos((lat_1 * Math.PI) / 180) *
      Math.cos((lat_2 * Math.PI) / 180) *
      Math.sin(d_lon / 2) *
      Math.sin(d_lon / 2);
  return 12722 * Math.atan2(Math.sqrt(cal), Math.sqrt(1 - cal));
}
