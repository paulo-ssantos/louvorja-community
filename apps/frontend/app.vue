<script setup lang="ts">
import NavBar from '~/components/NavBar.vue'
import AppFooter from '~/components/AppFooter.vue'
</script>

<template>
  <div class="min-h-screen bg-background text-foreground flex flex-col font-sans">
    <NavBar />
    <main class="flex-1">
      <NuxtPage />
    </main>
    <AppFooter />
  </div>
</template>
