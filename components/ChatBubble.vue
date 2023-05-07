<template>
  <div
    class="chat chat-content z-0 px-4"
    :class="message?.userId === 'user' ? 'chat-end' : 'chat-start'"
  >
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img :src="user?.avatar || userAvatar(message?.userId)" />
      </div>
    </div>
    <div class="chat-header mb-1">
      <p class="inline mr-2">{{ userName(user?.name || message?.userId) }}</p>
      <time v-if="message" class="text-xs opacity-50">{{ timeAgo(message?.createdAt) }}</time>
    </div>
    <div
      class="chat-bubble"
      :class="(user?.id || message?.userId) === 'user' ? 'bg-gray-600' : 'bg-gray-900'"
    >
      <slot>
        <Markdown :source="message?.text" class="w-full" />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Ref } from 'vue'
  import Markdown from 'vue3-markdown-it'
  import { Message, User } from "../types"
  import { useTimeAgo } from '@vueuse/core'



  const props = defineProps<{
    message?: Message,
    user?: User
  }>()

  function userName(name: string): string {
    if (name === 'user') {
      return 'Me'
    } else if (name === 'assistant') {
      return 'Botman'
    } else {
      return name
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