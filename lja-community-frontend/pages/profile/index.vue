<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <NuxtLink to="/" class="text-2xl font-bold text-gray-900">LouvorJA Community</NuxtLink>
        <nav class="flex gap-4">
          <NuxtLink to="/collections" class="text-gray-600 hover:text-gray-900">Collections</NuxtLink>
          <NuxtLink to="/tools" class="text-gray-600 hover:text-gray-900">Tools</NuxtLink>
          <NuxtLink to="/developer-hub" class="text-gray-600 hover:text-gray-900">Developer Hub</NuxtLink>
          <button @click="handleLogout" class="text-gray-600 hover:text-gray-900">Logout</button>
        </nav>
      </div>
    </header>
    
    <main class="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div v-if="loading" class="text-center py-8">Loading...</div>
      
      <div v-else-if="!user" class="text-center py-8">
        <p class="text-gray-600 mb-4">Please login to view your profile</p>
        <NuxtLink to="/auth/login" class="text-blue-600 hover:underline">Login</NuxtLink>
      </div>
      
      <div v-else>
        <div class="bg-white rounded-lg shadow p-6 mb-6">
          <div class="flex items-center justify-between mb-6">
            <h1 class="text-2xl font-bold">My Profile</h1>
            <button 
              @click="editing = true"
              v-if="!editing"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Edit Profile
            </button>
          </div>
          
          <div v-if="!editing" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-500">Username</label>
              <p class="text-lg">{{ profile?.username || 'Not set' }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-500">Email</label>
              <p class="text-lg">{{ user.email }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-500">Bio</label>
              <p class="text-gray-700">{{ profile?.bio || 'No bio yet' }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-500">Church</label>
              <p class="text-gray-700">{{ profile?.church || 'Not specified' }}</p>
            </div>
          </div>
          
          <form v-else @submit.prevent="handleUpdateProfile" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input 
                v-model="editForm.username"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea 
                v-model="editForm.bio"
                rows="3"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Church</label>
              <input 
                v-model="editForm.church"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div class="flex gap-2">
              <button 
                type="submit"
                :disabled="updating"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {{ updating ? 'Saving...' : 'Save' }}
              </button>
              <button 
                type="button"
                @click="editing = false"
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
            <p v-if="updateError" class="text-red-600">{{ updateError }}</p>
          </form>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold mb-4">My Contributions</h2>
          <div class="grid grid-cols-3 gap-4 text-center">
            <div class="p-4 bg-gray-50 rounded-lg">
              <p class="text-3xl font-bold text-blue-600">{{ stats.collectionsCount }}</p>
              <p class="text-gray-600">Collections</p>
            </div>
            <div class="p-4 bg-gray-50 rounded-lg">
              <p class="text-3xl font-bold text-green-600">{{ stats.toolsCount }}</p>
              <p class="text-gray-600">Tools</p>
            </div>
            <div class="p-4 bg-gray-50 rounded-lg">
              <p class="text-3xl font-bold text-purple-600">{{ stats.projectsCount }}</p>
              <p class="text-gray-600">Projects</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const client = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

const profile = ref(null)
const stats = ref({ collectionsCount: 0, toolsCount: 0, projectsCount: 0 })
const loading = ref(true)
const editing = ref(false)
const updating = ref(false)
const updateError = ref('')

const editForm = ref({
  username: '',
  bio: '',
  church: '',
})

async function loadProfile() {
  if (!user.value) {
    loading.value = false
    return
  }
  
  try {
    const { data: profileData } = await client
      .from('profiles')
      .select('*')
      .eq('id', user.value.id)
      .single()
    
    profile.value = profileData
    
    if (profileData) {
      editForm.value = {
        username: profileData.username || '',
        bio: profileData.bio || '',
        church: profileData.church || '',
      }
    }
    
    const [collections, tools, projects] = await Promise.all([
      client.from('collections').select('id', { count: 'exact' }).eq('user_id', user.value.id),
      client.from('tools').select('id', { count: 'exact' }).eq('user_id', user.value.id),
      client.from('developer_projects').select('id', { count: 'exact' }).eq('user_id', user.value.id),
    ])
    
    stats.value = {
      collectionsCount: collections.count || 0,
      toolsCount: tools.count || 0,
      projectsCount: projects.count || 0,
    }
  } catch (e) {
    console.error('Error loading profile:', e)
  } finally {
    loading.value = false
  }
}

async function handleUpdateProfile() {
  updating.value = true
  updateError.value = ''
  
  try {
    const { data, error } = await client
      .from('profiles')
      .update({
        username: editForm.value.username,
        bio: editForm.value.bio,
        church: editForm.value.church,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.value.id)
      .select()
      .single()
    
    if (error) throw error
    
    profile.value = data
    editing.value = false
  } catch (e) {
    updateError.value = e.message
  } finally {
    updating.value = false
  }
}

async function handleLogout() {
  await client.auth.signOut()
  router.push('/auth/login')
}

onMounted(loadProfile)
</script>
