<template>
  <div class="mb-4">
    <h3 class="font-bold">
      Codecember
    </h3>
    <p class="opacity-75">
      2020
    </p>
    <p>
      <router-link v-for="i in 31" :key="i" :to="`/2020/${i}`" class="mr-3 opacity-50 hover:opacity-100">
        {{ i }}
      </router-link>
    </p>
  </div>
</template>

<script setup lang="ts">
</script>
