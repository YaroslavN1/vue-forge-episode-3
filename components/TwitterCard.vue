<template>
	<div class="card w-full bg-base-100 shadow-xl mt-8">
		<div class="card-body">
			<h2 class="card-title text-2xl">Twitter</h2>
			<div class="divider m-0"/>
		</div>
		<div class="px-8 pb-8">
			<textarea
				v-model="mediaPost"
			  class="textarea w-full"
			  placeholder="Import an article to generate an announcement..."
			/>
			<span class="flex mt-4">
				<p class="w-full text-xs">Characters Count: {{ characterCount }}</p>
				<button class="btn btn-active btn-info">Tweet</button>
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
	const mediaPost = ref('')
	const characterCount = computed(() => mediaPost.value.length)
</script>