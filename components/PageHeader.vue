<template>
  <div class="lg:mb-16 mb-8 flex flex-col items-center" id="page-header">
    <h1
      class="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-color-text"
    >
      {{ pageTitle }}
    </h1>
    <p class="font-light sm:text-xl text-color-text-muted-75 w-4/6">
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
