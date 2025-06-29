<template>
    <UContainer>
        <div v-if="isLoading" class="flex items-center justify-center h-full w-full">
            <AppLoader />
        </div>
        <div v-else>
            <div v-if="secondHand">
                <h1 class="text-2xl font-bold uppercase mt-8 md:mt-16 mb-4">
                    {{ secondHand?.name }}
                </h1>
                <div class="flex items-center gap-2">
                    <UIcon name="material-symbols:location-on-outline" class="size-5" />
                    <address class="text-xs">{{ secondHand?.address }}</address>
                </div>
                <div class="flex items-center gap-2">
                    <UIcon name="material-symbols:access-time-outline" class="size-5" />
                    <p class="text-xs">{{ getTodayOpeningHours(secondHand.opening_hours) }}</p>
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
import type { SecondHand } from '~/types/SecondHand';

const { todayKey, getTodayOpeningHours } = useDayGetter()

const { id } = useRoute().params;

const config = useRuntimeConfig();
const supabase = createClient(config.public.supabaseUrl, config.public.supabaseAnonKey);

const secondHand = ref<SecondHand | null>(null);
const isLoading = ref(true);

async function getSecondHand() {
    try {
        isLoading.value = true;
        const { data, error } = await supabase
            .from('second_hands')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            throw error;
        }

        secondHand.value = data;
        isLoading.value = false;
    } catch (error) {
        console.error(error);
        isLoading.value = false;
    }
}

await getSecondHand();
</script>