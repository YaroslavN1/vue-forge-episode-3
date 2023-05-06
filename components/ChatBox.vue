<template>
  <div class="chat-wrapper max-w-lg absolute rounded-lg bg-gray-800 overflow-hidden">
    <button class="bg-gray-900 p-2" v-if="!showChat" @click="showChat = true" >
      Open chat
    </button>
    <div v-else class="chat-opened overflow-visible">
      <div @click="showChat = false" class="collapse collapse-arrow bg-gray-900">
        <div class="collapse-title">
          Customer Support Chat
        </div>
      </div>

      <div class="chat-content p-4">
        <div
          v-for="message in messages"
          :key="message.id"
          class="chat"
          :class="message.userId === 'user' ? 'chat-end' : 'chat-start'"
        >
          <div class="chat-image avatar">
            <div class="w-10 rounded-full">
              <img :src="userAvatar(message.userId)" />
            </div>
          </div>
          <div class="chat-header mb-1">
            <p class="inline mr-2" >{{ userName(message.userId) }}</p>
            <time class="text-xs opacity-50">{{ formatDate(message.createdAt) }}</time>
          </div>
          <div
            class="chat-bubble"
            :class="message.userId === 'user' ? 'bg-gray-600' : 'bg-gray-900'"
          >
            {{ message.text}}
          </div>
        </div>
        <div class="form-control w-full mt-4">
          <input
            @keydown.enter.prevent="emitMessage()"
            v-model="messageText"
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full bg-base-700"
          />
          <label class="label" :class="usersTyping?.length ? '' : 'hide'">
            <span class="label-text-alt">Botman is typing...</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

  import { ref } from 'vue'
  import type { Ref } from 'vue'
  import { defineProps, defineEmits } from 'vue'
  import { Message, User } from "../types";
  import { nanoid } from "nanoid";
  import TimeAgo from 'javascript-time-ago'
  import de from 'javascript-time-ago/locale/en'

  const props = defineProps<{
    me: User,
    users: User[],
    messages: Message[],
    usersTyping?: User[]
  }>()

  const emit = defineEmits<{(e: 'new-message', value: Message): void}>()

  const showChat: Ref<boolean> = ref(true)

  const messageText: Ref<string> = ref('')
  function emitMessage() {
    const userMessage: Message = {
      text: messageText.value,
      id: nanoid(),
      userId: "user",
      createdAt: new Date()
    };
    emit('new-message', userMessage);
    messageText.value = '';
  }

  function userName(name: string): string {
    if (name === 'user') {
      return 'Me'
    } else {
      return 'Botman'
    }
  }
  
  function userAvatar(name: string): string {
    if (name === 'user') {
      return '../public/avatar.jpg'
    } else {
      return '../public/bot.jpg'
    }
  }

  TimeAgo.addDefaultLocale(de)
  const timeAgo = new TimeAgo('de-DE')
  function formatDate(date: Date) {
    return timeAgo.format(date)
  }
  </script>

<style scoped>

.chat-wrapper {
  max-height: 800px;
  bottom: 40px;
  right: 40px;
}

.hide {
  visibility: hidden;
}

</style>
