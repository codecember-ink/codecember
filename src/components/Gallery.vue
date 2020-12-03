<template>
  <div class="gallery grid gap-x-6 gap-y-8 py-4">
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

<style lang="postcss" scoped>
.gallery {
  grid-template-columns: repeat(auto-fill, minmax(min(280px, 100%), 1fr));
}
</style>
