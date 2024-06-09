<template>
  <div class="alerts">
    <!-- Success Alert-->
    <div
      class="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50"
      role="alert"
      v-if="collectionStatus == 'success'"
    >
      <svg
        class="flex-shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
        />
      </svg>
      <div>
        <span class="font-medium">{{
          collectionMainMessage || "Sucesso!"
        }}</span>
        {{ collectionAdditionalMessage || "Ação realizada sem erros!" }}
      </div>
    </div>

    <!-- Error Alert-->
    <div
      class="flex items-center p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50"
      role="alert"
      v-if="collectionStatus == 'error'"
    >
      <svg
        class="flex-shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
        />
      </svg>
      <span class="sr-only">Info</span>
      <div>
        <span class="font-medium">{{ collectionMainMessage || "Erro!" }}</span>
        {{ collectionAdditionalMessage || "Ação não realizada!" }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  collectionStatus: String || null,
  collectionMainMessage: String || null,
  collectionAdditionalMessage: String || null,
});
</script>

<style lang="scss" scoped></style>
