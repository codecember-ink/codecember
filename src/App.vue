<template>
  <div class="container mx-auto px-6 py-8 md:px-10 md:py-12 text-gray-700 dark:text-gray-200">
    <Nav />
    <router-view />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useTitle } from '@vueuse/core'
import { computed } from 'vue'
import { useDate } from '/~/logics/date'
import { useRouter } from 'vue-router'
import NProgress from 'nprogress'

const { year, day } = useDate()
const router = useRouter()

router.beforeEach(() => {
  NProgress.start()
})
router.afterEach(() => {
  NProgress.done()
})

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
