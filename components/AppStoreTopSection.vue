<script setup lang="ts">
defineProps<{
  linkLabel: string;
  backLink: string;
}>();
</script>

<template>
  <section>
    <h1 class="text-2xl font-bold uppercase mt-8 md:mt-16 mb-4">
      <slot name="title" />
    </h1>
    <span class="text-sm inline-block mb-8">
      <NuxtLink
        :to="backLink"
        class="flex items-center gap-2 text-gray-500 hover:text-black duration-300"
      >
        <UIcon name="material-symbols:arrow-back" class="size-5" />
        {{ linkLabel }}
      </NuxtLink>
    </span>
  </section>
</template>
