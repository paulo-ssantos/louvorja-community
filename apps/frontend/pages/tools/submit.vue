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
    
    <main class="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <NuxtLink to="/tools" class="text-blue-600 hover:underline mb-4 inline-block">← Back to Tools</NuxtLink>
      
      <div class="bg-white rounded-lg shadow p-6">
        <h1 class="text-2xl font-bold mb-6">Submit Tool</h1>
        
        <div v-if="!user" class="text-center py-8">
          <p class="text-gray-600 mb-4">Please login to submit a tool</p>
          <NuxtLink to="/auth/login" class="text-blue-600 hover:underline">Login</NuxtLink>
        </div>
        
        <form v-else @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tool Name *</label>
            <input 
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., PowerPoint Viewer"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Website URL *</label>
            <input 
              v-model="form.url"
              type="url"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <select 
              v-model="form.category"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea 
              v-model="form.description"
              rows="3"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Describe what this tool does..."
            ></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Author / Creator</label>
            <input 
              v-model="form.author"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Your name or organization"
            />
          </div>
          
          <p v-if="error" class="text-red-600">{{ error }}</p>
          
          <button 
            type="submit"
            :disabled="submitting"
            class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {{ submitting ? 'Submitting...' : 'Submit Tool' }}
          </button>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
const user = useSupabaseUser()
const router = useRouter()

const categories = ['Image', 'Video', 'Audio', 'Streaming', 'Presentation', 'Other']

const form = ref({
  name: '',
  url: '',
  category: '',
  description: '',
  author: '',
})

const submitting = ref(false)
const error = ref('')

async function handleSubmit() {
  error.value = ''
  submitting.value = true
  
  try {
    const response = await fetch('http://localhost:3000/tools', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form.value,
        user_id: user.value.id,
      }),
    })
    
    if (!response.ok) throw new Error('Failed to submit tool')
    
    router.push('/tools')
  } catch (e) {
    error.value = e.message
  } finally {
    submitting.value = false
  }
}
</script>
