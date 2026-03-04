<script setup>
const user = useSupabaseUser()

const API_URL = 'http://localhost:3000'
const trendingCollections = ref([])
const recentCollections = ref([])
const loading = ref(true)

async function loadHomeData() {
  try {
    const [trending, recent] = await Promise.all([
      fetch(`${API_URL}/collections?sort=popular`).then(r => r.json()),
      fetch(`${API_URL}/collections?sort=recent`).then(r => r.json()),
    ])
    
    trendingCollections.value = (trending.data || trending).slice(0, 3)
    recentCollections.value = (recent.data || recent).slice(0, 3)
  } catch (e) {
    console.error('Failed to load data:', e)
  } finally {
    loading.value = false
  }
}

onMounted(loadHomeData)
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">LouvorJA Community</h1>
        <nav class="flex gap-4 items-center">
          <NuxtLink to="/collections" class="text-gray-600 hover:text-gray-900">Collections</NuxtLink>
          <NuxtLink to="/tools" class="text-gray-600 hover:text-gray-900">Tools</NuxtLink>
          <NuxtLink to="/developer-hub" class="text-gray-600 hover:text-gray-900">Developer Hub</NuxtLink>
          <NuxtLink to="/search" class="text-gray-600 hover:text-gray-900">Search</NuxtLink>
          <template v-if="user">
            <NuxtLink to="/profile" class="text-gray-600 hover:text-gray-900">My Profile</NuxtLink>
          </template>
          <template v-else>
            <NuxtLink to="/auth/login" class="text-blue-600 hover:text-blue-700">Login</NuxtLink>
          </template>
        </nav>
      </div>
    </header>
    
    <main class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">Welcome to LouvorJA Community</h2>
        <p class="text-lg text-gray-600 mb-8">
          A centralized hub for Brazilian Adventist church housemix teams
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <NuxtLink to="/collections" class="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h3 class="text-xl font-semibold mb-2">📁 LJA Collections</h3>
            <p class="text-gray-600">Browse and download custom LJA collections</p>
          </NuxtLink>
          
          <NuxtLink to="/tools" class="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h3 class="text-xl font-semibold mb-2">🛠️ Tools</h3>
            <p class="text-gray-600">Discover tools for housemix services</p>
          </NuxtLink>
          
          <NuxtLink to="/developer-hub" class="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h3 class="text-xl font-semibold mb-2">👨‍💻 Developer Hub</h3>
            <p class="text-gray-600">Open-source projects to contribute</p>
          </NuxtLink>
        </div>
      </div>
      
      <div v-if="loading" class="text-center py-8">Loading...</div>
      
      <div v-else>
        <section v-if="trendingCollections.length" class="mb-12">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-2xl font-bold text-gray-900">🔥 Trending Collections</h3>
            <NuxtLink to="/collections?sort=popular" class="text-blue-600 hover:underline">View all</NuxtLink>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <NuxtLink 
              v-for="collection in trendingCollections" 
              :key="collection.id"
              :to="`/collections/${collection.id}`"
              class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
            >
              <h4 class="font-semibold text-lg mb-2">{{ collection.name }}</h4>
              <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ collection.description }}</p>
              <div class="flex justify-between items-center text-sm">
                <span class="px-2 py-1 bg-gray-100 rounded">{{ collection.category }}</span>
                <span class="text-gray-500">▲ {{ collection.upvotes || 0 }}</span>
              </div>
            </NuxtLink>
          </div>
        </section>
        
        <section v-if="recentCollections.length">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-2xl font-bold text-gray-900">✨ Recent Collections</h3>
            <NuxtLink to="/collections" class="text-blue-600 hover:underline">View all</NuxtLink>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <NuxtLink 
              v-for="collection in recentCollections" 
              :key="collection.id"
              :to="`/collections/${collection.id}`"
              class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
            >
              <h4 class="font-semibold text-lg mb-2">{{ collection.name }}</h4>
              <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ collection.description }}</p>
              <div class="flex justify-between items-center text-sm">
                <span class="px-2 py-1 bg-gray-100 rounded">{{ collection.category }}</span>
                <span class="text-gray-500">{{ new Date(collection.created_at).toLocaleDateString('pt-BR') }}</span>
              </div>
            </NuxtLink>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>
