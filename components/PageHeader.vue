<template>
  <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
    <h1
      class="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"
    >
      {{ pageTitle }}
    </h1>
    <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">
      {{ pageDescription }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps({
    pageTitle: String,
    pageDescription: String,
});
</script>

<style lang="scss" scoped></style>
