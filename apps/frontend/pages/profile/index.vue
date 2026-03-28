<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { UserCircle, Pencil, X } from 'lucide-vue-next'

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
    stats.value = { collectionsCount: colls.count || 0, toolsCount: tools.count || 0, projectsCount: projs.count || 0 }
  } catch (e) { console.error('Erro ao carregar perfil:', e) }
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
  <div class="min-h-screen bg-background">
    <div class="max-w-3xl mx-auto px-4 py-10 space-y-6">

      <div v-if="loading" class="text-center py-16 text-muted-foreground">Carregando...</div>

      <div v-else-if="!user" class="text-center py-16">
        <p class="text-muted-foreground mb-4">Faça login para visualizar seu perfil</p>
        <Button as-child><NuxtLink to="/auth/login">Entrar</NuxtLink></Button>
      </div>

      <template v-else>
        <!-- Profile Card -->
        <Card>
          <CardHeader>
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-4">
                <div class="p-3 rounded-full bg-primary/10 text-primary">
                  <UserCircle class="h-8 w-8" />
                </div>
                <div>
                  <CardTitle class="text-xl">{{ profile?.username || 'Sem nome de usuário' }}</CardTitle>
                  <p class="text-sm text-muted-foreground">{{ user.email }}</p>
                </div>
              </div>
              <Button v-if="!editing" variant="outline" size="sm" @click="editing = true">
                <Pencil class="mr-1.5 h-3.5 w-3.5" /> Editar
              </Button>
            </div>
          </CardHeader>

          <CardContent class="space-y-4">
            <!-- View Mode -->
            <div v-if="!editing" class="space-y-4">
              <div>
                <p class="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">Bio</p>
                <p class="text-sm">{{ profile?.bio || 'Nenhuma bio ainda.' }}</p>
              </div>
              <div>
                <p class="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">Igreja</p>
                <p class="text-sm">{{ profile?.church || 'Não informada' }}</p>
              </div>
              <div class="pt-2">
                <Button variant="ghost" size="sm" class="text-destructive hover:text-destructive/80" @click="handleLogout">
                  Sair da conta
                </Button>
              </div>
            </div>

            <!-- Edit Mode -->
            <form v-else @submit.prevent="handleUpdateProfile" class="space-y-4">
              <div class="space-y-2">
                <label class="text-sm font-medium">Nome de usuário</label>
                <Input v-model="editForm.username" required />
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium">Bio</label>
                <textarea v-model="editForm.bio" rows="3" class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium">Igreja</label>
                <Input v-model="editForm.church" placeholder="Ex: IASD Central" />
              </div>
              <p v-if="updateError" class="text-sm text-destructive">{{ updateError }}</p>
              <div class="flex gap-3">
                <Button type="submit" :disabled="updating">{{ updating ? 'Salvando...' : 'Salvar' }}</Button>
                <Button type="button" variant="outline" @click="editing = false">
                  <X class="mr-1.5 h-3.5 w-3.5" /> Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <!-- Stats Card -->
        <Card>
          <CardHeader>
            <CardTitle class="text-lg">Minhas Contribuições</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="grid grid-cols-3 gap-4 text-center">
              <div class="rounded-lg bg-muted/40 p-4 space-y-1">
                <p class="text-3xl font-bold text-primary">{{ stats.collectionsCount }}</p>
                <p class="text-sm text-muted-foreground">Coletâneas</p>
              </div>
              <div class="rounded-lg bg-muted/40 p-4 space-y-1">
                <p class="text-3xl font-bold text-primary">{{ stats.toolsCount }}</p>
                <p class="text-sm text-muted-foreground">Ferramentas</p>
              </div>
              <div class="rounded-lg bg-muted/40 p-4 space-y-1">
                <p class="text-3xl font-bold text-primary">{{ stats.projectsCount }}</p>
                <p class="text-sm text-muted-foreground">Projetos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </template>
    </div>
  </div>
</template>
