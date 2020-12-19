<template>
  <div id="sketch" ref="el" />
</template>

<script setup lang="ts">
import { p5i } from 'p5i'
import type { P5I } from 'p5i'
import { onMounted, onUnmounted, ref } from 'vue'
import { isDark } from '/~/logics'

const el = ref<HTMLCanvasElement | null>(null)

const {
  mount,
  unmount,
  createCanvas,
  background,
  noFill,
  stroke,
  TWO_PI,
  line,
  translate,
  rotate,
  push,
  pop,
  rectMode,
  CENTER,
  millis,
  floor,
  fill,
  rect,
  HALF_PI,
} = p5i()

const dim = 300
const size = 28
const count = dim / size + 1
const round_time = 1500

function setup() {
  createCanvas(dim, dim)
  rectMode(CENTER)
}

function draw() {
  const ms = millis()

  const mode = floor(ms / round_time) % 2

  if (mode) {
    fill('#222')
    background('#fff')
  }
  else {
    fill('#fff')
    background('#222')
  }

  for (let x = 0; x < count; x += 1) {
    for (let y = 0; y < count; y += 1) {
      if ((x + y) % 2 === mode) {
        push()
        translate(x * size, y * size)
        rotate(ms / round_time * HALF_PI)
        rect(0, 0, size, size)
        pop()
      }
    }
  }
}

onMounted(() => mount(el.value!, { setup, draw }))
onUnmounted(() => unmount())
</script>

<style scoped>
#sketch {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
