<template>
  <a :href="post.post_link" target="_blank">
    <!-- {{ post }} -->
    <img :src="post.media_link">
    <p class="opacity-50 mt-1">
      {{ post.author }}
    </p>
  </a>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { PropType } from 'vue'
import type { UserPost } from '/~/types'

const props = defineProps({
  post: {
    type: Object as PropType<UserPost>,
    default: () => [],
  },
})
</script>

<style lang="postcss" scoped>
img {
  object-fit: cover;
  width: 300px;
  height: 300px;
}
</style>
