<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Cloud, Users, Download, Heart } from 'lucide-vue-next'

onMounted(() => {
  gsap.fromTo('.anim-about',
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
  )
})
</script>

<template>
  <div class="bg-background min-h-screen">

    <!-- 1. Hero Header -->
    <div class="w-full bg-muted/20 border-b anim-about">
      <div class="max-w-4xl mx-auto px-4 py-16 text-center">
        <div class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold bg-secondary text-secondary-foreground mb-5">
          LJA Community v2.0
        </div>
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
          Sobre a LJA Community
        </h1>
        <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
          Nascemos da necessidade de centralizar os recursos do Louvor JA e facilitar a rotina das equipes de mídia em igrejas adventistas por todo o Brasil.
        </p>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4">

      <!-- 2. Missão -->
      <section class="py-16 md:py-20 text-center max-w-3xl mx-auto anim-about">
        <h2 class="text-2xl sm:text-3xl font-bold tracking-tight mb-5">Nossa Missão</h2>
        <p class="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
          Antes da LJA Community, as coletâneas do Louvor JA eram compartilhadas por grupos de WhatsApp — dispersas, difíceis de encontrar e sem controle de versão. Nossa missão é transformar isso em um ecossistema organizado, colaborativo e acessível para todas as igrejas.
        </p>
        <div class="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          <span class="flex items-center gap-1.5"><Heart class="h-4 w-4 text-primary" /> Feito com amor pela comunidade</span>
          <span class="flex items-center gap-1.5"><Users class="h-4 w-4 text-primary" /> Para equipes de mídia da Igreja Adventista</span>
          <span class="flex items-center gap-1.5"><Download class="h-4 w-4 text-primary" /> Download gratuito e sem cadastro</span>
        </div>
      </section>

      <!-- 3. Feature Callout: Armazene -->
      <section class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-12 border-t anim-about">
        <div class="order-2 lg:order-1 flex justify-center">
          <img
            src="~assets/images/home/home2.png"
            alt="Armazenamento na nuvem"
            class="w-full max-w-sm sm:max-w-md rounded-2xl drop-shadow-xl border border-border/40 object-cover"
          />
        </div>
        <div class="order-1 lg:order-2 flex flex-col items-center lg:items-start text-center lg:text-left gap-5">
          <div class="p-3 rounded-full bg-primary/10 text-primary">
            <Cloud class="h-6 w-6" />
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Armazene suas Coletâneas Personalizadas na Nuvem.
          </h2>
          <p class="text-muted-foreground leading-relaxed">
            Faça upload de suas músicas criadas para o Louvor JA e armazene na nuvem, para que você possa acessar de qualquer lugar, a qualquer momento.
          </p>
          <Button size="lg" as-child>
            <NuxtLink to="/collections/upload">
              Minhas Contribuições <ArrowRight class="ml-2 h-4 w-4" />
            </NuxtLink>
          </Button>
        </div>
      </section>

      <!-- 4. Feature Callout: Acesse -->
      <section class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-12 border-t anim-about">
        <div class="flex flex-col items-center lg:items-start text-center lg:text-left gap-5">
          <div class="p-3 rounded-full bg-primary/10 text-primary">
            <Download class="h-6 w-6" />
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Acesse as Coletâneas da Comunidade
          </h2>
          <p class="text-muted-foreground leading-relaxed">
            Acesse a aba de Coletâneas e veja as músicas criadas pela comunidade do Louvor JA, e faça o download para usar em sua Igreja — de graça e sem complicação.
          </p>
          <Button size="lg" as-child>
            <NuxtLink to="/collections">
              Coletâneas <ArrowRight class="ml-2 h-4 w-4" />
            </NuxtLink>
          </Button>
        </div>
        <div class="flex justify-center">
          <img
            src="~assets/images/home/home3.png"
            alt="Acesse a comunidade"
            class="w-full max-w-sm sm:max-w-md rounded-2xl drop-shadow-xl border border-border/40 object-cover"
          />
        </div>
      </section>

      <!-- 5. Como Funciona -->
      <section class="py-16 border-t anim-about">
        <div class="text-center mb-10">
          <h2 class="text-2xl sm:text-3xl font-bold tracking-tight">Como Funciona</h2>
          <p class="text-muted-foreground mt-2">Simples, rápido e colaborativo</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card v-for="(step, i) in [
            { num: '01', title: 'Encontre', desc: 'Busque coletâneas por nome, categoria ou o que estiver em destaque na comunidade.' },
            { num: '02', title: 'Baixe', desc: 'Um clique para baixar e usar na sua próxima culto. Sem cadastro necessário para baixar.' },
            { num: '03', title: 'Contribua', desc: 'Crie uma conta e envie suas próprias coletâneas para ajudar outras igrejas.' },
          ]" :key="i" class="p-6 text-center space-y-3">
            <CardContent class="pt-0 pb-0 px-0">
              <div class="text-4xl font-black text-primary/20 mb-2">{{ step.num }}</div>
              <h3 class="font-bold text-lg">{{ step.title }}</h3>
              <p class="text-sm text-muted-foreground">{{ step.desc }}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <!-- 6. CTA Final -->
      <section class="py-16 border-t text-center anim-about">
        <h2 class="text-2xl sm:text-3xl font-bold tracking-tight mb-3">Pronto para fazer parte?</h2>
        <p class="text-muted-foreground mb-8 max-w-xl mx-auto">
          Junte-se a centenas de voluntários de mídia de igrejas adventistas que já usam a LJA Community.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" as-child>
            <NuxtLink to="/auth/register">Criar Conta Grátis <ArrowRight class="ml-2 h-4 w-4" /></NuxtLink>
          </Button>
          <Button size="lg" variant="outline" as-child>
            <NuxtLink to="/collections">Explorar Coletâneas</NuxtLink>
          </Button>
        </div>
      </section>

    </div>
  </div>
</template>
