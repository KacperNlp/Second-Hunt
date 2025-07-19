<template>
    <div class="w-full max-w-2xl mx-auto">
        <UCard class="py-2 px-4">
            <div class="mb-6">
                <p class="text-sm text-gray-600">Wybierz miasto i województwo</p>
            </div>

            <div class="flex flex-col md:flex-row gap-2">
                <div class="flex-1">
                    <label class="block text-sm font-medium text-gray-700 mb-2 text-left"> Województwo </label>
                    <USelect
                        v-model="selectedProvince"
                        :items="provinces"
                        label-key="name"
                        value-key="id"
                        placeholder="Wybierz województwo"
                        :loading="loadingProvinces"
                        @update:model-value="onProvinceChange"
                        class="w-full text-gray-900"
                    />
                </div>

                <div class="flex-1">
                    <label class="block text-sm font-medium text-gray-700 mb-2 text-left"> Miasto </label>
                    <USelect
                        v-model="selectedCity"
                        :items="cities"
                        label-key="name"
                        value-key="id"
                        placeholder="Wybierz miasto"
                        :loading="loadingCities"
                        :disabled="!selectedProvince"
                        class="w-full text-gray-900"
                    />
                </div>
            </div>

            <div class="flex justify-center gap-3 mt-6">
                <UButton @click="searchByCity" :disabled="!selectedCity" color="secondary" class="cursor-pointer">
                    <UIcon name="material-symbols:search" class="size-4 mr-2" />
                    Szukaj sklepów
                </UButton>

                <UButton @click="getUserLocation" variant="outline" color="secondary" class="cursor-pointer">
                    <UIcon name="material-symbols:my-location" class="size-4" />
                </UButton>
            </div>

            <div v-if="errorMessage" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p class="text-sm text-red-600">{{ errorMessage }}</p>
            </div>
        </UCard>
    </div>
</template>

<script setup lang="ts">
import { createClient } from "@supabase/supabase-js";
import { useGeolocation } from "~/composables/useGeolocation";
import type { City, Province } from "~/types/City";

const config = useRuntimeConfig();
const supabase = createClient(config.public.supabaseUrl, config.public.supabaseAnonKey);

const { coords, getLocation } = useGeolocation();

const selectedProvince = ref<string>("");
const selectedCity = ref<string>("");
const errorMessage = ref("");

const provinces = ref<Province[]>([]);
const cities = ref<City[]>([]);
const loadingProvinces = ref(false);
const loadingCities = ref(false);

async function loadProvinces() {
    loadingProvinces.value = true;
    try {
        const { data, error } = await supabase.from("regions").select("*");
        if (error) throw error;
        provinces.value = data || [];

        console.log(provinces.value);
    } catch (error) {
        errorMessage.value = "Błąd podczas ładowania województw";
        console.error(error);
    } finally {
        loadingProvinces.value = false;
    }
}

async function loadCities() {
    loadingCities.value = true;
    try {
        const { data, error } = await supabase.from("cities").select("*").eq("region", selectedProvince.value);
        if (error) throw error;
        cities.value = data || [];
    } catch (error) {
        errorMessage.value = "Błąd podczas ładowania miast";
        console.error(error);
    } finally {
        loadingCities.value = false;
    }
}

function onProvinceChange() {
    selectedCity.value = "";
}

function searchByCity() {
    if (!selectedCity.value) {
        errorMessage.value = "Wybierz miasto";
        return;
    }

    const city = cities.value.find((c) => c.id === selectedCity.value);
    if (city) {
        navigateTo(`/city/${city.id}`);
    }
}

function getUserLocation() {
    errorMessage.value = "";
    getLocation();
}

watch(coords, (newCoords) => {
    if (newCoords && cities.value.length > 0) {
        let minDistance = Infinity;
        let closestCity: City | null = null;

        cities.value.forEach((city) => {
            const distance = calculateDistance(newCoords.lat, newCoords.lng, city.lat, city.lng);

            if (distance < minDistance) {
                minDistance = distance;
                closestCity = city;
            }
        });

        if (closestCity) {
            navigateTo(`/city/${closestCity.id}`);
        }
    }
});

watch(selectedProvince, () => {
    loadCities();
});

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

onMounted(() => {
    loadProvinces();
});
</script>
