<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <NuxtLink to="/" class="text-2xl font-bold text-gray-900">LouvorJA Community</NuxtLink>
        <nav class="flex gap-4">
          <NuxtLink to="/collections" class="text-gray-600 hover:text-gray-900">Collections</NuxtLink>
          <NuxtLink to="/tools" class="text-gray-600 hover:text-gray-900">Tools</NuxtLink>
          <NuxtLink to="/developer-hub" class="text-gray-600 hover:text-gray-900">Developer</NuxtLink>
          <template v-if="user">
            <NuxtLink to="/profile" class="text-gray-600 hover:text-gray-900">My Profile</NuxtLink>
          </template>
          <template v-else>
            <NuxtLink to="/auth/login" class="text-gray-600 hover:text-gray-900">Login</NuxtLink>
          </template>
        </nav>
      </div>
    </header>
    
    <main class="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <NuxtLink to="/collections" class="text-blue-600 hover:underline mb-4 inline-block">← Back to Collections</NuxtLink>
      
      <div v-if="loading" class="text-center py-8">Loading...</div>
      
      <div v-else-if="!collection" class="text-center py-8">
        <p class="text-gray-600">Collection not found</p>
      </div>
      
      <div v-else class="bg-white rounded-lg shadow p-6">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h1 class="text-3xl font-bold mb-2">{{ collection.name }}</h1>
            <span class="px-3 py-1 bg-gray-100 text-sm rounded">{{ collection.category }}</span>
          </div>
          <div class="text-right">
            <div class="flex items-center gap-2 mb-2">
              <button 
                @click="handleUpvote"
                :class="hasUpvoted ? 'text-blue-600' : 'text-gray-400 hover:text-blue-600'"
                class="text-2xl"
              >
                ▲
              </button>
              <span class="text-2xl font-bold">{{ collection.upvotes || 0 }}</span>
            </div>
            <p class="text-sm text-gray-500">{{ hasUpvoted ? 'Upvoted' : 'Upvote' }}</p>
          </div>
        </div>
        
        <div class="flex items-center gap-4 mb-4">
          <span class="text-gray-700 font-medium">Rating:</span>
          <div class="flex gap-1">
            <button 
              v-for="star in 5" 
              :key="star"
              @click="handleRate(star)"
              class="text-2xl"
              :class="star <= (userRating || 0) ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'"
            >
              ★
            </button>
          </div>
          <span v-if="collection.rating" class="text-sm text-gray-500">
            {{ collection.rating.toFixed(1) }} ({{ ratingCount }} ratings)
          </span>
        </div>
        
        <p class="text-gray-700 mb-6">{{ collection.description }}</p>
        
        <div class="flex items-center justify-between py-4 border-t border-b mb-6">
          <div class="flex items-center gap-4">
            <span class="text-gray-600">📁 {{ collection.song_count || 0 }} songs</span>
            <span class="text-gray-500">|</span>
            <span class="text-gray-600">by {{ authorName }}</span>
          </div>
          <span class="text-gray-500 text-sm">{{ formattedDate }}</span>
        </div>
        
        <div class="flex gap-4">
          <a 
            :href="collection.file_url" 
            download
            class="flex-1 px-6 py-3 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 font-medium"
          >
            ⬇️ Download Collection
          </a>
          
          <button 
            v-if="isOwner"
            @click="handleDelete"
            class="px-6 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
          >
            Delete
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const route = useRoute()
const user = useSupabaseUser()
const client = useSupabaseClient()
const router = useRouter()

const collection = ref(null)
const authorName = ref('Anonymous')
const hasUpvoted = ref(false)
const userRating = ref(0)
const ratingCount = ref(0)
const loading = ref(true)

const isOwner = computed(() => {
  return user.value && collection.value && user.value.id === collection.value.user_id
})

const formattedDate = computed(() => {
  if (!collection.value?.created_at) return ''
  return new Date(collection.value.created_at).toLocaleDateString('pt-BR')
})

async function loadCollection() {
  loading.value = true
  try {
    const { data, error } = await client
      .from('collections')
      .select('*')
      .eq('id', route.params.id)
      .single()
    
    if (error) throw error
    
    collection.value = data
    
    if (data.user_id) {
      const { data: profile } = await client
        .from('profiles')
        .select('username')
        .eq('id', data.user_id)
        .single()
      
      if (profile) {
        authorName.value = profile.username
      }
    }
    
    if (user.value) {
      const { data: upvote } = await client
        .from('collection_upvotes')
        .select('*')
        .eq('collection_id', data.id)
        .eq('user_id', user.value.id)
        .single()
      
      hasUpvoted.value = !!upvote
    }
  } catch (e) {
    console.error('Error loading collection:', e)
  } finally {
    loading.value = false
  }
}

async function handleUpvote() {
  if (!user.value) {
    router.push('/auth/login')
    return
  }
  
  try {
    if (hasUpvoted.value) {
      await client
        .from('collection_upvotes')
        .delete()
        .eq('collection_id', collection.value.id)
        .eq('user_id', user.value.id)
      
      collection.value.upvotes = Math.max(0, (collection.value.upvotes || 1) - 1)
      hasUpvoted.value = false
    } else {
      await client
        .from('collection_upvotes')
        .insert([{ collection_id: collection.value.id, user_id: user.value.id }])
      
      collection.value.upvotes = (collection.value.upvotes || 0) + 1
      hasUpvoted.value = true
    }
  } catch (e) {
    console.error('Error upvoting:', e)
  }
}

async function handleRate(rating) {
  if (!user.value) {
    router.push('/auth/login')
    return
  }
  
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
  } catch (e) {
    console.error('Error rating:', e)
  }
}

async function handleDelete() {
  if (!confirm('Are you sure you want to delete this collection?')) return
  
  try {
    await client
      .from('collections')
      .delete()
      .eq('id', collection.value.id)
    
    router.push('/collections')
  } catch (e) {
    console.error('Error deleting:', e)
  }
}

onMounted(loadCollection)
</script>
