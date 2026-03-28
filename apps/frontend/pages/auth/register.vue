<script setup lang="ts">
import { ref } from 'vue'
import { Music2, Eye, EyeOff } from 'lucide-vue-next'

const client = useSupabaseClient()
const router = useRouter()

const email = ref('')
const password = ref('')
const username = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')
const success = ref(false)

async function handleRegister() {
  loading.value = true
  error.value = ''
  try {
    const { data, error: authError } = await client.auth.signUp({
      email: email.value,
      password: password.value,
    })
    if (authError) throw authError
    if (data.user) {
      await client.from('profiles').insert({
        id: data.user.id,
        username: username.value,
      })
      success.value = true
    }
  } catch (e: any) {
    error.value = e.message || 'Erro ao criar conta. Tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
    <div class="w-full max-w-[400px] animate-fade-up">

      <!-- Logo mark -->
      <div class="flex flex-col items-center mb-8 text-center">
        <div class="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-4">
          <Music2 class="w-6 h-6 text-primary" />
        </div>
        <h1 class="font-display text-3xl font-semibold mb-1">Criar Conta</h1>
        <p class="text-sm text-muted-foreground">Junte-se à comunidade LouvorJA</p>
      </div>

      <!-- Success state -->
      <div v-if="success" class="rounded-2xl bg-card border border-white/[0.07] p-8 text-center space-y-4">
        <div class="w-12 h-12 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto text-2xl">
          ✓
        </div>
        <div>
          <h2 class="font-display font-semibold text-lg mb-1">Conta criada!</h2>
          <p class="text-sm text-muted-foreground">Verifique seu e-mail para confirmar a conta antes de entrar.</p>
        </div>
        <NuxtLink
          to="/auth/login"
          class="inline-flex items-center px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
        >
          Ir para o login
        </NuxtLink>
      </div>

      <!-- Form -->
      <div v-else class="rounded-2xl bg-card border border-white/[0.07] p-6">
        <form @submit.prevent="handleRegister" class="space-y-4">

          <div class="space-y-1.5">
            <label for="username" class="text-sm font-medium">Nome de usuário</label>
            <input
              id="username"
              v-model="username"
              type="text"
              placeholder="seunome"
              required
              autocomplete="username"
              class="w-full h-11 px-4 rounded-xl bg-background border border-white/[0.08] text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
            />
          </div>

          <div class="space-y-1.5">
            <label for="email" class="text-sm font-medium">E-mail</label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="seu@email.com"
              required
              autocomplete="email"
              class="w-full h-11 px-4 rounded-xl bg-background border border-white/[0.08] text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
            />
          </div>

          <div class="space-y-1.5">
            <label for="password" class="text-sm font-medium">Senha</label>
            <div class="relative">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Mínimo 6 caracteres"
                required
                minlength="6"
                autocomplete="new-password"
                class="w-full h-11 pl-4 pr-11 rounded-xl bg-background border border-white/[0.08] text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                @click="showPassword = !showPassword"
              >
                <Eye v-if="!showPassword" class="h-4 w-4" />
                <EyeOff v-else class="h-4 w-4" />
              </button>
            </div>
          </div>

          <!-- Error -->
          <div v-if="error" class="p-3 rounded-lg bg-destructive/10 border border-destructive/25">
            <p class="text-sm text-destructive">{{ error }}</p>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full h-11 rounded-xl font-semibold text-sm transition-all"
            :class="loading ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'bg-primary text-primary-foreground hover:bg-primary/90'"
          >
            <span v-if="loading" class="flex items-center justify-center gap-2">
              <span class="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Criando conta...
            </span>
            <span v-else>Criar Conta</span>
          </button>
        </form>
      </div>

      <p class="text-center text-sm text-muted-foreground mt-5">
        Já tem uma conta?
        <NuxtLink to="/auth/login" class="text-primary font-medium hover:underline ml-1">Entrar</NuxtLink>
      </p>
    </div>
  </div>
</template>
