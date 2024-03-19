export default defineNuxtPlugin({
  hooks: {
    "app:beforeMount": () => {
      const accountStore = useAccountStore();

      accountStore.setupCheckSession();
    },
    "page:finish": (page) => {
      const accountStore = useAccountStore();

      accountStore.setupCheckSession();
    },
    "page:start": (page) => {
      const accountStore = useAccountStore();

      accountStore.setupCheckSession();
    },
  },
});
