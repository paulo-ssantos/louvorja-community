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

  <!-- Main Content Steps -->
  <section class="bg-color-background-alternative flex flex-col items-center">
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

    <div class="step-container" v-if="steps == 1">
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
            <div class="flex items-center">
              <button
                class="px-4 py-2 text-sm font-semibold text-white bg-primary-500 rounded-lg"
                @click="steps = 2"
              >
                Próximo
              </button>
            </div>
          </div>
          <div class="mt-4">
            <p>
              Confira o mapeamento das músicas e capas do arquivo compactado.
              Clique no botão abaixo para mapear as músicas e capas.
            </p>

            <div class="my-4 flex flex-col w-ful items-center">
              <div class="mapped">
                <h3 class="text-color-text font-semibold w-full text-center text-xl">Coletâneas Mapeadas Automaticamente</h3>
                <div class="flex">
                  <div
                    class="p-4 bg-color-background-alternative rounded-lg border-2 border-color-primary-generic border-opacity-50 hover:border-opacity-100 shadow-md hover:shadow-lg hover:shadow-color-primary-generic transition-all m-2"
                    v-for="collection in collectionsMapped"
                  >
                    <div class="flex">
                      <div class="card-info text-left w-5/6">
                        <h4
                          class="mb-2 font-bold tracking-tight text-color-text"
                        >
                          <div class="cursor-pointer">
                            {{ collection.slja.name }}
                          </div>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="unmapped w-full mt-4">
                <h3 class="text-color-text font-semibold w-full text-center text-xl">Coletâneas Não Mapeadas</h3>
                <div class="grid grid-cols-1 md:grid-cols-2">
                <div
                  class="p-4 bg-color-background-alternative rounded-lg border-2 border-color-primary-generic border-opacity-50 hover:border-opacity-100 shadow-md hover:shadow-lg hover:shadow-color-primary-generic transition-all m-2"
                  v-for="collection in collectionsSljaUnmapped"
                >
                  <div class="flex">
                    <div class="card-info text-left w-5/6">
                      <h4 class="mb-2 font-bold tracking-tight text-color-text">
                        <div class="cursor-pointer">
                          {{ collection.name }}
                        </div>
                      </h4>
                      <!-- add combo box to chose the bmp file correspondente -->

                      <select
                        class="w-full p-2 border border-primary-300 rounded-lg font-semibold text-color-text my-2"
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
                <h3 class="text-color-text font-semibold w-full text-center text-xl">Outros Arquivos</h3>
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
  </section>
</template>

<script setup lang="ts">
import JSZip, * as JSzip from "jszip";

// Steps for Bulk Uploud
// * Uploud compressed file
// * Map collections and covers
// * Has default metadata? Set it
// * Edit metadata for each song

const steps = ref(0);
const collectionStatus = ref("");
const collectionErrorMessage = ref("");

const collectionsMapped: Ref<
  { slja: JSZip.JSZipObject; bmp: JSZip.JSZipObject }[]
> = ref([]);
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

  console.log(collectionsMapped.value);
};
const verifySteps = () => {
  switch (steps.value) {
    case 0:
      const file = document.getElementById(
        "fileCompressed"
      ) as HTMLInputElement;

      // check if files is uploaded before continue
      if (file.files != null && file.files.length === 0) {
        collectionStatus.value = "error";
        collectionErrorMessage.value = "Nenhum arquivo selecionado!";
        return;
      }

      // check if file is a zip file before continue
      if (
        file.files != null &&
        file.files[0].type !== "application/x-zip-compressed"
      ) {
        collectionStatus.value = "error";
        collectionErrorMessage.value = "Arquivo selecionado não é um .zip!";
        return;
      }

      collectionErrorMessage.value = "";
      collectionStatus.value = "";

      console.log();

      steps.value = 1;
      break;
    case 1:
      return "Mapeamento de Músicas e Capas";
    case 2:
      return "Mapeamento de Músicas e Capas";
    case 3:
      return "Mapeamento de Músicas e Capas";
    default:
      return "Envio do Arquivo Compactado";
  }
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
