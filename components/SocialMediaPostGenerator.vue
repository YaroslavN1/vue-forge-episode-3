<template>
	<h1 class="text-4xl my-10">Social Media Post Generator</h1>
	<URLForm v-bind="form" @submit-form="handleSubmitForm"/>

	<div>
		<TwitterCard/>
		<!-- Facebook Card Here -->
		<!-- Images Card Here -->
	</div>
</template>

<script setup lang="ts">
import URLForm from './URLForm.vue';
import TwitterCard from './TwitterCard.vue';
import { Payload } from '~~/types';

const form = ref({
	url: '',
	temperature: 0.4,
});

function handleSubmitForm(e: Payload) {
	console.log(e);
}
</script>
