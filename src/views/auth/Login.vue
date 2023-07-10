<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios'

const form = reactive({
	email: '',
	password: '',
	username: '',
})

const inputclass = ref('p-2 rounded-md bg-zinc-900 text-neutral-100 border border-neutral-600')

const url = import.meta.env.VITE_APP_URL

function login() {
	axios({
		method: 'post',
		url: url + '/auth/register',
		data: {
			email: form.email,
			password: form.password,
			username: form.username,
		},
	}).then((response) => {
		console.log(response)
			localStorage.setItem('token', response.data.token)
			window.location.href = '/'
		})
		.catch((error) => {
			console.log(error)
		})
}

</script>
<template>
	<div class="w-screen h-screen fixed top-0 left-0 bg-zinc-800 flex items-center justify-center">
		<div>
			<div class="grid gap-4" >
				<div>
					<h1 class="text-neutral-200 font-bold text-2xl">
						techrepo
					</h1>
					<h2 class="text-neutral-300 font-semibold">
						Register
					</h2>
				</div>
				<input :class="inputclass" type="text" placeholder="Username" v-model="form.username">
				<input :class="inputclass" type="email" placeholder="Email" v-model="form.email">
				<input :class="inputclass" type="password" placeholder="Password" v-model="form.password">
				<button @click="login" type="submit" class="bg-neutral-400 rounded-md p-2">Register</button>
			</div>
		</div>

	</div>



</template>