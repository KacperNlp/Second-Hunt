<template>
    <NuxtLink :to="url"
        class="block max-w-max py-2 px-4 bg-secondary hover:bg-[#b38646] text-gray-50 rounded-md duration-300">
        <slot />
    </NuxtLink>
</template>
<script setup lang="ts">
defineProps<{
    url: string;
}>();
</script>