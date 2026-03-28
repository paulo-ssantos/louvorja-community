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
      <h1 class="text-2xl font-bold mb-6">Search</h1>
      
      <div class="mb-8">
        <input 
          v-model="query"
          type="text"
          placeholder="Search collections, tools, projects..."
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
          @input="debouncedSearch"
        />
      </div>
      
      <div v-if="loading" class="text-center py-8">Searching...</div>
      
      <div v-else-if="!hasSearched" class="text-center py-8 text-gray-500">
        <p>Enter a search term to find content</p>
      </div>
      
      <div v-else>
        <div v-if="results.collections.length" class="mb-8">
          <h2 class="text-xl font-bold mb-4">📁 Collections ({{ results.collections.length }})</h2>
          <div class="grid gap-4">
            <NuxtLink 
              v-for="item in results.collections" 
              :key="item.id"
              :to="`/collections/${item.id}`"
              class="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="font-semibold">{{ item.name }}</h3>
                  <p class="text-gray-600 text-sm">{{ item.description }}</p>
                </div>
                <span class="px-2 py-1 bg-gray-100 text-xs rounded">{{ item.category }}</span>
              </div>
            </NuxtLink>
          </div>
        </div>
        
        <div v-if="results.tools.length" class="mb-8">
          <h2 class="text-xl font-bold mb-4">🛠️ Tools ({{ results.tools.length }})</h2>
          <div class="grid gap-4">
            <div 
              v-for="item in results.tools" 
              :key="item.id"
              class="bg-white p-4 rounded-lg shadow"
            >
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="font-semibold">{{ item.name }}</h3>
                  <p class="text-gray-600 text-sm">{{ item.description }}</p>
                </div>
                <span class="px-2 py-1 bg-gray-100 text-xs rounded">{{ item.category }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="results.projects.length">
          <h2 class="text-xl font-bold mb-4">👨‍💻 Projects ({{ results.projects.length }})</h2>
          <div class="grid gap-4">
            <div 
              v-for="item in results.projects" 
              :key="item.id"
              class="bg-white p-4 rounded-lg shadow"
            >
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="font-semibold">{{ item.name }}</h3>
                  <p class="text-gray-600 text-sm">{{ item.description }}</p>
                </div>
                <span class="px-2 py-1 bg-gray-100 text-xs rounded">{{ item.language }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="!hasResults" class="text-center py-8 text-gray-500">
          <p>No results found for "{{ query }}"</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const route = useRoute()
const user = useSupabaseUser()

const query = ref(route.query.q || '')
const results = ref({ collections: [], tools: [], projects: [] })
const loading = ref(false)
const hasSearched = ref(false)

const hasResults = computed(() => {
  return results.value.collections.length > 0 || 
         results.value.tools.length > 0 || 
         results.value.projects.length > 0
})

let searchTimeout = null

async function performSearch() {
  if (!query.value.trim()) {
    hasSearched.value = false
    return
  }
  
  loading.value = true
  hasSearched.value = true
  
  try {
    const response = await fetch(`http://localhost:3000/collections/search?q=${encodeURIComponent(query.value)}`)
    results.value = await response.json()
  } catch (e) {
    console.error('Search failed:', e)
  } finally {
    loading.value = false
  }
}

function debouncedSearch() {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(performSearch, 300)
}

onMounted(() => {
  if (query.value) {
    performSearch()
  }
})

watch(query, () => {
  if (!query.value) {
    results.value = { collections: [], tools: [], projects: [] }
    hasSearched.value = false
  }
})
</script>
