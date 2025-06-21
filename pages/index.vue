<template>
  <UContainer>
    <div class="flex flex-col gap-8 py-8 md:grid md:grid-cols-2 md:gap-16 lg:gap-24 min-h-screen md:items-center">
      <section>
        <AppTypeWriter />
        <p class="mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec enim
          nulla. Donec et sodales nulla, a mollis nisi.
        </p>
        <UButton @click="getUserLocation" color="secondary" size="lg">Moja lokalizacja</UButton>
      </section>
      <section>
        <div v-if="cities" class="flex flex-wrap gap-2 md:justify-end">
          <UButton v-for="city in cities" :key="city.name"
            :variant="selectedCity?.name === city.name ? 'solid' : 'outline'" icon="uil:map-marker" size="lg"
            :to="`/city/${city.id}`" :color="selectedCity?.name === city.name ? 'secondary' : undefined">{{ city.name }}
          </UButton>
        </div>
        <span v-else>Loading...</span>
      </section>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import { createClient } from '@supabase/supabase-js'
import { useGeolocation } from "~/composables/useGeolocation";
import type { City } from "~/types/City";

const config = useRuntimeConfig()
const supabase = createClient(config.public.supabaseUrl, config.public.supabaseAnonKey)

const { coords, error, getLocation } = useGeolocation();
const selectedCity = ref<City | null>(null);
const cities = ref<City[] | null>(null)

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
    let closest: City | null = null;

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

async function getCities() {
  const { data } = await supabase.from('cities').select()
  cities.value = data
}

function getUserLocation() {
  getLocation();
}

await getCities();
</script>
