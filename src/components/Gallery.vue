<template>
  <div class="flex gap-6 py-4">
    <template v-if="posts.length">
      <Post v-for="post of posts" :key="post.post_link" :post="post" />
    </template>
    <p v-else>
      <em class="opacity-75">There is no post for this day yet.<em /></em>
    </p>
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
