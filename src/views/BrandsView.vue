<script setup>
import axios from "axios"
import { onMounted } from 'vue'
import { reactive } from 'vue'
import Modal from "../components/Modal.vue";
import Processing from "../components/Processing.vue";

const formBrand = reactive({
	name: '',
	id: '',
	show: false,	
	edit: false,
	processing: false,
})

const detailBrand = reactive({
	show: false,
	data: {},
})

function closeDetailBrand() {
	detailBrand.show = false
	detailBrand.data = {}
}

const url = import.meta.env.VITE_APP_URL

function loadBrand(id) {
	axios({
		method: 'get',
		url: url + '/brands/'+id,
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('token')
		}
	}).then((response) => {
			detailBrand.data = response.data
			detailBrand.show = true
		})
		.catch((error) => {
			console.log(error)
		})
}

function createBrand() {
	formBrand.processing = true
	axios({
		method: 'post',
		url: 'http://localhost:8080/api/v1/brands',
		data: {
			name: formBrand.name,
		}
	})
	.then((response) => {
		formBrand.show = false
		formBrand.name = ""
		formBrand.processing = false
		loadBrands()
	})
	.catch((error) => {
		console.log(error)
	})
}

function editBrand(id) {
	axios
		.get('http://localhost:8080/api/v1/brands/'+id)
		.then((response) => {
			formBrand.name = response.data.name
			formBrand.id = response.data.id
			formBrand.edit = true
		})
		.catch((error) => {
			console.log(error)
		})
}

function updateBrand() {
	formBrand.processing = true
	axios({
		method: 'put',
		url: 'http://localhost:8080/api/v1/brands/'+formBrand.id,
		data: {
			name: formBrand.name,
		}
	})
	.then((response) => {
		formBrand.edit = false
		formBrand.name = ""
		formBrand.id = ""
		formBrand.processing = false
		loadBrands()
	})
	.catch((error) => {
		console.log(error)
	})
}

function deleteBrand(id) {
	axios({
		method: 'delete',
		url: 'http://localhost:8080/api/v1/brands/'+id,
	})
	.then((response) => {
		loadBrands()
	})
	.catch((error) => {
		console.log(error)
	})
}

const brands = reactive({
	data: [],
	processing: false,
})

function loadBrands() {
	brands.processing = true
	axios({
		method: 'get',
		url: url + '/brands',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('token')
		}
	}).then((response) => {
			brands.data = response.data
			brands.processing = false
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
		<div class="flex items-center justify-between">
			<div class="flex items-center space-x-2">
				<input type="text" placeholder="Pesquisar" class="rounded-xl px-4 py-2 w-96 bg-zinc-900 text-neutral-100 border border-neutral-600">
				<button class="text-neutral-200 bg-zinc-800 px-8 border border-zinc-800 py-2 rounded-xl">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
					</svg>
				</button>
			</div>
			<div>
				<button @click="formBrand.show = true" class="font-semibold text-neutral-200 text-2xl">
					+ Cadastrar nova
				</button>
			</div>
		</div>
	</div>
	<div v-if="brands.processing" class="flex items-center justify-center">
		<Processing class="w-7 text-neutral-200" />
	</div>
		<div class="grid grid-cols-3 gap-4">
		<div v-for="brand in brands.data" :key="brand.id"
			class="bg-zinc-800/70 flex flex-wrap rounded-xl text-white overflow-hidden">
			<div class="py-4 px-7 w-9/12">
				<p class=" text-lg font-semibold mb-2">{{ brand.name }}</p>
				<p class="text-neutral-400">Discussões: 25</p>
				<p class="text-neutral-400">Soluções: 8</p>
				<p class="text-neutral-400">Produtos cadastrados: 5</p>
			</div>
			<div class="py-5 items-start w-1/4 px-7 justify-end flex">
				<button @click="deleteBrand(brand.id)">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
						stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round"
							d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
					</svg>
				</button>
			</div>
			<div class="grid grid-cols-2 divide-x w-full border-t border-neutral-400 divide-neutral-400 text-neutral-200">
				<button @click="editBrand(brand.id)" class="p-4 flex space-x-2 justify-center items-center">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
						stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round"
							d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
					</svg>

					<p>Editar</p>
				</button>
				<button @click="loadBrand(brand.id)" class="p-4 flex space-x-2 justify-center items-center">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
						stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round"
							d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
					</svg>
					<p>Vizualizar</p>
				</button>
			</div>
		</div>
</div>
<Modal :show="formBrand.show" @close="formBrand.show = false">
	<div class="p-4 space-y-4">
		<div class="flex items-center justify-between">
			<p class="text-neutral-200 font-semibold">
				Cadastro de Marca
			</p>
			<button @click="formBrand.show = false" class="text-neutral-200 font-bold">
				X
			</button>
		</div>
		<div class="flex space-x-2">
			<input v-model="formBrand.name" type="text" placeholder="Nome" class="p-2 bg-zinc-900 text-neutral-200 border border-neutral-600 rounded-md w-full">
			<button @click.prevent="createBrand" :disabled="formBrand.processing" class="py-2 px-4 bg-zinc-700 rounded-md text-neutral-200">Cadastrar</button>
		</div>
	</div>
</Modal>
<Modal :show="formBrand.edit" @close="formBrand.edit = false">
	<div class="p-4 space-y-4">
		<div class="flex items-center justify-between">
			<p class="text-neutral-200 font-semibold">
				Edição de Marca
			</p>
			<button @click="formBrand.edit = false" class="text-neutral-200 font-bold">
				X
			</button>
		</div>
		<div class="flex space-x-2">
			<input v-model="formBrand.name" type="text" placeholder="Nome" class="p-2 bg-zinc-900 text-neutral-200 border border-neutral-600 rounded-md w-full">
			<button @click.prevent="updateBrand" :disabled="formBrand.processing" class="py-2 px-4 bg-zinc-700 rounded-md text-neutral-200">Editar</button>
		</div>
	</div>
</Modal>
<Modal :show="detailBrand.show" @close="closeDetailBrand()">
	<div class="p-7 space-y-4">
		<div class="flex items-center justify-between pb-4"> 
			<p class="text-neutral-200 font-semibold">Vizualizar marca</p>
			<button @click="closeDetailBrand" class="text-neutral-200 font-semibold">X</button>
		</div>
		<div class="flex">
			<p class="text-neutral-200 font-semibold w-64">Nome</p>
			<p class="text-neutral-400">{{ detailBrand.data.name }}</p>
		</div>
		<div class="flex">
			<p class="text-neutral-200 font-semibold w-64">Discussões</p>
			<p class="text-neutral-400">25</p>
		</div>
		<div class="flex">
			<p class="text-neutral-200 font-semibold w-64">Soluções</p>
			<p class="text-neutral-400">8</p>
		</div>
		<div class="flex">
			<p class="text-neutral-200 font-semibold w-64">Produtos cadastrados</p>
			<p class="text-neutral-400">5</p>
		</div>
	</div>
</Modal>
</template>