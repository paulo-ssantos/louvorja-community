<script setup lang="ts">
import { ref } from 'vue'
import { ArrowLeft, UploadCloud, X, FileArchive } from 'lucide-vue-next'

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
const fileInput = ref<HTMLInputElement | null>(null)

const formatBytes = (bytes: number) => {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

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
  if (!form.value.name.trim()) { error.value = 'O nome é obrigatório'; return }
  if (!form.value.category) { error.value = 'Selecione uma categoria'; return }
  if (!form.value.file) { error.value = 'Selecione um arquivo para enviar'; return }
  if (!form.value.file.name.match(/\.(zip|rar|7z)$/i)) { error.value = 'Envie um arquivo ZIP, RAR ou 7Z'; return }

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
    error.value = e.message || 'Erro ao enviar. Tente novamente.'
  } finally {
    uploading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen">
    <div class="site-container py-10 max-w-2xl">

      <NuxtLink
        to="/collections"
        class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
      >
        <ArrowLeft class="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
        Voltar para Coletâneas
      </NuxtLink>

      <!-- Not logged in -->
      <div v-if="!user" class="rounded-2xl bg-card border border-white/[0.07] p-12 text-center">
        <div class="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mx-auto mb-4">
          <UploadCloud class="h-6 w-6 text-muted-foreground" />
        </div>
        <h2 class="font-display text-xl font-semibold mb-2">Faça login para continuar</h2>
        <p class="text-muted-foreground text-sm mb-6">Você precisa estar logado para enviar uma coletânea.</p>
        <NuxtLink
          to="/auth/login"
          class="inline-flex items-center px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
        >
          Entrar
        </NuxtLink>
      </div>

      <!-- Form -->
      <div v-else class="space-y-6 animate-fade-up">
        <div>
          <h1 class="font-display text-4xl font-semibold tracking-tight mb-1">Enviar Coletânea</h1>
          <p class="text-muted-foreground text-sm">Compartilhe suas músicas com a comunidade LouvorJA</p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-5">

          <div class="rounded-2xl bg-card border border-white/[0.07] p-6 space-y-5">
            <!-- Name -->
            <div class="space-y-1.5">
              <label for="name" class="text-sm font-medium">Nome da Coletânea <span class="text-destructive">*</span></label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                placeholder="ex: Louvor Jovem 2025"
                required
                class="w-full h-11 px-4 rounded-xl bg-background border border-white/[0.08] text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
              />
            </div>

            <!-- Description -->
            <div class="space-y-1.5">
              <label for="description" class="text-sm font-medium">Descrição</label>
              <textarea
                id="description"
                v-model="form.description"
                rows="3"
                placeholder="Descreva o conteúdo da coletânea, estilo musical, ocasião..."
                class="w-full px-4 py-3 rounded-xl bg-background border border-white/[0.08] text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none leading-relaxed"
              />
            </div>

            <!-- Category -->
            <div class="space-y-1.5">
              <label for="category" class="text-sm font-medium">Categoria <span class="text-destructive">*</span></label>
              <select
                id="category"
                v-model="form.category"
                required
                class="w-full h-11 px-4 rounded-xl bg-background border border-white/[0.08] text-sm focus:outline-none focus:border-primary/50 transition-all"
              >
                <option value="">Selecione uma categoria</option>
                <option v-for="cat in categories" :key="cat.value" :value="cat.value">{{ cat.label }}</option>
              </select>
            </div>
          </div>

          <!-- File drop zone -->
          <div class="space-y-1.5">
            <label class="text-sm font-medium">Arquivo <span class="text-destructive">*</span></label>
            <div
              class="rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-all"
              :class="isDragging
                ? 'border-primary bg-primary/8'
                : form.value?.file
                  ? 'border-primary/30 bg-primary/5'
                  : 'border-white/[0.1] hover:border-white/25'"
              @dragover.prevent="isDragging = true"
              @dragleave.prevent="isDragging = false"
              @drop.prevent="handleDrop"
              @click="fileInput?.click()"
            >
              <input ref="fileInput" type="file" accept=".zip,.rar,.7z" class="hidden" @change="handleFileChange" />

              <div v-if="!form.file" class="flex flex-col items-center gap-3 text-muted-foreground">
                <div class="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                  <UploadCloud class="h-6 w-6" />
                </div>
                <div>
                  <p class="text-sm font-medium text-foreground mb-0.5">Arraste e solte aqui</p>
                  <p class="text-xs text-muted-foreground">ou <span class="text-primary">clique para selecionar</span></p>
                </div>
                <p class="text-xs text-muted-foreground/60">ZIP, RAR, 7Z — máximo 100MB</p>
              </div>

              <div v-else class="flex items-center justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
                  <div class="w-10 h-10 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0">
                    <FileArchive class="h-5 w-5 text-primary" />
                  </div>
                  <div class="min-w-0 text-left">
                    <p class="text-sm font-medium truncate">{{ form.file.name }}</p>
                    <p class="text-xs text-muted-foreground">{{ formatBytes(form.file.size) }}</p>
                  </div>
                </div>
                <button
                  type="button"
                  class="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  @click.stop="form.file = null"
                >
                  <X class="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <!-- Progress / Error -->
          <div v-if="uploading" class="flex items-center gap-3 p-4 rounded-xl bg-primary/8 border border-primary/20">
            <div class="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin shrink-0" />
            <p class="text-sm text-primary">{{ uploadProgress }}</p>
          </div>
          <div v-if="error" class="p-4 rounded-xl bg-destructive/10 border border-destructive/25">
            <p class="text-sm text-destructive">{{ error }}</p>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="uploading || !form.file"
            class="w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all"
            :class="uploading || !form.file
              ? 'bg-muted text-muted-foreground cursor-not-allowed'
              : 'bg-primary text-primary-foreground hover:bg-primary/90'"
          >
            {{ uploading ? 'Enviando...' : 'Enviar Coletânea' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
