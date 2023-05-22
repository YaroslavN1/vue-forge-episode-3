<template>
	<div
		class="chat chat-content z-0 px-4"
		:class="user.id === 'user' ? 'chat-end' : 'chat-start'"
	>
		<div class="chat-image avatar">
			<div class="w-10 rounded-full">
				<img :src="user.avatar"/>
			</div>
		</div>
		<div class="chat-header mb-1">
			<p class="inline mr-2">{{ user.name }}</p>
			<time v-if="message" class="text-xs opacity-50">{{ useTimeAgo(message?.createdAt).value }}</time>
		</div>
		<div
			class="chat-bubble"
			:class="user?.id === 'user' ? 'bg-gray-600' : 'bg-gray-900'"
		>
			<slot>
				<Markdown :source="message?.text" class="w-full" />
			</slot>
		</div>
	</div>
</template>

<script setup lang="ts">
	import Markdown from 'vue3-markdown-it'
	import { Message, User } from "../types"
	import { useTimeAgo } from '@vueuse/core'

	const props = defineProps<{
		message?: Message,
		user: User
	}>()
</script>