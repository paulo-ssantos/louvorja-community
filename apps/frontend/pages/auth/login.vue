<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const client = useSupabaseClient()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

async function handleLogin() {
  loading.value = true
  error.value = ''
  try {
    const { error: authError } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    if (authError) throw authError
    router.push('/')
  } catch (e: any) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-[calc(100vh-64px)] bg-background flex items-center justify-center p-4">
    <Card class="w-full max-w-[420px]">
      <CardHeader class="space-y-1 text-center">
        <CardTitle class="text-2xl font-bold">Entrar</CardTitle>
        <CardDescription>Digite seu e-mail e senha para acessar sua conta</CardDescription>
      </CardHeader>

      <CardContent>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div class="space-y-2">
            <label for="email" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">E-mail</label>
            <Input
              id="email"
              v-model="email"
              type="email"
              placeholder="seu@email.com"
              required
              autocomplete="email"
            />
          </div>

          <div class="space-y-2">
            <label for="password" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Senha</label>
            <Input
              id="password"
              v-model="password"
              type="password"
              placeholder="••••••••"
              required
              autocomplete="current-password"
            />
          </div>

          <p v-if="error" class="text-sm text-destructive">{{ error }}</p>

          <Button type="submit" class="w-full" :disabled="loading">
            {{ loading ? 'Entrando...' : 'Entrar' }}
          </Button>
        </form>
      </CardContent>

      <CardFooter class="flex flex-col gap-2 text-center text-sm text-muted-foreground">
        <span>Não tem uma conta?
          <NuxtLink to="/auth/register" class="text-primary font-medium hover:underline">Criar Conta</NuxtLink>
        </span>
      </CardFooter>
    </Card>
  </div>
</template>
