<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Users, Wrench, RefreshCw, ArrowRight, Download, ChevronUp } from 'lucide-vue-next'

const user = useSupabaseUser()
const { trending, recent, trendingPending, recentPending, trendingError, recentError, fetchTrending, fetchRecent } = useCollections()

onMounted(async () => {
  gsap.fromTo('.anim-fade-up',
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
  )
  await Promise.all([fetchTrending(), fetchRecent()])
})
</script>

<template>
  <div class="flex flex-col items-center bg-background min-h-screen">

    <!-- Hero: two-column, collapses on mobile -->
    <section class="w-full max-w-6xl mx-auto px-4 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center anim-fade-up">
      <div class="flex flex-col items-center lg:items-start text-center lg:text-left">
        <div class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold bg-secondary text-secondary-foreground mb-5">
          LJA Community v2.0
        </div>
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-tight font-extrabold tracking-tight text-foreground mb-5">
          Comunidade de Músicas para <span class="text-primary">Louvor e Adoração</span>
        </h1>
        <p class="max-w-[580px] text-base md:text-lg text-muted-foreground mb-8">
          Aqui você encontrará ferramentas e músicas personalizadas do Louvor JA, para facilitar a rotina da mídia na igreja.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button size="lg" class="w-full sm:w-auto" as-child>
            <NuxtLink to="/collections">
              Ver Coletâneas <ArrowRight class="ml-2 h-4 w-4" />
            </NuxtLink>
          </Button>
          <Button size="lg" variant="outline" class="w-full sm:w-auto bg-background" as-child>
            <NuxtLink :to="user ? '/collections/upload' : '/auth/login'">
              Adicionar Nova
            </NuxtLink>
          </Button>
        </div>
      </div>
      <div class="hidden lg:flex justify-center">
        <img src="~assets/images/home/home.png" alt="LJA Community" class="w-full max-w-[460px] object-contain drop-shadow-2xl" />
      </div>
    </section>

    <!-- Discovery Grid -->
    <section class="w-full max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8 anim-fade-up">

      <!-- Trending — takes 2/3 width on desktop -->
      <div class="lg:col-span-2">
        <div class="flex items-center justify-between mb-5">
          <h2 class="text-xl font-bold tracking-tight">Destaques da Comunidade</h2>
          <Button variant="link" as-child class="px-0">
            <NuxtLink to="/collections?sort=popular">Ver todas</NuxtLink>
          </Button>
        </div>

        <!-- Loading skeleton -->
        <div v-if="trendingPending" class="space-y-3">
          <div v-for="i in 3" :key="i" class="h-20 rounded-lg bg-muted animate-pulse" />
        </div>

        <!-- Error / Empty -->
        <div v-else-if="trendingError || trending.length === 0" class="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
          <p class="text-sm">{{ trendingError ? 'Não foi possível carregar os dados. Backend offline?' : 'Nenhuma coletânea em destaque ainda.' }}</p>
          <Button variant="link" as-child class="mt-2"><NuxtLink to="/collections">Ver todas as coletâneas</NuxtLink></Button>
        </div>

        <!-- Cards -->
        <div v-else class="space-y-3">
          <Card v-for="collection in trending" :key="collection.id" class="hover:shadow-md transition-all cursor-pointer group">
            <div class="flex flex-col sm:flex-row p-4 sm:p-5 items-start sm:items-center gap-4">
              <!-- Upvote block (desktop) -->
              <div class="hidden sm:flex flex-col items-center justify-center bg-muted/50 rounded-lg p-3 min-w-[64px] border border-border group-hover:border-primary/40 transition-colors">
                <ChevronUp class="h-5 w-5 text-muted-foreground group-hover:text-primary mb-0.5" />
                <span class="font-bold text-base leading-none">{{ collection.upvotes || 0 }}</span>
              </div>
              <!-- Content -->
              <div class="flex-1 min-w-0">
                <div class="flex flex-wrap items-center gap-2 mb-1">
                  <h3 class="font-semibold text-sm sm:text-base leading-none">{{ collection.title }}</h3>
                  <span v-for="tag in collection.tags?.slice(0,2)" :key="tag" class="inline-flex items-center rounded-full border px-2 py-0.5 text-xs text-muted-foreground bg-muted/30">{{ tag }}</span>
                </div>
                <p class="text-xs text-muted-foreground">por {{ collection.author }}</p>
              </div>
              <!-- Actions -->
              <div class="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <div class="flex items-center text-xs text-muted-foreground">
                  <Download class="mr-1 h-3 w-3" /> {{ collection.downloads || 0 }}
                </div>
                <!-- Mobile upvote -->
                <div class="sm:hidden flex items-center text-xs font-bold text-foreground bg-muted px-2 py-1 rounded">
                  <ChevronUp class="mr-0.5 h-3 w-3" /> {{ collection.upvotes || 0 }}
                </div>
                <Button variant="secondary" size="sm" as-child>
                  <NuxtLink :to="`/collections/${collection.id}`">Acessar</NuxtLink>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <!-- Recent Column -->
      <div class="lg:col-span-1">
        <div class="flex items-center justify-between mb-5">
          <h2 class="text-lg font-bold tracking-tight">Recentemente Adicionadas</h2>
        </div>

        <div v-if="recentPending" class="space-y-3">
          <div v-for="i in 4" :key="i" class="h-14 rounded-lg bg-muted animate-pulse" />
        </div>

        <div v-else-if="recentError || recent.length === 0" class="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
          Nenhuma coletânea recente.
        </div>

        <div v-else class="space-y-3">
          <Card v-for="collection in recent" :key="collection.id" class="p-4 hover:border-primary/40 transition-colors cursor-pointer">
            <NuxtLink :to="`/collections/${collection.id}`" class="block">
              <h4 class="font-semibold text-sm leading-tight mb-1 hover:text-primary transition-colors">{{ collection.title }}</h4>
              <div class="flex items-center justify-between text-xs text-muted-foreground">
                <span>{{ collection.author }}</span>
                <div class="flex items-center gap-1 font-medium text-foreground">
                  <ChevronUp class="h-3 w-3" /> {{ collection.upvotes || 0 }}
                </div>
              </div>
            </NuxtLink>
          </Card>
        </div>

        <Card class="mt-5 bg-primary/5 border-primary/20">
          <CardHeader class="pb-3">
            <CardTitle class="text-base">Compartilhe seu trabalho</CardTitle>
            <CardDescription class="text-xs">Ajude a comunidade fazendo upload das suas coletâneas.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button class="w-full" size="sm" as-child>
              <NuxtLink :to="user ? '/collections/upload' : '/auth/register'">Fazer Upload</NuxtLink>
            </Button>
          </CardContent>
        </Card>
      </div>

    </section>

    <!-- Core Values -->
    <section class="w-full bg-muted/30 border-y py-14">
      <div class="max-w-5xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center anim-fade-up">
        <div v-for="(value, i) in [
          { icon: Users, title: 'Comunidade', desc: 'Somos uma comunidade crescente de pessoas que amam o Louvor JA e querem contribuir colaborativamente.' },
          { icon: Wrench, title: 'Ferramentas Mídia', desc: 'Procurando ferramentas para facilitar a mídia da sua congregação? Temos as melhores compilações.' },
          { icon: RefreshCw, title: 'Atualizações Constantes', desc: 'Trabalho open-source diário para trazer novas ferramentas e correções contínuas.' },
        ]" :key="i" class="flex flex-col items-center p-5 space-y-3">
          <div class="p-3 rounded-full bg-primary/10 text-primary">
            <component :is="value.icon" class="h-6 w-6" />
          </div>
          <h3 class="font-bold text-lg">{{ value.title }}</h3>
          <p class="text-muted-foreground text-sm">{{ value.desc }}</p>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="w-full max-w-3xl mx-auto px-4 py-16 anim-fade-up">
      <div class="text-center mb-8">
        <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight">Perguntas Frequentes</h2>
        <p class="text-muted-foreground mt-2 text-sm">Dúvidas comuns sobre o LJA Community.</p>
      </div>
      <Accordion type="single" class="w-full" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Ainda não tem uma conta?</AccordionTrigger>
          <AccordionContent>
            Crie uma conta agora mesmo e comece a contribuir. <NuxtLink to="/auth/register" class="text-primary font-medium hover:underline">Criar Conta</NuxtLink>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Esse é o site oficial do Louvor JA?</AccordionTrigger>
          <AccordionContent>
            Não. LJA Community é um projeto independente. O site oficial é <a href="https://louvorja.com.br/" target="_blank" rel="noopener noreferrer" class="text-primary font-medium hover:underline">louvorja.com.br</a>.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Por que preciso ter uma conta para fazer uploads?</AccordionTrigger>
          <AccordionContent>
            A conta garante que você pode editar ou remover suas coletâneas futuramente, mantendo a qualidade do conteúdo.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Como posso contribuir com esse projeto?</AccordionTrigger>
          <AccordionContent class="space-y-3">
            <p>Existem duas formas:</p>
            <ul class="list-disc list-inside space-y-1 ml-2 text-sm">
              <li><strong>Como Usuário:</strong> contribua adicionando coletâneas e indicando ferramentas.</li>
              <li><strong>Como Desenvolvedor:</strong> entre no <a href="https://louvorja.com.br/telegram_dev" target="_blank" rel="noopener noreferrer" class="text-primary font-medium hover:underline">Telegram Oficial</a>.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>

  </div>
</template>
