<template>
  <UContainer>
    <h1 class="text-2xl font-bold uppercase my-8 md:mt-16">
      {{ id }}
    </h1>
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <UCard
        v-for="secondHand in secondHands"
        :key="secondHand.name"
        variant="solid"
      >
        <h3 class="mb-2">{{ secondHand.name }}</h3>
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <UIcon name="material-symbols:location-on-outline" class="size-5" />
            <p class="text-xs">{{ secondHand.address }}</p>
          </div>
          <div class="flex items-center gap-2">
            <UIcon
              name="material-symbols:nest-clock-farsight-analog-outline"
              class="size-5"
            />
            <p>{{ secondHand.openHours }}</p>
          </div>
          <div class="flex items-center gap-2">
            <UIcon
              name="material-symbols:delivery-truck-speed-outline-rounded"
              class="size-5"
            />
            <div class="flex items-center gap-2">
              <span v-for="day in secondHand.deliveryDays" :key="day">
                {{ day }}
              </span>
            </div>
          </div>
        </div>
      </UCard>
    </section>
  </UContainer>
</template>

<script setup lang="ts">
const { id } = useRoute().params;

const secondHands = [
  {
    name: "SecondHand 1",
    address: "ul. Main St 123",
    image: "https://via.placeholder.com/150",
    description: "Opis",
    openHours: "10:00 - 18:00",
    delivery: true,
    deliveryDays: ["Poniedziałek", "Wtorek"],
  },
  {
    name: "SecondHand 2",
    address: "ul. Main St 123",
    image: "https://via.placeholder.com/150",
    description: "Opis",
    openHours: "10:00 - 18:00",
    delivery: true,
    deliveryDays: ["Poniedziałek", "Wtorek"],
  },
];
</script>
