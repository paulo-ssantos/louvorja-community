<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Search, Star, GitFork, ExternalLink, Plus, Code2, MessageCircle } from 'lucide-vue-next'

const searchQuery = ref('')
const selectedLanguage = ref('')
const projects = ref<any[]>([])
const loading = ref(false)

const API_URL = 'http://localhost:3001'

const languages = ['', 'JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'Rust', 'Outro']

const langLabels: Record<string, string> = {
  '': 'Todas',
  JavaScript: 'JS',
  TypeScript: 'TS',
  Python: 'Py',
  Java: 'Java',
  Go: 'Go',
  Rust: 'Rust',
  Outro: 'Outro',
}

const filteredProjects = computed(() => {
  let result = projects.value
  if (selectedLanguage.value) result = result.filter(p => p.language === selectedLanguage.value)
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(p => p.name?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q))
  }
  return result
})

async function fetchProjects() {
  loading.value = true
  try {
    const response = await fetch(`${API_URL}/developer/projects`)
    const data = await response.json()
    projects.value = data.data || data
  } catch {}
  finally { loading.value = false }
}

onMounted(fetchProjects)
</script>

<template>
  <div class="min-h-screen">
    <div class="site-container py-10">

      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 mb-10">
        <div>
          <h1 class="font-display text-4xl font-semibold tracking-tight mb-1">Developer Hub</h1>
          <p class="text-muted-foreground text-sm">Projetos open-source da comunidade LouvorJA</p>
        </div>
        <NuxtLink
          to="/developer/submit"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors shrink-0"
        >
          <Plus class="h-4 w-4" /> Submeter Projeto
        </NuxtLink>
      </div>

      <!-- Community banner -->
      <div class="rounded-xl bg-card border border-white/[0.07] p-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-primary/12 border border-primary/20 flex items-center justify-center shrink-0">
          <MessageCircle class="h-4 w-4 text-primary" />
        </div>
        <p class="text-sm text-muted-foreground leading-relaxed">
          Contribua com código, issues ou ideias. Participe do
          <a href="https://louvorja.com.br/telegram_dev" target="_blank" rel="noopener noreferrer" class="text-primary font-medium hover:underline">
            grupo de devs no Telegram
          </a>
          para colaborar com a comunidade.
        </p>
      </div>

      <!-- Search + language filter -->
      <div class="flex flex-col gap-4 mb-8">
        <div class="relative">
          <Search class="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar projetos..."
            class="w-full h-11 pl-11 pr-4 rounded-xl bg-card border border-white/[0.08] text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
          />
        </div>
        <div class="flex items-center gap-1.5 flex-wrap">
          <button
            v-for="lang in languages"
            :key="lang"
            class="px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all"
            :class="selectedLanguage === lang
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-card border-white/[0.08] text-muted-foreground hover:text-foreground hover:border-white/20'"
            @click="selectedLanguage = lang"
          >
            {{ langLabels[lang] || lang }}
          </button>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="space-y-4">
        <div v-for="i in 4" :key="i" class="skeleton h-28 rounded-xl" />
      </div>

      <!-- Empty -->
      <div v-else-if="filteredProjects.length === 0" class="flex flex-col items-center py-24 text-center">
        <div class="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
          <Code2 class="h-6 w-6 text-muted-foreground" />
        </div>
        <p class="font-medium mb-1">Nenhum projeto encontrado</p>
        <p class="text-sm text-muted-foreground mb-5">Seja o primeiro a submeter um projeto open-source.</p>
        <NuxtLink
          to="/developer/submit"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
        >
          Submeter Projeto
        </NuxtLink>
      </div>

      <!-- Project list -->
      <div v-else class="space-y-3 stagger">
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="card-glow rounded-xl bg-card p-5"
        >
          <div class="flex flex-col sm:flex-row justify-between items-start gap-4">
            <!-- Left: info -->
            <div class="flex-1 min-w-0">
              <div class="flex flex-wrap items-center gap-2 mb-2">
                <NuxtLink
                  :to="`/developer-hub/${project.id}`"
                  class="font-semibold text-primary hover:underline text-base leading-snug"
                >
                  {{ project.name }}
                </NuxtLink>
                <span v-if="project.language" class="badge-amber badge text-xs">{{ project.language }}</span>
              </div>
              <p class="text-sm text-muted-foreground leading-relaxed line-clamp-2">{{ project.description }}</p>
            </div>

            <!-- Right: stats + link -->
            <div class="flex items-center gap-4 shrink-0">
              <span class="flex items-center gap-1 text-sm text-muted-foreground">
                <Star class="h-4 w-4" /> {{ project.stars || 0 }}
              </span>
              <span class="flex items-center gap-1 text-sm text-muted-foreground">
                <GitFork class="h-4 w-4" /> {{ project.forks || 0 }}
              </span>
              <a
                v-if="project.repository_url"
                :href="project.repository_url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Repo <ExternalLink class="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div class="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-muted-foreground flex-wrap gap-2">
            <span>por <strong class="text-foreground/80">{{ project.author || 'Comunidade' }}</strong></span>
            <span v-if="project.updated_at">
              Atualizado {{ new Date(project.updated_at).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' }) }}
            </span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
