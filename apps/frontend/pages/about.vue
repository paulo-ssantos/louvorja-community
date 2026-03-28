<script setup lang="ts">
import { ArrowRight, Heart, Users, Download } from 'lucide-vue-next'
</script>

<template>
  <div class="min-h-screen">

    <!-- ─── Hero ─────────────────────────────────────────────── -->
    <section class="relative overflow-hidden border-b border-white/[0.06]">
      <!-- Ambient glow -->
      <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-15"
          style="background: radial-gradient(ellipse, hsl(33 80% 57%) 0%, transparent 70%); filter: blur(80px);" />
      </div>

      <div class="site-container py-20 md:py-28 text-center relative z-10 stagger">
        <span class="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-primary mb-7">
          <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
          LJA Community v2.0
        </span>
        <h1 class="font-display font-semibold tracking-tight mb-6"
          style="font-size: clamp(2.5rem, 6vw, 4.5rem); line-height: 1.06;">
          Sobre a <em class="text-primary not-italic">LJA Community</em>
        </h1>
        <p class="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Nascemos da necessidade de centralizar os recursos do Louvor JA e facilitar a rotina
          das equipes de mídia em igrejas adventistas por todo o Brasil.
        </p>
      </div>
    </section>

    <!-- ─── Mission ──────────────────────────────────────────── -->
    <section class="site-container py-16 md:py-24">
      <div class="max-w-3xl mx-auto text-center stagger">
        <h2 class="font-display text-3xl md:text-4xl font-semibold mb-6">Nossa Missão</h2>
        <p class="text-base md:text-lg text-muted-foreground leading-relaxed mb-10">
          Antes da LJA Community, as coletâneas do Louvor JA eram compartilhadas por grupos de WhatsApp —
          dispersas, difíceis de encontrar e sem controle de versão. Nossa missão é transformar isso em
          um ecossistema organizado, colaborativo e acessível para todas as igrejas.
        </p>
        <div class="flex flex-wrap justify-center gap-4 md:gap-8">
          <div class="flex items-center gap-2 text-sm text-muted-foreground">
            <div class="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <Heart class="h-3.5 w-3.5 text-primary" />
            </div>
            Feito com amor pela comunidade
          </div>
          <div class="flex items-center gap-2 text-sm text-muted-foreground">
            <div class="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users class="h-3.5 w-3.5 text-primary" />
            </div>
            Para equipes de mídia adventistas
          </div>
          <div class="flex items-center gap-2 text-sm text-muted-foreground">
            <div class="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <Download class="h-3.5 w-3.5 text-primary" />
            </div>
            Download gratuito e sem burocracia
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Feature: Upload ───────────────────────────────────── -->
    <section class="border-t border-white/[0.06]">
      <div class="site-container py-14 md:py-20">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          <!-- Image — left on desktop -->
          <div class="relative order-2 lg:order-1">
            <!-- Glow behind image -->
            <div class="absolute -inset-4 rounded-3xl opacity-20"
              style="background: radial-gradient(ellipse at center, hsl(33 80% 57%) 0%, transparent 65%); filter: blur(40px);" />
            <div class="relative">
              <img
                src="~assets/images/home/home2.png"
                alt="Armazene suas coletâneas na nuvem"
                class="w-full rounded-2xl object-cover shadow-2xl border border-white/[0.08]"
                style="transform: rotate(-1.5deg);"
              />
            </div>
          </div>

          <!-- Text — right on desktop -->
          <div class="flex flex-col gap-5 order-1 lg:order-2 stagger">
            <div class="inline-flex">
              <span class="badge-amber badge">Armazenamento</span>
            </div>
            <h2 class="font-display text-3xl md:text-4xl font-semibold leading-tight">
              Armazene suas Coletâneas na Nuvem
            </h2>
            <p class="text-muted-foreground leading-relaxed">
              Faça upload das suas músicas criadas para o Louvor JA e armazene na nuvem.
              Acesse de qualquer lugar, a qualquer momento, em qualquer dispositivo.
            </p>
            <ul class="space-y-2.5 text-sm text-muted-foreground">
              <li class="flex items-center gap-2.5">
                <span class="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0 text-primary text-[10px] font-bold">✓</span>
                Upload de arquivos ZIP, RAR e 7Z
              </li>
              <li class="flex items-center gap-2.5">
                <span class="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0 text-primary text-[10px] font-bold">✓</span>
                Até 100MB por coletânea
              </li>
              <li class="flex items-center gap-2.5">
                <span class="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0 text-primary text-[10px] font-bold">✓</span>
                Link permanente para compartilhar
              </li>
            </ul>
            <div>
              <NuxtLink
                to="/collections/upload"
                class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all hover:scale-[1.02]"
              >
                Fazer Upload <ArrowRight class="h-4 w-4" />
              </NuxtLink>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ─── Feature: Browse ───────────────────────────────────── -->
    <section class="border-t border-white/[0.06] bg-card/30">
      <div class="site-container py-14 md:py-20">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          <!-- Text — left -->
          <div class="flex flex-col gap-5 stagger">
            <div class="inline-flex">
              <span class="badge-amber badge">Acervo</span>
            </div>
            <h2 class="font-display text-3xl md:text-4xl font-semibold leading-tight">
              Acesse as Coletâneas da Comunidade
            </h2>
            <p class="text-muted-foreground leading-relaxed">
              Veja as músicas criadas pela comunidade do Louvor JA e faça o download para usar
              na sua Igreja — de graça e sem complicação. Sem cadastro para baixar.
            </p>
            <ul class="space-y-2.5 text-sm text-muted-foreground">
              <li class="flex items-center gap-2.5">
                <span class="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0 text-primary text-[10px] font-bold">✓</span>
                Filtro por categoria e ordenação
              </li>
              <li class="flex items-center gap-2.5">
                <span class="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0 text-primary text-[10px] font-bold">✓</span>
                Sistema de votos e avaliações
              </li>
              <li class="flex items-center gap-2.5">
                <span class="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0 text-primary text-[10px] font-bold">✓</span>
                Download direto, sem cadastro
              </li>
            </ul>
            <div>
              <NuxtLink
                to="/collections"
                class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all hover:scale-[1.02]"
              >
                Ver Coletâneas <ArrowRight class="h-4 w-4" />
              </NuxtLink>
            </div>
          </div>

          <!-- Image — right -->
          <div class="relative">
            <div class="absolute -inset-4 rounded-3xl opacity-20"
              style="background: radial-gradient(ellipse at center, hsl(220 80% 60%) 0%, transparent 65%); filter: blur(40px);" />
            <div class="relative">
              <img
                src="~assets/images/home/home3.png"
                alt="Acesse as coletâneas da comunidade"
                class="w-full rounded-2xl object-cover shadow-2xl border border-white/[0.08]"
                style="transform: rotate(1.5deg);"
              />
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ─── How it works ─────────────────────────────────────── -->
    <section class="border-t border-white/[0.06]">
      <div class="site-container py-16 md:py-24">
        <div class="text-center mb-14">
          <h2 class="font-display text-3xl md:text-4xl font-semibold mb-3">Como Funciona</h2>
          <p class="text-muted-foreground text-sm">Simples, rápido e colaborativo</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 stagger">
          <div
            v-for="(step, i) in [
              { num: '01', title: 'Encontre', desc: 'Busque coletâneas por nome, categoria ou veja o que está em destaque.' },
              { num: '02', title: 'Baixe', desc: 'Um clique para baixar e usar no próximo culto. Sem cadastro necessário.' },
              { num: '03', title: 'Contribua', desc: 'Crie uma conta e envie suas próprias coletâneas para ajudar outras igrejas.' },
            ]"
            :key="i"
            class="relative rounded-2xl bg-card border border-white/[0.07] p-7 overflow-hidden group hover:border-primary/20 transition-colors"
          >
            <!-- Large step number in background -->
            <div class="absolute -bottom-4 -right-2 font-display font-bold text-8xl text-white/[0.03] select-none pointer-events-none leading-none">
              {{ step.num }}
            </div>
            <div class="relative z-10 space-y-3">
              <span class="font-display text-xs font-semibold tracking-widest text-primary/60 uppercase">Passo {{ step.num }}</span>
              <h3 class="font-display font-semibold text-xl">{{ step.title }}</h3>
              <p class="text-sm text-muted-foreground leading-relaxed">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── CTA ───────────────────────────────────────────────── -->
    <section class="border-t border-white/[0.06]">
      <div class="site-container py-20 md:py-28">
        <div class="relative rounded-3xl bg-card border border-white/[0.07] overflow-hidden px-8 py-16 text-center">
          <!-- Background decoration -->
          <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] opacity-20"
            style="background: radial-gradient(ellipse, hsl(33 80% 57%) 0%, transparent 70%); filter: blur(60px);" />
          <div class="relative z-10">
            <h2 class="font-display text-3xl md:text-5xl font-semibold mb-4 tracking-tight">
              Pronto para fazer parte?
            </h2>
            <p class="text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
              Junte-se a centenas de voluntários de mídia de igrejas adventistas que já usam a LJA Community.
            </p>
            <div class="flex flex-col sm:flex-row justify-center gap-3">
              <NuxtLink
                to="/auth/register"
                class="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all hover:scale-[1.02]"
              >
                Criar Conta Grátis <ArrowRight class="h-4 w-4" />
              </NuxtLink>
              <NuxtLink
                to="/collections"
                class="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/[0.06] border border-white/[0.1] text-foreground font-semibold text-sm hover:bg-white/[0.1] transition-all"
              >
                Explorar Coletâneas
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
