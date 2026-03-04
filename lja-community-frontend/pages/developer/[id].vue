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
    
    <main class="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <NuxtLink to="/developer-hub" class="text-blue-600 hover:underline mb-4 inline-block">← Back to Developer Hub</NuxtLink>
      
      <div v-if="loading" class="text-center py-8">Loading...</div>
      
      <div v-else-if="!project" class="text-center py-8">
        <p class="text-gray-600">Project not found</p>
      </div>
      
      <div v-else class="bg-white rounded-lg shadow p-6">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h1 class="text-3xl font-bold mb-2">{{ project.name }}</h1>
            <span v-if="project.language" class="px-3 py-1 bg-gray-100 text-sm rounded">{{ project.language }}</span>
          </div>
          <div class="flex gap-4 text-center">
            <div class="p-3 bg-gray-50 rounded-lg">
              <p class="text-2xl font-bold">⭐</p>
              <p class="text-sm text-gray-500">{{ project.stars || 0 }}</p>
            </div>
            <div class="p-3 bg-gray-50 rounded-lg">
              <p class="text-2xl font-bold">🍴</p>
              <p class="text-sm text-gray-500">{{ project.forks || 0 }}</p>
            </div>
          </div>
        </div>
        
        <p class="text-gray-700 mb-6">{{ project.description }}</p>
        
        <div class="flex items-center justify-between py-4 border-t border-b mb-6">
          <span class="text-gray-600">by {{ project.author || 'Anonymous' }}</span>
          <span class="text-gray-500 text-sm">{{ formattedDate }}</span>
        </div>
        
        <div class="flex gap-4">
          <a 
            :href="project.repository_url" 
            target="_blank"
            class="flex-1 px-6 py-3 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 font-medium"
          >
            🐙 View on GitHub
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
const router = useRouter()

const project = ref(null)
const loading = ref(true)

const isOwner = computed(() => {
  return user.value && project.value && user.value.id === project.value.user_id
})

const formattedDate = computed(() => {
  if (!project.value?.created_at) return ''
  return new Date(project.value.created_at).toLocaleDateString('pt-BR')
})

async function loadProject() {
  loading.value = true
  try {
    const response = await fetch(`http://localhost:3000/developer/projects/${route.params.id}`)
    const data = await response.json()
    project.value = data.data || data
  } catch (e) {
    console.error('Error loading project:', e)
  } finally {
    loading.value = false
  }
}

async function handleDelete() {
  if (!confirm('Are you sure you want to delete this project?')) return
  
  try {
    await fetch(`http://localhost:3000/developer/projects/${project.value.id}`, { 
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    router.push('/developer-hub')
  } catch (e) {
    console.error('Error deleting:', e)
  }
}

onMounted(loadProject)
</script>
