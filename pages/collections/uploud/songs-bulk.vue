<template>
  <!-- Header -->
  <section class="bg-color-background">
    <div class="section-container">
      <PageHeader
        pageTitle="Envio de Música em Lote"
        pageDescription="Envie músicas em lote para a comunidade. Siga as instruções abaixo para enviar suas músicas corretamente."
      />
    </div>
  </section>

  <!-- Loading Overlay -->
  <LoadOverlay :control="loading" />

  <!-- Main Content Steps -->
  <section
    class="bg-color-background-alternative flex flex-col items-center py-16"
  >
    <!-- Alerts -->
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
          <span class="font-medium">Erro no Processo!</span>
          {{ collectionErrorMessage }}
        </div>
      </div>
    </div>

    <!-- Initial Step - Step 0 -->
    <div class="step-container bg-color-background" v-if="steps == 0">
      <div class="flex flex-col items-center justify-center">
        <div
          class="flex flex-col items-center justify-center w-full max-w-3xl p-4"
        >
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center">
              <div
                class="flex items-center justify-center w-8 h-8 bg-primary-500 text-white rounded-full"
              >
                <span class="text-sm">1</span>
              </div>
              <h3 class="ml-2 text-2xl font-semibold">
                Envio do Arquivo Compactado
              </h3>
            </div>
          </div>
          <div class="mt-4">
            <p>
              Para enviar músicas em lote, você deve compactar todas as músicas
              em um único arquivo .zip. Clique no botão abaixo para selecionar o
              arquivo compactado.
              <br />
            </p>

            <p class="mt-4">
              <strong>Importante:</strong>
            </p>

            <ul class="text-left px-6 md:px-16 list-disc">
              <li>
                Compacte todas as as coletâneas <strong>(.SLJA)</strong> e capas
                <strong>(.BMP)</strong> em um único arquivo .zip
              </li>
              <li>
                O nome da coletânea deve ser o mesmo da capa. <br />
                Ex.: maranata.slja e maranata.bmp
              </li>
              <li>Demais informações serão preenchidas posteriormente.</li>
            </ul>

            <div class="mt-4">
              <input
                type="file"
                id="fileCompressed"
                accept=".zip"
                @change="handleFileUpload"
                class="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div class="flex items-center justify-around">
              <button
                class="px-4 py-2 text-sm font-semibold text-white bg-primary-500 rounded-lg"
                @click="verifySteps"
              >
                Próximo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Map Collections | Step 1 -->
    <div class="step-container bg-color-background" v-if="steps == 1">
      <div class="flex flex-col items-center justify-center">
        <div
          class="flex flex-col items-center justify-center w-full max-w-2xl p-4"
        >
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center">
              <div
                class="flex items-center justify-center w-8 h-8 bg-primary-500 text-white rounded-full"
              >
                <span class="text-sm">2</span>
              </div>
              <h3 class="ml-2 text-2xl font-semibold">
                Mapeamento de Músicas e Capas
              </h3>
            </div>
          </div>
          <div class="mt-4">
            <p>
              Confira o mapeamento das músicas e capas do arquivo compactado. E
              marque as capas correspondentes a cada coletânea, ou selecione a
              opção "Sem Capa" para coletâneas sem capa.
            </p>

            <p>
              "Outros arquivos" encontrados no arquivo compactado serão
              descartados.
            </p>

            <div class="my-4 flex flex-col w-ful items-center">
              <div class="mapped" v-if="collectionsMapped.length > 0">
                <h3
                  class="text-color-text font-semibold w-full text-center text-xl"
                >
                  Coletâneas Mapeadas Automaticamente
                </h3>
                <div class="grid md:grid-cols-2">
                  <div
                    :id="`mapped-${
                      collection.slja.name
                        .toLocaleLowerCase()
                        .replace(/ /g, '-')
                        .split('.')[0]
                    }`"
                    class="p-4 bg-color-background-alternative rounded-lg border-2 border-color-primary-generic border-opacity-50 hover:border-opacity-100 shadow-md hover:shadow-lg hover:shadow-color-primary-generic transition-all m-2"
                    v-for="collection in collectionsMapped"
                  >
                    <div class="flex flex-col">
                      <div class="card-info text-left w-5/6">
                        <h4
                          class="mb-2 font-bold tracking-tight text-color-text"
                        >
                          <div class="cursor-pointer">
                            {{ collection.slja.name }}
                          </div>
                        </h4>
                      </div>
                      <button
                        @click="handleSplitCollection"
                        to="/collections"
                        class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
                      >
                        Dividir
                        <Icon
                          name="mdi:call-split"
                          size="1.25em"
                          class="ml-2"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="unmapped w-full mt-4"
                v-if="collectionsSljaUnmapped.length > 0"
              >
                <h3
                  class="text-color-text font-semibold w-full text-center text-xl"
                >
                  Coletâneas Não Mapeadas
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2">
                  <div
                    :id="`unmapped-${
                      collection.name
                        .toLocaleLowerCase()
                        .replace(/ /g, '-')
                        .split('.')[0]
                    }`"
                    class="p-4 bg-color-background-alternative rounded-lg border-2 border-color-primary-generic border-opacity-50 hover:border-opacity-100 shadow-md hover:shadow-lg hover:shadow-color-primary-generic transition-all m-2"
                    v-for="collection in collectionsSljaUnmapped"
                  >
                    <div class="flex">
                      <div class="card-info text-left w-5/6">
                        <h4
                          class="mb-2 font-bold tracking-tight text-color-text"
                        >
                          <div class="cursor-pointer">
                            {{ collection.name }}
                          </div>
                        </h4>
                        <!-- add combo box to chose the bmp file correspondente -->

                        <select
                          class="w-full p-2 border border-primary-300 rounded-lg font-semibold text-color-text my-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          @change="handleSelectChange"
                        >
                          <option value="" selected disabled>
                            Selecione a Capa
                          </option>
                          <option
                            v-for="bmp in collectionsBmpUnmapped"
                            :value="bmp.name"
                            class="font-semibold text-color-text"
                          >
                            {{ bmp.name }}
                          </option>
                        </select>

                        <div class="flex items-center">
                          <input
                            type="checkbox"
                            id="withoutBmp"
                            name="withoutBmp"
                            value="withoutBmp"
                            @change="handleCheckboxChange"
                          />
                          <label
                            class="text-color-text font-semibold ml-2"
                            for="withoutBmp"
                            >Sem Capa</label
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="others mt-4">
                <h3
                  class="text-color-text font-semibold w-full text-center text-xl"
                >
                  Outros Arquivos
                </h3>
                <div
                  class="p-4 bg-color-background-alternative rounded-lg border-2 border-color-primary-generic border-opacity-50 hover:border-opacity-100 shadow-md hover:shadow-lg hover:shadow-color-primary-generic transition-all m-2"
                  v-for="collection in otherUnmappedFiles"
                >
                  <div class="flex">
                    <div class="card-info text-left w-5/6">
                      <h4 class="mb-2 font-bold tracking-tight text-color-text">
                        <div class="cursor-pointer">
                          {{ collection.name }}
                        </div>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-around mt-4">
              <button
                class="px-4 py-2 text-sm font-semibold text-white bg-primary-500 rounded-lg"
                @click="steps--"
              >
                Anterior
              </button>

              <button
                class="px-4 py-2 text-sm font-semibold text-white bg-primary-500 rounded-lg"
                @click="verifySteps"
              >
                Próximo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Set Additional Info | Step 2 -->
    <div class="step-container bg-color-background" v-if="steps == 2">
      <div class="flex flex-col items-center justify-center">
        <div
          class="flex flex-col items-center justify-center w-full max-w-3xl p-4"
        >
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center">
              <div
                class="flex items-center justify-center w-8 h-8 bg-primary-500 text-white rounded-full"
              >
                <span class="text-sm">3</span>
              </div>
              <h3 class="ml-2 text-2xl font-semibold">
                Adicionar Informações Adicionais
              </h3>
            </div>
          </div>
          <div class="mt-4">
            <p>
              Para finalizar o envio, adicione informações adicionais sobre as
              coletâneas.
              <br />
            </p>

            <p class="mt-4">
              <strong>Para cada uma, adicione:</strong>
            </p>

            <ul class="text-left px-6 md:px-16 list-disc">
              <li>Nome</li>
              <li>Descrição (Opcional)</li>
              <li>Categoria</li>
              <li>Música Referência (Opcional)</li>
              <li>Tipo da Mídia</li>
            </ul>

            <div class="grid grid-cols-1 md:grid-cols-2">
              <div
                :id="`collection-info-${index}`"
                class="p-4 bg-color-background-alternative rounded-lg border-2 border-color-primary-generic border-opacity-50 hover:border-opacity-100 shadow-md hover:shadow-lg hover:shadow-color-primary-generic transition-all m-2"
                v-for="(collection, index) in collectionsMapped"
                :key="index"
              >
                <div class="flex">
                  <div class="card-info text-left w-full">
                    <h4 class="mb-4 font-bold tracking-tight text-color-text">
                      <div class="cursor-pointer">
                        {{ collection.slja.name || "Nome da Música" }}
                      </div>
                    </h4>
                    <!-- add combo box to chose the bmp file correspondente -->

                    <div class="col-span-2">
                      <label
                        for="name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Nome da Música</label
                      >
                      <input
                        type="text"
                        :name="`collection-name-${index}`"
                        :id="`collection-name-${index}`"
                        v-model="collection.slja.name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Nosso Maravilhoso Deus"
                        required="true"
                      />
                    </div>

                    <div class="col-span-2 mt-2">
                      <label
                        for="description"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Descrição da Música</label
                      >
                      <input
                        type="text"
                        :name="`collection-description-${index}`"
                        :id="`collection-description-${index}`"
                        :v-model="`collection-description-${index}`"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Nosso Maravilhoso Deus"
                        required="true"
                      />
                    </div>

                    <div class="col-span-2 mt-2">
                      <label
                        :for="`collection-category-${index}`"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Categoria da Música</label
                      >
                      <select
                        :id="`collection-category-${index}`"
                        :name="`collection-category-${index}`"
                        :v-model="`collection-category-${index}`"
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

                    <div class="col-span-2 mt-2">
                      <label
                        :for="`collection-main-version-${index}`"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Música Referência</label
                      >
                      <select
                        :id="`collection-main-version-${index}`"
                        :name="`collection-main-version-${index}`"
                        :v-model="`collection-main-version-${index}`"
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
                        Marque a referência, caso essa música seja outra versão
                        (cantada, playback, etc).
                      </p>
                    </div>

                    <div>
                      <label
                        :for="`media-type-${index}`"
                        class="block mt-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Tipo de Mídia</label
                      >
                      <select
                        :id="`media-type-${index}`"
                        :v-model="`media-type-${index}`"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      >
                        <option value="CA" :selected="true">Cantado</option>
                        <option value="PL">Playback</option>
                        <option value="AL">Apenas Letra</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-around mt-8">
              <button
                class="px-4 py-2 text-sm font-semibold text-white bg-primary-500 rounded-lg"
                @click="steps--"
              >
                Anterior
              </button>

              <button
                class="px-4 py-2 text-sm font-semibold text-white bg-primary-500 rounded-lg"
                @click="addCollectionBulk"
              >
                Enviar Coletâneas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import JSZip, * as JSzip from "jszip";
import {
  retriveAllCollectionsInfo,
  retrieveMainCollections,
  retrieveCollectionsCategory,
} from "~/services/collectionServices";

// Steps for Bulk Uploud
// * Uploud compressed file
// * Map collections and covers
// * Has default metadata? Set it
// * Edit metadata for each song

const steps = ref(0);
const collectionStatus = ref("");
const collectionErrorMessage = ref("");

const collectionCategories = ref([]);
const collectionsListFiltered = ref([]);

const loading = ref(false);

onMounted(() => {
  console.log("mounted");
  retriveAllCollectionsInfo().then((collectionsList) => {
    console.log(collectionsList);
  });
});

const collectionsMapped: Ref<
  { slja: JSZip.JSZipObject; bmp: JSZip.JSZipObject | null }[]
> = ref([]);
const collectionsNameMapped: Ref<string[]> = ref([]);
const collectionsBmpUnmapped: Ref<JSZip.JSZipObject[]> = ref([]);
const collectionsSljaUnmapped: Ref<JSZip.JSZipObject[]> = ref([]);
const otherUnmappedFiles: Ref<JSZip.JSZipObject[]> = ref([]);

const handleFileUpload = (event: any) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = async (event: any) => {
    const buffer = event.target.result;
    const zipFile = await JSzip.loadAsync(buffer);
    mapCollections(zipFile);
  };
  reader.readAsArrayBuffer(file);
};

const handleCheckboxChange = (event: any) => {
  // get parent id
  const parentId =
    event.target.parentElement.parentElement.parentElement.parentElement.id;
  const parentName =
    event.target.parentElement.parentElement.parentElement.querySelector("h4")
      ?.textContent;

  //toggle select
  const select = document
    .getElementById(parentId)
    ?.querySelector("select") as HTMLSelectElement;
  select.disabled = event.target.checked;
  select.value = "";

  // add to mapped
  collectionsMapped.value.push({
    slja: collectionsSljaUnmapped.value.find(
      (file) => file.name === parentName
    ) as JSZip.JSZipObject,
    bmp: null,
  });

  // remove from unmapped
  collectionsSljaUnmapped.value = collectionsSljaUnmapped.value.filter(
    (file) => file.name !== parentName
  );

  //reset all checks
  const checks = document.querySelectorAll(
    "input[type=checkbox]"
  ) as NodeListOf<HTMLInputElement>;
  checks.forEach((check) => {
    check.checked = false;
  });

  //reset all selects
  const selects = document.querySelectorAll("select");
  selects.forEach((select) => {
    select.value = "";
    select.disabled = false;
  });
};

const handleSelectChange = (event: any) => {
  // get parent id
  const parentId = event.target.parentElement.parentElement.parentElement.id;
  const parentName =
    event.target.parentElement.parentElement.querySelector("h4")?.textContent;

  // get select value
  const selectValue = document.getElementById(parentId)?.querySelector("select")
    ?.value;

  // add to mapped
  collectionsMapped.value.push({
    slja: collectionsSljaUnmapped.value.find(
      (file) => file.name === parentName
    ) as JSZip.JSZipObject,
    bmp: collectionsBmpUnmapped.value.find(
      (file) => file.name === selectValue
    ) as JSZip.JSZipObject,
  });

  // remove from unmapped
  collectionsSljaUnmapped.value = collectionsSljaUnmapped.value.filter(
    (file) => file.name !== parentName
  );
  collectionsBmpUnmapped.value = collectionsBmpUnmapped.value.filter(
    (file) => file.name !== selectValue
  );

  //reset all selects
  const selects = document.querySelectorAll("select");
  selects.forEach((select) => {
    select.value = "";
  });
};

const handleSplitCollection = (event: any) => {
  // get parent id
  const parentName =
    event.target.parentElement.parentElement.querySelector("h4")?.textContent;

  // get mapped collection
  const mappedCollection = collectionsMapped.value.find(
    (collection) => collection.slja.name === parentName
  );

  // remove from mapped
  collectionsMapped.value = collectionsMapped.value.filter(
    (collection) => collection.slja.name !== parentName
  );

  // add to unmapped
  collectionsSljaUnmapped.value.push(
    mappedCollection?.slja as JSZip.JSZipObject
  );

  mappedCollection?.bmp != null
    ? collectionsBmpUnmapped.value.push(
        mappedCollection?.bmp as JSZip.JSZipObject
      )
    : null;
};

const mapCollections = (zipObject: JSZip): void => {
  let sljaFiles: JSZip.JSZipObject[] = [];
  let bmpFiles: JSZip.JSZipObject[] = [];
  let otherFiles: JSZip.JSZipObject[] = [];

  zipObject.forEach((relativePath, file) => {
    if (file.name.endsWith(".slja")) {
      sljaFiles.push(file);
    } else if (file.name.endsWith(".bmp")) {
      bmpFiles.push(file);
    } else {
      otherFiles.push(file);
    }
  });

  // Map match SLJA file name with BMP files name
  const collectionsMappedValue: any[] = [];
  sljaFiles.forEach((sljaFile) => {
    const baseName = sljaFile.name.replace(/\.slja$/, "");
    const matchingBmpFile = bmpFiles.find((bmpFile) =>
      bmpFile.name.startsWith(baseName)
    );
    if (matchingBmpFile) {
      collectionsMappedValue.push({ slja: sljaFile, bmp: matchingBmpFile });
      bmpFiles = bmpFiles.filter((file) => file !== matchingBmpFile);
      sljaFiles = sljaFiles.filter((file) => file !== sljaFile);
    }
  });

  collectionsMapped.value = collectionsMappedValue;
  collectionsBmpUnmapped.value = bmpFiles;
  collectionsSljaUnmapped.value = sljaFiles;
  otherUnmappedFiles.value = otherFiles;
};

const confirmProceed = ref(false);

const verifySteps = () => {
  const headerElement = document.getElementById("page-header") as HTMLElement;

  switch (steps.value) {
    case 0:
      const file = document.getElementById(
        "fileCompressed"
      ) as HTMLInputElement;

      // check if files is uploaded before continue
      if (file.files != null && file.files.length === 0) {
        collectionStatus.value = "error";
        collectionErrorMessage.value = "Nenhum arquivo selecionado!";
        headerElement.scrollIntoView();
        return;
      }

      // check if file is a zip file before continue
      if (
        file.files != null &&
        file.files[0].type !== "application/x-zip-compressed"
      ) {
        collectionStatus.value = "error";
        collectionErrorMessage.value = "Arquivo selecionado não é um .zip!";
        headerElement.scrollIntoView();
        return;
      }

      steps.value = 1;
      break;
    case 1:
      if (collectionsSljaUnmapped.value.length > 0) {
        collectionStatus.value = "error";
        collectionErrorMessage.value = "Mapeie todas as coletâneas!";
        headerElement.scrollIntoView();
        return;
      }

      if (collectionsBmpUnmapped.value.length > 0 && !confirmProceed.value) {
        collectionStatus.value = "error";
        collectionErrorMessage.value =
          "Existem capas não mapeadas! Caso deseje proseguir mesmo assim, clique em Próximo novamente.";
        headerElement.scrollIntoView();
        confirmProceed.value = true;
        return;
      }

      collectionErrorMessage.value = "";
      collectionStatus.value = "";

      collectionsNameMapped.value = collectionsMapped.value.map(
        (collection) => collection.slja.name.split(".")[0]
      );

      steps.value = 2;
      confirmProceed.value = false;

      setCollectionInfoDropdown();
      break;
    case 2:
      return "Mapeamento de Músicas e Capas";
    case 3:
      return "Mapeamento de Músicas e Capas";
    default:
      return "Envio do Arquivo Compactado";
  }
};

const setCollectionInfoDropdown = async () => {
  loading.value = true;
  collectionCategories.value = await retrieveCollectionsCategory();
  collectionsListFiltered.value = await retrieveMainCollections();

  loading.value = false;
};

const addCollectionBulk = () => {
  const collections = collectionsMapped.value.map((collection) => {
    return {
      slja: collection.slja,
      bmp: collection.bmp,
      name: "",
      description: "",
      category: "",
      mainVersion: "",
    };
  });

  console.log(collections);
};
</script>

<style scoped>
.step-container {
  @apply p-4;
  @apply w-4/5;
  @apply rounded-lg;
  @apply border-2;
  @apply border-color-primary-generic;
  @apply border-opacity-50;
  @apply shadow-md;
  @apply hover:shadow-lg;
  @apply hover:shadow-color-primary-generic;
  @apply transition-all;
}
</style>
