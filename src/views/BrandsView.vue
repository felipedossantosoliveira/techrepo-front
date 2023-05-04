<script setup>
import axios from "axios"
import { onMounted } from 'vue'
import { reactive } from 'vue'

const brands = reactive({
	data: [],
})

function loadBrands() {
	axios
		.get('http://localhost:8080/api/v1/brands')
		.then((response) => {
			brands.data = response.data
		})
		.catch((error) => {
			console.log(error)
		})
}

onMounted(() => {
	loadBrands()
})
</script>
<template>
	<div class="pb-3 space-y-2">
		<h1 class="text-3xl text-neutral-100 font-bold">Brands</h1>
		<div>
			<div class="flex items-center space-x-2">
				<input type="text" placeholder="Pesquisar" class="rounded-xl px-4 py-2 w-96 bg-zinc-900 text-neutral-100 border border-neutral-600">
				<button class="text-neutral-200 bg-zinc-800 px-8 border border-zinc-800 py-2 rounded-xl">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>

				</button>
			</div>
		</div>
	</div>
		<div class="grid grid-cols-3 gap-4">
		<div v-for="brand in brands.data" :key="brand.id"
			class="bg-zinc-800 flex flex-wrap rounded-xl text-white overflow-hidden">
			<div class="py-4 px-7 w-9/12">
				<p class=" text-lg font-semibold mb-2">{{ brand.name }}</p>
				<p class="text-neutral-400">Discussões: 25</p>
				<p class="text-neutral-400">Soluções: 8</p>
				<p class="text-neutral-400">Produtos cadastrados: 5</p>
			</div>
			<div class="py-5 items-start w-1/4 px-7 justify-end flex">
				<button>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
						stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round"
							d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
					</svg>


				</button>

			</div>
			<div class="grid grid-cols-2 divide-x w-full border-t border-neutral-400 divide-neutral-400 text-neutral-200">
				<button class="p-4 flex space-x-2 justify-center items-center">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
						stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round"
							d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
					</svg>

					<p>Editar</p>
				</button>
				<button class="p-4 flex space-x-2 justify-center items-center">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
						stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round"
							d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
					</svg>
					<p>Vizualizar</p>
				</button>
			</div>
		</div>
</div></template>