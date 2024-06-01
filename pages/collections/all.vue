<template>
  <section class="bg-color-background">
    <div class="section-container">
      <PageHeader
        pageTitle="Coletâneas"
        pageDescription="Aqui você encontra todas as coleções, enviadas pela comunidade, disponíveis para download."
      />

      <Alerts
        :collectionStatus="alertStatus"
        :collectionMainMessage="alertMainMessage || undefined"
        :collectionAdditionalMessage="alertAdditionalMessage || undefined"
      />

      <!-- Loading Overlay -->

      <LoadOverlay :control="loading" />

      <!-- Header Cards - Filter -->
      <div
        class="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 mb-4 py-4 border-t w-full"
      >
        <div class="w-full flex">
          <form id="filter-form" class="flex items-center md:w-1/2">
            <label for="simple-search" class="sr-only">Search</label>
            <div class="relative w-full">
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
              >
                <Icon name="mdi:magnify" class="mr-1 w-4 h-4" />
              </div>
              <input
                type="text"
                id="simple-search"
                v-model="seachCollection"
                @change="searchCollections"
                placeholder="Procurar Coletâneas"
                class="bg-gray-50 border border-gray-300 text-color-text text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2"
              />
            </div>
          </form>

          <button
            type="button"
            class="flex items-center justify-center text-color-text-inverse bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 ml-2"
            @click="refreshCollections"
          >
            <Icon name="mdi:reload" class="mr-1 w-4 h-4" />

            Recarregar
          </button>

          <button
            type="button"
            v-if="seachCollection"
            class="flex items-center justify-center text-color-text-inverse bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 ml-2"
            @click="copySharedLink(seachCollection)"
          >
            <Icon name="mdi:clipboard-search-outline" class="mr-1 w-4 h-4" />
          </button>
        </div>
        <div
          class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
        >
          <NuxtLink to="/collections/uploud">
            <button
              type="button"
              class="flex items-center justify-center text-color-text-inverse bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              <Icon name="mdi:plus" class="mr-1 w-4 h-4" />
              Adicionar Nova
            </button>
          </NuxtLink>
        </div>
      </div>

      <!-- Collections Cards -->
      <div class="grid gap-8 lg:grid-cols-2">
        <CardCollection
          v-for="collection in collectionsListPage"
          :key="collection"
          :collection-title="collection.collectionTitle"
          :collection-description="collection.collectionDescription"
          :collection-image="collection.collectionImage"
          :collection-updated-at="collection.collectionUpdatedAt"
          :collection-type="collection.collectionType"
          :collection-ref="collection.collectionRef"
          :collection-info="collection.collectionInfo"
        />
      </div>

      <!-- Footer Cards - Pagination -->
      <!-- <Pagination
        :total-items="collectionsList.value.length"
        :items-per-page="10"
        v-model="pageNumber"
        @update="paginateCollections"
      /> -->

      <div class="flex items-center h-screen bg-gray-50 dark:bg-gray-900">
        <div class="w-full max-w-screen-xl px-4 mx-auto lg:px-12">
          <!-- Start coding here -->
          <div
            class="relative overflow-hidden bg-white rounded-b-lg shadow-md dark:bg-gray-800"
          >
            <nav
              class="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
              aria-label="Table navigation"
            >
              <span class="text-sm font-normal text-gray-500 dark:text-gray-400"
                >Showing
                <span class="font-semibold text-gray-900 dark:text-white"
                  >1-10</span
                >
                of
                <span class="font-semibold text-gray-900 dark:text-white"
                  >1000</span
                ></span
              >
              <ul class="inline-flex items-stretch -space-x-px">
                <li>
                  <a
                    href="#"
                    class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span class="sr-only">Previous</span>
                    <svg
                      class="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >1</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >2</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    aria-current="page"
                    class="z-10 flex items-center justify-center px-3 py-2 text-sm leading-tight border text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    >3</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >...</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >100</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span class="sr-only">Next</span>
                    <svg
                      class="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      
    </div>
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: `Coletâneas`,
  description:
    "Encontre todas as coleções, enviadas pela comunidade do Louvor JA, disponíveis para download.",
});

import { retriveAllCollectionsInfo } from "~/services/collectionServices";

let collectionsListOrigin = await retriveAllCollectionsInfo();

const route = useRoute();

const loading = ref(true);

const collectionsList = ref(collectionsListOrigin);
const collectionsListPage = ref();
const seachCollection = ref((route.query.search as string) || "");

// Pagination
const pageNumber = ref(1);

const searchCollections = () => {
  collectionsList.value = collectionsListOrigin.filter((collection) => {
    let titleFilter = collection.collectionTitle
      .toLowerCase()
      .includes(seachCollection.value.toLowerCase());

    // collection.collectionDescription could be null
    let descriptionFilter = collection.collectionDescription
      ? collection.collectionDescription
          .toLowerCase()
          .includes(seachCollection.value.toLowerCase())
      : false;

    return titleFilter || descriptionFilter;
  });

  if (seachCollection.value === "") {
    collectionsList.value = collectionsListOrigin;
  }
};

if (seachCollection.value) {
  searchCollections();
}

onMounted(() => {
  paginateCollections();

  loading.value = false;
});

watch(seachCollection, searchCollections);

const alertStatus = ref("");
const alertMainMessage = ref("");
const alertAdditionalMessage = ref("");

const copySharedLink = (seachCollection: string) => {
  const url = encodeURI(
    `${window.location.origin}/collections?search=${seachCollection}`
  );
  navigator.clipboard.writeText(url);

  alertStatus.value = "success";
  alertMainMessage.value = "Link copiado!";
  alertAdditionalMessage.value =
    "O link foi copiado para a área de transferência.";

  setTimeout(() => {
    alertStatus.value = "";
    alertMainMessage.value = "";
    alertAdditionalMessage.value = "";
  }, 3000);
};

const refreshCollections = async () => {
  collectionsListOrigin = await retriveAllCollectionsInfo();
  collectionsList.value = collectionsListOrigin;

  seachCollection.value = "";
};

const paginateCollections = () => {
  const itemsPerPage = 10;
  const offset = (pageNumber.value - 1) * itemsPerPage;

  collectionsListPage.value = collectionsList.value.slice(
    offset,
    offset + itemsPerPage
  );
};
</script>

<style scoped></style>
