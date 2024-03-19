<template>
  <section class="bg-color-background">
    <div class="section-container-account">
      <NuxtLink
        to="/"
        class="flex items-center mb-6 text-2xl font-semibold text-color-text"
      >
        <LogoIcon size="30px" />
        <span class="ml-2">
          LJA<span class="text-color-primary-generic">Community</span>
        </span>
      </NuxtLink>
      <div
        class="w-full bg-color-background-alternative rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0"
      >
        <Alerts
          :collectionStatus="collectionStatus"
          :collectionMainMessage="collectionMainMessage || undefined"
          :collectionAdditionalMessage="
            collectionAdditionalMessage || undefined
          "
        />

        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-color-text md:text-2xl"
          >
            Entrar na sua conta
          </h1>
          <form id="login-form" class="space-y-4 md:space-y-6" method="post">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-color-text"
                >Email</label
              >
              <input
                type="email"
                name="email"
                id="email"
                v-model="email"
                class="bg-gray-50 border border-gray-300 text-color-text sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@email.com"
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-color-text"
                >Senha</label
              >
              <input
                type="password"
                name="password"
                id="password"
                v-model="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-color-text sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required="true"
              />
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="remember"
                    v-model="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="remember" class="text-color-text-muted-75"
                    >Manter Sessão</label
                  >
                </div>
              </div>
              <NuxtLink
                to="/recover"
                class="text-sm font-medium text-primary-600 hover:underline"
                >Esqueceu a Senha?</NuxtLink
              >
            </div>

            <button
              type="submit"
              class="w-full text-color-text-inverse bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              @click="login"
            >
              Entrar
            </button>

            <p class="text-sm font-light text-color-text-muted-75">
              Primeira Vez?
              <NuxtLink
                to="/register"
                class="font-medium text-primary-600 hover:underline"
                >Crie um Conta</NuxtLink
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Entrar",
  description: "Acesse para entrar na sua conta.",
});

definePageMeta({
  fullPage: true,
});

import * as accountServices from "~/services/accountServices";
import { useRouter } from "vue-router";

const router = useRouter();

const collectionStatus = ref("");
const collectionMainMessage: Ref<string | null> = ref("");
const collectionAdditionalMessage: Ref<string | null> = ref("");
const timerCounter = ref(3);

watchEffect(() => {
  collectionStatus.value;
  collectionMainMessage.value;
  collectionAdditionalMessage.value;
  timerCounter.value;
});

const email: Ref<string> = useState("email");
const password: Ref<string> = useState("password");
const remember: Ref<boolean> = useState("remember");

const login = () => {
  const form = document.getElementById("login-form") as HTMLFormElement;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  accountServices.login(email.value, password.value).then((response) => {
    if (response.error == null) {
      collectionStatus.value = "success";
      collectionMainMessage.value = "Login Realizado com Sucesso!";
      collectionAdditionalMessage.value = `Redirecionando para a página inicial. Em ${timerCounter.value} segundos.`;

      setTimeout(() => {
        router.push("/");
      }, 3000);
    } else {
      collectionStatus.value = "error";
      collectionMainMessage.value = "Erro ao Realizar Login!";
      collectionAdditionalMessage.value = `Erro: ${response.error.message}`;
    }
  });
};
</script>

<style scoped></style>
