<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, ChevronUp, Download, Star, Trash2 } from 'lucide-vue-next'

const route = useRoute()
const user = useSupabaseUser()
const client = useSupabaseClient()
const router = useRouter()

const collection = ref<any>(null)
const authorName = ref('Anônimo')
const hasUpvoted = ref(false)
const userRating = ref(0)
const ratingCount = ref(0)
const loading = ref(true)

const isOwner = computed(() => user.value && collection.value && user.value.id === collection.value.user_id)
const formattedDate = computed(() => {
  if (!collection.value?.created_at) return ''
  return new Date(collection.value.created_at).toLocaleDateString('pt-BR')
})

async function loadCollection() {
  loading.value = true
  try {
    const { data, error } = await client.from('collections').select('*').eq('id', route.params.id).single()
    if (error) throw error
    collection.value = data
    if (data.user_id) {
      const { data: profile } = await client.from('profiles').select('username').eq('id', data.user_id).single()
      if (profile) authorName.value = profile.username
    }
    if (user.value) {
      const { data: upvote } = await client.from('collection_upvotes').select('*').eq('collection_id', data.id).eq('user_id', user.value.id).single()
      hasUpvoted.value = !!upvote
    }
  } catch (e) { console.error('Erro ao carregar coletânea:', e) }
  finally { loading.value = false }
}

async function handleUpvote() {
  if (!user.value) { router.push('/auth/login'); return }
  try {
    if (hasUpvoted.value) {
      await client.from('collection_upvotes').delete().eq('collection_id', collection.value.id).eq('user_id', user.value.id)
      collection.value.upvotes = Math.max(0, (collection.value.upvotes || 1) - 1)
      hasUpvoted.value = false
    } else {
      await client.from('collection_upvotes').insert([{ collection_id: collection.value.id, user_id: user.value.id }])
      collection.value.upvotes = (collection.value.upvotes || 0) + 1
      hasUpvoted.value = true
    }
  } catch (e) { console.error('Erro ao votar:', e) }
}

async function handleRate(rating: number) {
  if (!user.value) { router.push('/auth/login'); return }
  try {
    const response = await fetch(`http://localhost:3000/collections/${collection.value.id}/rate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.value.id, rating }),
    })
    const result = await response.json()
    collection.value.rating = result.averageRating
    ratingCount.value = result.count
    userRating.value = rating
  } catch (e) { console.error('Erro ao avaliar:', e) }
}

async function handleDelete() {
  if (!confirm('Tem certeza que deseja excluir esta coletânea?')) return
  try {
    await client.from('collections').delete().eq('id', collection.value.id)
    router.push('/collections')
  } catch (e) { console.error('Erro ao excluir:', e) }
}

onMounted(loadCollection)
</script>

<template>
  <div class="min-h-screen bg-background">
    <div class="max-w-4xl mx-auto px-4 py-10">
      
      <Button variant="ghost" as-child class="mb-6 -ml-2">
        <NuxtLink to="/collections">
          <ArrowLeft class="mr-2 h-4 w-4" /> Voltar para Coletâneas
        </NuxtLink>
      </Button>

      <div v-if="loading" class="text-center py-16 text-muted-foreground">Carregando coletânea...</div>

      <div v-else-if="!collection" class="text-center py-16">
        <p class="text-muted-foreground">Coletânea não encontrada.</p>
        <Button class="mt-4" as-child><NuxtLink to="/collections">Ver Coletâneas</NuxtLink></Button>
      </div>

      <Card v-else class="p-6 md:p-8 space-y-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div class="space-y-2 flex-1">
            <h1 class="text-2xl md:text-3xl font-bold tracking-tight">{{ collection.name }}</h1>
            <span v-if="collection.category" class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground bg-muted/30">
              {{ collection.category }}
            </span>
          </div>
          <div class="flex flex-col items-center gap-1">
            <button
              @click="handleUpvote"
              class="flex flex-col items-center px-4 py-3 rounded-lg border transition-all"
              :class="hasUpvoted ? 'bg-primary/10 border-primary text-primary' : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'"
            >
              <ChevronUp class="h-5 w-5" />
              <span class="text-lg font-bold leading-none mt-1">{{ collection.upvotes || 0 }}</span>
            </button>
          </div>
        </div>

        <!-- Rating -->
        <div class="flex items-center gap-3">
          <span class="text-sm font-medium">Avaliação:</span>
          <div class="flex gap-0.5">
            <button v-for="star in 5" :key="star" @click="handleRate(star)" class="transition-colors">
              <Star class="h-5 w-5" :class="star <= (userRating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30 hover:text-yellow-400'" />
            </button>
          </div>
          <span v-if="collection.rating" class="text-sm text-muted-foreground">
            {{ collection.rating.toFixed(1) }} ({{ ratingCount }} avaliações)
          </span>
        </div>

        <!-- Description -->
        <p class="text-muted-foreground leading-relaxed">{{ collection.description }}</p>

        <!-- Meta Row -->
        <div class="flex flex-wrap items-center justify-between gap-4 py-4 border-y text-sm text-muted-foreground">
          <div class="flex flex-wrap items-center gap-4">
            <span>🎵 {{ collection.song_count || 0 }} músicas</span>
            <span>•</span>
            <span>Por <strong class="text-foreground">{{ authorName }}</strong></span>
          </div>
          <span>{{ formattedDate }}</span>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-3">
          <Button class="flex-1 text-base" as-child>
            <a :href="collection.file_url" download>
              <Download class="mr-2 h-4 w-4" /> Baixar Coletânea
            </a>
          </Button>
          <Button v-if="isOwner" variant="destructive" @click="handleDelete">
            <Trash2 class="mr-2 h-4 w-4" /> Excluir
          </Button>
        </div>
      </Card>
    </div>
  </div>
</template>
