<template>
  <UContainer>
    <div v-if="isLoading">
      <USkeleton class="h-16 w-full mb-8 mt-8 md:mt-16" />
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <USkeleton class="h-[200px] w-full " v-for="i in 6" :key="i" />
      </section>
    </div>
    <div v-else>
      <h1 class="text-2xl font-bold uppercase mt-8 md:mt-16 mb-4">
        {{ selectedCity?.name }}
      </h1>
      <span class="text-sm inline-block mb-8">
        <NuxtLink to="/" class="flex items-center gap-2 text-gray-500 hover:text-black duration-300">
          <UIcon name="material-symbols:arrow-back" class="size-5" />
          Wróć do strony głównej
        </NuxtLink>
      </span>
      <section v-if="secondHands.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <NuxtLink class="relative" v-for="secondHand in sortedSecondHands" :key="secondHand.name"
          :to="`/secondhand/${secondHand.id}`">
          <UCard variant="solid" class="h-full border-2 border-white hover:border-[#D4A259]  duration-300">
            <h3 class="mb-2">{{ secondHand.name }}</h3>
            <div class="flex flex-col gap-2">
              <div class="flex items-center gap-2">
                <UIcon name="material-symbols:location-on-outline" class="size-5" />
                <p class="text-xs">{{ secondHand.address }}</p>
              </div>
              <div class="flex items-center gap-2">
                <UIcon name="material-symbols:nest-clock-farsight-analog-outline" class="size-5" />
                <p>{{ getTodayOpeningHours(secondHand.opening_hours) }}</p>
              </div>
              <div v-if="secondHand.schedule[todayKey].delivery" class="flex items-center gap-2">
                <UIcon name="material-symbols:delivery-truck-speed-outline-rounded" class="size-5" />
                <span class="text-green-600 font-semibold">Dostawa</span>
              </div>
              <span v-if="secondHand.schedule[todayKey].promo" class="absolute top-3 right-2">
                <AppPromoLabel :promo="secondHand.schedule[todayKey].promo">
                  - {{ secondHand.schedule[todayKey].promo }}%
                </AppPromoLabel>
              </span>
            </div>
          </UCard>
        </NuxtLink>
      </section>
      <section v-else>
        <p class="text-center text-gray-500 my-8">Brak sklepów w tym mieście</p>
      </section>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import { createClient } from '@supabase/supabase-js'
import type { City } from '~/types/City'
import type { SecondHand } from '~/types/SecondHand'

const config = useRuntimeConfig()
const supabase = createClient(config.public.supabaseUrl, config.public.supabaseAnonKey)
const { id } = useRoute().params;

const { todayKey, getTodayOpeningHours } = useDayGetter()

const secondHands = ref<SecondHand[]>([]);
const selectedCity = ref<City | null>(null);
const isLoading = ref(true);

const sortedSecondHands = computed(() => {
  return [...secondHands.value].sort((a, b) => {
    const aToday = a.schedule[todayKey] || {};
    const bToday = b.schedule[todayKey] || {};

    // 1️⃣ Najpierw te z dostawą
    if (aToday.delivery && !bToday.delivery) return -1;
    if (!aToday.delivery && bToday.delivery) return 1;

    // 2️⃣ Potem sortujemy po promo malejąco
    const promoA = aToday.promo || 0;
    const promoB = bToday.promo || 0;
    return promoB - promoA;
  })
})

async function getSecondHands() {
  try {
    isLoading.value = true;
    const [secondsHandsResponse, selectedCityResponse] = await Promise.all([
      supabase.from('second_hands').select('*').eq('city_id', id),
      supabase.from('cities').select('*').eq('id', id)
    ])

    console.log(secondsHandsResponse.data, selectedCityResponse.data)
    secondHands.value = secondsHandsResponse.data || []
    selectedCity.value = selectedCityResponse.data?.[0] || null
    isLoading.value = false;
  } catch (error) {
    console.error(error)
    isLoading.value = false;
  }
}

await getSecondHands()
</script>
