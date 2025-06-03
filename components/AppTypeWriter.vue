<template>
  <h1 class="mb-4 md:mb-8">
    <span>{{ displayedText }}</span
    ><span class="cursor">|</span>
  </h1>
</template>

<script setup>
import { ref, onMounted } from "vue";

const texts = [
  "Szukasz perełek vintage?",
  "Promocje w second handach",
  "Znajdź modę z drugiej ręki",
  "SecondHunt to Twój przewodnik",
  "Moda ekologiczna i tania",
  "Rzeczy z historią czekają",
  "Poluj na okazje lokalnie!",
];

const displayedText = ref("");
const currentIndex = ref(0);
const isDeleting = ref(false);

const typingSpeed = 60;
const deletingSpeed = 35;
const pauseAfterTyping = 1200;
const pauseAfterDeleting = 400;

function typeLoop() {
  const currentText = texts[currentIndex.value];
  const fullLength = currentText.length;

  if (!isDeleting.value) {
    displayedText.value = currentText.substring(
      0,
      displayedText.value.length + 1
    );

    if (displayedText.value.length === fullLength) {
      setTimeout(() => {
        isDeleting.value = true;
        typeLoop();
      }, pauseAfterTyping);
    } else {
      setTimeout(typeLoop, typingSpeed);
    }
  } else {
    displayedText.value = currentText.substring(
      0,
      displayedText.value.length - 1
    );

    if (displayedText.value.length === 0) {
      isDeleting.value = false;
      currentIndex.value = (currentIndex.value + 1) % texts.length;
      setTimeout(typeLoop, pauseAfterDeleting);
    } else {
      setTimeout(typeLoop, deletingSpeed);
    }
  }
}

onMounted(() => {
  typeLoop();
});
</script>

<style scoped>
/* .typewriter {
  font-size: 1.5rem;
  font-family: "Courier New", monospace;
  white-space: nowrap;
  overflow: hidden;
} */

.cursor {
  display: inline-block;
  margin-left: 2px;
  animation: blink 0.7s steps(2, start) infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
</style>
