<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Search, ExternalLink, Plus, Wrench } from 'lucide-vue-next'

const selectedCategory = ref('')
const searchQuery = ref('')
const tools = ref<any[]>([])
const loading = ref(false)

const API_URL = 'http://localhost:3001'

const categories = [
  { value: '', label: 'Todas' },
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
  } catch {}
  finally { loading.value = false }
}

async function trackClick(e: Event, toolId: string) {
  try { await fetch(`${API_URL}/tools/${toolId}/click`, { method: 'POST' }) } catch {}
}

onMounted(fetchTools)
</script>

<template>
  <div class="min-h-screen">
    <div class="site-container py-10">

      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 mb-10">
        <div>
          <h1 class="font-display text-4xl font-semibold tracking-tight mb-1">Ferramentas</h1>
          <p class="text-muted-foreground text-sm">Recursos curados pela comunidade para a mídia da sua igreja</p>
        </div>
        <NuxtLink
          to="/tools/submit"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors shrink-0"
        >
          <Plus class="h-4 w-4" /> Indicar Ferramenta
        </NuxtLink>
      </div>

      <!-- Search + categories -->
      <div class="flex flex-col gap-4 mb-8">
        <div class="relative">
          <Search class="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar ferramentas..."
            class="w-full h-11 pl-11 pr-4 rounded-xl bg-card border border-white/[0.08] text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
          />
        </div>
        <div class="flex items-center gap-1.5 flex-wrap">
          <button
            v-for="cat in categories"
            :key="cat.value"
            class="px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all"
            :class="selectedCategory === cat.value
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-card border-white/[0.08] text-muted-foreground hover:text-foreground hover:border-white/20'"
            @click="selectedCategory = cat.value"
          >
            {{ cat.label }}
          </button>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div v-for="i in 6" :key="i" class="skeleton h-40 rounded-xl" />
      </div>

      <!-- Empty -->
      <div v-else-if="filteredTools.length === 0" class="flex flex-col items-center py-24 text-center">
        <div class="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
          <Wrench class="h-6 w-6 text-muted-foreground" />
        </div>
        <p class="font-medium mb-1">Nenhuma ferramenta encontrada</p>
        <p class="text-sm text-muted-foreground mb-5">Seja o primeiro a indicar uma ferramenta útil para a comunidade.</p>
        <NuxtLink
          to="/tools/submit"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
        >
          Indicar Ferramenta
        </NuxtLink>
      </div>

      <!-- Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
        <div
          v-for="tool in filteredTools"
          :key="tool.id"
          class="card-glow flex flex-col rounded-xl bg-card p-5 gap-3"
        >
          <!-- Icon + name + badge -->
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <Wrench class="h-4 w-4 text-primary" />
              </div>
              <h3 class="font-medium text-sm leading-snug">{{ tool.name }}</h3>
            </div>
            <span v-if="tool.category" class="badge shrink-0">{{ tool.category }}</span>
          </div>

          <p class="text-sm text-muted-foreground flex-1 leading-relaxed line-clamp-3">{{ tool.description }}</p>

          <!-- Footer -->
          <div class="flex items-center justify-between pt-3 border-t border-white/[0.06]">
            <a
              :href="tool.url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              @click="trackClick($event, tool.id)"
            >
              Acessar <ExternalLink class="h-3.5 w-3.5" />
            </a>
            <span class="text-xs text-muted-foreground">por {{ tool.author || 'Comunidade' }}</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
