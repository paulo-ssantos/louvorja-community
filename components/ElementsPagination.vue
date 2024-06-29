<!-- Paginação para elementos

Propriedades:
        :total-items="collectionsList.value.length"
        :items-per-page="10"
        v-model="pageNumber"
        @update="paginateCollections"

-->

<template>
  <p>{{ currentPage }}</p>
  <div class="flex items-center bg-color-background my-8">
    <div class="w-full max-w-screen-xl mx-auto">
      <!-- Start coding here -->
      <div
        class="relative overflow-hidden bg-color-background rounded-b-lg shadow-md"
      >
        <nav
          class="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
          aria-label="Table navigation"
        >
          <span class="text-sm font-normal text-color-text-muted-75 mr-2"
            >Mostrando
            <span class="font-semibold text-color-text-muted-90"
              >{{ itemPageInit }} - {{ itemPageEnd }}</span
            >
            de
            <span class="font-semibold text-color-text-muted-90">{{
              itemsQuantity
            }}</span></span
          >
          <ul class="inline-flex items-stretch -space-x-px">
            <li>
              <a
                @click="currentPage > 1 ? currentPage-- : currentPage = 1"
                href="#"
                class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-color-text-muted-75 bg-color-background rounded-l-lg border border-color-border hover:bg-gray-100 hover:text-gray-700"
              >
                <span class="sr-only">Previous</span>
                <Icon name="heroicons-solid:chevron-left" class="w-5 h-5" />
              </a>
            </li>
            <!-- Init Pagination -->

            <li v-if="paginationInition > pagesQuantity - currentPage">
              <a
                @click="currentPage = 1"
                href="#"
                class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-color-text-muted-75 bg-color-background border border-color-border hover:bg-gray-100 hover:text-gray-700"
                >{{ 1 }}</a
              >
            </li>

            <li v-if="paginationInition > pagesQuantity - currentPage">
              <a
                @click="currentPage = paginationInition - 1"
                href="#"
                class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-color-text-muted-75 bg-color-background border border-color-border hover:bg-gray-100 hover:text-gray-700 font-bold"
                >...</a
              >
            </li>

            <!-- Pagination -->
            <li v-for="index in pagesQuantity">
              <a
                v-if="index >= paginationInition && index <= paginationEnd"
                @click="currentPage = index"
                href="#"
                class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-color-text-muted-75 bg-color-background border border-color-border hover:bg-gray-100 hover:text-gray-700"
                >{{ index }}</a
              >
            </li>

            <!-- Final Pagination -->
            <li v-if="pagesQuantity > paginationRange + 1">
              <a
                @click="currentPage = paginationEnd + 1"
                href="#"
                class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-color-text-muted-75 bg-color-background border border-color-border hover:bg-gray-100 hover:text-gray-700 font-bold"
                >...</a
              >
            </li>
            <li v-if="pagesQuantity >= paginationRange + 1">
              <a
                @click="currentPage = pagesQuantity"
                href="#"
                class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-color-text-muted-75 bg-color-background border border-color-border hover:bg-gray-100 hover:text-gray-700"
                >{{ pagesQuantity }}</a
              >
            </li>
            <li>
              <a
                @click="currentPage < pagesQuantity ? currentPage++ : currentPage = pagesQuantity"
                href="#"
                class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-color-text-muted-75 bg-color-background rounded-r-lg border border-color-border hover:bg-gray-100 hover:text-gray-700"
              >
                <span class="sr-only">Next</span>
                <Icon name="heroicons-solid:chevron-right" class="w-5 h-5" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  totalItems: Number,
  itemsPerPage: Number,
});

const emit = defineEmits(["update"]);

const itemsQuantity = ref(props.totalItems || 1);
const itemsPerPage = ref(props.itemsPerPage || 1);

const paginationRange = ref(3); // Number of pages to show in the pagination (Don't count the last page)
const paginationInition = ref(1);
const paginationEnd = ref(paginationRange);

const pagesQuantity = computed(() =>
  Math.ceil(itemsQuantity.value / itemsPerPage.value)
);

const currentPage = ref(1);
const itemPageInit = ref(currentPage.value * itemsPerPage.value - itemsPerPage.value + 1);
const itemPageEnd = ref((currentPage.value == pagesQuantity.value) ? itemsQuantity.value : currentPage.value * itemsPerPage.value);


// wath when the current page change, to modify page range
watch(currentPage, (value) => {
  if (value > paginationEnd.value) {
    paginationInition.value = value - 1;
    paginationEnd.value = value + paginationRange.value;
  } else if (value < paginationInition.value) {
    paginationInition.value = value - paginationRange.value;
    paginationEnd.value = value + 1;
  }

  emit("update", {
    currentPage: currentPage.value,
    itemsPerPage: itemsPerPage.value,
  });

  itemPageInit.value = currentPage.value * itemsPerPage.value - itemsPerPage.value + 1;
  itemPageEnd.value = (currentPage.value == pagesQuantity.value) ? itemsQuantity.value : currentPage.value * itemsPerPage.value;
});

</script>

<style scoped></style>
