<template>
  <div>
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img :src="userAvatar(message.userId)" />
      </div>
    </div>
    <div class="chat-header mb-1">
      <p class="inline mr-2" >{{ userName(message.userId) }}</p>
      <time class="text-xs opacity-50">{{ timeAgo(message.createdAt) }}</time>
    </div>
    <div
      class="chat-bubble"
      :class="message.userId === 'user' ? 'bg-gray-600' : 'bg-gray-900'"
    >
      <Markdown :source="message?.text" class="w-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Ref } from 'vue'
  import Markdown from 'vue3-markdown-it'
  import { Message } from "../types"
  import { useTimeAgo } from '@vueuse/core'



  const props = defineProps<{
    message: Message
  }>()

  function userName(name: string): string {
    if (name === 'user') {
      return 'Me'
    } else {
      return 'Botman'
    }
  }

  function userAvatar(name: string): string {
    if (name === 'user') {
      return '/avatar.jpg'
    } else {
      return '/bot.jpg'
    }
  }

  function timeAgo (date: Date): Ref<string> {
    return useTimeAgo(date)
  }

</script>