<template>
  <tr class="border-b w-full">
    <th
      scope="row"
      class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap"
    >
      {{}}
    </th>
    <td class="px-4 py-3">{{}}</td>
    <td class="px-4 py-3 max-w-[12rem] truncate">{{}}</td>
    <td class="px-4 py-3">{{}}</td>
    <td class="px-4 py-3 flex items-center justify-end">
      <button
        type="button"
        class="flex w-full justify-center items-center py-2 px-2 hover:bg-gray-100 text-gray-700"
      ></button>

      <button
        type="button"
        class="flex w-full justify-center items-center py-2 px-2 hover:bg-gray-100 text-red-500"
      ></button>
    </td>
  </tr>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
