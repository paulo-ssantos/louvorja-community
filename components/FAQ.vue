<template>
  <section id="faq" :class="colorBackground">
    <div class="section-container min-w-full">
      <h2 class="mb-8 text-4xl tracking-tight font-extrabold text-color-text">
        Perguntas Frequentes
      </h2>

      <div
        class="bg-color-primary-generic opacity-50 h-0.5 w-3/6 md:w-1/6 max-md:self-center"
      ></div>

      <div class="flex justify-center pt-8 text-left w-4/5">
        <div id="accordion-open" class="w-full md:w-3/5" data-accordion="open">
          <div>
            <h2 id="accordion-open-heading-1">
              <button
                type="button"
                class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-color-text-muted-75 border border-b-0 border-color-primary-generic-alternative rounded-t-xl focus:ring-4 gap-3"
                data-accordion-target="#accordion-open-body-1"
                aria-expanded="true"
                aria-controls="accordion-open-body-1"
              >
                <span class="flex items-center text-color-text">
                  <Icon name="mdi:help-circle" class="w-5 h-5 me-2 shrink-0" />
                  Esse é o site oficial do Louvor JA?
                </span>
                <svg
                  data-accordion-icon
                  class="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id="accordion-open-body-1"
              class="hidden"
              aria-labelledby="accordion-open-heading-1"
            >
              <div
                class="p-5 border border-b-0 border-color-primary-generic-alternative"
              >
                <p class="mb-2 text-color-text-muted-75">
                  Não, LJA Community é um projeto independente criado para
                  facilitar o compartilhamento de coletâneas personalizadas do
                  Louvor JA.
                </p>
                <p class="mb-2 text-color-text-muted-75">
                  Caso você queira acessar o site oficial do Louvor JA,
                  <a
                    href="https://louvorja.com.br/"
                    target="_blank"
                    class="text-color-primary-generic-alternative hover:underline"
                    >click aqui</a
                  >
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 id="accordion-open-heading-2">
              <button
                type="button"
                class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-color-text-muted-75 border border-b-0 border-color-primary-generic-alternative focus:ring-4 gap-3"
                data-accordion-target="#accordion-open-body-2"
                aria-expanded="false"
                aria-controls="accordion-open-body-2"
              >
                <span class="flex items-center text-color-text">
                  <Icon name="mdi:help-circle" class="w-5 h-5 me-2 shrink-0" />
                  Por que preciso ter uma conta para fazer novos uploud?
                </span>
                <svg
                  data-accordion-icon
                  class="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id="accordion-open-body-2"
              class="hidden"
              aria-labelledby="accordion-open-heading-2"
            >
              <div
                class="p-5 border border-b-0 border-color-primary-generic-alternative"
              >
                <p class="mb-2 text-color-text-muted-75">
                  A conta é necessária para que você possa fazer o uploud e
                  gerenciar suas coletâneas personalizadas, dessa forma você
                  pode editar informações incorretas e até mesmo excluir caso
                  queira.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 id="accordion-open-heading-3">
              <button
                type="button"
                class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-color-text-muted-75 border border-color-primary-generic-alternative focus:ring-4 gap-3"
                data-accordion-target="#accordion-open-body-3"
                aria-expanded="false"
                aria-controls="accordion-open-body-3"
              >
                <span class="flex items-center text-color-text">
                  <Icon name="mdi:help-circle" class="w-5 h-5 me-2 shrink-0" />
                  Como posso contribuir com esse projeto?
                </span>
                <svg
                  data-accordion-icon
                  class="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id="accordion-open-body-3"
              class="hidden"
              aria-labelledby="accordion-open-heading-3"
            >
              <div
                class="p-5 border border-t-0 border-color-primary-generic-alternative"
              >
                <p class="mb-2 text-color-text-muted-75">
                  Existem basicamente duas formas de você contribuir com esse
                  projeto:
                </p>
                <ul class="ps-5 text-color-text-muted-75 list-disc">
                  <li>
                    <p>
                      <span class="font-bold">Como Usuário:</span> você pode
                      ajudar contribuindo com a adição de novas coletâneas
                      personalizas e sugerindo ferramentas e incrementos na
                      plataforma.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span class="font-bold">Como Desenvolvedor:</span> você
                      pode ajudar indentificando e resolvendo bugs, ou
                      implementando novas funcionalidades. Caso tenha interesse,
                      pode entrar no grupo de
                      <a
                        class="text-color-primary-generic-alternative hover:underline"
                        href="https://louvorja.com.br/telegram_dev"
                        target="_blank"
                        >telegram do LJA</a
                      >
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps({
  alternativeBackground: {
    type: Boolean,
    default: false,
  },
});

const colorBackground = props.alternativeBackground
  ? "bg-color-background-alternative"
  : "";
</script>

<style lang="scss" scoped></style>
