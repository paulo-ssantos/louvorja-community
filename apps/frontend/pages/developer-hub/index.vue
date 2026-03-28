<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, Star, GitFork, ExternalLink, Plus } from 'lucide-vue-next'

const user = useSupabaseUser()
const searchQuery = ref('')
const selectedLanguage = ref('')
const projects = ref<any[]>([])
const loading = ref(false)

const API_URL = 'http://localhost:3000'

const languages = ['JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'Rust', 'Outro']

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
  } catch (e) { console.error('Falha ao carregar projetos:', e) }
  finally { loading.value = false }
}

onMounted(fetchProjects)
</script>

<template>
  <div class="min-h-screen bg-background">
    <div class="max-w-5xl mx-auto px-4 py-10">

      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Developer Hub</h1>
          <p class="text-muted-foreground mt-1">Projetos open-source da comunidade LouvorJA para contribuir e colaborar</p>
        </div>
        <Button as-child>
          <NuxtLink to="/developer/submit">
            <Plus class="mr-2 h-4 w-4" /> Submeter Projeto
          </NuxtLink>
        </Button>
      </div>

      <!-- Info Banner -->
      <div class="rounded-lg border bg-muted/30 px-5 py-4 mb-8 text-sm text-muted-foreground">
        💡 Aqui você encontra projetos da comunidade para igrejas adventistas. Contribua com código, issues ou ideias.
        Acesse o <a href="https://louvorja.com.br/telegram_dev" target="_blank" rel="noopener noreferrer" class="text-primary font-medium hover:underline">Telegram Oficial</a> para se juntar ao grupo de devs.
      </div>

      <!-- Search & Filter -->
      <div class="flex flex-col sm:flex-row gap-4 mb-8">
        <div class="relative flex-1">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input v-model="searchQuery" placeholder="Buscar projetos..." class="pl-9" />
        </div>
        <select
          v-model="selectedLanguage"
          class="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">Todas as linguagens</option>
          <option v-for="lang in languages" :key="lang" :value="lang">{{ lang }}</option>
        </select>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-16 text-muted-foreground">Carregando projetos...</div>

      <!-- Empty -->
      <div v-else-if="filteredProjects.length === 0" class="text-center py-16">
        <p class="text-muted-foreground mb-4">Nenhum projeto encontrado. Seja o primeiro a contribuir!</p>
        <Button as-child><NuxtLink to="/developer/submit">Submeter Projeto</NuxtLink></Button>
      </div>

      <!-- Project List (GitHub style) -->
      <div v-else class="space-y-4">
        <Card
          v-for="project in filteredProjects"
          :key="project.id"
          class="p-5 hover:border-primary/40 hover:shadow-sm transition-all"
        >
          <div class="flex flex-col sm:flex-row justify-between items-start gap-3">
            <div class="flex-1 min-w-0">
              <div class="flex flex-wrap items-center gap-2 mb-1">
                <NuxtLink
                  :to="`/developer-hub/${project.id}`"
                  class="text-base font-semibold text-primary hover:underline truncate"
                >
                  {{ project.name }}
                </NuxtLink>
                <span v-if="project.language" class="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold text-muted-foreground bg-muted/30">
                  {{ project.language }}
                </span>
              </div>
              <p class="text-sm text-muted-foreground line-clamp-2">{{ project.description }}</p>
            </div>
            <div class="flex items-center gap-4 text-sm text-muted-foreground shrink-0">
              <span class="flex items-center gap-1"><Star class="h-4 w-4" /> {{ project.stars || 0 }}</span>
              <span class="flex items-center gap-1"><GitFork class="h-4 w-4" /> {{ project.forks || 0 }}</span>
              <a
                v-if="project.repository_url"
                :href="project.repository_url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-1 text-primary hover:underline font-medium"
              >
                Repositório <ExternalLink class="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
          <div class="mt-3 pt-3 border-t text-xs text-muted-foreground flex items-center justify-between flex-wrap gap-2">
            <span>por <strong class="text-foreground">{{ project.author || 'Comunidade' }}</strong></span>
            <span v-if="project.updated_at">Atualizado em {{ new Date(project.updated_at).toLocaleDateString('pt-BR') }}</span>
          </div>
        </Card>
      </div>

    </div>
  </div>
</template>
