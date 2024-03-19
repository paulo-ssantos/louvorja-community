<template>
  <tr class="border-b dark:border-gray-700 w-full">
    <th
      scope="row"
      class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    >
      {{}}
    </th>
    <td class="px-4 py-3">{{}}</td>
    <td class="px-4 py-3 max-w-[12rem] truncate">
      {{}}
    </td>
    <td class="px-4 py-3">
      {{}}
    </td>
    <td class="px-4 py-3 flex items-center justify-end">
      <button
        type="button"
        class="flex w-full justify-center items-center py-2 px-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200"
      ></button>

      <button
        type="button"
        data-modal-target="deleteModal"
        data-modal-toggle="deleteModal"
        class="flex w-full justify-center items-center py-2 px-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-500 dark:hover:text-red-400"
      ></button>
    </td>
  </tr>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
