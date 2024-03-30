<template>
  <!-- Header -->
  <section class="bg-color-background">
    <div class="section-container">
      <PageHeader
        pageTitle="Quer contribuir com a comunidade?"
        pageDescription="Saiba como enviar uma música ou álbum para a nossa plataforma. Se atente as diretrizes para que sua contribuição seja da melhor qualidade possível."
      />
    </div>
  </section>

  <!-- Apresentation and Best Practices -->
  <section class="bg-color-background-alternative">
    <div class="section-container-divided">
      <div class="font-light text-color-text-muted-75 sm:text-lg">
        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-color-text">
          Se atente as melhores práticas para contribuir com a comunidade
        </h2>
        <ul>
          <li class="mb-4">
            <p class="mb-2 font-bold">Formatos Corretos</p>
            <p>
              Envie arquivos em formatos oficiais suportados pelo Louvor JA. Ou
              seja, arquivo .SLJA para as músicas e capa do álbum em .BMP em
              137x137 pixels.
            </p>
          </li>
          <li class="mb-4">
            <p class="mb-2 font-bold">Informações Corretas</p>
            <p>
              Preencha as informações da música ou álbum corretamente. Isso
              facilita a busca e organização dos arquivos na plataforma.
            </p>
          </li>
        </ul>
      </div>
      <div class="grid grid-cols-2 gap-4 mt-8">
        <img
          class="w-full rounded-lg"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
          alt="office content 1"
        />
        <img
          class="mt-4 w-full lg:mt-10 rounded-lg"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
          alt="office content 2"
        />
      </div>
    </div>
  </section>

  <!-- Switcher -->
  <section class="bg-color-background">
    <div class="section-container">
      <div class="max-w-screen-md mb-8 text-center lg:mb-16">
        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-color-text">
          Escolha a forma de contribuir
        </h2>
        <p class="text-color-text-muted-75 sm:text-xl">
          Escolha a forma de contribuir com a comunidade. Você pode enviar
          músicas individualmente, em lote ou albúns inteiros.
        </p>
      </div>

      <div
        class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0"
      >
        <!-- Individual -->
        <div
          class="p-6 bg-color-background-alternative rounded-lg border-2 border-color-primary-generic border-opacity-50 hover:border-opacity-100 shadow-md hover:shadow-lg hover:shadow-color-primary-generic transition-all items-center flex flex-col"
        >
          <div
            class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12"
          >
            <Icon
              name="mdi:music-box"
              class="w-8 h-8 text-primary-600 lg:w-6 lg:h-6"
            />
          </div>
          <h3 class="mb-2 text-xl font-bold">Música Individual</h3>
          <p class="text-color-text-muted-75 text-center">
            Envie músicas individualmente para a comunidade. Compartilhe suas
            músicas com a comunidade.
          </p>

          <NuxtLink
            to="/collections/uploud/song"
            class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 mt-2"
          >
            <p>Enviar Individual</p>
          </NuxtLink>
        </div>

        <!-- Bulk -->
        <div
          class="p-6 bg-color-background-alternative rounded-lg border-2 border-color-primary-generic border-opacity-50 hover:border-opacity-100 shadow-md hover:shadow-lg hover:shadow-color-primary-generic transition-all items-center flex flex-col"
        >
          <div
            class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12"
          >
            <Icon
              name="mdi:music-box-multiple"
              class="w-8 h-8 text-primary-600 lg:w-6 lg:h-6"
            />
          </div>
          <h3 class="mb-2 text-xl font-bold">Música em Lote</h3>
          <p class="text-color-text-muted-75 text-center">
            Envie várias músicas de uma só vez. Facilite e contribua com a
            comunidade.
          </p>

          <NuxtLink
            to="/collections/uploud/songs-bulk"
            class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 mt-2"
          >
            <p>Enviar Individual</p>
          </NuxtLink>
        </div>

        <!-- Album -->
        <div
          class="p-6 bg-color-background-alternative rounded-lg border-2 border-color-primary-generic border-opacity-50 hover:border-opacity-100 shadow-md hover:shadow-lg hover:shadow-color-primary-generic transition-all items-center flex flex-col"
        >
          <div
            class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12"
          >
            <Icon
              name="mdi:album"
              class="w-8 h-8 text-primary-600 lg:w-6 lg:h-6"
            />
          </div>
          <h3 class="mb-2 text-xl font-bold">Álbum Completo</h3>
          <p class="text-color-text-muted-75 text-center">
            Envie um álbum completo para a comunidade. Compartilhe suas músicas
            de forma organizada.
          </p>

          <NuxtLink
            to="/collections/uploud/album"
            class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 mt-2"
          >
            <p>Enviar Individual</p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <FAQ :alternativeBackground="true" />
</template>

<script setup lang="ts"></script>

<style scoped></style>
