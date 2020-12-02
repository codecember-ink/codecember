<template>
  <div class="mb-4">
    <p>
      <router-link to="/" class="font-bold">
        Codecember
      </router-link>
    </p>

    <p v-if="false">
      <router-link
        v-for="i in years_reverse"
        :key="i"
        :class="i == year ? 'text-theme opacity-100 underline' : 'text-gray-400'"
        class="mr-3 opacity-75 hover:opacity-100 cursor-pointer"
        :to="`/${i}/${day}`"
      >
        {{ i }}
      </router-link>
    </p>

    <p class="flex flex-wrap">
      <router-link
        v-for="i in 31"
        :key="i"
        :to="isDayAvailiable(i) ? `/${year}/${i}` : ''"
        class="day-link "
        :class="{ 'active': i == day, 'unavaliable': !isDayAvailiable(i) }"
      >
        {{ i }}
      </router-link>
      <span class="flex-auto" />
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { this_year, today, years_reverse, event_active, useDate } from '/~/logics/date'

const { year, day } = useDate()

const isDayAvailiable = (d: number) => {
  if (year.value === this_year && event_active)
    return d <= today
  return true
}
</script>

<style lang="postcss" scoped>
.day-link {
  @apply mr-3 opacity-50 hover:opacity-100;
}

.day-link.active {
  @apply text-theme opacity-100 underline;
}

.day-link.unavaliable {
  @apply opacity-25 pointer-events-none text-gray-400;
}
</style>
