import { useStorage } from "@vueuse/core";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (useStorage("session", null).value === null) {
    setTimeout(() => {
      return navigateTo("/login", { replace: true });
    }, 0);
  }
});
