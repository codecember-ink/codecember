<template>
  <div class="pt-4">
    <router-link class="link" :to="`/${year}/${day}`" :class="{active: !isGallery}">
      task
    </router-link>
    <span>|</span>
    <router-link class="link" :to="`/${year}/${day}#gallery`" :class="{active: isGallery}">
      gallery
    </router-link>
  </div>
  <template v-if="isGallery">
    <h1 class="mt-6 font-bold">
      Day {{ day }}
    </h1>
    <gallery :posts="posts" />
  </template>
  <template v-else>
    <slot />
  </template>
</template>

<script setup lang="ts">
import { computed, ref, toRef } from 'vue'
import { useRoute } from 'vue-router'
import { useDate } from '/~/logics/date'
import { getPosts } from '/~/posts'

const route = useRoute()

const isGallery = computed(() => route.hash === '#gallery')

const { year, day } = useDate()
const posts = computed(() => getPosts(year.value, day.value))
</script>
