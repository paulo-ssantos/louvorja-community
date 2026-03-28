<template>
  <footer class="border-t border-white/[0.06] bg-background">
    <div class="site-container py-10">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

        <!-- Brand -->
        <div class="space-y-2">
          <span class="font-display font-semibold text-base">
            Louvor<span class="text-primary">JA</span> Community
          </span>
          <p class="text-sm text-muted-foreground max-w-xs leading-relaxed">
            Plataforma comunitária independente para recursos de louvor e adoração.
          </p>
        </div>

        <!-- Links -->
        <nav class="flex flex-col sm:flex-row gap-6 sm:gap-10">
          <div class="space-y-2">
            <p class="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 mb-3">Recursos</p>
            <div class="flex flex-col gap-2">
              <NuxtLink to="/collections" class="text-sm text-muted-foreground hover:text-foreground transition-colors">Coletâneas</NuxtLink>
              <NuxtLink to="/tools" class="text-sm text-muted-foreground hover:text-foreground transition-colors">Ferramentas</NuxtLink>
              <NuxtLink to="/developer-hub" class="text-sm text-muted-foreground hover:text-foreground transition-colors">Dev Hub</NuxtLink>
            </div>
          </div>
          <div class="space-y-2">
            <p class="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 mb-3">Projeto</p>
            <div class="flex flex-col gap-2">
              <NuxtLink to="/about" class="text-sm text-muted-foreground hover:text-foreground transition-colors">Sobre</NuxtLink>
              <a
                href="https://louvorja.com.br/telegram_dev"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contribuir
              </a>
              <a
                href="https://louvorja.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                louvorja.com.br
              </a>
            </div>
          </div>
        </nav>
      </div>

      <div class="mt-10 pt-6 border-t border-white/[0.05] flex items-center justify-between gap-4">
        <p class="text-xs text-muted-foreground/50">
          Não é o site oficial do Louvor JA. Projeto open source da comunidade.
        </p>
        <div class="w-2 h-2 rounded-full bg-primary/40 animate-pulse-glow" />
      </div>
    </div>
  </footer>
</template>
