<script setup>
import axios from 'axios';
import { ref, reactive, onMounted } from 'vue'
import Modal from '../../components/Modal.vue';
import Processing from '../../components/Processing.vue';
import {useRoute, useRouter} from 'vue-router'

const router = useRouter()


const url = import.meta.env.VITE_APP_URL

const formDevice = reactive({
	name: '',
	id: '',
	show: false,
})

const form = reactive({
	authorId: localStorage.getItem('id'),
	deviceId: null,
	reportedIssue: ''
})

const devices = reactive({
	data: [],
	processing: false,
})

function getDevices() {
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

function createIssue() {
	axios({
		method: 'post',
		url: url + '/issues',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('token')
		},
		data: {
			authorId: form.authorId,
			deviceId: formDevice.id,
			reportedIssue: form.reportedIssue
		}
	}).then((response) => {
		router.push('/issues')
		})
		.catch((error) => {
			console.log(error)
		})
}

function openDeviceSelector() {
	formDevice.show = true
	getDevices()
}

function closeDeviceSelector() {
	devices.data = []
	formDevice.show = false
}

function selectDevice(device) {
	formDevice.name = device.name
	formDevice.id = device.id
	closeDeviceSelector()
}

</script>
<template>
	<div class="grid grid-cols-2 gap-4">
			<button class="rounded-xl px-4 py-2 w-full bg-zinc-900 text-neutral-100 border border-neutral-600" @click.stop="openDeviceSelector">
				<p class="text-left">
					{{ formDevice.name === '' ? 'Selecionar marca' : formDevice.name }}
				</p>
			</button>
			<input placeholder="Issue" v-model="form.reportedIssue" type="text" class="rounded-xl px-4 py-2 w-full bg-zinc-900 text-neutral-100 border border-neutral-600" />
			<button @click="createIssue" class="rounded-xl px-4 py-2 w-full bg-zinc-900 text-neutral-100 border border-neutral-600">Cadastrar</button>
		</div>


<Modal :show="formDevice.show" @close="closeDeviceSelector">
		<div class="p-4 flex items-center justify-between">
			<h1 class="text-xl text-neutral-100 font-bold">Device selector</h1>
			<button @click="closeDeviceSelector" class="text-lg text-neutral-100">X</button>
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
						<tr v-if="formDevice.processing !== false" v-for="device in devices.data" :key="device.id">
							<td class="text-left text-neutral-100 py-2">{{ device.id }}</td>
							<td class="text-left text-neutral-100 py-2">
								<button class="text-neutral-100 hover:text-neutral-200" @click="selectDevice(device)"> 
									{{ device.name }}
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