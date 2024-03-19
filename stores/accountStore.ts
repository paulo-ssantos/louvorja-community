import { defineStore } from "pinia";
import { useStorage } from '@vueuse/core';
import * as accountServices from "~/services/accountServices";

export const useAccountStore = defineStore("accountState", () => {
  const account: any = useStorage("account", null);
  const session: any = useStorage("session", null);


  const setupCheckSession = async () => {
    const { data, error } = await accountServices.getCurrentSession();

    if (data) {
      account.value = data
      session.value = data.session
    } else {
      account.value = null;
      session.value = null;
    }

    return { data, error };
  }


  const getAccountMetadata = async () => {
    const { data, error } = await accountServices.getCurrentUser();

    return { data, error };
  }

  return {
    account,
    session,
    getAccountMetadata,
    setupCheckSession
  };
});
