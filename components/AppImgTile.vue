<template>
    <AppCard>
        <div class="flex flex-row items-center gap-8">
            <img :src="img" :alt="alt" class="w-1/3 h-full object-cover" />
            <div class="flex flex-col justify-center md:justify-start">
                <h2 class="text-md font-bold mb-2">
                    <slot name="title"></slot>
                </h2>
                <p class="text-sm text-gray-500 mb-6">
                    <slot name="description"></slot>
                </p>
                <div>
                    <AppButton :url="url">{{ buttonText }}</AppButton>
                </div>
            </div>
        </div>
    </AppCard>
</template>

<script setup lang="ts">
defineProps<{
    img: string;
    alt: string;
    url: string;
    buttonText: string;
}>();
</script>
