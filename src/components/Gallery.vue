<template>
  <div>
    <div v-if="posts.length" class="gallery grid gap-x-6 gap-y-8 py-4">
      <Post v-for="post of posts" :key="post.post_link" :post="post" />
    </div>
    <p v-else>
      <em class="opacity-75">There is no post for this day yet.</em>
    </p>

    <hr class="mt-12 mb-4">
    <div class="opacity-75">
      To submit your works, post it on Twitter with the hashtag <a href="https://twitter.com/hashtag/codecember" class="link">#codecember</a> and <a :href="`https://twitter.com/hashtag/day${day}`" class="link">#day{{ day }}</a>.<br>
      <b>Remember to include a link to the source code</b>, so others can learn from your creation.
    </div>
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
  day: {
    type: String,
  },
})
</script>

<style lang="postcss" scoped>
.gallery {
  grid-template-columns: repeat(auto-fill, minmax(min(280px, 100%), 1fr));
}
</style>
