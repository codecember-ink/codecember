<template>
  <div class="container mx-auto px-10 py-12 text-gray-700 dark:text-gray-200">
    <Nav />
    <router-view />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useTitle } from '@vueuse/core'
import { computed } from 'vue'
import { useDate } from '/~/logics/date'

const { year, day } = useDate()

useTitle(computed(() => {
  if (day.value)
    return `Day ${day.value} - Codecember`
  else
    return 'Codecember'
}))
</script>

<style scoped>
.container {
  max-width: 1000px;
}
</style>
