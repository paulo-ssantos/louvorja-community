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
    
    <main class="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <NuxtLink to="/collections" class="text-blue-600 hover:underline mb-4 inline-block">← Back to Collections</NuxtLink>
      
      <div class="bg-white rounded-lg shadow p-6">
        <h1 class="text-2xl font-bold mb-6">Upload Collection</h1>
        
        <div v-if="!user" class="text-center py-8">
          <p class="text-gray-600 mb-4">Please login to upload a collection</p>
          <NuxtLink to="/auth/login" class="text-blue-600 hover:underline">Login</NuxtLink>
        </div>
        
        <form v-else @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Collection Name *</label>
            <input 
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Louvor Jovem 2024"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea 
              v-model="form.description"
              rows="3"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your collection..."
            ></textarea>
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
            <label class="block text-sm font-medium text-gray-700 mb-1">Upload File (ZIP/RAR) *</label>
            <div 
              class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition"
              :class="{ 'border-blue-500 bg-blue-50': isDragging }"
              @dragover.prevent="isDragging = true"
              @dragleave.prevent="isDragging = false"
              @drop.prevent="handleDrop"
              @click="$refs.fileInput.click()"
            >
              <input 
                ref="fileInput"
                type="file"
                accept=".zip,.rar,.7z"
                class="hidden"
                @change="handleFileChange"
              />
              <div v-if="!form.file">
                <p class="text-gray-600">Drag and drop your file here, or click to browse</p>
                <p class="text-sm text-gray-400 mt-1">Supported: ZIP, RAR, 7Z (max 100MB)</p>
              </div>
              <div v-else class="flex items-center justify-center gap-2">
                <span class="text-green-600">📁 {{ form.file.name }}</span>
                <button type="button" @click.stop="form.file = null" class="text-red-500 hover:text-red-700">✕</button>
              </div>
            </div>
          </div>
          
          <div v-if="uploading" class="text-center py-4">
            <p class="text-gray-600">{{ uploadProgress }}</p>
          </div>
          
          <p v-if="error" class="text-red-600">{{ error }}</p>
          
          <button 
            type="submit"
            :disabled="uploading || !form.file"
            class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {{ uploading ? 'Uploading...' : 'Upload Collection' }}
          </button>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
const user = useSupabaseUser()
const router = useRouter()
const client = useSupabaseClient()

const categories = ['Worship', 'Praise', 'Meditation', 'Special', 'Seasonal']

const form = ref({
  name: '',
  description: '',
  category: '',
  file: null,
})

const isDragging = ref(false)
const uploading = ref(false)
const uploadProgress = ref('')
const error = ref('')

function handleDrop(e) {
  isDragging.value = false
  const files = e.dataTransfer.files
  if (files.length > 0) {
    form.value.file = files[0]
  }
}

function handleFileChange(e) {
  const files = e.target.files
  if (files.length > 0) {
    form.value.file = files[0]
  }
}

async function handleSubmit() {
  error.value = ''
  
  if (!form.value.file) {
    error.value = 'Please select a file to upload'
    return
  }
  
  const validTypes = ['application/zip', 'application/x-zip-compressed', 'application/x-rar-compressed', 'application/vnd.rar', 'application/x-7z-compressed']
  if (!validTypes.includes(form.value.file.type) && !form.value.file.name.match(/\.(zip|rar|7z)$/i)) {
    error.value = 'Please upload a valid archive file (ZIP, RAR, or 7Z)'
    return
  }
  
  uploading.value = true
  uploadProgress.value = 'Uploading file...'
  
  try {
    const fileName = `${user.value.id}/${Date.now()}_${form.value.file.name}`
    
    const { data: uploadData, error: uploadError } = await client.storage
      .from('collections')
      .upload(fileName, form.value.file)
    
    if (uploadError) throw uploadError
    
    const { data: { publicUrl } } = client.storage
      .from('collections')
      .getPublicUrl(fileName)
    
    uploadProgress.value = 'Creating collection...'
    
    const { data: collection, error: dbError } = await client
      .from('collections')
      .insert({
        name: form.value.name,
        description: form.value.description,
        category: form.value.category,
        user_id: user.value.id,
        file_url: publicUrl,
        song_count: 0,
        upvotes: 0,
      })
      .select()
      .single()
    
    if (dbError) throw dbError
    
    router.push(`/collections/${collection.id}`)
  } catch (e) {
    error.value = e.message
  } finally {
    uploading.value = false
  }
}
</script>
