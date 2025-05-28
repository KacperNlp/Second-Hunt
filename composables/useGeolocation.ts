export const useGeolocation = () => {
  const coords = ref<{ lat: number; lng: number } | null>(null);
  const error = ref<string | null>(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      error.value = "Geolocation not supported";
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        coords.value = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      },
      (err) => {
        error.value = err.message;
      }
    );
  };

  return { coords, error, getLocation };
};
