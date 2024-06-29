<template>
  <section class="bg-color-background">
    <div class="lg:px-6 py-8 px-4 mx-auto max-w-2xl lg:py-16 flex flex-col">
      <PageHeader
        id="page-header"
        pageTitle="Atualizar Música"
        pageDescription="Edite e atualize música para a comunidade."
      />

      <div class="alerts">
        <div
          class="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50"
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
            <span class="font-medium">Coletânea Atualizada Com Sucesso!</span>
            Já disponível para uso.
          </div>
        </div>

        <div
          class="flex items-center p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50"
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
              class="block mb-2 text-sm font-medium text-gray-900"
              >Nome da Música</label
            >
            <input
              type="text"
              name="name"
              id="name"
              :on-change="setTitle()"
              v-model="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Nosso Maravilhoso Deus"
              required="true"
            />
          </div>
          <div class="col-span-2">
            <label
              for="description"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Descrição</label
            >
            <textarea
              id="description"
              name="description"
              v-model="description"
              rows="3"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Usado em momentos de doxologia"
            ></textarea>
          </div>
          <div class="w-full col-span-2">
            <label
              for="main-version"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Versão de outra música?</label
            >
            <select
              id="main-version"
              v-model="mainVersion"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
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
            <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500">
              Marque a referência, caso essa música seja outra versão (cantada,
              playback, etc).
            </p>
          </div>
          <div>
            <label
              for="category"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Categoria</label
            >
            <select
              id="category"
              v-model="category"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
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
              class="block mb-2 text-sm font-medium text-gray-900"
              >Tipo de Mídia</label
            >
            <select
              id="media-type"
              v-model="mediaType"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
            >
              <option value="CA">Cantado</option>
              <option value="PL">Playback</option>
              <option value="AL">Apenas Letra</option>
            </select>
          </div>

          <div
            id="accordion-collapse"
            class="col-span-2 mb-4"
            data-accordion="collapse"
          >
            <h2 id="accordion-collapse-heading">
              <button
                type="button"
                class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 hover:bg-gray-100 gap-3 rounded-lg"
                data-accordion-target="#accordion-collapse-body"
                aria-expanded="false"
                aria-controls="accordion-collapse-body"
              >
                <span>Atualizar os Arquivos?</span>
                <svg
                  data-accordion-icon
                  class="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id="accordion-collapse-body"
              class="hidden"
              aria-labelledby="accordion-collapse-heading"
            >
              <div class="col-span-2 mt-6">
                <label
                  class="block mb-2 text-sm font-medium text-gray-900"
                  for="file_input"
                  >Upload Arquivo SLJA</label
                >
                <input
                  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  aria-describedby="file_input_help"
                  id="file_input"
                  name="file_input"
                  type="file"
                  accept=".slja"
                />
                <p class="mt-1 text-sm text-gray-500" id="file_input_help">
                  Apenas arquivo .slja é aceito.
                </p>
              </div>

              <div class="col-span-2 mt-6">
                <label
                  class="block mb-2 text-sm font-medium text-gray-900"
                  for="file_input"
                  >Upload Capa da Coletânea</label
                >
                <input
                  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  aria-describedby="file_input_help"
                  id="file_input_cover"
                  name="file_input_cover"
                  type="file"
                  accept="image/bmp"
                />
                <p class="mt-1 text-sm text-gray-500" id="file_input_help">
                  Apenas de imagem .bmp é aceito.
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
          @click="updateNewCollection"
        >
          Atualizar Música
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
  retriveAllCollectionsInfo,
  retriveCollectionInfoByRef,
  updateCollectionInfo,
  updateCollectionSljaFile,
  updateCollectionThumbFile,
} from "~/services/collectionServices";

import { getCurrentUser } from "~/services/accountServices";

const route = useRoute();

const collectionRef = route.query.ref as string;
const collectionInfo = await retriveCollectionInfoByRef(collectionRef);
const collectionCategories = ref(await retrieveCollectionsCategory());

const collectionStatus = ref("draft");
const collectionErrorMessage = ref("");

const name = ref(collectionInfo.msc_name);
const description = ref(collectionInfo.msc_description);
const category = ref(collectionInfo.msc_category);
const mediaType = ref(collectionInfo.msc_meta.media);
const mainVersion = ref(collectionInfo.msc_main_ref);

const imageRef = collectionInfo.msc_files_ref;

const user = await getCurrentUser();
const username =
  user.data.user != null ? user.data.user.user_metadata.username : null;

let collectionsList = await retriveAllCollectionsInfo();

const collectionsListFiltered = collectionsList.filter(
  (collection: any) => collection.collectionInfo.msc_main_ref == null
);

const updateNewCollection = async () => {
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

  const collectionInfo = {
    name: name.value,
    description: description.value,
    category: category.value,
    meta: {
      media: mediaType.value,
      username: username,
      integrity: collectionIntegrity,
    },
    main_ref: mainVersion.value,
    files_ref: imageRef,
  };

  const collectionUpdate = await updateCollectionInfo(collectionInfo);

  if (collectionUpdate.data) {
    if (checkFile(fileInputElement)) {
      await updateCollectionSljaFile(
        collectionInfo,
        fileInputElement.files != null ? fileInputElement.files[0] : null
      );
    }

    if (checkFile(fileInputCoverElement)) {
      await updateCollectionThumbFile(
        collectionInfo,
        fileInputCoverElement.files != null
          ? fileInputCoverElement.files[0]
          : null
      );
    }
  }

  if (await collectionUpdate.data) {
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

const setTitle = () => {
  useSeoMeta({
    title: `Editando ${name.value == "" ? "Música" : name.value}`,
    description: "Edite e atualize música para a comunidade.",
    ogTitle: `Editando ${name.value == "" ? "Música" : name.value}`,
    ogDescription: "Edite e atualize música para a comunidade.",
  });
};
</script>

<style lang="scss" scoped></style>
~/utils/collectionsUtils
