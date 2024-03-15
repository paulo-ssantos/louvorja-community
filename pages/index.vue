<template>
      <!-- Hero Page -->
  <section class="bg-color-background">
    <div
      class="grid max-w-screen-xl px-8 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12"
    >
      <div class="mr-auto place-self-center lg:col-span-7">
        <h1
          class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white"
        >
          Comunidade de Músicas para Louvor e Adoração
        </h1>
        <p
          class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"
        >
          Aqui você encontrará ferramentas e músicas personalizadas do Louvor
          JA, para facilitar rotina na mídia da igreja.
        </p>
        <NuxtLink
          to="/collections"
          class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
        >
          Ver Coletâneas
          <svg
            class="w-5 h-5 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </NuxtLink>
        <NuxtLink
          :to="loggedUser ? '/collections/uploud' : '/login'"
          class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          <p v-if="loggedUser">Adicionar Nova</p>
          <p v-if="!loggedUser">Fazer Login</p>
        </NuxtLink>
      </div>
      <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
        <img src="~assets/images/home/home.png" alt="mockup" />
      </div>
    </div>
  </section>

  <!-- Contents -->
  <section class="bg-color-background-alternative">
    <div
      class="gap-8 items-center py-8 px-8 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6"
    >
      <img
        class="w-full"
        src="~assets/images/home/home2.png"
        alt="dashboard image"
      />
      <div class="mt-4 md:mt-0">
        <h2
          class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"
        >
          Armazene suas Coletâneas Personalizadas na Nuvem.
        </h2>
        <p class="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
          Faça uploud de suas músicas criadas para o Louvor JA e armazene na
          nuvem, para que você possa acessar de qualquer lugar a qualquer
          momento.
        </p>
        <NuxtLink
          :to="loggedUser ? '/collections/manager' : '/register'"
          class="inline-flex items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900"
        >
          <p v-if="loggedUser">Minhas Contribuições</p>
          <p v-if="!loggedUser">Criar Conta</p>
          <svg
            class="ml-2 -mr-1 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>

  <section class="bg-color-background">
    <div
      class="gap-8 items-center py-8 px-8 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6"
    >
      <img
        class="w-full hidden max-sm:block"
        src="~assets/images/home/home3.png"
        alt="dashboard image"
      />
      <div class="mb-4 md:mb-0">
        <h2
          class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white text-right max-sm:text-left"
        >
          Acesse as Coletâneas da Comunidade
        </h2>
        <p
          class="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400 text-right max-sm:text-left"
        >
          Acesse a aba de Coletâneas e veja as músicas criadas pela comunidade
          do Louvor JA, e faça o download para usar em sua igreja.
        </p>
        <NuxtLink
          to="/collections"
          class="inline-flex items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900"
        >
          Coletâneas
          <svg
            class="ml-2 -mr-1 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </NuxtLink>
      </div>
      <img
        class="w-full block max-sm:hidden"
        src="~assets/images/home/home3.png"
        alt="dashboard image"
      />
    </div>
  </section>

  <!-- Some Number | Not Used Yet -->
  <!-- <section class="bg-white hidden dark:bg-gray-900">
    <hr class="opacity-50" />
    <div
      class="max-w-screen-xl px-8 py-8 mx-auto flex text-center lg:py-16 lg:px-6"
    >
      <dl
        class="flex max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3 dark:text-white"
      >
        <div class="flex flex-col items-center justify-center">
          <dt class="mb-2 text-3xl md:text-4xl font-extrabold">
            {{ collectionsSung }}
          </dt>
          <dd class="font-light text-gray-500 dark:text-gray-400">
            Coletâneas Cantadas
          </dd>
        </div>
        <div class="flex flex-col items-center justify-center">
          <dt class="mb-2 text-3xl md:text-4xl font-extrabold">
            {{ collectionsPlayback }}
          </dt>
          <dd class="font-light text-gray-500 dark:text-gray-400">
            Coletâneas Playback
          </dd>
        </div>
        <div class="flex flex-col items-center justify-center">
          <dt class="mb-2 text-3xl md:text-4xl font-extrabold">
            {{ collectionsOnlyLetter }}
          </dt>
          <dd class="font-light text-gray-500 dark:text-gray-400">
            Coletâneas Apenas Letra
          </dd>
        </div>
      </dl>
    </div>
  </section> -->

  <!-- Features -->
  <section class="bg-color-background-alternative">
    <div
      class="py-8 px-8 flex flex-col items-center mx-auto max-w-screen-xl sm:py-16 lg:px-6"
    >
      <div class="max-w-screen-md mb-8 text-center lg:mb-16">
        <h2
          class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"
        >
          Pensado para Facilitar a Mídia da sua Igreja.
        </h2>
        <p class="text-gray-500 sm:text-xl dark:text-gray-400">
          Aqui no LJA Community você encontrará ferramentas e coletâneas
          personalizadas criadas pela comunidade do Louvor JA.
        </p>
      </div>
      <div
        class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0"
      >
        <div class="flex flex-col items-center">
          <div
            class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900"
          >
            <svg
              class="w-8 h-8 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
              fill="currentColor"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 3a2 2 0 1 1 4 0a2 2 0 0 1-4 0m6.779 1.584l.042.032a2 2 0 1 0-.042-.032M6.268 6A2 2 0 1 1 9.73 7.998A2 2 0 0 1 6.268 6M2.5 6h2.67a3.013 3.013 0 0 0 .594 3H5.5a2.501 2.501 0 0 0-2.355 1.658a3.733 3.733 0 0 1-.933-.543C1.46 9.51 1 8.616 1 7.5A1.5 1.5 0 0 1 2.5 6m8 3c1.085 0 2.009.691 2.355 1.658c.34-.139.654-.32.933-.543C14.54 9.51 15 8.616 15 7.5A1.5 1.5 0 0 0 13.5 6h-2.67c.11.313.17.65.17 1a2.99 2.99 0 0 1-.764 2zm1.387 1.928c.073.176.113.37.113.572c0 1.116-.459 2.01-1.212 2.615C10.047 14.71 9.053 15 8 15c-1.053 0-2.047-.29-2.788-.885C4.46 13.51 4 12.616 4 11.5A1.496 1.496 0 0 1 5.5 10h5a1.5 1.5 0 0 1 1.387.928"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <h3 class="mb-2 text-xl font-bold dark:text-white">Comunidade</h3>
          <p class="text-gray-500 dark:text-gray-400 text-center">
            Comunidade crescente de pessoas que amam o Louvor JA e querem
            contribuir com o projeto.
          </p>
        </div>
        <div class="flex flex-col items-center">
          <div
            class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900"
          >
            <svg
              class="w-8 h-8 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
              fill="currentColor"
              viewBox="0 0 256 256"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M144 12h-32a68.07 68.07 0 0 0-68 68v96a68.07 68.07 0 0 0 68 68h32a68.07 68.07 0 0 0 68-68V80a68.07 68.07 0 0 0-68-68m44 164a44.05 44.05 0 0 1-44 44h-32a44.05 44.05 0 0 1-44-44V80a44.05 44.05 0 0 1 44-44h32a44.05 44.05 0 0 1 44 44ZM140 64v48a12 12 0 0 1-24 0V64a12 12 0 0 1 24 0"
              ></path>
            </svg>
          </div>
          <h3 class="mb-2 text-xl font-bold dark:text-white">Ferramentas</h3>
          <p class="text-gray-500 dark:text-gray-400 text-center">
            Procurando por ferramentas para facilitar a mídia da sua igreja?
            Aqui você encontrará ferramentas para facilitar a sua rotina.
          </p>
        </div>
        <div class="flex flex-col items-center">
          <div
            class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900"
          >
            <svg
              class="w-8 h-8 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 17.125V6.875L12 1.7l9 5.175v5.375q-.85-.6-1.862-.925T17 11q-.425 0-.812.038t-.788.137L19 9.1V8.05l-1.075-.625L12 10.85L6.075 7.425L5 8.05V9.1l6 3.475V14.4q-.475.8-.737 1.7T10 18q0 1.05.288 2t.812 1.775q-.025-.025-.05-.025t-.05-.025zM17 21l3-3l-.7-.7l-1.8 1.8V15h-1v4.1l-1.8-1.8l-.7.7zm0 2q-2.075 0-3.537-1.463T12 18q0-2.075 1.463-3.537T17 13q2.075 0 3.538 1.463T22 18q0 2.075-1.463 3.538T17 23"
                clip-rule="evenodd"
              ></path>
              <path
                d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"
              ></path>
            </svg>
          </div>
          <h3 class="mb-2 text-xl font-bold dark:text-white">
            Atualizações Constantes
          </h3>
          <p class="text-gray-500 dark:text-gray-400 text-center">
            Estamos sempre trabalhando para trazer novas ferramentas e melhorias
            para o LJA Community.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="bg-color-background">
    <div
      class="py-8 px-8 mx-auto max-w-screen-xl sm:py-16 lg:px-6 flex flex-col items-center"
    >
      <div class="max-w-screen-md flex flex-col items-center">
        <h2
          class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white text-center"
        >
          <p v-if="loggedUser">Criou uma nova coletânea?</p>
          <p v-if="!loggedUser">Ainda não tem uma conta?</p>
        </h2>
        <div
          class="mb-8 font-light text-gray-500 sm:text-xl dark:text-gray-400 text-center"
        >
          <p v-if="loggedUser">
            Aproveite e fazer o uploud dela agora mesmo, assim toda a comunidade
            poderá se beneficiar! Quanto mais músicas tivermos na plataforma,
            mas útil ela será para todas as igrejas!
          </p>
          <p v-if="!loggedUser">
            Crie uma conta agora mesmo e comece a contribuir adicionando suas
            coletâneas personalizadas, para que mais pessoas possam usar em suas
            igrejas.
          </p>
        </div>
        <!-- Aqui -->
        <div
          class="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
        >
          <NuxtLink
            :to="loggedUser ? '/collections/uploud' : '/register'"
            class="inline-flex items-center justify-center px-4 py-2.5 text-base font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            <p v-if="loggedUser">Adicionar Nova</p>
            <p v-if="!loggedUser">Criar Conta</p>
          </NuxtLink>
          <NuxtLink
            :to="loggedUser ? '/collections/manager' : '/collections'"
            class="inline-flex items-center justify-center px-4 py-2.5 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <svg
              class="mr-2 -ml-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"
              ></path>
            </svg>
            <p v-if="loggedUser">Minhas Contribuições</p>
            <p v-if="!loggedUser">Ver Coletâneas</p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <FAQ :alternativeBackground="true"/>
</template>

<script setup lang="ts">
const loggedUser = null
</script>

<style scoped>

</style>