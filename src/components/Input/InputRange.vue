<template>
  <div class="relative">
    <div
      class="absolute inset-0 w-full h-12 p-0 border-2 pointer-events-none md:h-8 border-stone-100/10 rounded-xl bg-stone-700/5 focus:outline-none focus:ring-0 focus:shadow-none backdrop-blur-md"
    ></div>
    <div class="absolute inset-0 flex items-center justify-center">
      <label :for="uuid" class="pb-1 pointer-events-none text-stone-300">{{
        label
      }}</label>
    </div>
    <input
      :id="uuid"
      type="range"
      class="relative z-10 w-full h-12 p-0 px-2 bg-transparent appearance-none pointer-events-auto md:h-8 focus:outline-none focus:ring-0 focus:shadow-none"
      :min="min"
      :max="max"
      :step="step"
      :value="value"
      @input="onInput"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'

import { v4 as uuidv4 } from 'uuid'

defineProps({
  label: {
    type: String,
    default: '',
  },
  value: {
    type: Number,
    default: 0,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 1,
  },
  step: {
    type: Number,
    default: 0.01,
  },
})

const emit = defineEmits(['input'])

const uuid = uuidv4()

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  const value = parseFloat(target.value)
  emit('input', value)
}
</script>
