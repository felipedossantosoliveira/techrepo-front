<script setup>
import { RouterView } from 'vue-router'
import { reactive } from 'vue'
import LogoOnion from '@/components/icons/LogoOnion.vue'

const show = reactive({
  value: false,
})

</script>

<template>
  <!-- <header> -->
    <!-- <div class="flex mx-10 my-4 rounded-2xl px-10 py-4 items-center bg-zinc-800 justify-between">
        <p class="bg-gradient-to-r from-lime-700 to-green-500 bg-clip-text text-4xl font-extrabold text-transparent">
        techrepo
        </p>
        <a href="https://github.com/felipedossantosoliveira/techrepo-front" target="_blank">
        <svg class="w-10 text-neutral-200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9642 0C5.34833 0 0 5.5 0 12.3042C0 17.7432 3.42686 22.3472 8.18082 23.9767C8.77518 24.0992 8.9929 23.712 8.9929 23.3862C8.9929 23.101 8.97331 22.1232 8.97331 21.1045C5.64514 21.838 4.95208 19.6378 4.95208 19.6378C4.41722 18.2118 3.62473 17.8452 3.62473 17.8452C2.53543 17.0915 3.70408 17.0915 3.70408 17.0915C4.91241 17.173 5.54645 18.3545 5.54645 18.3545C6.61592 20.2285 8.33927 19.699 9.03257 19.373C9.13151 18.5785 9.44865 18.0285 9.78539 17.723C7.13094 17.4377 4.33812 16.3785 4.33812 11.6523C4.33812 10.3078 4.81322 9.20775 5.56604 8.35225C5.44727 8.04675 5.03118 6.7835 5.68506 5.09275C5.68506 5.09275 6.69527 4.76675 8.97306 6.35575C9.94827 6.08642 10.954 5.9494 11.9642 5.94825C12.9744 5.94825 14.0042 6.091 14.9552 6.35575C17.2332 4.76675 18.2434 5.09275 18.2434 5.09275C18.8973 6.7835 18.481 8.04675 18.3622 8.35225C19.1349 9.20775 19.5904 10.3078 19.5904 11.6523C19.5904 16.3785 16.7976 17.4172 14.1233 17.723C14.5592 18.11 14.9353 18.8432 14.9353 20.0045C14.9353 21.6545 14.9158 22.9787 14.9158 23.386C14.9158 23.712 15.1337 24.0992 15.7278 23.977C20.4818 22.347 23.9087 17.7432 23.9087 12.3042C23.9282 5.5 18.5603 0 11.9642 0Z" fill="currentColor"/>
        </svg>
        </a>
    </div> -->
  <!-- </header> -->
  <!-- <div class="bg-zinc-800 h-screen flex w-screen pr-4 py-4">
    <div class="h-full h
    w-16">
      <div>
        <svg class="w-10" viewBox="0 0 700 621" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M575 452.5V236L700 320.5V537L575 452.5Z" fill="url(#paint0_linear_8_2)"/>
<path d="M600 320.5H700L575 236H475L537.5 278.25L600 320.5Z" fill="#D9D9D9"/>
<path d="M475 236V168L600 252.5V320.5L475 236Z" fill="#BEBEBE"/>
<path d="M637.5 210.25L575 168H475L600 252.5H700L637.5 210.25Z" fill="#979797"/>
<path d="M637.5 42.25L575 0V168L700 252.5V84.5L637.5 42.25Z" fill="url(#paint1_linear_8_2)"/>
<path d="M225 0H400H575L700 84.5H350L287.5 42.25L225 0Z" fill="#D9D9D9"/>
<path d="M350 536.5V84L475 168.5V621L350 536.5Z" fill="#3E8581"/>
<path d="M0 84H350L475 168.5H125L0 84Z" fill="#6AE3DD"/>
<defs>
<linearGradient id="paint0_linear_8_2" x1="700" y1="198" x2="575" y2="365" gradientUnits="userSpaceOnUse">
<stop stop-color="#4F4F4F"/>
<stop offset="1" stop-color="#A2A2A2"/>
</linearGradient>
<linearGradient id="paint1_linear_8_2" x1="637.5" y1="2.49336e-06" x2="468.5" y2="230.5" gradientUnits="userSpaceOnUse">
<stop stop-color="#606060"/>
<stop offset="0.625" stop-color="#A2A2A2"/>
</linearGradient>
</defs>
</svg>
      </div>
    </div>
    <div class="bg-zinc-900 h-full w-full rounded-xl">
    </div>
  </div> -->
  <header>
    <div class="fixed w-full h-full opacity-5 flex items-center justify-center -z-10">
      <LogoOnion class="h-full p-4"/>
    </div>
    <div>
      <div class="flex flex-wrap my-4 rounded-2xl px-10 py-4 items-center justify-between">
        <div class="text-2xl w-full justify-center md:w-auto md:justify-start font-bold px-6 h-10 flex items-center space-x-4 bg-zinc-900 text-neutral-200 rounded-full">
          <LogoOnion class="w-10" />
          <p>
            techrepo
          </p>
        </div>
        <div class="grid w-full grid-cols-2 gap-y-4 sm:grid-cols-4 justify-between gap-x-4 md:w-auto mt-5 md:mt-0">
          <router-link to="/" class="flex items-center justify-center font-semibold text-neutral-200 bg-zinc-900 p-2 rounded-full">
            Home
          </router-link>
          <router-link to="/brands" class="flex items-center justify-center font-semibold text-neutral-200 bg-zinc-900 p-2 rounded-full">
            Brands
          </router-link>
          <router-link to="/devices" class="flex items-center justify-center font-semibold text-neutral-200 bg-zinc-900 p-2 rounded-full">
            Devices
          </router-link>
          <router-link to="/issues" class="flex items-center justify-center font-semibold text-neutral-200 bg-zinc-900 p-2 rounded-full">
            Issues
          </router-link>
        </div>
      </div>
    </div>
  </header>
  <div class="px-10">
    <router-view />
  </div>
</template>
