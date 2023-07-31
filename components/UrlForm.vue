<template>
  <div>
    <div class="form-control pb-4">
      <div class="input-group">
        <input
          v-model="form.url"
          type="text"
          placeholder="Article URL..."
          class="input input-bordered w-full"
        />
        <button class="btn" @click="emit('submit-form', form)">
          <p>GENERATE ANNOUNCEMENTS</p>
        </button>
      </div>
    </div>
    <input
      v-model.number="form.temperature"
      type="range"
      min="0"
      max="1"
      step="0.1"
      class="range range-secondary"
    />
    <p>Temperature: {{ form.temperature }} -</p>
  </div>
</template>

<script setup lang="ts">
import type { Payload } from '@/types/index'

const props = defineProps<{
  url: string,
  temperature: number,
}>();

const emit = defineEmits<{
  (e: 'submit-form', payload: Payload): void
}>();

const form = ref({
  url: props.url,
  temperature: props.temperature,
});
</script>