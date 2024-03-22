<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="lg:px-6 py-8 px-4 mx-auto max-w-2xl lg:py-16 flex flex-col">
      <PageHeader
        id="page-header"
        pageTitle="Adicionar Nova Música"
        pageDescription="Envie uma nova música para a comunidade."
      />

      <div class="alerts">
        <div
          class="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
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
          <span class="sr-only">Info</span>
          <div>
            <span class="font-medium">Coletânea Enviada Com Sucesso!</span> Já
            disponível para uso.
          </div>
        </div>

        <div
          class="flex items-center p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800"
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
            <span class="font-medium">Erro no Envio!</span>
            {{ collectionErrorMessage }}
          </div>
        </div>
      </div>

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
              :on-change="setTitle()"
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
                {{ collection.collectionInfo.msc_meta.username }}
              </option>
            </select>
            <p
              id="helper-text-explanation"
              class="mt-2 text-sm text-gray-500 dark:text-gray-400"
            >
              Marque a referência, caso essa música seja outra versão (cantada,
              playback, etc).
            </p>
          </div>
          <div>
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
          <div>
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

          <div class="col-span-2">
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              for="file_input"
              >Upload Arquivo SLJA</label
            >
            <input
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="file_input_help"
              id="file_input"
              name="file_input"
              type="file"
              accept=".slja"
              required="true"
            />
            <p
              class="mt-1 text-sm text-gray-500 dark:text-gray-300"
              id="file_input_help"
            >
              Apenas arquivo .slja é aceito.
            </p>
          </div>

          <div class="col-span-2">
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              for="file_input"
              >Upload Capa da Coletânea</label
            >
            <input
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="file_input_help"
              id="file_input_cover"
              name="file_input_cover"
              type="file"
              accept="image/bmp"
            />
            <p
              class="mt-1 text-sm text-gray-500 dark:text-gray-300"
              id="file_input_help"
            >
              Apenas de imagem .bmp é aceito.
            </p>
          </div>
        </div>
        <button
          type="submit"
          class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          @click="addNewCollection"
        >
          Adiconar Música
        </button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">

definePageMeta({
  middleware: ["auth"],
});

import {
  retrieveCollectionsCategory,
  insertNewCollection,
  insertNewCollectionFiles,
  retriveAllCollectionsInfo,
} from "~/services/collectionServices";

import { getCurrentUser } from "~/services/accountServices";

const collectionStatus = ref("draft");
const collectionErrorMessage = ref("");
const collectionCategories = ref(await retrieveCollectionsCategory());

const name = ref("");
const description = ref(null);
const category = ref("");
const mediaType = ref("");
const mainVersion = ref(null);

const imageRef = imageRefGenerate();

const user = await getCurrentUser();
const username =
  user.data.user != null ? user.data.user.user_metadata.username : null;

let collectionsList = await retriveAllCollectionsInfo();

const collectionsListFiltered = collectionsList.filter(
  (collection: any) => collection.collectionInfo.msc_main_ref == null
);

const addNewCollection = async () => {
  collectionStatus.value = "loading";
  collectionErrorMessage.value = "";

  const form = document.getElementById("collection-form") as HTMLFormElement;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  const headerElement = document.getElementById("page-header") as HTMLElement;

  const fileInputElement = document.getElementById(
    "file_input"
  ) as HTMLInputElement;

  const fileInputCoverElement = document.getElementById(
    "file_input_cover"
  ) as HTMLInputElement;

  const collectionIntegrity =
    `${name.value}-${category.value}-${mediaType.value}-${username}`
      .toLowerCase()
      .replace(/ /g, "-");

  if (await checkIntegrity(collectionIntegrity, collectionsList)) {
    collectionStatus.value = "error";
    collectionErrorMessage.value = "Essa música já existe na base de dados.";
    headerElement.scrollIntoView();
    return;
  }

  const collectionInfo = {
    name: name.value,
    description: description.value,
    category: category.value,
    meta: {
      media: mediaType.value,
      username: username,
      integrity: collectionIntegrity,
    },
    main_ref: mainVersion.value == "null" ? null : mainVersion.value,
    files_ref: imageRef,
  };

  const collectionInsert = await insertNewCollection(collectionInfo);

  let collectionFileInsert = null;

  if (collectionInsert.data) {
    if (checkFile(fileInputElement)) {
      let fileInput =
        fileInputElement.files != null ? fileInputElement.files[0] : null;
      if (checkFile(fileInputCoverElement)) {
        let fileInputCover =
          fileInputCoverElement.files != null
            ? fileInputCoverElement.files[0]
            : null;

        collectionFileInsert = await insertNewCollectionFiles(
          collectionInfo,
          fileInput,
          fileInputCover
        );
      } else {
        collectionFileInsert = await insertNewCollectionFiles(
          collectionInfo,
          fileInput
        );
      }
    }
  }

  if (
    (await collectionInsert.data) &&
    (await collectionFileInsert.sljaFileResponse.data)
  ) {
    form.reset();
    collectionStatus.value = "success";
    headerElement.scrollIntoView();
  } else {
    collectionStatus.value = "error";
    collectionErrorMessage.value =
      collectionErrorMessage.value == ""
        ? "Verifique as informações inseridas."
        : collectionErrorMessage.value;
    headerElement.scrollIntoView();
  }
};

const checkFile = (file: HTMLInputElement) => {
  if (file.files != null && file.files.length == 0) {
    return false;
  }

  return true;
};

const checkIntegrity = async (integrity: string, collectionsList: any) => {
  const integrityCheck = collectionsList.filter(
    (collection: any) =>
      collection.collectionInfo.msc_meta.integrity == integrity
  );

  return integrityCheck.length > 0 ? true : false;
};

const setTitle = () => {
  useSeoMeta({
    title: `Enviando ${name.value == "" ? "Nova Música" : name.value}`,
    description: "Edite e atualize música para a comunidade.",
    ogTitle: `Enviando ${name.value == "" ? "Nova Música" : name.value}`,
    ogDescription: "Edite e atualize música para a comunidade.",
  });
};
</script>

<style lang="scss" scoped></style>
~/utils/collectionsUtils
