<script setup>
const searchQuery = ref('')
const selectedLanguage = ref('')
const projects = ref([])
const loading = ref(false)
const user = useSupabaseUser()

const languages = ['JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'Rust', 'Other']

const API_URL = 'http://localhost:3000'

const filteredProjects = computed(() => {
  let result = projects.value
  if (selectedLanguage.value) {
    result = result.filter(p => p.language === selectedLanguage.value)
  }
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(p => 
      p.name?.toLowerCase().includes(query) || 
      p.description?.toLowerCase().includes(query)
    )
  }
  return result
})

async function fetchProjects() {
  loading.value = true
  try {
    const response = await fetch(`${API_URL}/developer/projects`)
    const data = await response.json()
    projects.value = data.data || data
  } catch (error) {
    console.error('Failed to fetch projects:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProjects()
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
        <h1 class="text-3xl font-bold text-gray-900">Developer Hub</h1>
        <NuxtLink to="/developer/submit" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Submit Project
        </NuxtLink>
      </div>
      
      <div class="mb-8 flex gap-4">
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search projects..." 
          class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select 
          v-model="selectedLanguage" 
          class="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">All Languages</option>
          <option v-for="lang in languages" :key="lang" :value="lang">{{ lang }}</option>
        </select>
      </div>
      
      <div v-if="loading" class="text-center py-8">Loading projects...</div>
      
      <div v-else-if="filteredProjects.length === 0" class="text-center py-8 text-gray-500">
        No projects found. Be the first to contribute!
      </div>
      
      <div v-else class="space-y-6">
        <div v-for="project in filteredProjects" :key="project.id" class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
          <div class="flex justify-between items-start mb-2">
            <div>
              <NuxtLink :to="`/developer/${project.id}`" class="text-xl font-semibold hover:text-blue-600">
                {{ project.name }}
              </NuxtLink>
              <span v-if="project.language" class="ml-2 px-2 py-1 bg-gray-100 text-sm rounded">{{ project.language }}</span>
            </div>
            <div class="flex gap-4 text-sm text-gray-500">
              <span>⭐ {{ project.stars || 0 }}</span>
              <span>🍴 {{ project.forks || 0 }}</span>
            </div>
          </div>
          <p class="text-gray-600 mb-4">{{ project.description }}</p>
          <div class="flex justify-between items-center">
            <a :href="project.repository_url" target="_blank" class="text-blue-600 hover:underline">
              View Repository →
            </a>
            <span class="text-sm text-gray-500">by {{ project.author || 'Anonymous' }}</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
