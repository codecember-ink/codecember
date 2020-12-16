<template>
  <div id="sketch" ref="el" @click="start" />
</template>

<script setup lang="ts">
import { p5i } from 'p5i'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { isDark } from '/~/logics'

const el = ref<HTMLCanvasElement | null>(null)

const {
  mount,
  unmount,
  createCanvas,
  stroke,
  noFill,
  circle,
  sin,
  cos,
  TWO_PI,
} = p5i()

const n = 800
const radius = 1.2
const maxDist = 40

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

  const r = 70
  const cx = dim / 2
  const cy = dim / 2

  for (let i = 0; i < n; ++i) {
    const rad = TWO_PI / n * i
    particles[i] = {
      x: cx + cos(rad) * r,
      y: cy + sin(rad) * r,
      vx: 0,
      vy: 0,
    }
  }
}

function draw() {
  // background(isDark.value ? '#222' : '#fff')
  noFill()
  isDark.value ? stroke(255, 10) : stroke(0, 10)

  for (let i = 0; i < n; ++i) {
    const p = particles[i]
    p.x += p.vx
    p.y += p.vy

    p.vx += 0.2 * (Math.random() - 0.5)
    p.vy += 0.2 * (Math.random() - 0.5)

    circle(p.x, p.y, radius)
  }
}

function start() {
  mount(el.value!, { setup, draw })
}

watch(isDark, start)

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
