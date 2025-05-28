<template>
  <UContainer>
    <div v-if="error">
      <UAlert
        title="Lokalizacja niedostępna"
        description="Wybierz miasto ręcznie"
      >
        <USelect
          v-model="selectedCity"
          :options="cities"
          placeholder="Wybierz miasto"
        />
      </UAlert>
    </div>
    <AppSelectedCity v-if="selectedCity" :selected-city="selectedCity" />
  </UContainer>
</template>

<script setup lang="ts">
import { useGeolocation } from "~/composables/useGeolocation";
import type { City } from "~/types/City";

const { coords, error, getLocation } = useGeolocation();
const selectedCity = ref<City | null>(null);

interface City {
  name: string;
  lat: number;
  lng: number;
}

const cities: City[] = [
  { name: "Rzeszów", lat: 50.0412, lng: 21.9991 },
  { name: "Warszawa", lat: 52.2297, lng: 21.0122 },
  { name: "Kraków", lat: 50.0647, lng: 19.945 },
  { name: "Wrocław", lat: 51.1079, lng: 17.0385 },
  { name: "Poznań", lat: 52.4064, lng: 16.9252 },
  { name: "Gdańsk", lat: 54.352, lng: 18.6466 },
  { name: "Łódź", lat: 51.7592, lng: 19.4559 },
  { name: "Szczecin", lat: 53.4285, lng: 14.5528 },
  { name: "Lublin", lat: 51.2465, lng: 22.5684 },
  { name: "Białystok", lat: 53.1325, lng: 23.1688 },
];

const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

watch(coords, (newCoords) => {
  if (newCoords) {
    let minDistance = Infinity;
    let closest = "";

    cities.forEach((city) => {
      const distance = calculateDistance(
        newCoords.lat,
        newCoords.lng,
        city.lat,
        city.lng
      );

      if (distance < minDistance) {
        minDistance = distance;
        closest = city;
      }
    });

    selectedCity.value = closest;
  }
});

onMounted(() => {
  getLocation();
});
</script>
