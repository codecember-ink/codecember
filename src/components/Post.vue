<template>
  <a class="post" :href="post.post_link" target="_blank">
    <div class="media">
      <!-- {{ post }} -->
      <video
        v-if="post.video_link"
        :poster="post.media_link"
        loop
        autoplay
      >
        <source :src="post.video_link">
      </video>
      <img v-else :src="post.media_link">
    </div>
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
.post {
  @apply m-auto;

}

.media {
  @apply relative overflow-hidden;
  border: 1px solid transparent;
  width: 280px;
  height: 280px;

  video, img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
}

.post:hover .media {
  border: 1px solid #eee;
}
</style>
