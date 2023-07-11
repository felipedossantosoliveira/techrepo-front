<script setup>
import { ref, reactive, onMounted } from 'vue'
import Modal from '../../components/Modal.vue';
import axios from 'axios'
import Processing from '../../components/Processing.vue';
import {useRoute, useRouter} from 'vue-router'
import { inject } from 'vue'

const url = import.meta.env.VITE_APP_URL

const brands = reactive({
	data: [],
	processing: false,
})

const route = useRoute()

const router = useRouter()

const id = route.params.id

const form = reactive({
	name: '',
	model: '',
	brandId: null
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

const device = reactive({
	data: {},
	processing: false,
})

function loadDeviceById() {
	device.processing = true
	axios({
		method: 'get',
		url: url + '/devices/'+id,
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('token')
		}
	}).then((response) => {
			device.data = response.data
			form.name = device.data.name
			form.model = device.data.model
			form.brandId = device.data.brand.id
			formBrand.name = device.data.brand.name
			formBrand.id = device.data.brand.id
			loadBrands()
			device.processing = false
		})
		.catch((error) => {
			console.log(error)
		})
}

function editDevice() {
	axios({
		method: 'patch',
		url: url + '/devices/' + id,
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('token')
		},
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

onMounted(() => {
	loadDeviceById()
})
</script>
<template>
	<div class="my-8 space-y-8">
		<h1 class="text-3xl text-neutral-100 font-bold">Device create</h1>
	</div>
	<main>
		<div class="grid grid-cols-2 gap-4">
			<button class="rounded-xl px-4 py-2 w-full bg-zinc-900 text-neutral-100 border border-neutral-600" @click.stop="openBrandSelector">
				<p class="text-left">
					{{ formBrand.name === '' ? 'Selecionar marca' : formBrand.name }}
				</p>
			</button>
			<input placeholder="Nome" v-model="form.name" type="text" class="rounded-xl px-4 py-2 w-full bg-zinc-900 text-neutral-100 border border-neutral-600" />
			<input placeholder="Modelo" v-model="form.model" type="text" class="rounded-xl px-4 py-2 w-full bg-zinc-900 text-neutral-100 border border-neutral-600" />
			<button @click="editDevice" class="rounded-xl px-4 py-2 w-full bg-zinc-900 text-neutral-100 border border-neutral-600">Editar</button>
		</div>
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