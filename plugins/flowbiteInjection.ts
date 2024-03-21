import { initFlowbite } from "flowbite";

export default defineNuxtPlugin({
  setup() {
    return {
      provide: {
        initFlowbite,
      },
    };
  },

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
