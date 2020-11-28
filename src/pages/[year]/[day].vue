<template>
  <p>{{ year }} / 12 / {{ day }}</p>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  year: {
    type: Number,
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
})
</script>
