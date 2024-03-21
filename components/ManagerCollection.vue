<template>
  <tr :id="$props.collectionRef" class="border-b dark:border-gray-700">
    <th
      scope="row"
      class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    >
      {{ collectionTitle }}
    </th>
    <td class="px-4 py-3">{{ categoryCollection }}</td>
    <td class="px-4 py-3 max-w-[12rem] truncate">
      {{ collectionDescription }}
    </td>
    <td class="px-4 py-3">
      {{
        collectionInfo?.msc_meta?.media == "PL"
          ? "Playback"
          : collectionInfo?.msc_meta?.media == "CA"
          ? "Cantado"
          : "Apenas Letra"
      }}
    </td>
    <td class="px-4 py-3 flex items-center justify-end">
      <button
        type="button"
        @click="editCollection"
        class="flex w-full justify-center items-center py-2 px-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200"
      >
        <svg
          class="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewbox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
          />
        </svg>
      </button>

      <button
        type="button"
        :data-modal-target="`deleteModal-${collectionRef}`"
        :data-modal-toggle="`deleteModal-${collectionRef}`"
        class="flex w-full justify-center items-center py-2 px-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-500 dark:hover:text-red-400"
      >
        <svg
          class="w-5 h-5"
          viewbox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            fill="currentColor"
            d="M6.09922 0.300781C5.93212 0.30087 5.76835 0.347476 5.62625 0.435378C5.48414 0.523281 5.36931 0.649009 5.29462 0.798481L4.64302 2.10078H1.59922C1.36052 2.10078 1.13161 2.1956 0.962823 2.36439C0.79404 2.53317 0.699219 2.76209 0.699219 3.00078C0.699219 3.23948 0.79404 3.46839 0.962823 3.63718C1.13161 3.80596 1.36052 3.90078 1.59922 3.90078V12.9008C1.59922 13.3782 1.78886 13.836 2.12643 14.1736C2.46399 14.5111 2.92183 14.7008 3.39922 14.7008H10.5992C11.0766 14.7008 11.5344 14.5111 11.872 14.1736C12.2096 13.836 12.3992 13.3782 12.3992 12.9008V3.90078C12.6379 3.90078 12.8668 3.80596 13.0356 3.63718C13.2044 3.46839 13.2992 3.23948 13.2992 3.00078C13.2992 2.76209 13.2044 2.53317 13.0356 2.36439C12.8668 2.1956 12.6379 2.10078 12.3992 2.10078H9.35542L8.70382 0.798481C8.62913 0.649009 8.5143 0.523281 8.37219 0.435378C8.23009 0.347476 8.06631 0.30087 7.89922 0.300781H6.09922ZM4.29922 5.70078C4.29922 5.46209 4.39404 5.23317 4.56282 5.06439C4.73161 4.8956 4.96052 4.80078 5.19922 4.80078C5.43791 4.80078 5.66683 4.8956 5.83561 5.06439C6.0044 5.23317 6.09922 5.46209 6.09922 5.70078V11.1008C6.09922 11.3395 6.0044 11.5684 5.83561 11.7372C5.66683 11.906 5.43791 12.0008 5.19922 12.0008C4.96052 12.0008 4.73161 11.906 4.56282 11.7372C4.39404 11.5684 4.29922 11.3395 4.29922 11.1008V5.70078ZM8.79922 4.80078C8.56052 4.80078 8.33161 4.8956 8.16282 5.06439C7.99404 5.23317 7.89922 5.46209 7.89922 5.70078V11.1008C7.89922 11.3395 7.99404 11.5684 8.16282 11.7372C8.33161 11.906 8.56052 12.0008 8.79922 12.0008C9.03791 12.0008 9.26683 11.906 9.43561 11.7372C9.6044 11.5684 9.69922 11.3395 9.69922 11.1008V5.70078C9.69922 5.46209 9.6044 5.23317 9.43561 5.06439C9.26683 4.8956 9.03791 4.80078 8.79922 4.80078Z"
          />
        </svg>
      </button>
    </td>
  </tr>

    <!-- Delete modal -->
    <div
    :id="`deleteModal-${collectionRef}`"
    tabindex="-1"
    aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
  >
    <div class="relative p-4 w-full max-w-md h-full md:h-auto">
      <!-- Modal content -->
      <div
        id="modalContent"
        class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5"
      >
        <button
          type="button"
          class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          :data-modal-toggle="`deleteModal-${collectionRef}`"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Fechar</span>
        </button>
        <svg
          class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <p class="mb-4 text-gray-500 dark:text-gray-300">
          Tem certeza que deseja excluir a música
          <span class="font-semibold">{{ collectionTitle }}</span
          >?
        </p>
        <div class="flex justify-center items-center space-x-4">
          <button
            :data-modal-toggle="`deleteModal-${collectionRef}`"
            type="button"
            class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            Não, cancelar
          </button>
          <button
            type="submit"
            class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
            @click="deleteCollection"
          >
            Sim, excluir
          </button>
        </div>
      </div>
    </div>
    <div
      id="deleteSpinner"
      role="status"
      class="hidden absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
    >
      <svg
        aria-hidden="true"
        class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  collectionTitle: String,
  collectionDescription: String,
  collectionImage: String || Boolean,
  collectionUpdatedAt: String,
  collectionType: String,
  collectionRef: String,
  collectionInfo: Object,
});

import { retrieveCollectionsCategory, deleteCollectionByRef } from "~/services/collectionServices";
import { initFlowbite } from "flowbite";

const router = useRouter();

const collectionCategories = ref(await retrieveCollectionsCategory());

const categoryCollection = ref(
  collectionCategories.value.find(
    (category: any) => category.mct_id === props.collectionInfo?.msc_category
  )?.mct_name || "Sem Categoria"
);

const editCollection = async () => {
  await router.push({
    path: "/collections/edit",
    query: { ref: props.collectionRef },
  });
};

const selectedCollectionRef = ref("");
const selectedCollectionTitle = ref("");

onMounted(() => {
  initFlowbite();
  
  const deleteModalToggles = document.querySelectorAll(
    `[data-modal-target='deleteModal-${props.collectionRef}']`
  );

  deleteModalToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      selectedCollectionRef.value = props.collectionRef as string;
      selectedCollectionTitle.value = props.collectionTitle as string;
    });
  });
});
const deleteCollection = async () => {
  const deleteModal = document.querySelector(`#deleteModal-${props.collectionRef}`) as HTMLElement;
  const deleteModalContent = document.querySelector(
    `#deleteModal-${props.collectionRef} #modalContent`
  ) as HTMLElement;
  const collectionLine = document.getElementById(
    props.collectionRef as string
  ) as HTMLElement;

  const deleteSpinner = document.querySelector("#deleteSpinner") as HTMLElement;
  const body = document.querySelector("body") as HTMLElement;

  deleteSpinner.classList.remove("hidden");

  for (let i = 0; i < deleteModalContent.children.length; i++) {
    const element = deleteModalContent.children[i] as HTMLElement;

    element.classList.add("opacity-20");
  }

  const response = await deleteCollectionByRef(props.collectionRef as string);

  deleteModal.classList.remove("flex");
  deleteModal.classList.add("hidden");
  deleteModal.setAttribute("aria-hidden", "true");

  for (let i = 0; i < deleteModalContent.children.length; i++) {
    const element = deleteModalContent.children[i] as HTMLElement;

    element.classList.remove("opacity-20");
  }
  deleteSpinner.classList.add("hidden");

  collectionLine.remove();

  body.classList.remove("overflow-hidden");
};
</script>

<style lang="scss" scoped></style>
