<template>
    <div class="w-full max-w-2xl mx-auto">
        <UCard class="py-2 px-4">
            <div class="mb-6">
                <p class="text-sm text-gray-600">Wybierz miasto i województwo lub wprowadź kod pocztowy</p>
            </div>

            <!-- Toggle between methods -->
            <div class="flex mb-6 bg-gray-100 rounded-lg p-1">
                <button @click="searchMethod = 'city'" :class="[
                    'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors cursor-pointer',
                    searchMethod === 'city'
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                ]">
                    <UIcon name="material-symbols:location-city" class="size-4 mr-2" />
                    Miasto
                </button>
                <button @click="searchMethod = 'zip'" :class="[
                    'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors cursor-pointer',
                    searchMethod === 'zip'
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                ]">
                    <UIcon name="material-symbols:mail" class="size-4 mr-2" />
                    Kod pocztowy
                </button>
            </div>

            <!-- City/Province Selection -->
            <div v-show="searchMethod === 'city'" class="flex flex-row gap-2">
                <div class="flex-1">
                    <label class="block text-sm font-medium text-gray-700 mb-2 text-left">
                        Województwo
                    </label>
                    <USelect v-model="selectedProvince" :items="provinces" option-attribute="name" value-attribute="id"
                        placeholder="Wybierz województwo" :loading="loadingProvinces"
                        @update:model-value="onProvinceChange" class="w-full" />
                </div>

                <div class="flex-1">
                    <label class="block text-sm font-medium text-gray-700 mb-2 text-left">
                        Miasto
                    </label>
                    <USelect v-model="selectedCity" :options="filteredCities" option-attribute="name"
                        value-attribute="id" placeholder="Wybierz miasto" :loading="loadingCities"
                        :disabled="!selectedProvince" class="w-full" />
                </div>
            </div>

            <!-- Zip Code Input -->
            <div v-show="searchMethod === 'zip'" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Kod pocztowy
                    </label>
                    <UInput v-model="zipCode" placeholder="np. 00-001" :maxlength="6" @input="formatZipCode"
                        @keyup.enter="searchByZipCode" />
                    <p class="text-xs text-gray-500 mt-1">
                        Format: XX-XXX (np. 00-001)
                    </p>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-3 mt-6">
                <UButton v-if="searchMethod === 'city'" @click="searchByCity" :disabled="!selectedCity"
                    color="secondary" class="flex-1">
                    <UIcon name="material-symbols:search" class="size-4 mr-2" />
                    Szukaj sklepów
                </UButton>

                <UButton v-else @click="searchByZipCode" :disabled="!isValidZipCode" color="secondary" class="flex-1">
                    <UIcon name="material-symbols:search" class="size-4 mr-2" />
                    Szukaj sklepów
                </UButton>

                <UButton @click="getUserLocation" variant="outline" color="secondary">
                    <UIcon name="material-symbols:my-location" class="size-4" />
                </UButton>
            </div>

            <!-- Error Messages -->
            <div v-if="errorMessage" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p class="text-sm text-red-600">{{ errorMessage }}</p>
            </div>
        </UCard>
    </div>
</template>

<script setup lang="ts">
import { createClient } from '@supabase/supabase-js'
import { useGeolocation } from "~/composables/useGeolocation"
import type { City, Province } from "~/types/City"

const config = useRuntimeConfig()
const supabase = createClient(config.public.supabaseUrl, config.public.supabaseAnonKey)

const { coords, error, getLocation } = useGeolocation()

// Form state
const searchMethod = ref<'city' | 'zip'>('city')
const selectedProvince = ref<string>('')
const selectedCity = ref<string>('')
const zipCode = ref('')
const errorMessage = ref('')

// Data
const provinces = ref<Province[]>([])
const cities = ref<City[]>([])
const loadingProvinces = ref(false)
const loadingCities = ref(false)

