<template>
    <div class="app-card">
        <slot />
    </div>
</template>

<style scoped>
.app-card {
    background: #ffffff;
    border-radius: 1rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    padding: 2.5rem;
    width: 100%;
}
</style>
