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
      <ElementsPagination
        :total-items="collectionsList.length"
        :items-per-page="10"
        @update="paginateCollections"
      />

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
  loading.value = false;

  paginateCollections({
    currentPage: 1,
    itemsPerPage: 10,
  });
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

const paginateCollections = (emitEvent: any) => {
  const currentPage = emitEvent.currentPage;
  const itemsPerPage = emitEvent.itemsPerPage;

  const itemPageInit = (currentPage - 1) * itemsPerPage;
  const itemPageEnd = itemPageInit + itemsPerPage;

  collectionsListPage.value = collectionsList.value.slice(
    itemPageInit,
    itemPageEnd
  );
};
</script>

<style scoped></style>
