<template>
  <UContainer>
    <section class="flex flex-col justify-center items-center gap-8 py-8 min-h-screen">
      <section class="text-center">
        <AppTypeWriter />
        <p class="mb-6 max-w-2xl">
          Szukasz perełek z drugiej ręki? Tu znajdziesz sprawdzone ciucholandy z całej Polski. Styl vintage zaczyna się
          właśnie tutaj
        </p>
        <div class="flex flex-col gap-2">
          <AppLocationForm />
        </div>
      </section>
    </section>
  </UContainer>
  <div class="bg-secondary">
    <UContainer>
      <section class="flex flex-col md:flex-row justify-center items-center gap-8 py-24 md:py-32 min-h-max">
        <AppImgTile img="/img/Wallet3.jpg" alt="Vintage" url="/register?type=user" buttonText="Stwórz konto">
          <template #title>
            <h2>Dla użytkowników</h2>
          </template>
          <template #description>
            <p>Chcesz oceniać sklepy, zapisywać ulubione miejsca i sprawdzać promocje? Załóż konto i dołącz do
              społeczności.</p>
          </template>
        </AppImgTile>
        <AppImgTile img="/img/Storefront2.jpg" alt="Vintage" url="/register?type=owner" buttonText="Stwórz konto">
          <template #title>
            <h2>Dla właścicieli</h2>
          </template>
          <template #description>
            <p>Prowadzisz ciucholand? Zarejestruj swój sklep, edytuj dane, dodawaj promocje i dotrzyj do nowych
              klientów.</p>
          </template>
        </AppImgTile>
      </section>
    </UContainer>
  </div>
</template>

<script setup lang="ts">

</script>
