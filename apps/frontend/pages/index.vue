<script setup lang="ts">
import { ArrowRight, Download, ChevronUp, Upload, Users, Wrench, RefreshCw } from 'lucide-vue-next'

const user = useSupabaseUser()
const { trending, recent, trendingPending, recentPending, trendingError, recentError, fetchTrending, fetchRecent } = useCollections()

onMounted(() => Promise.all([fetchTrending(), fetchRecent()]))
</script>

<template>
  <div class="flex flex-col">

    <!-- ─── Hero ─────────────────────────────────────────────── -->
    <section class="relative overflow-hidden">

      <!-- Ambient background glow -->
      <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div class="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-20"
          style="background: radial-gradient(circle, hsl(33 80% 57%) 0%, transparent 70%); filter: blur(80px);" />
        <div class="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full opacity-10"
          style="background: radial-gradient(circle, hsl(220 80% 60%) 0%, transparent 70%); filter: blur(80px);" />
      </div>

      <!-- Subtle grain layer -->
      <div class="absolute inset-0 opacity-30 pointer-events-none"
        style="background-image: url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E&quot;); background-repeat: repeat; mix-blend-mode: overlay;"
        aria-hidden="true" />

      <div class="site-container relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16 md:py-24 lg:py-28">

          <!-- Left: text -->
          <div class="flex flex-col items-center lg:items-start text-center lg:text-left stagger">

            <!-- Version badge -->
            <div class="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-primary mb-7">
              <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
              Comunidade aberta · v2.0
            </div>

            <!-- Headline — large Fraunces display -->
            <h1 class="font-display font-semibold leading-[1.06] tracking-tight text-foreground mb-6"
              style="font-size: clamp(2.75rem, 6vw, 4.5rem);">
              Recursos para<br />
              <em class="text-primary not-italic">Louvor</em> e<br />
              Adoração
            </h1>

            <p class="text-base md:text-lg text-muted-foreground leading-relaxed max-w-md mb-9">
              Coletâneas, ferramentas e projetos criados pela comunidade LouvorJA —
              para facilitar a mídia e o ministério de louvor na sua igreja.
            </p>

            <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <NuxtLink
                to="/collections"
                class="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Ver Coletâneas <ArrowRight class="h-4 w-4" />
              </NuxtLink>
              <NuxtLink
                :to="user ? '/collections/upload' : '/auth/login'"
                class="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/[0.06] border border-white/[0.1] text-foreground font-semibold text-sm hover:bg-white/[0.1] transition-all"
              >
                <Upload class="h-4 w-4" /> Enviar Coletânea
              </NuxtLink>
            </div>

            <!-- Micro stats -->
            <div class="flex items-center gap-6 mt-9 pt-7 border-t border-white/[0.07] w-full">
              <div class="text-center">
                <p class="font-display font-semibold text-2xl text-primary leading-none">∞</p>
                <p class="text-xs text-muted-foreground mt-1">Coletâneas</p>
              </div>
              <div class="w-px h-8 bg-white/[0.08]" />
              <div class="text-center">
                <p class="font-display font-semibold text-2xl text-primary leading-none">100%</p>
                <p class="text-xs text-muted-foreground mt-1">Gratuito</p>
              </div>
              <div class="w-px h-8 bg-white/[0.08]" />
              <div class="text-center">
                <p class="font-display font-semibold text-2xl text-primary leading-none">Open</p>
                <p class="text-xs text-muted-foreground mt-1">Source</p>
              </div>
            </div>
          </div>

          <!-- Right: hero image -->
          <div class="hidden lg:flex justify-center items-center relative">
            <!-- Glow behind image -->
            <div class="absolute w-[80%] h-[80%] rounded-full opacity-25"
              style="background: radial-gradient(circle, hsl(33 80% 57%) 0%, transparent 65%); filter: blur(60px); z-index: 0;" />
            <!-- Image frame -->
            <div class="relative z-10 w-full max-w-[480px]">
              <div class="absolute -inset-1 rounded-3xl opacity-40"
                style="background: linear-gradient(135deg, hsl(33 80% 57% / 0.4), transparent 60%); filter: blur(12px);" />
              <img
                src="~assets/images/home/home.png"
                alt="LJA Community"
                class="relative w-full rounded-2xl object-contain drop-shadow-2xl"
                style="transform: rotate(1.5deg);"
              />
            </div>
          </div>

        </div>
      </div>

      <!-- Bottom fade -->
      <div class="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style="background: linear-gradient(to bottom, transparent, hsl(232 18% 6%));" />
    </section>

    <!-- ─── Discovery Grid ────────────────────────────────────── -->
    <section class="site-container py-14 md:py-20">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <!-- Trending (2/3) -->
        <div class="lg:col-span-2">
          <div class="flex items-center justify-between mb-6">
            <h2 class="font-display text-xl md:text-2xl font-semibold">Destaques da Comunidade</h2>
            <NuxtLink
              to="/collections?sort=popular"
              class="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 shrink-0"
            >
              Ver todas <ArrowRight class="h-3 w-3" />
            </NuxtLink>
          </div>

          <!-- Skeleton -->
          <div v-if="trendingPending" class="space-y-3">
            <div v-for="i in 4" :key="i" class="skeleton h-[76px] rounded-xl" />
          </div>

          <!-- Error / Empty -->
          <div
            v-else-if="trendingError || trending.length === 0"
            class="rounded-xl border border-dashed border-white/[0.08] p-10 text-center"
          >
            <p class="text-sm text-muted-foreground">
              {{ trendingError ? 'Não foi possível carregar. Backend offline?' : 'Nenhuma coletânea em destaque ainda.' }}
            </p>
            <NuxtLink to="/collections" class="inline-block mt-3 text-sm text-primary hover:underline">
              Ver todas as coletâneas
            </NuxtLink>
          </div>

          <!-- Cards -->
          <div v-else class="space-y-2.5">
            <NuxtLink
              v-for="(collection, idx) in trending"
              :key="collection.id"
              :to="`/collections/${collection.id}`"
              class="card-glow flex items-center gap-4 p-4 md:p-5 rounded-xl bg-card group block"
              :style="`animation-delay: ${idx * 60}ms`"
            >
              <!-- Rank number -->
              <div class="shrink-0 w-7 text-center">
                <span class="font-display font-bold text-sm"
                  :class="idx === 0 ? 'text-primary' : 'text-muted-foreground/40'">
                  {{ (idx + 1).toString().padStart(2, '0') }}
                </span>
              </div>

              <!-- Upvote block (desktop) -->
              <div class="hidden sm:flex flex-col items-center justify-center min-w-[52px] py-2 px-2.5 rounded-lg bg-white/[0.04] border border-white/[0.06] group-hover:border-primary/25 transition-colors shrink-0">
                <ChevronUp class="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span class="font-semibold text-xs leading-tight mt-0.5">{{ collection.upvotes || 0 }}</span>
              </div>

              <!-- Content -->
              <div class="flex-1 min-w-0">
                <h3 class="font-medium text-sm md:text-base group-hover:text-primary transition-colors leading-snug truncate">
                  {{ collection.title }}
                </h3>
                <div class="flex items-center gap-2 mt-0.5">
                  <p class="text-xs text-muted-foreground truncate">por {{ collection.author }}</p>
                  <span v-for="tag in collection.tags?.slice(0, 1)" :key="tag" class="badge text-[10px] shrink-0">{{ tag }}</span>
                </div>
              </div>

              <!-- Stats -->
              <div class="shrink-0 flex items-center gap-3 md:gap-4 text-xs text-muted-foreground">
                <span class="hidden sm:flex items-center gap-1">
                  <Download class="h-3 w-3" /> {{ collection.downloads || 0 }}
                </span>
                <span class="sm:hidden flex items-center gap-1 font-semibold text-foreground">
                  <ChevronUp class="h-3 w-3" /> {{ collection.upvotes || 0 }}
                </span>
                <span class="hidden md:inline text-primary/60 font-medium group-hover:text-primary transition-colors">
                  Acessar →
                </span>
              </div>
            </NuxtLink>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1 flex flex-col gap-5">
          <div>
            <h2 class="font-display text-xl font-semibold mb-5">Recentes</h2>

            <div v-if="recentPending" class="space-y-2">
              <div v-for="i in 4" :key="i" class="skeleton h-14 rounded-xl" />
            </div>

            <div v-else-if="recentError || recent.length === 0"
              class="rounded-xl border border-dashed border-white/[0.08] p-6 text-center text-sm text-muted-foreground">
              Nenhuma coletânea recente.
            </div>

            <div v-else class="space-y-2">
              <NuxtLink
                v-for="collection in recent"
                :key="collection.id"
                :to="`/collections/${collection.id}`"
                class="card-glow flex items-center justify-between gap-3 p-3.5 rounded-xl bg-card group block"
              >
                <div class="min-w-0 flex-1">
                  <h4 class="text-sm font-medium leading-snug truncate group-hover:text-primary transition-colors">
                    {{ collection.title }}
                  </h4>
                  <p class="text-xs text-muted-foreground truncate mt-0.5">{{ collection.author }}</p>
                </div>
                <div class="shrink-0 flex items-center gap-1 text-xs text-muted-foreground">
                  <ChevronUp class="h-3 w-3" /> {{ collection.upvotes || 0 }}
                </div>
              </NuxtLink>
            </div>
          </div>

          <!-- Contribute CTA -->
          <div class="rounded-xl border border-primary/20 bg-primary/8 p-5">
            <h3 class="font-display font-semibold text-base mb-1.5">Compartilhe seu trabalho</h3>
            <p class="text-xs text-muted-foreground leading-relaxed mb-4">
              Ajude a comunidade fazendo upload das suas coletâneas.
            </p>
            <NuxtLink
              :to="user ? '/collections/upload' : '/auth/register'"
              class="block text-center py-2.5 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Fazer Upload
            </NuxtLink>
          </div>
        </div>

      </div>
    </section>

    <!-- ─── Values ─────────────────────────────────────────────── -->
    <section class="border-y border-white/[0.06]">
      <div class="site-container py-16 md:py-20">
        <div class="text-center mb-12">
          <h2 class="font-display text-3xl md:text-4xl font-semibold">Por que usar a LJA Community?</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 stagger">
          <div
            v-for="(value, i) in [
              {
                icon: Users,
                title: 'Comunidade',
                desc: 'Somos uma comunidade crescente de pessoas que amam o Louvor JA e querem contribuir colaborativamente.',
              },
              {
                icon: Wrench,
                title: 'Ferramentas de Mídia',
                desc: 'As melhores compilações de ferramentas para facilitar a mídia da sua congregação.',
              },
              {
                icon: RefreshCw,
                title: 'Atualizações Constantes',
                desc: 'Trabalho open-source diário trazendo novas ferramentas e correções contínuas.',
              },
            ]"
            :key="i"
            class="group flex flex-col gap-4 p-6 rounded-2xl bg-card border border-white/[0.06] hover:border-primary/20 transition-all"
          >
            <div class="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
              <component :is="value.icon" class="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 class="font-display font-semibold text-base mb-2">{{ value.title }}</h3>
              <p class="text-sm text-muted-foreground leading-relaxed">{{ value.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── FAQ ────────────────────────────────────────────────── -->
    <section class="site-container py-20 md:py-24">
      <div class="max-w-2xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="font-display text-3xl md:text-4xl font-semibold mb-3">Perguntas Frequentes</h2>
          <p class="text-muted-foreground text-sm">Dúvidas comuns sobre o LJA Community.</p>
        </div>

        <div class="space-y-2">
          <details
            v-for="(faq, i) in [
              {
                q: 'Ainda não tem uma conta?',
                a: 'Crie uma conta agora mesmo e comece a contribuir com coletâneas e ferramentas.',
                link: { to: '/auth/register', label: 'Criar Conta' },
              },
              {
                q: 'Esse é o site oficial do Louvor JA?',
                a: 'Não. LJA Community é um projeto independente feito pela comunidade. O site oficial é louvorja.com.br.',
                href: 'https://louvorja.com.br/',
              },
              {
                q: 'Por que preciso ter conta para fazer uploads?',
                a: 'A conta garante que você pode editar ou remover suas coletâneas futuramente, mantendo a qualidade do conteúdo compartilhado.',
              },
              {
                q: 'Como posso contribuir com esse projeto?',
                a: 'Como Usuário: adicionando coletâneas e indicando ferramentas. Como Desenvolvedor: entre no Telegram Oficial do grupo de devs.',
                telegram: true,
              },
            ]"
            :key="i"
            class="group rounded-xl border border-white/[0.07] bg-card overflow-hidden open:border-primary/20 transition-colors"
          >
            <summary
              class="flex items-center justify-between px-5 py-4 cursor-pointer select-none list-none"
            >
              <span class="text-sm font-medium group-open:text-primary transition-colors">{{ faq.q }}</span>
              <svg
                class="h-4 w-4 text-muted-foreground shrink-0 ml-4 transition-transform duration-200 group-open:rotate-45"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </summary>
            <div class="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-white/[0.06] pt-4">
              {{ faq.a }}
              <template v-if="faq.link">
                <br />
                <NuxtLink :to="faq.link.to" class="text-primary hover:underline font-medium mt-2 inline-block">
                  {{ faq.link.label }}
                </NuxtLink>
              </template>
              <template v-if="faq.href">
                <br />
                <a :href="faq.href" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline font-medium mt-2 inline-block">
                  louvorja.com.br
                </a>
              </template>
              <template v-if="faq.telegram">
                <br />
                <a href="https://louvorja.com.br/telegram_dev" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline font-medium mt-2 inline-block">
                  Telegram Oficial
                </a>
              </template>
            </div>
          </details>
        </div>
      </div>
    </section>

  </div>
</template>
