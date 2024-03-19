<template>
  <!-- Header -->
  <section class="bg-color-background">
    <div class="section-container">
      <PageHeader
        pageTitle="Sobre"
        pageDescription="Saiba mais sobre esse projeto, como ele funciona e como você pode contribuir."
      />
    </div>
  </section>

  <!-- Apresentation -->
  <section class="bg-color-background-alternative">
    <div
      class="section-container-divided"
    >
      <div class="font-light text-color-text-muted-75 sm:text-lg">
        <h2
          class="mb-4 text-4xl tracking-tight font-extrabold text-color-text"
        >
          Uma plataforma para compartilhamento facilitado
        </h2>
        <p class="mb-4">
          Descubra uma variedade de ferramentas e músicas personalizadas do
          Louvor JA projetadas para agilizar a rotina de mídia da sua igreja.
        </p>
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

  <!-- Key Points -->
  <section class="bg-color-background">
    <div
      class="section-container"
    >
      <div class="max-w-screen-md mb-8 text-center lg:mb-16">
        <h2
          class="mb-4 text-4xl tracking-tight font-extrabold text-color-text"
        >
          Sobre o projeto
        </h2>
      </div>
      <div
        class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0"
      >
        <div class="flex flex-col items-center">
          <div
            class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 "
          >
          <Icon name="mdi:account-supervisor" class="w-8 h-8 text-primary-600 lg:w-6 lg:h-6" />
          </div>
          <h3 class="mb-2 text-xl font-bold text-color-text">Open-Source</h3>
          <p class="text-color-text-muted-75 text-center">
            Projeto gratuito e de código aberto, ou seja, qualquer um pode
            contribuir com o projeto.
          </p>
        </div>
        <div class="flex flex-col items-center">
          <div
            class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 "
          >
          <Icon name="mdi:arrow-expand-all" class="w-8 h-8 text-primary-600 lg:w-6 lg:h-6" />

          </div>
          <h3 class="mb-2 text-xl font-bold text-color-text">Expansível</h3>
          <p class="text-color-text-muted-75 text-center">
            Novas funcionalidades serão graduamente adicionadas ao projeto,
            tornando-o cada vez mais completo.
          </p>
        </div>
        <div class="flex flex-col items-center">
          <div
            class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 "
          >
          <Icon name="mdi:arrow-expand-all" class="w-8 h-8 text-primary-600 lg:w-6 lg:h-6" />
          </div>
          <h3 class="mb-2 text-xl font-bold text-color-text">
            Atualizações Constantes
          </h3>
          <p class="text-color-text-muted-75 text-center">
            Estamos sempre trabalhando para trazer novas ferramentas e melhorias
            para o LJA Community.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Contribute Forms -->
  <section class="bg-color-background-alternative">
    <div class="section-container">
      <h2
        class="mb-4 text-4xl tracking-tight font-extrabold text-center text-color-text"
      >
        Entre em Contato
      </h2>
      <p
        class="mb-8 lg:mb-16 font-light text-center text-color-text-muted-75 sm:text-xl"
      >
        Tem alguma dúvida, sugestão ou quer contribuir com o projeto? Entre em
        contato conosco.
      </p>
      <form id="contribute-form" class="space-y-8 w-4/5">
        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-color-text"
            >Seu email</label
          >
          <input
            type="email"
            v-model="email"
            id="email"
            class="shadow-sm bg-gray-50 border border-gray-300 text-color-text text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
            placeholder="name@email.com"
            required
          />
        </div>
        <div>
          <label
            for="subject"
            class="block mb-2 text-sm font-medium text-color-text"
          >
            Assunto
          </label>
          <input
            type="text"
            v-model="subject"
            id="subject"
            class="block p-3 w-full text-sm text-color-text bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 "
            placeholder="Sobre o que deseja falar?"
            required
          />
        </div>
        <div class="sm:col-span-2">
          <label
            for="message"
            class="block mb-2 text-sm font-medium text-color-text"
            >Mensagem</label
          >
          <textarea
            id="message"
            v-model="emailContent"
            rows="6"
            class="block p-2.5 w-full text-sm text-color-text bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Deixar um comentário..."
          ></textarea>
        </div>
        <button
          type="submit"
          @click="sendEmailSugesstion"
          class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300"
        >
          Enviar mensagem
        </button>
      </form>
    </div>
  </section>

  <!-- FAQ -->
  <FAQ />
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Sobre',
  description: 'Saiba mais sobre esse projeto, como ele funciona e como você pode contribuir.',
})
const runtimeConfig = useRuntimeConfig();

const subject = ref("");
const email = ref("");
const emailContent = ref("");

const sendEmailSugesstion = async () => {
  const form = document.getElementById("contribute-form") as HTMLFormElement;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  const mailto = `mailto:${runtimeConfig.public.SUPPORT_EMAIL}?subject=${subject.value}&body=${emailContent.value}`;

  window.open(mailto, "_blank");
};
</script>

<style scoped></style>
