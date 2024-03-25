<template>
  <div
    class="p-6 bg-color-background-alternative rounded-lg border-2 border-color-primary-generic border-opacity-50 hover:border-opacity-100 shadow-md hover:shadow-lg hover:shadow-color-primary-generic transition-all"
  >
    <div
      class="flex justify-between items-center mb-5 text-color-text-muted-75"
    >
      <div class="badges flex">
        <span
          class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2"
        >
          <Icon name="mdi:album" class="mr-1 w-4 h-4" />
          {{ collectionType }}
        </span>

        <span
          class="bg-primary-800 text-primary-100 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded"
        >
          <Icon
            :name="
              collectionInfo?.msc_meta?.media == 'PL'
                ? 'mdi:microphone-variant-off'
                : collectionInfo?.msc_meta?.media == 'CA'
                  ? 'mdi:microphone-variant'
                  : 'mdi:format-letter-case'
            "
            class="mr-1 w-4 h-4"
          />
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
      <div v-if="collectionImage" class="card-img mr-4 w-1/6">
        <img
          :src="collectionImage"
          :alt="collectionTitle"
          class="rounded-md object-cover"
        />
      </div>
      <div v-else="collectionImage" class="card-img mr-4">
        <div
          class="w-20 h-20 rounded-md"
        >
      <Icon name="mdi:image-off-outline" class="w-20 h-20 text-color-primary-generic-alternative" />
      </div> 
      </div>
      <div class="card-info text-left w-5/6">
        <h2 class="mb-2 text-2xl font-bold tracking-tight text-color-text">
          <div class="cursor-pointer">
            {{ collectionTitle }}
          </div>
        </h2>
        <p class="mb-5 font-light text-color-text-muted-75">
          {{ collectionDescription || "Sem descrição"}}
        </p>
      </div>
    </div>

    <div class="flex justify-between items-center">
      <div class="flex mt-2 items-center space-x-3 sm:space-x-4">
        <button
          type="button"
          @click="
            downloadFile(
              collectionInfo as object,
              collectionInfo?.msc_category as string
            )
          "
          class="text-color-text-inverse inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          <Icon name="mdi:download" class="mr-1 -ml-1 w-5 h-5" />

          Baixar SLJA
        </button>

        <button
          type="button"
          v-if="collectionImage"
          @click="downloadThumbFile(collectionInfo as object)"
          class="text-color-text-inverse inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          <Icon name="mdi:download" class="mr-1 -ml-1 w-5 h-5" />

          Baixar Capa
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const supabase = supabaseClientUtils();
import { useRouter } from "vue-router";

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
  const fileNameDownload = `${fileRef.msc_name
    .toLowerCase()
    .replace(/ /g, "-")}-${
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
  const fileNameDownload = `${fileRef.msc_name
    .toLowerCase()
    .replace(/ /g, "-")}-${
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
