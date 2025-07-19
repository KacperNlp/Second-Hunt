<template>
    <div class="banner-bg">
        <UContainer>
            <section class="relative flex flex-col justify-center items-center gap-8 py-8 min-h-screen md:min-h-[70vh] z-10">
                <section class="text-center">
                    <AppTypeWriter />
                    <p class="mb-6 max-w-2xl">
                        Szukasz perełek z drugiej ręki? Tu znajdziesz sprawdzone ciucholandy z całej Polski. Styl vintage zaczyna się właśnie tutaj
                    </p>
                    <div class="flex flex-col gap-2">
                        <AppLocationForm />
                    </div>
                </section>
            </section>
        </UContainer>
    </div>
    <UContainer>
        <section class="flex flex-col md:flex-row justify-center items-center gap-8 py-24 md:py-32 min-h-max">
            <AppImgTile img="/img/Wallet3.webp" alt="Vintage" url="/register?type=user" buttonText="Stwórz konto">
                <template #title> Dla użytkowników </template>
                <template #description>
                    <p>Chcesz oceniać sklepy, zapisywać ulubione miejsca i sprawdzać promocje? Załóż konto i dołącz do społeczności.</p>
                </template>
            </AppImgTile>
            <AppImgTile img="/img/Storefront2.webp" alt="Vintage" url="/register?type=owner" buttonText="Stwórz konto">
                <template #title> Dla właścicieli </template>
                <template #description>
                    <p>Prowadzisz ciucholand? Zarejestruj swój sklep, edytuj dane, dodawaj promocje i dotrzyj do nowych klientów.</p>
                </template>
            </AppImgTile>
        </section>
    </UContainer>
</template>

<style scoped>
.banner-bg {
    position: relative;
    background-image: url("/img/secondhand_bg.webp");
    background-size: cover;
    background-position: center;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(255, 200, 200, 0.8) 0%, rgba(255, 200, 200, 0.2) 70%);
    }
}
</style>
