<template>
	<div ref="messageBox" class="chat-wrapper overflow-scroll max-w-lg absolute rounded-lg bg-gray-800">
		<button class="bg-gray-900 p-2" v-if="!showChat" @click="showChat = true" >
			Open chat
		</button>
		<div v-else class="chat-opened w-full">
			<div @click="showChat = false" class="sticky top-0 z-10 collapse collapse-arrow bg-gray-900">
				<div class="collapse-title">
					Customer Support Chat
				</div>
			</div>

			<div v-if="!messages.length" class="text-center w-[450px] m-auto pt-4">
				<strong class="text-lg">Chat with Botman!</strong>
				<p>Our A.I. powered assistant</p>
				<strong class="block mt-10">Go ahead and ask us something:</strong>
				<ul class="list-inside list-disc text-left px-6">
					<li>What is social media post generator?</li>
					<li>How can I get human support?</li>
					<li>How was this tool built?</li>
				</ul>
			</div>

			<ChatBubble
				v-for="message in messages"
				:key="message.id"
				:user="getUser(message.userId)"
				:message="message"
			/>

			<ChatBubble v-for="user in usersTyping" :key="user.id" :user="user">
				<AppLoading/>
			</ChatBubble>

			<div class="form-control sticky bottom-0 bg-gray-800 w-full p-4 pt-8">
					<input
						@keydown.enter.exact="emitMessage()"
						v-model="messageText"
						type="text"
						placeholder="Type here"
						class="input input-bordered w-full bg-base-700"
					/>
				</div>
			</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, defineProps, defineEmits } from 'vue'
	import type { Ref } from 'vue'
	import { Message, User } from "../types"
	import { nanoid } from "nanoid"
	import ChatBubble from './ChatBubble.vue'
	import AppLoading from './AppLoading.vue'

	const props = defineProps<{
		me: User,
		users: User[],
		messages: Message[],
		usersTyping?: User[]
	}>()

	const emit = defineEmits<{(e: 'new-message', payload: Message): void}>()

	const showChat: Ref<boolean> = ref(false)

	const messageText: Ref<string> = ref('')
	function emitMessage() {
		emit(
			'new-message',
			{
				id: nanoid(),
				userId: "user",
				createdAt: new Date(),
				text: messageText.value
			}
		);
		messageText.value = '';
	}

	const messageBox = ref<HTMLElement>()
	watch(
		() => props.messages.length,
		async () => {
			await nextTick()
			if(messageBox.value) {
			messageBox.value.scrollTop = messageBox.value.scrollHeight
		}
	})

	function getUser(userId: string): User {
		return props.users.find((user) => user.id === userId)!
	}

</script>

<style scoped>
.chat-wrapper {
	max-height: 650px;
	bottom: 40px;
	right: 40px;
}

.hide {
	visibility: hidden;
}
</style>
