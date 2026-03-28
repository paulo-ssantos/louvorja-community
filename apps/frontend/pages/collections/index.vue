<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ChevronUp, Download, Search, Upload } from 'lucide-vue-next'

const user = useSupabaseUser()
const searchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref('recent')
const collections = ref<any[]>([])
const loading = ref(false)

const API_URL = 'http://localhost:3000'

const categories = [
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
  } finally {
    loading.value = false
  }
}

async function handleVote(collectionId: string) {
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
  } catch (e) { console.error('Falha ao votar:', e) }
}

onMounted(() => fetchCollections())
</script>

<template>
  <div class="min-h-screen bg-background">
    <div class="max-w-6xl mx-auto px-4 py-10">
      
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Coletâneas</h1>
          <p class="text-muted-foreground mt-1">Explore e baixe coletâneas criadas pela comunidade</p>
        </div>
        <Button as-child>
          <NuxtLink to="/collections/upload">
            <Upload class="mr-2 h-4 w-4" /> Enviar Coletânea
          </NuxtLink>
        </Button>
      </div>

      <!-- Search & Filters -->
      <div class="flex flex-col sm:flex-row gap-4 mb-8">
        <div class="relative flex-1">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar coletâneas..."
            class="pl-9"
          />
        </div>
        <select
          v-model="selectedCategory"
          class="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
          @change="fetchCollections"
        >
          <option value="">Todas as categorias</option>
          <option v-for="cat in categories" :key="cat.value" :value="cat.value">{{ cat.label }}</option>
        </select>
        <select
          v-model="sortBy"
          class="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
          @change="fetchCollections"
        >
          <option value="recent">Mais Recentes</option>
          <option value="popular">Mais Populares</option>
        </select>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-16">
        <div class="text-muted-foreground">Carregando coletâneas...</div>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredCollections.length === 0" class="text-center py-16">
        <p class="text-muted-foreground">Nenhuma coletânea encontrada. Seja o primeiro a enviar!</p>
        <Button class="mt-4" as-child>
          <NuxtLink to="/collections/upload">Enviar Coletânea</NuxtLink>
        </Button>
      </div>

      <!-- Collections Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="collection in filteredCollections"
          :key="collection.id"
          :to="`/collections/${collection.id}`"
          class="block group"
        >
          <Card class="h-full p-6 hover:shadow-md transition-all hover:border-primary/40 flex flex-col gap-3">
            <div class="flex justify-between items-start gap-2">
              <h3 class="font-semibold text-base leading-tight group-hover:text-primary transition-colors">{{ collection.name }}</h3>
              <span v-if="collection.category" class="shrink-0 inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold text-muted-foreground bg-muted/30">
                {{ collection.category }}
              </span>
            </div>
            <p class="text-sm text-muted-foreground line-clamp-2 flex-1">{{ collection.description }}</p>
            <div class="flex justify-between items-center text-sm text-muted-foreground pt-2 border-t border-border/50">
              <span class="flex items-center gap-1">
                <Download class="h-3.5 w-3.5" /> {{ collection.song_count || 0 }} músicas
              </span>
              <button
                class="flex items-center gap-1 font-medium text-foreground hover:text-primary transition-colors"
                @click.prevent="handleVote(collection.id)"
              >
                <ChevronUp class="h-4 w-4" /> {{ collection.upvotes || 0 }}
              </button>
            </div>
          </Card>
        </NuxtLink>
      </div>

    </div>
  </div>
</template>
