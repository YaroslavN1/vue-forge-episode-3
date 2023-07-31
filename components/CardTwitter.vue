<template>
	<div class="card w-full bg-base-100 shadow-xl mt-8 border-t-2 border-sky-400">
		<div class="card-body">
			<h2 class="card-title text-2xl">Twitter</h2>
			<div class="divider m-0"/>
		</div>
		<div class="px-8 pb-8">
			<textarea
				v-model="editedTweet"
			  class="textarea w-full mb-4"
			  placeholder="Import an article to generate an announcement..."
			/>
			<span class="flex">
				<p class="grow text-xs">Characters Count: {{ characterCount }}</p>
				<button class="btn btn-active btn-info">Tweet</button>
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	url: string,
	temperature: number,
}>();

const editedTweet = ref('');

const characterCount = computed(() => editedTweet.value.length)
</script>