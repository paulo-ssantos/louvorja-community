<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ArrowLeft, ChevronUp, Download, Star, Trash2, Music, Calendar, User } from 'lucide-vue-next'

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
  return new Date(collection.value.created_at).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
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
  } catch {}
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
  } catch {}
}

async function handleRate(rating: number) {
  if (!user.value) { router.push('/auth/login'); return }
  try {
    const response = await fetch(`http://localhost:3001/collections/${collection.value.id}/rate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.value.id, rating }),
    })
    const result = await response.json()
    collection.value.rating = result.averageRating
    ratingCount.value = result.count
    userRating.value = rating
  } catch {}
}

async function handleDelete() {
  if (!confirm('Tem certeza que deseja excluir esta coletânea?')) return
  try {
    await client.from('collections').delete().eq('id', collection.value.id)
    router.push('/collections')
  } catch {}
}

onMounted(loadCollection)
</script>

<template>
  <div class="min-h-screen">
    <div class="site-container py-10 max-w-4xl">

      <!-- Back -->
      <NuxtLink
        to="/collections"
        class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
      >
        <ArrowLeft class="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
        Voltar para Coletâneas
      </NuxtLink>

      <!-- Loading -->
      <div v-if="loading" class="space-y-4">
        <div class="skeleton h-10 w-2/3 rounded-xl" />
        <div class="skeleton h-48 rounded-2xl" />
      </div>

      <!-- Not found -->
      <div v-else-if="!collection" class="flex flex-col items-center py-24 text-center">
        <p class="font-medium mb-2">Coletânea não encontrada</p>
        <NuxtLink to="/collections" class="text-sm text-primary hover:underline">Ver todas as coletâneas</NuxtLink>
      </div>

      <!-- Content -->
      <div v-else class="animate-fade-up">

        <!-- Hero card -->
        <div class="rounded-2xl bg-card border border-white/[0.07] overflow-hidden mb-6">

          <!-- Top band -->
          <div class="h-1.5 bg-gradient-to-r from-primary/80 via-primary to-primary/40" />

          <div class="p-6 md:p-8">
            <!-- Title + category + upvote -->
            <div class="flex flex-col sm:flex-row items-start gap-5 mb-6">
              <div class="flex-1 space-y-3">
                <div class="flex flex-wrap gap-2 items-center">
                  <span v-if="collection.category" class="badge-amber badge">{{ collection.category }}</span>
                </div>
                <h1 class="font-display text-3xl md:text-4xl font-semibold leading-tight">{{ collection.name }}</h1>
              </div>

              <!-- Upvote button -->
              <button
                class="flex flex-col items-center gap-1 px-5 py-3 rounded-xl border-2 transition-all duration-200 shrink-0"
                :class="hasUpvoted
                  ? 'border-primary bg-primary/12 text-primary'
                  : 'border-white/[0.12] text-muted-foreground hover:border-primary/40 hover:text-foreground'"
                @click="handleUpvote"
              >
                <ChevronUp class="h-5 w-5" />
                <span class="text-xl font-bold font-display leading-none">{{ collection.upvotes || 0 }}</span>
                <span class="text-[10px] uppercase tracking-wider">votos</span>
              </button>
            </div>

            <!-- Description -->
            <p v-if="collection.description" class="text-muted-foreground leading-relaxed mb-6">
              {{ collection.description }}
            </p>

            <!-- Rating -->
            <div class="flex flex-wrap items-center gap-4 mb-6">
              <div class="flex items-center gap-2">
                <span class="text-sm text-muted-foreground font-medium">Sua avaliação:</span>
                <div class="flex gap-0.5">
                  <button
                    v-for="star in 5"
                    :key="star"
                    class="transition-all duration-100 hover:scale-110"
                    @click="handleRate(star)"
                  >
                    <Star
                      class="h-5 w-5"
                      :class="star <= userRating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30 hover:text-amber-400/60'"
                    />
                  </button>
                </div>
              </div>
              <span v-if="collection.rating" class="text-sm text-muted-foreground">
                {{ collection.rating.toFixed(1) }} / 5 ({{ ratingCount }} {{ ratingCount === 1 ? 'avaliação' : 'avaliações' }})
              </span>
            </div>

            <!-- Meta -->
            <div class="flex flex-wrap items-center gap-5 py-4 border-y border-white/[0.06] text-sm text-muted-foreground mb-6">
              <span class="flex items-center gap-1.5">
                <Music class="h-4 w-4 text-primary/70" />
                {{ collection.song_count || 0 }} músicas
              </span>
              <span class="flex items-center gap-1.5">
                <User class="h-4 w-4 text-primary/70" />
                <strong class="text-foreground">{{ authorName }}</strong>
              </span>
              <span class="flex items-center gap-1.5">
                <Calendar class="h-4 w-4 text-primary/70" />
                {{ formattedDate }}
              </span>
            </div>

            <!-- Actions -->
            <div class="flex flex-col sm:flex-row gap-3">
              <a
                :href="collection.file_url"
                download
                class="flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
              >
                <Download class="h-4 w-4" /> Baixar Coletânea
              </a>
              <button
                v-if="isOwner"
                class="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive font-semibold text-sm hover:bg-destructive/20 transition-colors"
                @click="handleDelete"
              >
                <Trash2 class="h-4 w-4" /> Excluir
              </button>
            </div>
          </div>
        </div>

        <!-- Login nudge -->
        <div v-if="!user" class="rounded-xl bg-white/[0.03] border border-white/[0.07] p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-sm text-muted-foreground">Entre para votar e avaliar esta coletânea.</p>
          <NuxtLink
            to="/auth/login"
            class="px-5 py-2 rounded-lg bg-card border border-white/[0.1] text-sm font-medium hover:border-primary/40 transition-colors shrink-0"
          >
            Entrar
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
