<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowLeft, UploadCloud, X } from 'lucide-vue-next'

const user = useSupabaseUser()
const router = useRouter()
const client = useSupabaseClient()

const categories = [
  { value: 'adoracao', label: 'Adoração' },
  { value: 'louvor', label: 'Louvor' },
  { value: 'meditacao', label: 'Meditação' },
  { value: 'especial', label: 'Especial' },
  { value: 'sazonal', label: 'Sazonal' },
]

const form = ref({ name: '', description: '', category: '', file: null as File | null })
const isDragging = ref(false)
const uploading = ref(false)
const uploadProgress = ref('')
const error = ref('')

function handleDrop(e: DragEvent) {
  isDragging.value = false
  const files = e.dataTransfer?.files
  if (files && files.length > 0) form.value.file = files[0]
}

function handleFileChange(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (files && files.length > 0) form.value.file = files[0]
}

async function handleSubmit() {
  error.value = ''
  if (!form.value.file) { error.value = 'Por favor, selecione um arquivo para enviar'; return }
  const validExt = form.value.file.name.match(/\.(zip|rar|7z)$/i)
  if (!validExt) { error.value = 'Por favor, envie um arquivo de arquivo válido (ZIP, RAR ou 7Z)'; return }

  uploading.value = true
  uploadProgress.value = 'Enviando arquivo...'
  try {
    const fileName = `${user.value!.id}/${Date.now()}_${form.value.file.name}`
    const { error: uploadError } = await client.storage.from('collections').upload(fileName, form.value.file)
    if (uploadError) throw uploadError
    const { data: { publicUrl } } = client.storage.from('collections').getPublicUrl(fileName)
    uploadProgress.value = 'Criando coletânea...'
    const { data: collection, error: dbError } = await client.from('collections').insert({
      name: form.value.name,
      description: form.value.description,
      category: form.value.category,
      user_id: user.value!.id,
      file_url: publicUrl,
      song_count: 0,
      upvotes: 0,
    }).select().single()
    if (dbError) throw dbError
    router.push(`/collections/${collection.id}`)
  } catch (e: any) {
    error.value = e.message
  } finally {
    uploading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <div class="max-w-2xl mx-auto px-4 py-10">

      <Button variant="ghost" as-child class="mb-6 -ml-2">
        <NuxtLink to="/collections">
          <ArrowLeft class="mr-2 h-4 w-4" /> Voltar para Coletâneas
        </NuxtLink>
      </Button>

      <!-- Not logged in -->
      <Card v-if="!user" class="text-center p-12">
        <p class="text-muted-foreground mb-4">Você precisa estar logado para enviar uma coletânea.</p>
        <Button as-child><NuxtLink to="/auth/login">Entrar</NuxtLink></Button>
      </Card>

      <!-- Upload Form -->
      <Card v-else>
        <CardHeader>
          <CardTitle class="text-xl">Enviar Coletânea</CardTitle>
          <CardDescription>Compartilhe suas músicas com a comunidade LouvorJA</CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="handleSubmit" class="space-y-5">
            
            <div class="space-y-2">
              <label for="name" class="text-sm font-medium">Nome da Coletânea *</label>
              <Input id="name" v-model="form.name" placeholder="ex: Louvor Jovem 2025" required />
            </div>

            <div class="space-y-2">
              <label for="description" class="text-sm font-medium">Descrição *</label>
              <textarea
                id="description"
                v-model="form.description"
                rows="3"
                required
                placeholder="Descreva sua coletânea..."
                class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>

            <div class="space-y-2">
              <label for="category" class="text-sm font-medium">Categoria *</label>
              <select
                id="category"
                v-model="form.category"
                required
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Selecione uma categoria</option>
                <option v-for="cat in categories" :key="cat.value" :value="cat.value">{{ cat.label }}</option>
              </select>
            </div>

            <!-- File Drop Zone -->
            <div class="space-y-2">
              <label class="text-sm font-medium">Arquivo (ZIP/RAR/7Z) *</label>
              <div
                class="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors"
                :class="isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'"
                @dragover.prevent="isDragging = true"
                @dragleave.prevent="isDragging = false"
                @drop.prevent="handleDrop"
                @click="($refs.fileInput as HTMLInputElement)?.click()"
              >
                <input ref="fileInput" type="file" accept=".zip,.rar,.7z" class="hidden" @change="handleFileChange" />
                <div v-if="!form.file" class="flex flex-col items-center gap-2 text-muted-foreground">
                  <UploadCloud class="h-10 w-10 opacity-50" />
                  <p class="text-sm">Arraste e solte o arquivo aqui <br/> ou <span class="text-primary">clique para navegar</span></p>
                  <p class="text-xs">ZIP, RAR, 7Z – máximo 100MB</p>
                </div>
                <div v-else class="flex items-center justify-center gap-2 text-sm font-medium">
                  <span>📁 {{ form.file.name }}</span>
                  <button type="button" @click.stop="form.file = null" class="text-muted-foreground hover:text-destructive transition-colors">
                    <X class="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <p v-if="uploading" class="text-sm text-muted-foreground text-center">{{ uploadProgress }}</p>
            <p v-if="error" class="text-sm text-destructive">{{ error }}</p>

            <Button type="submit" class="w-full text-base" :disabled="uploading || !form.file">
              {{ uploading ? 'Enviando...' : 'Enviar Coletânea' }}
            </Button>
          </form>
        </CardContent>
      </Card>

    </div>
  </div>
</template>
