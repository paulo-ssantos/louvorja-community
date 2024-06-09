<template>
  <div
    class="max-w-sm bg-color-background-alternative border border-color-primary-generic-inverse-alternative shadow-md hover:shadow-lg hover:shadow-color-primary-generic transition-all rounded-lg"
  >
    <a :href="link" target="_blank">
      <img
        class="rounded-t-lg object-cover w-full h-32"
        :src="imagePath"
        :alt="imageAlt"
      />
    </a>
    <div class="p-5">
      <a :href="link" target="_blank">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-color-text">
          {{ title }}
        </h5>
      </a>
      <p class="mb-3 font-normal text-color-text-muted-75">
        {{ description }}
      </p>
      <a
        :href="link"
        target="_blank"
        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
      >
        Ver Mais
        <Icon name="mdi:link" class="ml-1 w-4 h-4" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
  description: String,
  image: String,
  imageAlt: String,
  link: String,
});

const basePath = "/images/tools";
const defaultImagePath = "/images/tools/default.jpg";
const imagePath = props.image
  ? `${basePath}/${props.image}.jpg`
  : defaultImagePath;
</script>

<style scoped></style>
