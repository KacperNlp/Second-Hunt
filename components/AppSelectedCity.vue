<template>
  <div>
    <p>Najbliższe miasto: {{ selectedCity.name }}</p>
  </div>
</template>

<script setup lang="ts">
import type { City } from "~/types/City";

const props = defineProps<{
  selectedCity: City;
}>();
</script>
