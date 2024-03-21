<template>
  <section class="bg-color-background">
    <div class="section-container">
      <PageHeader
        pageTitle=" Gerenciar Coleções"
        pageDescription="Aqui você pode gerenciar suas coleções."
      />



      <div
        v-if="collectionsList.length > 0"
        class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden"
      >
        <div
          class="flex w-full flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4"
        >
          <div class="w-full md:w-1/2">
            <form class="flex items-center">
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
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
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
        <div class="overflow-x-auto">
          <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-4 py-4">Música</th>
                <th scope="col" class="px-4 py-3">Categoria</th>
                <th scope="col" class="px-4 py-3">Descrição</th>
                <th scope="col" class="px-4 py-3">Mídia</th>
                <th scope="col" class="px-4 py-3">
                  <span>Ações</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <ManagerCollection
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
            </tbody>
          </table>
        </div>
      </div>

      <div v-else-if="collectionsList.length <= 0">
        <div
          class="py-8 w-full px-4 mx-auto max-w-screen-md flex flex-col items-center text-center lg:py-16 lg:px-12"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-20 h-20 text-gray-400"
          >
            <path
              fill-rule="evenodd"
              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
              clip-rule="evenodd"
            />
          </svg>

          <h1
            class="mb-4 text-2xl font-bold tracking-tight leading-none text-gray-900 lg:mb-6 dark:text-white"
          >
            Você Ainda Não Tem Contribuições
          </h1>
          <p
            class="font-light text-gray-500 md:text-lg xl:text-xl dark:text-gray-400"
          >
            Adicione algumas músicas para poder visualizar essa página
          </p>
          <NuxtLink to="/collections/uploud">
            <button
              type="button"
              class="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 mt-4"
            >
              Adicionar Nova
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
  <!-- End block -->

</template>

<script setup lang="ts">
useSeoMeta({
  title: `Minhas Contribuições`,
  description: "Gerencie suas contribuições para com a comunidade.",
});

definePageMeta({
  middleware: ["auth"],
});

useSeoMeta({
  title: `Minhas Contribuições`,
  description: "Gerencie suas contribuições para com a comunidade.",
  ogTitle: `Minhas Contribuições`,
  ogDescription: "Gerencie suas contribuições para com a comunidade.",
});

import {
  retriveCollectionInfoFromUser,
} from "~/services/collectionServices";


let collectionsListOrigin: any[] = [];

const collectionsList = ref([] as any[]);

await retriveCollectionInfoFromUser().then((collections) => {
  collectionsListOrigin = collections;
  collectionsList.value = collections;
});


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


</script>

<style lang="scss" scoped></style>
