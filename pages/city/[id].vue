<template>
  <UContainer>
    <h1>{{ id }}</h1>
  </UContainer>
</template>

<script setup lang="ts">
const { id } = useRoute().params;
</script>
