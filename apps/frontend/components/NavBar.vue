<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import LogoIcon from '~/components/LogoIcon.vue'
import { Menu, X } from 'lucide-vue-next'

const user = useSupabaseUser()
const client = useSupabaseClient()
const router = useRouter()
const mobileOpen = ref(false)

const navLinks = [
  { label: 'Início', to: '/' },
  { label: 'Coletâneas', to: '/collections' },
  { label: 'Ferramentas', to: '/tools' },
  { label: 'Dev Hub', to: '/developer-hub' },
  { label: 'Sobre', to: '/about' },
]

const closeMobile = () => { mobileOpen.value = false }

const logout = async () => {
  await client.auth.signOut()
  router.push('/auth/login')
}
</script>

<template>
  <nav class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container mx-auto px-4 h-16 flex items-center justify-between">
      
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2 shrink-0" @click="closeMobile">
        <LogoIcon main-color="#111827" qr-color="#1d4ed8" class="h-8 w-8" />
        <span class="text-xl font-bold font-sans tracking-tight">Louvor<span class="text-primary font-black">JA</span></span>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-6 text-sm font-medium">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="transition-colors hover:text-foreground/80 text-foreground/60"
          active-class="text-foreground"
        >
          {{ link.label }}
        </NuxtLink>
      </div>

      <!-- Desktop Auth Actions -->
      <div class="hidden md:flex items-center gap-3">
        <template v-if="user">
          <Button variant="ghost" size="sm" as-child>
            <NuxtLink to="/profile">Meu Perfil</NuxtLink>
          </Button>
          <Button size="sm" variant="outline" @click="logout">Sair</Button>
        </template>
        <template v-else>
          <Button variant="ghost" size="sm" as-child>
            <NuxtLink to="/auth/login">Entrar</NuxtLink>
          </Button>
          <Button size="sm" as-child>
            <NuxtLink to="/auth/register">Criar Conta</NuxtLink>
          </Button>
        </template>
      </div>

      <!-- Mobile Hamburger Button -->
      <button
        class="md:hidden p-2 rounded-md text-foreground/60 hover:text-foreground hover:bg-muted transition-colors"
        :aria-label="mobileOpen ? 'Fechar menu' : 'Abrir menu'"
        @click="mobileOpen = !mobileOpen"
      >
        <X v-if="mobileOpen" class="h-5 w-5" />
        <Menu v-else class="h-5 w-5" />
      </button>
    </div>

    <!-- Mobile Menu Dropdown -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="mobileOpen" class="md:hidden border-t bg-background px-4 py-4 space-y-1">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="flex items-center py-2.5 px-3 rounded-md text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted transition-colors"
          active-class="text-foreground bg-muted"
          @click="closeMobile"
        >
          {{ link.label }}
        </NuxtLink>

        <div class="pt-3 border-t mt-3 space-y-2">
          <template v-if="user">
            <NuxtLink to="/profile" class="flex items-center py-2 px-3 rounded-md text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted transition-colors" @click="closeMobile">
              Meu Perfil
            </NuxtLink>
            <button class="w-full text-left flex items-center py-2 px-3 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors" @click="logout">
              Sair
            </button>
          </template>
          <template v-else>
            <NuxtLink to="/auth/login" class="flex items-center py-2 px-3 rounded-md text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted transition-colors" @click="closeMobile">
              Entrar
            </NuxtLink>
            <NuxtLink to="/auth/register" class="flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors" @click="closeMobile">
              Criar Conta
            </NuxtLink>
          </template>
        </div>
      </div>
    </Transition>
  </nav>
</template>
