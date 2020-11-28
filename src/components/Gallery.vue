<template>
  <div class="flex gap-6 py-6">
    <Post v-for="post of posts" :key="post.post_link" :post="post" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { PropType } from 'vue'
import type { UserPost } from '/~/types'

const props = defineProps({
  posts: {
    type: Array as PropType<UserPost[]>,
    default: () => [],
  },
})
</script>
