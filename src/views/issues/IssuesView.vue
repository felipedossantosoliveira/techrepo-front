<script setup>
import axios from "axios"
import { onMounted, reactive } from "vue";

const url = import.meta.env.VITE_APP_URL

const issues = reactive({
	data: [],
	processing: false,
})

function getIssues() {
	axios({
		method: 'get',
		url: url + '/issues',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('token')
		}
	}).then((response) => {
			issues.data = response.data
		})
		.catch((error) => {
			console.log(error)
		})
}

onMounted(() => {
	getIssues()
})
</script>
<template>
	<div class="my-8 space-y-8">
		<h1 class="text-3xl text-neutral-100 font-bold">Issues</h1>
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
				<router-link to="/issue/create" class="font-semibold text-neutral-200 text-2xl">
					+ Cadastrar nova
				</router-link>
			</div>
		</div>
	</div>
	<div class="w-full overflow-auto">
		<table class="w-full" v-if="!issues.processing">
			<tr class="text-neutral-200 w-full">
				<th class="text-left p-2 border-b">
					Device ID
				</th>
				<th class="text-left p-2 border-b">
					Issue
				</th>
			</tr>
			<tr v-for="issue in issues.data" class="text-neutral-200 w-full">
				<td class="border-b border-neutral-700 p-2 text-neutral-400">
					{{ issue.deviceId }}
				</td>
				<td class="border-b border-neutral-700 p-2 font-semibold">
					{{ issue.reportedIssue }}
				</td>
			</tr>
		</table>
	</div>

</template>