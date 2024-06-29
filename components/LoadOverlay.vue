<template>
  <div
    v-if="control"
    class="opacity-50 top-0 left-0 flex justify-center items-center w-full h-full fixed bg-primary-500 bg-opacity-50 text-white text-2xl font-semibold z-50"
  >
    <Icon name="svg-spinners:blocks-shuffle-3" size="3em" class="opacity-100" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  control: Boolean,
});
</script>

<style lang="scss" scoped></style>
