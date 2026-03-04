<script setup>
const selectedCategory = ref('')
const searchQuery = ref('')
const tools = ref([])
const loading = ref(false)
const user = useSupabaseUser()

const categories = ['Image', 'Video', 'Audio', 'Streaming', 'Presentation', 'Other']

const API_URL = 'http://localhost:3000'

const filteredTools = computed(() => {
  let result = tools.value
  if (selectedCategory.value) {
    result = result.filter(t => t.category === selectedCategory.value)
  }
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(t => 
      t.name?.toLowerCase().includes(query) || 
      t.description?.toLowerCase().includes(query)
    )
  }
  return result
})

async function fetchTools() {
  loading.value = true
  try {
    const response = await fetch(`${API_URL}/tools`)
    const data = await response.json()
    tools.value = data.data || data
  } catch (error) {
    console.error('Failed to fetch tools:', error)
  } finally {
    loading.value = false
  }
}

async function trackClick(toolId) {
  try {
    await fetch(`${API_URL}/tools/${toolId}/click`, { method: 'POST' })
  } catch (e) {
    console.error('Failed to track click:', e)
  }
}

onMounted(() => {
  fetchTools()
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
          <NuxtLink to="/search" class="text-gray-600 hover:text-gray-900">Search</NuxtLink>
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
        <h1 class="text-3xl font-bold text-gray-900">Tools & Websites</h1>
        <NuxtLink to="/tools/submit" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Submit Tool
        </NuxtLink>
      </div>

      <div class="mb-8 flex gap-4">
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search tools..." 
          class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select 
          v-model="selectedCategory" 
          class="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">All Categories</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>
      
      <div v-if="loading" class="text-center py-8">Loading tools...</div>
      
      <div v-else-if="filteredTools.length === 0" class="text-center py-8 text-gray-500">
        No tools found. Be the first to submit one!
      </div>
      
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="tool in filteredTools" :key="tool.id" class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-xl font-semibold">{{ tool.name }}</h3>
            <span class="px-2 py-1 bg-gray-100 text-sm rounded">{{ tool.category }}</span>
          </div>
          <p class="text-gray-600 mb-4">{{ tool.description }}</p>
          <div class="flex justify-between items-center">
            <a 
              :href="tool.url" 
              target="_blank" 
              @click="trackClick(tool.id)"
              class="text-blue-600 hover:underline"
            >
              Visit Website →
            </a>
            <span class="text-sm text-gray-500">by {{ tool.author || 'Anonymous' }}</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
