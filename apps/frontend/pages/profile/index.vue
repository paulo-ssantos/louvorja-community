<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { UserCircle, Pencil, X, Music2, Wrench, Code2, LogOut } from 'lucide-vue-next'

const client = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

const profile = ref<any>(null)
const stats = ref({ collectionsCount: 0, toolsCount: 0, projectsCount: 0 })
const loading = ref(true)
const editing = ref(false)
const updating = ref(false)
const updateError = ref('')

const editForm = ref({ username: '', bio: '', church: '' })

async function loadProfile() {
  if (!user.value) { loading.value = false; return }
  try {
    const { data: profileData } = await client.from('profiles').select('*').eq('id', user.value.id).single()
    profile.value = profileData
    if (profileData) editForm.value = { username: profileData.username || '', bio: profileData.bio || '', church: profileData.church || '' }
    const [colls, tools, projs] = await Promise.all([
      client.from('collections').select('id', { count: 'exact' }).eq('user_id', user.value.id),
      client.from('tools').select('id', { count: 'exact' }).eq('user_id', user.value.id),
      client.from('developer_projects').select('id', { count: 'exact' }).eq('user_id', user.value.id),
    ])
    stats.value = {
      collectionsCount: colls.count || 0,
      toolsCount: tools.count || 0,
      projectsCount: projs.count || 0,
    }
  } catch {}
  finally { loading.value = false }
}

async function handleUpdateProfile() {
  updating.value = true
  updateError.value = ''
  try {
    const { data, error } = await client.from('profiles').update({
      username: editForm.value.username,
      bio: editForm.value.bio,
      church: editForm.value.church,
      updated_at: new Date().toISOString(),
    }).eq('id', user.value!.id).select().single()
    if (error) throw error
    profile.value = data
    editing.value = false
  } catch (e: any) { updateError.value = e.message }
  finally { updating.value = false }
}

async function handleLogout() {
  await client.auth.signOut()
  router.push('/auth/login')
}

onMounted(loadProfile)
</script>

<template>
  <div class="min-h-screen">
    <div class="site-container py-10 max-w-3xl">

      <!-- Loading -->
      <div v-if="loading" class="space-y-4">
        <div class="skeleton h-32 rounded-2xl" />
        <div class="skeleton h-24 rounded-2xl" />
      </div>

      <!-- Not logged in -->
      <div v-else-if="!user" class="flex flex-col items-center py-24 text-center">
        <div class="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
          <UserCircle class="h-6 w-6 text-muted-foreground" />
        </div>
        <p class="font-medium mb-1">Acesse sua conta</p>
        <p class="text-sm text-muted-foreground mb-5">Faça login para visualizar seu perfil.</p>
        <NuxtLink
          to="/auth/login"
          class="inline-flex items-center px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
        >
          Entrar
        </NuxtLink>
      </div>

      <template v-else>
        <!-- Profile card -->
        <div class="rounded-2xl bg-card border border-white/[0.07] overflow-hidden mb-5 animate-fade-up">
          <div class="h-1.5 bg-gradient-to-r from-primary/80 via-primary to-primary/40" />

          <div class="p-6">
            <!-- Header -->
            <div class="flex items-start justify-between gap-4 mb-6">
              <div class="flex items-center gap-4">
                <div class="w-14 h-14 rounded-2xl bg-primary/12 border border-primary/25 flex items-center justify-center shrink-0">
                  <UserCircle class="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h1 class="font-display text-2xl font-semibold leading-tight">{{ profile?.username || 'Usuário' }}</h1>
                  <p class="text-sm text-muted-foreground mt-0.5">{{ user.email }}</p>
                </div>
              </div>
              <button
                v-if="!editing"
                class="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-sm font-medium text-muted-foreground hover:text-foreground hover:border-white/20 transition-all"
                @click="editing = true"
              >
                <Pencil class="h-3.5 w-3.5" /> Editar
              </button>
            </div>

            <!-- View mode -->
            <div v-if="!editing" class="space-y-4">
              <div v-if="profile?.bio" class="space-y-1">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Bio</p>
                <p class="text-sm leading-relaxed">{{ profile.bio }}</p>
              </div>
              <div v-if="profile?.church" class="space-y-1">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Igreja</p>
                <p class="text-sm">{{ profile.church }}</p>
              </div>
              <div class="pt-2 border-t border-white/[0.06]">
                <button
                  class="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors"
                  @click="handleLogout"
                >
                  <LogOut class="h-4 w-4" /> Sair da conta
                </button>
              </div>
            </div>

            <!-- Edit mode -->
            <form v-else @submit.prevent="handleUpdateProfile" class="space-y-4">
              <div class="space-y-1.5">
                <label class="text-sm font-medium">Nome de usuário</label>
                <input
                  v-model="editForm.username"
                  required
                  class="w-full h-11 px-4 rounded-xl bg-background border border-white/[0.08] text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                />
              </div>
              <div class="space-y-1.5">
                <label class="text-sm font-medium">Bio</label>
                <textarea
                  v-model="editForm.bio"
                  rows="3"
                  placeholder="Conte um pouco sobre você..."
                  class="w-full px-4 py-3 rounded-xl bg-background border border-white/[0.08] text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                />
              </div>
              <div class="space-y-1.5">
                <label class="text-sm font-medium">Igreja</label>
                <input
                  v-model="editForm.church"
                  placeholder="Ex: IASD Central"
                  class="w-full h-11 px-4 rounded-xl bg-background border border-white/[0.08] text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                />
              </div>
              <div v-if="updateError" class="p-3 rounded-lg bg-destructive/10 border border-destructive/25">
                <p class="text-sm text-destructive">{{ updateError }}</p>
              </div>
              <div class="flex gap-3">
                <button
                  type="submit"
                  :disabled="updating"
                  class="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {{ updating ? 'Salvando...' : 'Salvar' }}
                </button>
                <button
                  type="button"
                  class="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-card border border-white/[0.08] text-sm font-medium hover:border-white/20 transition-all"
                  @click="editing = false"
                >
                  <X class="h-3.5 w-3.5" /> Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Stats -->
        <div class="rounded-2xl bg-card border border-white/[0.07] p-6 animate-fade-up">
          <h2 class="font-display text-lg font-semibold mb-5">Minhas Contribuições</h2>
          <div class="grid grid-cols-3 gap-4">
            <div class="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 text-center space-y-1">
              <div class="flex justify-center mb-2">
                <Music2 class="h-4 w-4 text-primary/70" />
              </div>
              <p class="font-display text-3xl font-semibold text-primary">{{ stats.collectionsCount }}</p>
              <p class="text-xs text-muted-foreground">Coletâneas</p>
            </div>
            <div class="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 text-center space-y-1">
              <div class="flex justify-center mb-2">
                <Wrench class="h-4 w-4 text-primary/70" />
              </div>
              <p class="font-display text-3xl font-semibold text-primary">{{ stats.toolsCount }}</p>
              <p class="text-xs text-muted-foreground">Ferramentas</p>
            </div>
            <div class="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 text-center space-y-1">
              <div class="flex justify-center mb-2">
                <Code2 class="h-4 w-4 text-primary/70" />
              </div>
              <p class="font-display text-3xl font-semibold text-primary">{{ stats.projectsCount }}</p>
              <p class="text-xs text-muted-foreground">Projetos</p>
            </div>
          </div>
        </div>
      </template>

    </div>
  </div>
</template>
