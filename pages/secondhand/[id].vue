<template>
    <UContainer>
        <div v-if="isLoading" class="flex items-center justify-center h-full w-full">Loading...</div>
        <div v-else>
            <div v-if="secondHand" class="my-8">
                <AppStoreTopSection linkLabel="Wróć do listy sklepów" :backLink="`/city/${secondHand.city_id}`">
                    <template #title>
                        {{ secondHand?.name }}
                    </template>
                </AppStoreTopSection>

                <ClientOnly>
                    <LMap
                        v-if="defaultIcon && selectedSecondHandIcon"
                        style="height: 350px"
                        :zoom="15"
                        :center="[secondHand.lat, secondHand.lng]"
                        :use-global-leaflet="false"
                    >
                        <LTileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                            layer-type="base"
                            name="OpenStreetMap"
                        />

                        <LMarker :lat-lng="[secondHand.lat, secondHand.lng]" :icon="selectedSecondHandIcon">
                            <LPopup>
                                <strong>{{ secondHand.name }}</strong
                                ><br />
                                {{ secondHand.address }}<br />
                                <span v-if="todaySchedule?.delivery">📦 Dostawa dzisiaj</span>
                                <span v-else>Promocja: {{ todaySchedule?.promo }}%</span>
                            </LPopup>
                        </LMarker>

                        <LMarker v-for="restSecondHand in restSecondHands" :lat-lng="[restSecondHand.lat, restSecondHand.lng]" :icon="defaultIcon">
                            <LPopup>
                                <strong>{{ restSecondHand.name }}</strong
                                ><br />
                                <span class="text-xs">{{ restSecondHand.address }}</span
                                ><br />
                                <NuxtLink
                                    :to="`/secondhand/${restSecondHand.id}`"
                                    class="inline-block mt-2 p-2 bg-secondary rounded-md text-gray-100"
                                >
                                    Przejdź do sklepu
                                </NuxtLink>
                            </LPopup>
                        </LMarker>
                    </LMap>
                    <template #fallback>
                        <USkeleton class="h-[350px] w-full" />
                    </template>
                </ClientOnly>
                <UButton
                    :to="`https://www.google.com/maps/dir/?api=1&destination=${secondHand.lat},${secondHand.lng}`"
                    target="_blank"
                    variant="solid"
                    color="primary"
                    class="mb-4 text-gray-100"
                    >Wyznacz trasę</UButton
                >
                <div class="flex items-center gap-2">
                    <UIcon name="material-symbols:location-on-outline" class="size-5" />
                    <address class="text-xs not-italic">
                        {{ secondHand?.address }}
                    </address>
                </div>
                <div class="flex items-center gap-2">
                    <UIcon name="material-symbols:nest-clock-farsight-analog-outline" class="size-5" />
                    <p class="text-xs">
                        {{ getTodayOpeningHours(secondHand.opening_hours) }}
                    </p>
                </div>
                <div v-if="secondHand.schedule[todayKey].delivery" class="flex items-center gap-2">
                    <UIcon name="material-symbols:delivery-truck-speed-outline-rounded" class="size-5" />
                    <span class="text-green-600 font-semibold">Dostawa</span>
                </div>
                <span v-if="secondHand.schedule[todayKey] && secondHand.schedule[todayKey].promo" class="absolute top-3 right-2">
                    <AppPromoLabel :promo="secondHand.schedule[todayKey].promo"> - {{ secondHand.schedule[todayKey].promo }}% </AppPromoLabel>
                </span>
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
import { createClient } from "@supabase/supabase-js";
import type { SecondHand } from "~/types/SecondHand";

const { todayKey, getTodayOpeningHours } = useDayGetter();

const { id } = useRoute().params;

const config = useRuntimeConfig();
const supabase = createClient(config.public.supabaseUrl, config.public.supabaseAnonKey);

const secondHand = ref<SecondHand | null>(null);
const restSecondHands = ref<SecondHand[]>([]);
const isLoading = ref(true);

const todaySchedule = computed(() => {
    if (!secondHand.value?.schedule) return null;
    return (secondHand.value.schedule as any)[todayKey];
});

const defaultIcon = ref<any>(null);
const selectedSecondHandIcon = ref<any>(null);

onMounted(() => {
    import("leaflet").then((L) => {
        import("~/assets/img/secondhand_marker.svg").then((secondhandSvg) => {
            import("~/assets/img/secondhand_marker_selected.svg").then((secondhandSvgSelected) => {
                defaultIcon.value = new L.Icon({
                    iconUrl: secondhandSvg.default,
                    iconSize: [32, 32],
                    iconAnchor: [16, 32],
                    popupAnchor: [0, -28],
                    shadowUrl: "",
                });

                selectedSecondHandIcon.value = new L.Icon({
                    iconUrl: secondhandSvgSelected.default,
                    iconSize: [32, 32],
                    iconAnchor: [16, 32],
                    popupAnchor: [0, -28],
                    shadowUrl: "",
                });
            });
        });
    });
});

async function getSecondHand() {
    try {
        isLoading.value = true;
        const { data, error } = await supabase.from("second_hands").select("*");

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
