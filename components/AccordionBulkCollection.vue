<template>
  <!-- Spinner Loading -->
  <div v-if="loading" class="flex justify-center items-center h-full">
    <Icon name="svg-spinners:bars-scale-middle" class="h-6 w-6" />
  </div>

  <div
    :id="`collection-${
      props.collection?.slja.name
        .toLocaleLowerCase()
        .replace(/ /g, '-')
        .split('.')[0]
    }`"
    v-if="!loading"
  >
    <div
      class="min-w-full p-4 text-center flex flex-col justify-center align-middle w-full"
    >
      <h2
        class="mb-8 text-xl tracking-tight font-extrabold text-color-text w-full"
      >
        {{ name }}
      </h2>

      <div
        class="bg-color-primary-generic opacity-50 h-0.5 w-full max-md:self-center"
      ></div>

      <form id="collection-form">
        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div class="col-span-2">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Nome da Música</label
            >
            <input
              type="text"
              name="name"
              id="name"
              v-model="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Nosso Maravilhoso Deus"
              required="true"
            />
          </div>
          <div class="col-span-2">
            <label
              for="description"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Descrição</label
            >
            <textarea
              id="description"
              name="description"
              v-model="description"
              rows="3"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Usado em momentos de doxologia"
            ></textarea>
          </div>
          <div class="w-full col-span-2">
            <label
              for="main-version"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Versão de outra música?</label
            >
            <select
              id="main-version"
              v-model="mainVersion"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option select="true" value="null">
                Sem referência relacionada
              </option>
              <option
                v-for="collection in collectionsListFiltered"
                v-bind:key="collection"
                :value="collection.collectionInfo.msc_id"
              >
                {{ collection.collectionTitle }} |
                {{ collection.collectionInfo.msc_meta.username || "Anônimo" }}
              </option>
            </select>
            <p
              id="helper-text-explanation"
              class="mt-2 text-sm text-gray-500 dark:text-gray-400 max-md:text-xs"
            >
              Marque a referência, caso essa música seja outra versão (cantada,
              playback, etc).
            </p>
          </div>
          <div class="col-span-2">
            <label
              for="category"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Categoria</label
            >
            <select
              id="category"
              v-model="category"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option
                v-for="category in collectionCategories"
                key="category"
                :value="category.mct_id"
              >
                {{ category.mct_name }}
              </option>
            </select>
          </div>
          <div class="col-span-2">
            <label
              for="media-type"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Tipo de Mídia</label
            >
            <select
              id="media-type"
              v-model="mediaType"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option value="CA">Cantado</option>
              <option value="PL">Playback</option>
              <option value="AL">Apenas Letra</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  collection: Object,
  currentCollections: Object,
});

import JSZip, * as JSzip from "jszip";
import { getCurrentUser } from "~/services/accountServices";
import {
  retrieveCollectionsCategory,
  retriveAllCollectionsInfo,
} from "~/services/collectionServices";

const name = ref(props.collection?.slja.name.split(".")[0]);
const description = ref(null);
const category = ref("");
const mediaType = ref("");
const mainVersion = ref(null);

const collectionCategories = ref();
const username = ref();

let collectionsList;
const collectionsListFiltered = ref();

const loading = ref(true);
console.log(loading);
retrieveCollectionsCategory().then((data) => {
  collectionCategories.value = data;
});

getCurrentUser().then((data) => {
  username.value =
    data.data.user != null ? data.data.user.user_metadata.username : null;
});

retriveAllCollectionsInfo().then((data) => {
  collectionsList = data;

  collectionsListFiltered.value = collectionsList.filter(
    (collection: any) => collection.collectionInfo.msc_main_ref == null
  );

  if (props.currentCollections) {
    props.currentCollections.forEach((collection: any) => {
      collectionsListFiltered.value.push(collection);
    });
  }

  loading.value = false;
  console.log(loading.value);
});
</script>

<style lang="scss" scoped></style>
