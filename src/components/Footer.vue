<template>
  <div class="text-xl mt-6">
    <div class="icon-btn" @click="isDark = !isDark">
      <Icon :icon="isDark ? 'carbon:moon' : 'carbon:sun'" class="inline-block" />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { isDark } from '/~/logics'
</script>
