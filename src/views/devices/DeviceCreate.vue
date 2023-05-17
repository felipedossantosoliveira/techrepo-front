<script setup>
import { ref, reactive } from 'vue'
import Modal from '../../components/Modal.vue';
import axios from 'axios'
import Processing from '../../components/Processing.vue';
import {useRouter} from 'vue-router'

const brands = reactive({
	data: [],
	processing: false,
})

const router = useRouter()

const form = reactive({
	name: '',
	model: '',
	brandId: null
})

function loadBrands() {
	brands.processing = true
	axios
		.get('http://localhost:8080/api/v1/brands')
		.then((response) => {
			brands.data = response.data
			brands.processing = false
		})
		.catch((error) => {
			console.log(error)
		})
}
function createDevice() {
	axios({
		method: 'post',
		url: 'http://localhost:8080/api/v1/devices',
		data: {
			name: form.name,
			model: form.model,
			brandId: formBrand.id
		}
	})
	.then((response) => {
		router.push('/devices')
	})
	.catch((error) => {
		console.log(error)
	})
}

const formBrand = reactive({
	name: '',
	id: '',
	show: false
})

function openBrandSelector() {
	formBrand.show = true
	loadBrands()
}

function closeBrandSelector() {
	brands.data = []
	formBrand.show = false
}

function selectBrand(brand) {
	formBrand.name = brand.name
	formBrand.id = brand.id
	closeBrandSelector()
}
</script>
<template>
	<div class="my-8 space-y-8">
		<h1 class="text-3xl text-neutral-100 font-bold">Device create</h1>
	</div>
	<main>
		<button class="rounded-xl px-4 py-2 w-96 bg-zinc-900 text-neutral-100 border border-neutral-600" @click.stop="openBrandSelector">
			<p class="text-left">
				{{ formBrand.name === '' ? 'Selecionar marca' : formBrand.name }}
			</p>
		</button>
		<input placeholder="Nome" v-model="form.name" type="text" class="rounded-xl px-4 py-2 w-96 bg-zinc-900 text-neutral-100 border border-neutral-600" />
		<input placeholder="Modelo" v-model="form.model" type="text" class="rounded-xl px-4 py-2 w-96 bg-zinc-900 text-neutral-100 border border-neutral-600" />
		<button @click="createDevice" class="rounded-xl px-4 py-2 w-96 bg-zinc-900 text-neutral-100 border border-neutral-600">Cadastrar</button>
	</main>
	<Modal :show="formBrand.show" @close="closeBrandSelector()">
		<div class="p-4 flex items-center justify-between">
			<h1 class="text-xl text-neutral-100 font-bold">Brand selector</h1>
			<button @click="closeBrandSelector()" class="text-lg text-neutral-100">X</button>
		</div>
		<div class="px-4 pb-4 w-full">
			<div class="w-full rounded-md bg-zinc-900 max-h-96 overflow-auto p-4">
				<table class="w-full table-auto">
					<thead>
						<tr class="border-b">
							<th class="text-left text-neutral-100 font-bold py-2">ID</th>
							<th class="text-left text-neutral-100 font-bold py-2">Name</th>
						</tr>
					</thead>
					<tbody>
						<tr v-if="brands.processing === false" v-for="brand in brands.data" :key="brand.id">
							<td class="text-left text-neutral-100 py-2">{{ brand.id }}</td>
							<td class="text-left text-neutral-100 py-2">
								<button class="text-neutral-100 hover:text-neutral-200" @click="selectBrand(brand)"> 
									{{ brand.name }}
								</button>
							</td>
						</tr>
						<tr v-else>
							<td colspan="2">
								<div class="flex justify-center p-7">
									<Processing class="w-7 text-neutral-200" />
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</Modal>
</template>