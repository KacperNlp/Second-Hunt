<template>
    <div class="flex flex-col min-h-screen">
        <AppHeader />
        <div class="flex-grow">
            <slot />
        </div>
        <AppFooter />
    </div>
</template>
