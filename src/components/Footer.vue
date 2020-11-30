<template>
  <div class="mt-12 flex gap-1">
    <a class="link" target="_blank" href="https://twitter.com/codecember_ink">
      twitter
    </a>
    .
    <a class="link" target="_blank" href="https://github.com/codecember-ink/codecember">
      github
    </a>
    .
    <a class="link" @click="isDark = !isDark">
      {{ isDark ? "light":"dark" }}
    </a>
  </div>
</template>

<script setup lang='ts'>
import { isDark } from '/~/logics'
</script>
