<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { ChevronUp, Download, Search, Upload, SlidersHorizontal } from 'lucide-vue-next'

const user = useSupabaseUser()
const route = useRoute()
const searchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref((route.query.sort as string) || 'recent')
const collections = ref<any[]>([])
const loading = ref(false)

const API_URL = 'http://localhost:3001'

const categories = [
  { value: '', label: 'Todas' },
  { value: 'adoracao', label: 'Adoração' },
  { value: 'louvor', label: 'Louvor' },
  { value: 'meditacao', label: 'Meditação' },
  { value: 'especial', label: 'Especial' },
  { value: 'sazonal', label: 'Sazonal' },
]

const filteredCollections = computed(() => {
  if (!searchQuery.value) return collections.value
  const query = searchQuery.value.toLowerCase()
  return collections.value.filter(c =>
    c.name?.toLowerCase().includes(query) ||
    c.description?.toLowerCase().includes(query)
  )
})

async function fetchCollections() {
  loading.value = true
  try {
    const params = new URLSearchParams()
    if (selectedCategory.value) params.append('category', selectedCategory.value)
    params.append('sort', sortBy.value)
    const response = await fetch(`${API_URL}/collections?${params}`)
    const data = await response.json()
    collections.value = data.data || data
  } catch (error) {
    console.error('Falha ao carregar coletâneas:', error)
    collections.value = []
  } finally {
    loading.value = false
  }
}

async function handleVote(e: Event, collectionId: string) {
  e.preventDefault()
  if (!user.value) { navigateTo('/auth/login'); return }
  try {
    const response = await fetch(`${API_URL}/collections/${collectionId}/upvote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.value.id }),
    })
    const result = await response.json()
    const idx = collections.value.findIndex(c => c.id === collectionId)
    if (idx !== -1) {
      collections.value[idx].upvotes = result.upvoted
        ? (collections.value[idx].upvotes || 0) + 1
        : Math.max(0, (collections.value[idx].upvotes || 1) - 1)
    }
  } catch {}
}

watch([selectedCategory, sortBy], fetchCollections)
onMounted(fetchCollections)
</script>

<template>
  <div class="min-h-screen">
    <div class="site-container py-10">

      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 mb-10">
        <div>
          <h1 class="font-display text-4xl font-semibold tracking-tight mb-1">Coletâneas</h1>
          <p class="text-muted-foreground text-sm">Explore e baixe coletâneas criadas pela comunidade</p>
        </div>
        <NuxtLink
          to="/collections/upload"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors shrink-0"
        >
          <Upload class="h-4 w-4" /> Enviar Coletânea
        </NuxtLink>
      </div>

      <!-- Search & Filters -->
      <div class="flex flex-col gap-4 mb-8">
        <!-- Search -->
        <div class="relative">
          <Search class="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar coletâneas por nome ou descrição..."
            class="w-full h-11 pl-11 pr-4 rounded-xl bg-card border border-white/[0.08] text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
          />
        </div>

        <!-- Category chips + sort -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3">
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
          <div class="sm:ml-auto flex items-center gap-2 shrink-0">
            <SlidersHorizontal class="h-3.5 w-3.5 text-muted-foreground" />
            <select
              v-model="sortBy"
              class="bg-card border border-white/[0.08] text-sm text-foreground rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary/50 transition-all"
            >
              <option value="recent">Mais Recentes</option>
              <option value="popular">Mais Populares</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Loading skeletons -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div v-for="i in 6" :key="i" class="skeleton h-44 rounded-xl" />
      </div>

      <!-- Empty state -->
      <div v-else-if="filteredCollections.length === 0" class="flex flex-col items-center py-24 text-center">
        <div class="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
          <Search class="h-6 w-6 text-muted-foreground" />
        </div>
        <p class="font-medium mb-1">Nenhuma coletânea encontrada</p>
        <p class="text-sm text-muted-foreground mb-5">Seja o primeiro a enviar uma coletânea para a comunidade.</p>
        <NuxtLink
          to="/collections/upload"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
        >
          Enviar Coletânea
        </NuxtLink>
      </div>

      <!-- Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
        <NuxtLink
          v-for="collection in filteredCollections"
          :key="collection.id"
          :to="`/collections/${collection.id}`"
          class="card-glow group flex flex-col rounded-xl bg-card p-5 gap-3 block"
        >
          <!-- Top row -->
          <div class="flex items-start justify-between gap-2">
            <h3 class="font-medium text-sm leading-snug group-hover:text-primary transition-colors flex-1">
              {{ collection.name }}
            </h3>
            <span v-if="collection.category" class="badge shrink-0">{{ collection.category }}</span>
          </div>

          <p class="text-sm text-muted-foreground line-clamp-2 flex-1 leading-relaxed">
            {{ collection.description || 'Sem descrição.' }}
          </p>

          <!-- Footer -->
          <div class="flex items-center justify-between pt-3 border-t border-white/[0.06]">
            <span class="flex items-center gap-1 text-xs text-muted-foreground">
              <Download class="h-3.5 w-3.5" /> {{ collection.song_count || 0 }} músicas
            </span>
            <button
              class="flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-primary/10"
              @click="handleVote($event, collection.id)"
            >
              <ChevronUp class="h-4 w-4" /> {{ collection.upvotes || 0 }}
            </button>
          </div>
        </NuxtLink>
      </div>

    </div>
  </div>
</template>
