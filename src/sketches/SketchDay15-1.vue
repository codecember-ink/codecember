<template>
  <div id="sketch" ref="el" @click="start" />
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
  stroke,
  noFill,
  circle,
} = p5i()

const n = 200
const radius = 1
const minDist = 15
const maxDist = 40

const minDistance2 = minDist ** 2
const maxDistance2 = maxDist ** 2

const dim = 400

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
}
const particles: Particle[] = []

function setup() {
  createCanvas(dim, dim)

  for (let i = 0; i < n; ++i) {
    particles[i] = {
      x: Math.random() * dim,
      y: Math.random() * dim,
      vx: 0,
      vy: 0,
    }
  }
}

function draw({ width, height }: P5I) {
  // background(isDark.value ? '#222' : '#fff')
  noFill()
  isDark.value ? stroke(255, 10) : stroke(0, 10)

  for (let i = 0; i < n; ++i) {
    const p = particles[i]
    p.x += p.vx
    if (p.x < -maxDist) p.x += width + maxDist * 2
    else if (p.x > width + maxDist) p.x -= width + maxDist * 2
    p.y += p.vy
    if (p.y < -maxDist) p.y += height + maxDist * 2
    else if (p.y > height + maxDist) p.y -= height + maxDist * 2
    p.vx += 0.2 * (Math.random() - 0.5) - 0.01 * p.vx
    p.vy += 0.2 * (Math.random() - 0.5) - 0.01 * p.vy

    circle(p.x, p.y, radius)
  }
}

function start() {
  mount(el.value!, { setup, draw })
}

onMounted(() => start())
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
