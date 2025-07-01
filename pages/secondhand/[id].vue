<template>
    <UContainer>
        <div v-if="isLoading" class="flex items-center justify-center h-full w-full">
            Loading...
        </div>
        <div v-else>
            <div v-if="secondHand" class="my-8">
                <LMap style="height: 350px" :zoom="15" :center="[secondHand.lat, secondHand.lng]"
                    :use-global-leaflet="false">
                    <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                        layer-type="base" name="OpenStreetMap" />

                    <LMarker :lat-lng="[secondHand.lat, secondHand.lng]" :icon="selectedSecondHandIcon">
                        <LPopup>
                            <strong>{{ secondHand.name }}</strong><br />
                            {{ secondHand.address }}<br />
                            <span v-if="secondHand.schedule[todayKey]?.delivery">📦 Dostawa dzisiaj</span>
                            <span v-else>Promocja: {{ secondHand.schedule[todayKey]?.promo }}%</span>
                        </LPopup>
                    </LMarker>

                    <LMarker v-for="restSecondHand in restSecondHands"
                        :lat-lng="[restSecondHand.lat, restSecondHand.lng]" :icon="defaultIcon">
                        <LPopup>
                            <strong>{{ restSecondHand.name }}</strong><br />
                            <span class="text-xs">{{ restSecondHand.address }}</span><br />
                            <NuxtLink :to="`/secondhand/${restSecondHand.id}`"
                                class="inline-block mt-2 p-2 bg-secondary rounded-md">
                                Przejdź do sklepu
                            </NuxtLink>
                        </LPopup>
                    </LMarker>
                </LMap>
                <h1 class="text-2xl font-bold uppercase mt-8 mb-4">
                    {{ secondHand?.name }}
                </h1>
                <UButton :to="`https://www.google.com/maps/dir/?api=1&destination=${secondHand.lat},${secondHand.lng}`"
                    target="_blank" variant="soft" color="primary" class="mb-4">Wyznacz trasę</UButton>
                <div class="flex items-center gap-2">
                    <UIcon name="material-symbols:location-on-outline" class="size-5" />
                    <address class="text-xs not-italic">{{ secondHand?.address }}</address>
                </div>
                <div class="flex items-center gap-2">
                    <UIcon name="material-symbols:nest-clock-farsight-analog-outline" class="size-5" />
                    <p class="text-xs">{{ getTodayOpeningHours(secondHand.opening_hours) }}</p>
                </div>
                <div class="my-4">
                    <p class="text-xs">{{ secondHand.notes }}</p>
                </div>
            </div>
            <div v-else>
                <UButton>
                    <UIcon name="material-symbols:loading" class="size-5" />
                </UButton>
            </div>
        </div>
    </UContainer>
</template>

<script setup lang="ts">
import { createClient } from '@supabase/supabase-js'
import L from 'leaflet';
import secondhandSvg from '~/assets/img/secondhand_marker.svg';
import secondhandSvgSelected from '~/assets/img/secondhand_marker_selected.svg';
import type { SecondHand } from '~/types/SecondHand';

const defaultIcon = new L.Icon({
    iconUrl: secondhandSvg,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -28],
    shadowUrl: ''
});

const selectedSecondHandIcon = new L.Icon({
    iconUrl: secondhandSvgSelected,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -28],
    shadowUrl: ''
});

const { todayKey, getTodayOpeningHours } = useDayGetter()

const { id } = useRoute().params;

const config = useRuntimeConfig();
const supabase = createClient(config.public.supabaseUrl, config.public.supabaseAnonKey);

const secondHand = ref<SecondHand | null>(null);
const restSecondHands = ref<SecondHand[]>([]);
const isLoading = ref(true);

async function getSecondHand() {
    try {
        isLoading.value = true;
        const { data, error } = await supabase
            .from('second_hands')
            .select('*');


        if (error) {
            throw error;
        }

        secondHand.value = data.find((secondHand: SecondHand) => Number(secondHand.id) === Number(id));
        restSecondHands.value = data.filter((secondHand: SecondHand) => Number(secondHand.id) !== Number(id));
        isLoading.value = false;
    } catch (error) {
        console.error(error);
        isLoading.value = false;
    }
}

await getSecondHand();
</script>

<style>
.leaflet-popup-content {
    padding: 10px;
}
</style>