<script lang="ts" setup>
import { computed, defineEmits, defineProps } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])

const onClick = () => {
  emit('click')
}

const classes = computed(() => ({
  'opacity-50': props.disabled,
}))
</script>

<template>
  <button
    class="px-4 py-1 border-2 pointer-events-auto text-stone-300 border-stone-100/10 rounded-xl bg-stone-700/5 focus:outline-none focus:ring-0 focus:shadow-none backdrop-blur-md hover:bg-stone-800 hover:text-stone-100 hover:border-stone-200 focus:bg-stone-800 focus:text-stone-100 focus:border-stone-200"
    :class="classes"
    :disabled="disabled"
    @click.prevent="onClick"
  >
    {{ text }}
  </button>
</template>
