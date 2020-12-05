<template>
  <a class="post" :href="post.post_link" target="_blank">
    <figure>
      <video
        v-if="post.video_link"
        :poster="post.media_link"
        loop
        autoplay
        muted
      >
        <source :src="post.video_link">
      </video>
      <img v-else :src="post.media_link">
      <figcaption class="opacity-50 mt-1">
        {{ post.author }}
      </figcaption>
    </figure>
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

video, img {
  object-fit: cover;
  border: 1px solid transparent;
  width: 280px;
  height: 280px;
}

.post:hover img, .post:hover video {
  border: 1px solid #eee;
}
</style>
