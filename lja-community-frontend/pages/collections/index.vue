<script setup>
const searchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref('recent')
const collections = ref([])
const loading = ref(false)
const user = useSupabaseUser()

const categories = ['Worship', 'Praise', 'Meditation', 'Special', 'Seasonal']

const API_URL = 'http://localhost:3000'

const filteredCollections = computed(() => {
  let result = collections.value
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(c => 
      c.name?.toLowerCase().includes(query) || 
      c.description?.toLowerCase().includes(query)
    )
  }
  return result
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
    console.error('Failed to fetch collections:', error)
  } finally {
    loading.value = false
  }
}

function handleSearch() {
  fetchCollections()
}

function handleCategoryChange() {
  fetchCollections()
}

function handleSortChange() {
  fetchCollections()
}

async function handleVote(collectionId) {
  if (!user.value) {
    navigateTo('/auth/login')
    return
  }
  
  try {
    const response = await fetch(`${API_URL}/collections/${collectionId}/upvote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.value.id }),
    })
    const result = await response.json()
    
    const idx = collections.value.findIndex(c => c.id === collectionId)
    if (idx !== -1) {
      collections.value[idx].votes = result.upvoted 
        ? (collections.value[idx].votes || 0) + 1 
        : Math.max(0, (collections.value[idx].votes || 1) - 1)
    }
  } catch (e) {
    console.error('Failed to vote:', e)
  }
}

onMounted(() => {
  fetchCollections()
})
</script>

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
    
    <main class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">LJA Collections</h1>
        <NuxtLink to="/collections/upload" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Upload Collection
        </NuxtLink>
      </div>
      
      <div class="mb-8 flex gap-4">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search collections..." 
          class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          @input="handleSearch"
        />
        <select 
          v-model="selectedCategory" 
          class="px-4 py-2 border border-gray-300 rounded-lg"
          @change="handleCategoryChange"
        >
          <option value="">All Categories</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
        <select 
          v-model="sortBy" 
          class="px-4 py-2 border border-gray-300 rounded-lg"
          @change="handleSortChange"
        >
          <option value="recent">Most Recent</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>
      
      <div v-if="loading" class="text-center py-8">Loading collections...</div>
      
      <div v-else-if="filteredCollections.length === 0" class="text-center py-8 text-gray-500">
        No collections found. Be the first to upload one!
      </div>
      
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink 
          v-for="collection in filteredCollections" 
          :key="collection.id" 
          :to="`/collections/${collection.id}`"
          class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition block"
        >
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-xl font-semibold">{{ collection.name }}</h3>
            <span class="px-2 py-1 bg-gray-100 text-sm rounded">{{ collection.category }}</span>
          </div>
          <p class="text-gray-600 mb-4 line-clamp-2">{{ collection.description }}</p>
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-500">{{ collection.song_count || 0 }} songs</span>
            <div class="flex items-center gap-1">
              <button @click.prevent="handleVote(collection.id)" class="text-gray-400 hover:text-blue-500">▲</button>
              <span class="font-medium">{{ collection.upvotes || 0 }}</span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </main>
  </div>
</template>
