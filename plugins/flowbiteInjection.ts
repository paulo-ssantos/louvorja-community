import { initFlowbite } from "flowbite";

export default defineNuxtPlugin({

  hooks: {
    "app:beforeMount": async () => {
      initFlowbite();
    },
    "page:finish": (page) => {
      initFlowbite();
    },
    "page:start": (page) => {
      initFlowbite();
    },
  },
});
