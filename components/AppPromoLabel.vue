<template>
    <div :class="promoStyles"
        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-all duration-200">
        <slot />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    promo: number;
}>()

const promoStyles = computed(() => {
    const promo = props.promo;

    // Base styles that apply to all promo labels
    const baseStyles = 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-all duration-200';

    // Different styles based on discount percentage
    if (promo >= 50) {
        // High discount (50%+) - Very prominent, attention-grabbing
        return 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg transform scale-105 animate-pulse';
    } else if (promo >= 30) {
        // Medium-high discount (30-49%) - Prominent but not overwhelming
        return 'bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-md';
    } else if (promo >= 20) {
        // Medium discount (20-29%) - Noticeable but balanced
        return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 shadow-sm';
    } else if (promo >= 15) {
        // Low-medium discount (15-19%) - Subtle but visible
        return 'bg-gradient-to-r from-green-300 to-green-400 text-gray-700';
    } else if (promo >= 10) {
        // Low discount (10-14%) - Very subtle, user-friendly
        return 'bg-gray-100 text-gray-600 border border-gray-200';
    } else {
        // Very low discount (<10%) - Minimal, unobtrusive
        return 'bg-gray-50 text-gray-500 border border-gray-100 opacity-75';
    }
})
</script>
