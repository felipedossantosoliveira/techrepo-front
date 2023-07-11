<script setup>
import axios from "axios"
import { onMounted } from 'vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const devices = reactive({
	data: [],
	processing: false,
})

const router = useRouter()

const url = import.meta.env.VITE_APP_URL

function loadDevices() {
	devices.processing = true
	axios({
		method: 'get',
		url: url + '/devices',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('token')
		}
	}).then((response) => {
			devices.data = response.data
			devices.processing = false
		})
		.catch((error) => {
			console.log(error)
		})
}
function deleteDevice(id) {
	devices.processing = true
	axios({
		method: 'delete',
		url: url + '/devices/'+id,
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('token')
		}
	}).then((response) => {
			devices.data = response.data
			devices.processing = false
			loadDevices()
		})
		.catch((error) => {
			console.log(error)
		})
}

onMounted(() => {
	loadDevices()
})

</script>
<template>
	<div class="my-8 space-y-8">
		<h1 class="text-3xl text-neutral-100 font-bold">Devices</h1>
		<div class="flex items-center justify-between">
			<div class="flex items-center space-x-2">
				<!-- <input type="text" placeholder="Pesquisar" class="rounded-xl px-4 py-2 w-96 bg-zinc-900 text-neutral-100 border border-neutral-600"> -->
				<!-- <button class="text-neutral-200 bg-zinc-800 px-8 border border-zinc-800 py-2 rounded-xl">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
					</svg>
				</button> -->
			</div>
			<div>
				<router-link to="/device/create" class="font-semibold text-neutral-200 text-2xl">
					+ Cadastrar novo
				</router-link>
			</div>
		</div>
	</div>
	<div class="w-full overflow-auto">
		<table class="w-full" v-if="!devices.processing">
			<tr class="text-neutral-200 w-full">
				<th class="text-left p-2 border-b">
					ID
				</th>
				<th class="text-left p-2 border-b">
					Nome
				</th>
				<th class="text-left p-2 border-b">
					Modelo
				</th>
				<th class="text-left p-2 border-b">
					Marca
				</th>
				<th class="text-right p-2 border-b">
					Ações
				</th>
			</tr>
			<tr v-for="device in devices.data" class="text-neutral-200 w-full">
				<td class="border-b border-neutral-700 p-2 text-neutral-400">
					{{ device.id }}
				</td>
				<td class="border-b border-neutral-700 p-2 font-semibold">
					{{ device.name }}
				</td>
				<td class="border-b border-neutral-700 p-2 text-neutral-400">
					{{ device.model }}
				</td>
				<td class="border-b border-neutral-700 p-2 text-neutral-400">
					{{ device.brand.name }}
				</td>
				<td class="border-b border-neutral-700 p-2 text-neutral-400 space-x-2 text-right">
					<button
					@click="router.push('/device/edit/'+device.id)"
					>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
							<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
						</svg>
					</button>
					<button @click="deleteDevice(device.id)">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

					</button>
				</td>
			</tr>
		</table>
	</div>
</template>