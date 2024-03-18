<template>
  <nav class="bg-color-background-nav shadow-2xl flex justify-center">
    <div class="w-4/5 flex flex-wrap items-center justify-between mx-auto p-4">
      <NuxtLink class="btn btn-ghost text-xl flex align-middle" to="/">
        <LogoIcon
          main-color="rgb(var(--color-logo))"
          qr-color="rgb(var(--color-primary-generic-inverse))"
        />
        <p class="text-2xl lg:text-3xl">
          Louvor<span class="text-color-logo font-black">JA</span>
        </p>
      </NuxtLink>

      <div
        class="inline-flex md:hidden md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse"
      >
        <button
          data-collapse-toggle="navbar-cta"
          type="button"
          class="items-center p-2 w-10 h-10 justify-center text-sm text-color-text rounded-lg hover:text-color-text-hover hover:bg-color-text-muted transition-all"
          aria-controls="navbar-cta"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <Icon name="mdi:menu" size="1.25rem" />
        </button>
      </div>

      <div
        class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        id="navbar-cta"
      >
        <ul
          class="flex flex-col font-medium p-4 md:p-0 mt-4 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0"
        >
          <li>
            <NuxtLink
              to="/"
              class="flex items-center py-2 px-3 md:p-0 text-color-text rounded hover:font-bold md:hover:text-color-link-hover max-md:hover:bg-color-button-hover transition-all"
              active-class="text-primary-500 font-semibold"
            >
              <div class="iconContainer flex items-center md:hidden mr-1">
                <Icon name="mdi:home" size="1.25em" />
              </div>
              Início
            </NuxtLink>
          </li>

          <li>
            <NuxtLink
              to="/explore"
              class="flex items-center py-2 px-3 md:p-0 text-color-text rounded hover:font-bold md:hover:text-color-link-hover max-md:hover:bg-color-button-hover transition-all"
              active-class="text-primary-500 font-semibold"
            >
              <div class="iconContainer flex items-center md:hidden mr-1">
                <Icon name="mdi:semantic-web" size="1.25em" />
              </div>
              Explorar
            </NuxtLink>
          </li>

          <li>
            <NuxtLink
              to="/collections"
              class="flex items-center py-2 px-3 md:p-0 text-color-text rounded hover:font-bold md:hover:text-color-link-hover max-md:hover:bg-color-button-hover transition-all"
              active-class="text-primary-500 font-semibold"
            >
              <div class="iconContainer flex items-center md:hidden mr-1">
                <Icon name="mdi:music" size="1.25em" />
              </div>
              Coletâneas
            </NuxtLink>
          </li>

          <li>
            <NuxtLink
              to="/about"
              class="flex items-center py-2 px-3 md:p-0 text-color-text rounded hover:font-bold md:hover:text-color-link-hover max-md:hover:bg-color-button-hover transition-all"
              active-class="text-primary-500 font-semibold"
            >
              <div class="iconContainer flex items-center md:hidden mr-1">
                <Icon name="mdi:information" size="1.25em" />
              </div>
              Sobre
            </NuxtLink>
          </li>

          <li>
            <div
              class="items-center justify-between w-full md:flex md:w-auto md:order-1"
            >
              <NuxtLink
                to="/login"
                class="inline-flex items-center md:hidden justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
              >
                Entrar
                <Icon name="mdi:login" size="1.25em" class="ml-2" />
              </NuxtLink>
            </div>
          </li>
        </ul>
      </div>

      <div
        class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
      >
        <NuxtLink
          to="/login"
          class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
        >
          Entrar
          <Icon name="mdi:login" size="1.25em" class="ml-2" />
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts"></script>

<style scoped></style>
