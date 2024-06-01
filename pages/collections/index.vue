<template>
  <!-- Header -->
  <section class="bg-color-background">
    <div class="section-container">
      <PageHeader
        pageTitle="Acesse todas as coletâneas do LJA Community"
        pageDescription="Aqui você pode acessar todas as coletâneas disponíveis na plataforma. Use filtros e pesquise por músicas e albúns."
      />
    </div>
  </section>

  <!-- Apresentation and How Use -->
  <section class="bg-color-background-alternative">
    <div class="section-container-divided">
      <div class="font-light text-color-text-muted-75 sm:text-lg">
        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-color-text">
          Como usar a plataforma
        </h2>
        <ul>
          <li class="mb-4">
            <p class="mb-2 font-bold">Sobre a plataforma</p>
            <p>
              A plataforma LJA Community é um espaço para compartilhar músicas e
              álbuns com a comunidade. Você pode enviar músicas individualmente
              ou em lote. A comunidade pode acessar e baixar as músicas
              compartilhadas.
            </p>
          </li>
          <li class="mb-4">
            <p class="mb-2 font-bold">Como achar sua coletânea?</p>
            <p>
              A plataforma é gratuita e aberta para todos. Você pode acessar
              todas as coletâneas disponíveis na plataforma. Use filtros e
              pesquise por músicas e álbuns.
            </p>
          </li>
        </ul>
      </div>
      <div class="grid grid-cols-2 gap-4 mt-8">
        <img
          class="w-full rounded-lg object-cover lg:h-full"
          src="https://images.unsplash.com/photo-1569926426428-471bfd09906a?q=80&w=1286&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="office content 1"
        />
        <img
          class="mt-4 w-full lg:mt-10 rounded-lg object-cover h-full"
          src="https://images.unsplash.com/photo-1649437636817-ff86121a83bf?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
          Como você quer procurar sua coletânea?
        </h2>
        <p class="text-color-text-muted-75 sm:text-xl">
          Escolha uma das opções abaixo para acessar as coletâneas disponíveis
          na plataforma.
        </p>
      </div>

      <div
        class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0"
      >
        <!-- All Collections -->
        <div
          class="p-6 bg-color-background-alternative rounded-lg border-2 border-color-primary-generic border-opacity-50 hover:border-opacity-100 shadow-md hover:shadow-lg hover:shadow-color-primary-generic transition-all items-center flex flex-col col-span-2"
        >
          <div
            class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12"
          >
            <Icon
              name="mdi:music-box"
              class="w-8 h-8 text-primary-600 lg:w-6 lg:h-6"
            />
          </div>
          <h3 class="mb-2 text-xl font-bold">Ver Todas as Coletâneas</h3>
          <p class="text-color-text-muted-75 text-center">
            Acesse todas as coletâneas disponíveis na plataforma. Use filtros e
            pesquise por músicas específicas.
          </p>

          <NuxtLink
            to="/collections/all"
            class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 mt-2"
          >
            <p>Ver Todas</p>
          </NuxtLink>
        </div>

        <!-- Per Category - Desactivate -->
        <div
          class="opacity-60 p-6 bg-color-background-alternative rounded-lg border-2 border-color-primary-generic border-opacity-50 hover:border-opacity-100 shadow-md hover:shadow-lg hover:shadow-color-primary-generic transition-all items-center flex flex-col"
        >
          <div
            class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12"
          >
            <Icon
              name="mdi:music-box-multiple"
              class="w-8 h-8 text-primary-600 lg:w-6 lg:h-6"
            />
          </div>
          <h3 class="mb-2 text-xl font-bold">Ver Coletânea por Categoria</h3>
          <p class="text-color-text-muted-75 text-center">
            Acesse os álbuns disponíveis na plataforma, filtrando por categoria.
          </p>

          <!-- to="/collections/uploud/album" -->
          <div
            class="cursor-not-allowed inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 mt-2"
          >
            <p>Ver por Categoria</p>
          </div>
        </div>

        <!-- Album - Desactivate -->
        <div
          class="opacity-60 p-6 bg-color-background-alternative rounded-lg border-2 border-color-primary-generic border-opacity-50 hover:border-opacity-100 shadow-md hover:shadow-lg hover:shadow-color-primary-generic transition-all items-center flex flex-col"
        >
          <div
            class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12"
          >
            <Icon
              name="mdi:album"
              class="w-8 h-8 text-primary-600 lg:w-6 lg:h-6"
            />
          </div>
          <h3 class="mb-2 text-xl font-bold">Ver Álbuns</h3>
          <p class="text-color-text-muted-75 text-center">
            Acesse os álbuns disponíveis na plataforma.
          </p>

          <!-- to="/collections/uploud/album" -->
          <div
            class="cursor-not-allowed inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 mt-2"
          >
            <p>Ver Álbuns</p>
          </div>
        </div>

        <!-- Send new collection -->
        <div
          class="p-6 bg-color-background-alternative rounded-lg border-2 border-color-primary-generic border-opacity-50 hover:border-opacity-100 shadow-md hover:shadow-lg hover:shadow-color-primary-generic transition-all items-center flex flex-col col-span-2"
        >
          <div
            class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12"
          >
            <Icon
              name="mdi:music-note-plus"
              class="w-8 h-8 text-primary-600 lg:w-6 lg:h-6"
            />
          </div>
          <h3 class="mb-2 text-xl font-bold">Enviar Nova Coletânea</h3>
          <p class="text-color-text-muted-75 text-center">
            Envie uma nova música para a comunidade. Compartilhe suas músicas
            e salve suas coletâneas personalizadas do LJA na nuvem.
          </p>

          <NuxtLink
            to="/collections/uploud"
            class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 mt-2"
          >
            <p>Enviar Agora</p>
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
