<template>
  <div>
    <Banner :main-text="mainText" />
    <NuxtLoadingIndicator />

    <NavBar />
    <slot />
    <Footer />
  </div>
</template>

<script setup lang="ts">

useHead({
  htmlAttrs: {
    class: "h-full bg-color-background text-color-text",
    "data-theme-mode": "light",
  },
});

useSeoMeta({
  ogImage: "/images/seo/card.jpg",
  ogImageAlt: "Louvor JA Community",
  ogImageHeight: 630,
  ogImageWidth: 1200,
  titleTemplate: (title) =>
    title ? `${title} | LJA Community` : "Louvor JA Community",
});

const mainText = ref(
  "O aplicativo ainda está em desenvolvimento, podem ocorrer alguns erros."
);
</script>
