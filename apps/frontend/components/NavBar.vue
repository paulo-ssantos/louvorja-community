<script setup lang="ts">
import { ref } from 'vue'
import { Menu, X } from 'lucide-vue-next'
import LogoIcon from '~/components/LogoIcon.vue'

const user = useSupabaseUser()
const client = useSupabaseClient()
const router = useRouter()
const route = useRoute()
const mobileOpen = ref(false)

const navLinks = [
  { label: 'Coletâneas', to: '/collections' },
  { label: 'Ferramentas', to: '/tools' },
  { label: 'Dev Hub', to: '/developer-hub' },
  { label: 'Sobre', to: '/about' },
]

const closeMobile = () => { mobileOpen.value = false }

const logout = async () => {
  await client.auth.signOut()
  router.push('/auth/login')
  closeMobile()
}

const isActive = (to: string) => route.path === to || route.path.startsWith(to + '/')
</script>

<template>
  <nav class="sticky top-0 z-50 w-full">
    <!-- Glass bar -->
    <div class="border-b border-white/[0.06] bg-background/80 backdrop-blur-xl backdrop-saturate-150">
      <div class="site-container h-16 flex items-center justify-between">

        <!-- Logo -->
        <NuxtLink
          to="/"
          class="flex items-center gap-2.5 shrink-0 group"
          @click="closeMobile"
        >
          <LogoIcon size="32px" class="shrink-0 transition-transform group-hover:scale-105" />
          <span class="font-display font-semibold text-lg tracking-tight">
            Louvor<span class="text-primary">JA</span>
          </span>
        </NuxtLink>

        <!-- Desktop nav -->
        <div class="hidden md:flex items-center gap-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150"
            :class="isActive(link.to)
              ? 'text-foreground bg-white/[0.07]'
              : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.04]'"
          >
            {{ link.label }}
          </NuxtLink>
        </div>

        <!-- Desktop auth -->
        <div class="hidden md:flex items-center gap-2">
          <template v-if="user">
            <NuxtLink
              to="/profile"
              class="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-all"
            >
              Meu Perfil
            </NuxtLink>
            <button
              class="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-all"
              @click="logout"
            >
              Sair
            </button>
          </template>
          <template v-else>
            <NuxtLink
              to="/auth/login"
              class="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-all"
            >
              Entrar
            </NuxtLink>
            <NuxtLink
              to="/auth/register"
              class="px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Criar Conta
            </NuxtLink>
          </template>
        </div>

        <!-- Mobile toggle -->
        <button
          class="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-all"
          :aria-label="mobileOpen ? 'Fechar menu' : 'Abrir menu'"
          @click="mobileOpen = !mobileOpen"
        >
          <Transition
            enter-active-class="transition-all duration-150"
            enter-from-class="rotate-90 opacity-0 scale-50"
            enter-to-class="rotate-0 opacity-100 scale-100"
            leave-active-class="transition-all duration-100"
            leave-from-class="rotate-0 opacity-100 scale-100"
            leave-to-class="-rotate-90 opacity-0 scale-50"
            mode="out-in"
          >
            <X v-if="mobileOpen" class="h-5 w-5" />
            <Menu v-else class="h-5 w-5" />
          </Transition>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-3"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-3"
    >
      <div
        v-if="mobileOpen"
        class="md:hidden border-b border-white/[0.06] bg-background/95 backdrop-blur-xl"
      >
        <div class="site-container py-4 space-y-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="flex items-center py-2.5 px-3 rounded-lg text-sm font-medium transition-all"
            :class="isActive(link.to)
              ? 'text-foreground bg-white/[0.07]'
              : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.04]'"
            @click="closeMobile"
          >
            {{ link.label }}
          </NuxtLink>

          <div class="pt-3 border-t border-white/[0.06] mt-3 space-y-1">
            <template v-if="user">
              <NuxtLink
                to="/profile"
                class="flex items-center py-2.5 px-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-all"
                @click="closeMobile"
              >
                Meu Perfil
              </NuxtLink>
              <button
                class="w-full text-left flex items-center py-2.5 px-3 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                @click="logout"
              >
                Sair
              </button>
            </template>
            <template v-else>
              <NuxtLink
                to="/auth/login"
                class="flex items-center py-2.5 px-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-all"
                @click="closeMobile"
              >
                Entrar
              </NuxtLink>
              <NuxtLink
                to="/auth/register"
                class="flex items-center justify-center py-2.5 px-3 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                @click="closeMobile"
              >
                Criar Conta
              </NuxtLink>
            </template>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>
