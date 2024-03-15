<template>
  <div>
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

// useSeoMeta({
//   titleTemplate: (title) =>
//     title ? `${title} | DynaQR` : "DynaQR | Powering Apps",
//   ogImage: "/og/default.jpg",
// });
</script>
