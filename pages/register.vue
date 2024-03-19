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
          <form id="register-form" class="space-y-4 md:space-y-6" method="post">
            <div>
              <label
                for="username"
                class="block mb-2 text-sm font-medium text-color-text"
                >Nome</label
              >
              <input
                type="username"
                name="username"
                id="username"
                v-model="username"
                class="bg-gray-50 border border-gray-300 text-color-text sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="paulo.vitor"
              />
            </div>

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
            <button
              type="submit"
              class="w-full text-color-text-inverse bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              @click="register"
            >
              Criar conta
            </button>

            <p class="text-sm font-light text-color-text-muted-75">
              Já tem uma conta?
              <NuxtLink
                to="/login"
                class="font-medium text-primary-600 hover:underline"
                >Fazer Login</NuxtLink
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
  title: "Registro",
  description: "Acesse para registrar uma nova conta.",
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
const username: Ref<string> = useState("username");

const register = () => {
  const form = document.getElementById("register-form") as HTMLFormElement;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  accountServices
    .signUp(username.value, email.value, password.value)
    .then((response) => {
      if (response.error == null) {
        collectionStatus.value = "success";
        collectionMainMessage.value = "Conta Criada com Sucesso!";
        collectionAdditionalMessage.value =
          "Redirecionando para a página de login em 3 segundos...";
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        collectionStatus.value = "error";
        collectionMainMessage.value = "Erro ao Criar Conta!";
        collectionAdditionalMessage.value = `Erro: ${response.error.message}`;
      }
    });
};
</script>

<style scoped></style>
