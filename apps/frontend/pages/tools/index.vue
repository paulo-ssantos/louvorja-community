<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, ExternalLink, Plus } from 'lucide-vue-next'

const user = useSupabaseUser()
const selectedCategory = ref('')
const searchQuery = ref('')
const tools = ref<any[]>([])
const loading = ref(false)

const API_URL = 'http://localhost:3000'

const categories = [
  { value: 'imagem', label: 'Imagem' },
  { value: 'video', label: 'Vídeo' },
  { value: 'audio', label: 'Áudio' },
  { value: 'streaming', label: 'Streaming' },
  { value: 'apresentacao', label: 'Apresentação' },
  { value: 'outros', label: 'Outros' },
]

const filteredTools = computed(() => {
  let result = tools.value
  if (selectedCategory.value) result = result.filter(t => t.category === selectedCategory.value)
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(t => t.name?.toLowerCase().includes(q) || t.description?.toLowerCase().includes(q))
  }
  return result
})

async function fetchTools() {
  loading.value = true
  try {
    const response = await fetch(`${API_URL}/tools`)
    const data = await response.json()
    tools.value = data.data || data
  } catch (e) { console.error('Falha ao carregar ferramentas:', e) }
  finally { loading.value = false }
}

async function trackClick(toolId: string) {
  try { await fetch(`${API_URL}/tools/${toolId}/click`, { method: 'POST' }) } catch {}
}

onMounted(fetchTools)
</script>

<template>
  <div class="min-h-screen bg-background">
    <div class="max-w-6xl mx-auto px-4 py-10">

      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Ferramentas</h1>
          <p class="text-muted-foreground mt-1">Recursos curados pela comunidade para facilitar a mídia da sua igreja</p>
        </div>
        <Button as-child>
          <NuxtLink to="/tools/submit">
            <Plus class="mr-2 h-4 w-4" /> Indicar Ferramenta
          </NuxtLink>
        </Button>
      </div>

      <!-- Search & Filter -->
      <div class="flex flex-col sm:flex-row gap-4 mb-8">
        <div class="relative flex-1">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input v-model="searchQuery" placeholder="Buscar ferramentas..." class="pl-9" />
        </div>
        <select
          v-model="selectedCategory"
          class="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">Todas as categorias</option>
          <option v-for="cat in categories" :key="cat.value" :value="cat.value">{{ cat.label }}</option>
        </select>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-16 text-muted-foreground">Carregando ferramentas...</div>

      <!-- Empty -->
      <div v-else-if="filteredTools.length === 0" class="text-center py-16">
        <p class="text-muted-foreground mb-4">Nenhuma ferramenta encontrada. Seja o primeiro a indicar!</p>
        <Button as-child><NuxtLink to="/tools/submit">Indicar Ferramenta</NuxtLink></Button>
      </div>

      <!-- Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          v-for="tool in filteredTools"
          :key="tool.id"
          class="p-6 flex flex-col gap-3 hover:shadow-md hover:border-primary/40 transition-all"
        >
          <div class="flex justify-between items-start gap-2">
            <h3 class="font-semibold text-base leading-tight">{{ tool.name }}</h3>
            <span v-if="tool.category" class="shrink-0 inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold text-muted-foreground bg-muted/30">
              {{ tool.category }}
            </span>
          </div>
          <p class="text-sm text-muted-foreground flex-1">{{ tool.description }}</p>
          <div class="flex items-center justify-between pt-2 border-t border-border/50 text-sm">
            <a
              :href="tool.url"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-1 text-primary hover:underline font-medium"
              @click="trackClick(tool.id)"
            >
              Acessar <ExternalLink class="h-3.5 w-3.5" />
            </a>
            <span class="text-muted-foreground text-xs">por {{ tool.author || 'Comunidade' }}</span>
          </div>
        </Card>
      </div>

    </div>
  </div>
</template>
