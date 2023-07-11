<script setup>
import LogoOnion from '@/components/icons/LogoOnion.vue'

</script>

<template>
  <main>
    <div class="w-full mt-36 flex flex-col space-y-10 justify-center items-center">
      <div class="text-center">
        <p class="text-4xl font-bold mb-4 text-neutral-200">
          techrepo
        </p>
        <LogoOnion class="w-96 mb-4" />
        <p class="w-96 text-neutral-200">
          Uma plataforma open source com metade dos escritos em português e a outra metade em inglês por motivos do TDAH do programador.
        </p>
      </div>
      <div class="grid grid-cols-2 gap-x-4">
        <a href="https://github.com/felipedossantosoliveira/techrepo-front" class="rounded-xl px-4 py-2 w-full bg-zinc-900 text-neutral-100 border border-neutral-600">github front-end</a>
        <a href="https://github.com/gabrielanceski/techrepo" class="rounded-xl px-4 py-2 w-full bg-zinc-900 text-neutral-100 border border-neutral-600">github back-end</a>
      </div>
    </div>
  </main>
</template>
