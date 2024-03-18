<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <PageHeader
        pageTitle="Coletâneas"
        pageDescription="Aqui você encontra todas as coleções, enviadas pela comunidade, disponíveis para download."
      />

      <!-- Init Fiter -->

      <div
        class="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 mb-4 py-4 border-t dark:border-gray-700"
      >
        <div class="w-full flex">
          <form id="filter-form" class="flex items-center md:w-1/2">
            <label for="simple-search" class="sr-only">Search</label>
            <div class="relative w-full">
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewbox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                v-model="seachCollection"
                @change="searchCollections"
                placeholder="Procurar Coletâneas"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              />
            </div>
          </form>

          <button
            type="button"
            class="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 ml-2"
            @click="refreshCollections"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-4 h-4 mr-1.5 -ml-1"
            >
              <path
                fill-rule="evenodd"
                d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z"
                clip-rule="evenodd"
              />
            </svg>

            Recarregar
          </button>
        </div>
        <div
          class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
        >
          <NuxtLink to="/collections/uploud">
            <button
              type="button"
              class="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              <svg
                class="h-3.5 w-3.5 mr-1.5 -ml-1"
                fill="currentColor"
                viewbox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                />
              </svg>
              Adicionar Nova
            </button>
          </NuxtLink>
        </div>
      </div>

      <!-- End Filter -->

      <div class="grid gap-8 lg:grid-cols-2">
        <CardCollection
          v-for="collection in collectionsList"
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
    </div>
  </section>
</template>

<script setup lang="ts">
import { retriveAllCollectionsInfo } from "~/services/collectionServices";

let collectionsListOrigin = await retriveAllCollectionsInfo();

const collectionsList = ref(collectionsListOrigin);
const seachCollection = ref("");

const searchCollections = () => {
  collectionsList.value = collectionsListOrigin.filter((collection) => {
    return collection.collectionTitle
      .toLowerCase()
      .includes(seachCollection.value.toLowerCase());
  });

  if (seachCollection.value === "") {
    collectionsList.value = collectionsListOrigin;
  }
};

watch(seachCollection, searchCollections);

const refreshCollections = async () => {
  collectionsListOrigin = await retriveAllCollectionsInfo();
  collectionsList.value = collectionsListOrigin;

  seachCollection.value = "";
};
</script>

<style scoped></style>
