<template>
  <!-- Show All Collections  -->
  <div
    class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="flex justify-between items-center mb-5 text-gray-500">
      <div class="badges flex">
        <span
          class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800 mr-2"
        >
          <svg
            class="mr-1 w-3 h-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"
            ></path>
          </svg>
          {{ collectionType }}
        </span>

        <span
          class="bg-primary-800 text-primary-100 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-800 dark:text-primary-200"
        >
          <svg
            class="mr-1 w-3 h-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"
            ></path>
          </svg>
          {{
            collectionInfo?.msc_meta?.media == "PL"
              ? "Playback"
              : collectionInfo?.msc_meta?.media == "CA"
              ? "Cantado"
              : "Apenas Letra"
          }}
        </span>
      </div>

      <span class="text-sm">{{
        new Date(collectionUpdatedAt as string).toLocaleDateString()
      }}</span>
    </div>
    <div class="flex">
      <div v-if="collectionImage" class="card-img mr-4">
        <img
          :src="collectionImage"
          :alt="collectionTitle"
          class="w-20 h-20 rounded-md object-cover"
        />
      </div>
      <div class="card-info">
        <h2
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          <div
            class="cursor-pointer"
    
          >
            {{ collectionTitle }}
          </div>
        </h2>
        <p class="mb-5 font-light text-gray-500 dark:text-gray-400">
          {{ collectionDescription }}
        </p>
      </div>
    </div>

    <div class="flex justify-between items-center">
      <!-- Profile Info -->
      <!-- <div class="flex items-center space-x-4">
        <img
          class="w-7 h-7 rounded-full"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
          alt="Jese Leos avatar"
        />
        <span class="font-medium dark:text-white"> Jese Leos </span>
      </div> -->

      <!-- <button
        class="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
        type="button"
        data-modal-target="readCollectionModal"
      >
        Ver Detalhes
        <svg
          class="ml-2 w-4 h-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button> -->

      <div class="flex mt-2 items-center space-x-3 sm:space-x-4">
        <button
          type="button"
          @click="
            downloadFile(
              collectionInfo as object,
              collectionInfo?.msc_category as string
            )
          "
          class="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="mr-1 -ml-1 w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>

          Baixar SLJA
        </button>

        <button
          type="button"
          v-if="collectionImage"
          @click="downloadThumbFile(collectionInfo as object)"
          class="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="mr-1 -ml-1 w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>

          Baixar Capa
        </button>
      </div>
    </div>
  </div>

  <!-- View Collection Modal -->
  <!-- <div
    id="readCollectionModal"
    tabindex="-1"
    aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative p-4 w-full max-w-xl max-h-full"> -->
  <!-- Modal content -->
  <!--
      <div
        class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5"
      > -->
  <!-- Modal header -->
  <!--
        <div class="flex justify-between mb-4 rounded-t sm:mb-5">
          <div class="text-lg text-gray-900 md:text-xl dark:text-white">
            <h3 class="font-semibold">{{ collectionTitle }}</h3>
            <p class="font-thin">
              {{
                collectionInfo?.msc_meta?.media == "PL"
                  ? "Playback"
                  : collectionInfo?.msc_meta?.media == "CA"
                  ? "Cantado"
                  : "Apenas Letra"
              }}
            </p>
            <p class="font-thin text-base">
              {{
                collectionInfo?.msc_album == null
                  ? "Sem álbum relacionado"
                  : "álbum Relacionado"
              }}
            </p>
          </div>
          <div>
            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="readCollectionModal"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewbox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
        </div>
        <dl>
          <dt
            class="mb-2 font-semibold leading-none text-gray-900 dark:text-white"
          >
            Descrição
          </dt>
          <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
            {{ collectionDescription }}
          </dd>
          <dt
            class="mb-2 font-semibold leading-none text-gray-900 dark:text-white"
          >
            Categoria
          </dt>
          <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
            {{ collectionInfo?.msc_category }}
          </dd>
        </dl>
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-3 sm:space-x-4">
            <button
              type="button"
              @click="downloadFile(collectionRef as string)"
              class="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="mr-1 -ml-1 w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>

              Baixar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script setup lang="ts">
const supabase = supabaseClientUtils();
import { useRouter } from "vue-router";

// const collectiosType = {
//   collectionTitle: String,
//   collectionDescription: String,
//   collectionImage: String,
//   collectionUpdatedAt: String,
//   collectionType: String,
//   collectionRef: String,
// }

defineProps({
  collectionTitle: String,
  collectionDescription: String,
  collectionImage: String || Boolean,
  collectionUpdatedAt: String,
  collectionType: String,
  collectionRef: String,
  collectionInfo: Object,
});

const router = useRouter();

const downloadFile = async (fileRef: any, category: string) => {
  const fileNameDownload = `${fileRef.msc_name.toLowerCase().replace(/ /g, "-")}-${
    fileRef?.msc_meta?.media == "PL"
      ? "playback"
      : fileRef?.msc_meta?.media == "CA"
      ? "cantado"
      : "apenas-letra"
  }.slja`;
  const folder = category.toLowerCase().replace(/ /g, "-");

  const downloadLink = supabase.storage
    .from("slja")
    .getPublicUrl(`${folder}/${fileRef.msc_files_ref}.slja`, {
      download: true,
    });
    
  window.open(downloadLink.data.publicUrl + fileNameDownload, "_blank");
};

const downloadThumbFile = async (fileRef: any) => {
  const fileNameDownload = `${fileRef.msc_name.toLowerCase().replace(/ /g, "-")}-${
    fileRef?.msc_meta?.media == "PL"
      ? "playback"
      : fileRef?.msc_meta?.media == "CA"
      ? "cantado"
      : "apenas-letra"
  }-capa.bmp`;

  const downloadLink = supabase.storage
    .from("image")
    .getPublicUrl(`slja-thumb/${fileRef.msc_files_ref}.bmp`, {
      download: true,
    });

  window.open(downloadLink.data.publicUrl + fileNameDownload, "_blank");
};
</script>

<style lang="scss" scoped></style>
