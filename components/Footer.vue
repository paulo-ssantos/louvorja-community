<template>
  <footer
    class="bg-color-background-nav p-3 shadow-[0_35px_50px_-15px_rgba(0,0,0,0.3)]"
  >
    <div
      shadow-[0px_0px_35px_rgb(var(--color-primary-generic))]
      shadow1-[50px_25px_0px_-12px]
      class="w-full max-w-screen-xl mx-auto p-4 md:py-8 flex flex-col justify-center align-middle text-center"
    >
      <div class="flex justify-center mb-2">
        <NuxtLink class="btn btn-ghost text-xl flex align-middle" to="/">
          <LogoIcon
            main-color="rgb(var(--color-logo)"
            qr-color="rgb(var(--color-primary-generic-inverse)"
          />
          <!-- <LogoIcon size="1.5em" class="lg:hidden" /> -->
          <p class="text-2xl lg:text-3xl">
            Louvor<span class="text-color-logo font-black">JA</span>
          </p>
        </NuxtLink>
      </div>

      <div class="flex justify-center mb-2">
        <ul
          class="flex flex-col font-medium p-4 md:p-0 mt-4 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0"
        >
          <li>
            <NuxtLink
              to="/"
              class="flex items-center py-2 px-3 md:p-0 text-color-text rounded hover:font-bold md:hover:text-color-link-hover max-md:hover:bg-color-button-hover transition-all"
              active-class="text-primary-500 font-medium"
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
              active-class="text-primary-500 font-medium"
            >
              <div class="iconContainer flex items-center md:hidden mr-1">
                <Icon name="mdi:eye-check" size="1.25em" />
              </div>
              Explorar
            </NuxtLink>
          </li>

          <li>
            <NuxtLink
              to="/collections"
              class="flex items-center py-2 px-3 md:p-0 text-color-text rounded hover:font-bold md:hover:text-color-link-hover max-md:hover:bg-color-button-hover transition-all"
              active-class="text-primary-500 font-medium"
            >
              <div class="iconContainer flex items-center md:hidden mr-1">
                <Icon name="mdi:eye-check" size="1.25em" />
              </div>
              Coletâneas
            </NuxtLink>
          </li>

          <li>
            <NuxtLink
              to="/about"
              class="flex items-center py-2 px-3 md:p-0 text-color-text rounded hover:font-bold md:hover:text-color-link-hover max-md:hover:bg-color-button-hover transition-all"
              active-class="text-primary-500"
            >
              <div class="iconContainer flex items-center md:hidden mr-1">
                <Icon name="mdi:information" size="1.25em" />
              </div>
              Sobre
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div>
        <span class="block text-sm text-color-text-muted-75 mb-2"
          >© 2024
          <a href="https://flowbite.com/" class="hover:underline">LouvorJA</a>.
          All Rights Reserved.</span
        >
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped></style>
