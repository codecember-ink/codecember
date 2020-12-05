<template>
  <div id="sketch" ref="el" @click="restart" />
</template>

<script setup lang="ts">
import { p5i } from 'p5i'
import type { P5I } from 'p5i'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { isDark } from '/~/logics'

const el = ref<HTMLCanvasElement | null>(null)

const {
  mount, unmount,
  createCanvas, resizeCanvas, background,
  stroke, noise, noiseSeed, noLoop, cos, sin, line,
  TWO_PI,
} = p5i()

const SCALE = 80
const LENGTH = 5
const ITERATIONS = 60
const SPACING = 5

function getForceOnPoint(x: number, y: number) {
  // https://p5js.org/reference/#/p5/noise
  return (noise(x / SCALE, y / SCALE) - 0.5) * 2 * TWO_PI
}

let points: {x: number; y: number}[] = []

function setup() {
  createCanvas(400, 400)
  if (isDark.value) {
    background('#222')
    stroke(220, 220, 220, 20)
  }
  else {
    background('#fff')
    stroke(50, 50, 50, 20)
  }

  noiseSeed(+new Date())

  points = []
  for (let x = 0; x < 400; x += SPACING) {
    for (let y = 0; y < 400; y += SPACING)
      points.push({ x, y })
  }
}

function draw({ frameCount }: P5I) {
  if (frameCount > ITERATIONS)
    noLoop()

  for (const p of points) {
    const rad = getForceOnPoint(p.x, p.y)
    const nx = p.x + cos(rad) * LENGTH
    const ny = p.y + sin(rad) * LENGTH
    line(p.x, p.y, nx, ny)
    p.x = nx
    p.y = ny
  }
}

function restart() {
  if (el.value)
    mount(el.value, { setup, draw })
}

watch(isDark, restart)

onMounted(restart)
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
