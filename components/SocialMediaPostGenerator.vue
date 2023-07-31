<template>
	<h1 class="text-4xl my-10">Social Media Post Generator</h1>
	<URLForm v-bind="form" @submit-form="handleFormSubmit"/>

	<div>
		<CardTwitter v-bind="form"/>
		<!-- Facebook Card Here -->
		<!-- Images Card Here -->
	</div>
</template>

<script setup lang="ts">
import URLForm from './URLForm.vue';
import CardTwitter from './CardTwitter.vue';
import { Payload } from '~~/types';

const form = ref({
	url: '',
	temperature: 0.4,
});

function handleFormSubmit(e: Payload) {
	if(!!e.url) {
		form.value = e;
	}
}
</script>
