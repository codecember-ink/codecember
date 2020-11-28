<template>
  <DayPage :day="day" :year="year" />
</template>

<script setup lang="ts">
import { useDate } from '/~/logics/date'
// @ts-ignore
import DayPage from './[year]/[day].vue'

const { day, year } = useDate()
</script>
