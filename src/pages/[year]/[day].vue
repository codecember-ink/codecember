<template>
  <p>[ {{ year }} / 12 / {{ day }} ]</p>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  year: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
})
</script>
