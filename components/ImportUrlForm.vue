<template>
  <div>
    <div class="form-control pb-4">
      <div class="input-group">
        <input
          v-model="URL"
          type="text"
          placeholder="Article URL..."
          class="input input-bordered w-full"
        />
        <button class="btn">
          <p>GENERATE ANNOUNCEMENTS</p>
        </button>
      </div>
    </div>
    <input
      v-model="temperature"
      type="range"
      min="0"
      max="1"
      step="0.1"
      class="range range-secondary"
    />
    <p>Temperature: {{ temperature }} -</p>
  </div>
</template>

<script setup lang="ts">

  import type { Payload } from '@/types/index'
  const emit = defineEmits<{
    (e: 'url_temp', payload: Payload): void
  }>();

  const URL = ref('');
  const temperature = ref(0.4);
</script>