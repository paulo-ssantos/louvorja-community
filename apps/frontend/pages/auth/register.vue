<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const client = useSupabaseClient()
const router = useRouter()

const email = ref('')
const password = ref('')
const username = ref('')
const loading = ref(false)
const error = ref('')

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
      router.push('/auth/login')
    }
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
        <CardTitle class="text-2xl font-bold">Criar Conta</CardTitle>
        <CardDescription>Junte-se à comunidade LouvorJA e comece a contribuir</CardDescription>
      </CardHeader>

      <CardContent>
        <form @submit.prevent="handleRegister" class="space-y-4">
          <div class="space-y-2">
            <label for="username" class="text-sm font-medium leading-none">Nome de usuário</label>
            <Input
              id="username"
              v-model="username"
              type="text"
              placeholder="seunome"
              required
              autocomplete="username"
            />
          </div>

          <div class="space-y-2">
            <label for="email" class="text-sm font-medium leading-none">E-mail</label>
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
            <label for="password" class="text-sm font-medium leading-none">Senha</label>
            <Input
              id="password"
              v-model="password"
              type="password"
              placeholder="••••••••"
              required
              minlength="6"
              autocomplete="new-password"
            />
          </div>

          <p v-if="error" class="text-sm text-destructive">{{ error }}</p>

          <Button type="submit" class="w-full" :disabled="loading">
            {{ loading ? 'Criando conta...' : 'Criar Conta' }}
          </Button>
        </form>
      </CardContent>

      <CardFooter class="text-center text-sm text-muted-foreground">
        Já tem uma conta?
        <NuxtLink to="/auth/login" class="ml-1 text-primary font-medium hover:underline">Entrar</NuxtLink>
      </CardFooter>
    </Card>
  </div>
</template>
