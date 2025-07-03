<template>
    <NuxtLink :to="url" class="block max-w-max py-2 px-4 bg-secondary text-gray-50 rounded-md">
        <slot />
    </NuxtLink>
</template>
<script setup lang="ts">
defineProps<{
    url: string;
}>();
</script>