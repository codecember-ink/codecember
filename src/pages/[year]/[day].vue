<template>
  <p class="my-8 mb-5 opacity-50">
    [ {{ year }} / 12 / {{ day }} ]
  </p>
  <gallery :posts="posts" />
</template>

<script lang="ts">
import { computed, defineComponent, defineProps } from 'vue'
import { ALL_POSTS } from '/~/posts'

export default defineComponent({
  props: {
    year: {
      type: String,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const posts = computed(() => ALL_POSTS[`${props.year}/12/${props.day}`] || [])

    return { posts }
  },
})
</script>