// Polish provinces data
const polishProvinces: Province[] = [
    { value: 'dolnośląskie', label: 'Dolnośląskie', code: 'DS' },
    { value: 'kujawsko-pomorskie', label: 'Kujawsko-Pomorskie', code: 'KP' },
    { value: 'lubelskie', label: 'Lubelskie', code: 'LB' },
    { value: 'lubuskie', label: 'Lubuskie', code: 'LS' },
    { value: 'łódzkie', label: 'Łódzkie', code: 'LD' },
    { value: 'małopolskie', label: 'Małopolskie', code: 'MP' },
    { value: 'mazowieckie', label: 'Mazowieckie', code: 'MZ' },
    { value: 'opolskie', label: 'Opolskie', code: 'OP' },
    { value: 'podkarpackie', label: 'Podkarpackie', code: 'PK' },
    { value: 'podlaskie', label: 'Podlaskie', code: 'PL' },
    { value: 'pomorskie', label: 'Pomorskie', code: 'PM' },
    { value: 'śląskie', label: 'Śląskie', code: 'SL' },
    { value: 'świętokrzyskie', label: 'Świętokrzyskie', code: 'SK' },
    { value: 'warmińsko-mazurskie', label: 'Warmińsko-Mazurskie', code: 'WM' },
    { value: 'wielkopolskie', label: 'Wielkopolskie', code: 'WP' },
    { value: 'zachodniopomorskie', label: 'Zachodniopomorskie', code: 'ZP' }
]

// Computed
const filteredCities = computed(() => {
    if (!selectedProvince.value) return []
    return cities.value.filter(city =>
        city.name.toLowerCase().includes(selectedProvince.value.toLowerCase())
    )
})

const isValidZipCode = computed(() => {
    const zipRegex = /^\d{2}-\d{3}$/
    return zipRegex.test(zipCode.value)
})

// Methods
function formatZipCode() {
    // Remove all non-digits
    let cleaned = zipCode.value.replace(/\D/g, '')

    // Limit to 5 digits
    if (cleaned.length > 5) {
        cleaned = cleaned.slice(0, 5)
    }

    // Add dash after 2 digits
    if (cleaned.length > 2) {
        zipCode.value = cleaned.slice(0, 2) + '-' + cleaned.slice(2)
    } else {
        zipCode.value = cleaned
    }
}

async function loadProvinces() {
    loadingProvinces.value = true
    try {
        // For now, use static data. In the future, this could come from an API
        provinces.value = polishProvinces
    } catch (error) {
        errorMessage.value = 'Błąd podczas ładowania województw'
        console.error(error)
    } finally {
        loadingProvinces.value = false
    }
}

async function loadCities() {
    loadingCities.value = true
    try {
        const { data, error } = await supabase.from('cities').select('*')
        if (error) throw error
        cities.value = data || []
    } catch (error) {
        errorMessage.value = 'Błąd podczas ładowania miast'
        console.error(error)
    } finally {
        loadingCities.value = false
    }
}

function onProvinceChange() {
    selectedCity.value = ''
}

function searchByCity() {
    if (!selectedCity.value) {
        errorMessage.value = 'Wybierz miasto'
        return
    }

    const city = cities.value.find(c => c.id === selectedCity.value)
    if (city) {
        navigateTo(`/city/${city.id}`)
    }
}

function searchByZipCode() {
    if (!isValidZipCode.value) {
        errorMessage.value = 'Wprowadź poprawny kod pocztowy'
        return
    }

    // For now, just show a message. In the future, you could:
    // 1. Use a geocoding API to find the city for the zip code
    // 2. Search for shops in that area
    errorMessage.value = 'Funkcja wyszukiwania po kodzie pocztowym będzie dostępna wkrótce!'
}

function getUserLocation() {
    errorMessage.value = ''
    getLocation()
}

// Watch for geolocation changes
watch(coords, (newCoords) => {
    if (newCoords && cities.value.length > 0) {
        // Find the closest city based on coordinates
        let minDistance = Infinity
        let closestCity: City | null = null

        cities.value.forEach((city) => {
            const distance = calculateDistance(
                newCoords.lat,
                newCoords.lng,
                city.lat,
                city.lng
            )

            if (distance < minDistance) {
                minDistance = distance
                closestCity = city
            }
        })

        if (closestCity) {
            navigateTo(`/city/${closestCity.id}`)
        }
    }
})

// Calculate distance between two points
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
}

// Initialize
onMounted(() => {
    loadProvinces()
    loadCities()
})
</script>