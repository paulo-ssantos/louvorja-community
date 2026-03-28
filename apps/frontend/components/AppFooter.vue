<template>
  <footer class="w-full border-t py-6 md:py-0 bg-background">
    <div class="container flex flex-col items-center justify-between gap-2 md:h-14 md:flex-row px-4 mx-auto">
      <p class="text-sm text-muted-foreground text-center md:text-left">
        Construído pela <a href="#" class="font-medium underline underline-offset-4 hover:text-foreground">Comunidade LJA</a>. Open source.
      </p>
      <nav class="flex items-center gap-4 text-sm text-muted-foreground">
        <NuxtLink to="/about" class="hover:text-foreground transition-colors">Sobre</NuxtLink>
        <NuxtLink to="/collections" class="hover:text-foreground transition-colors">Coletâneas</NuxtLink>
        <a href="https://louvorja.com.br/telegram_dev" target="_blank" rel="noopener noreferrer" class="hover:text-foreground transition-colors">Contribuir</a>
      </nav>
    </div>
  </footer>
</template>
