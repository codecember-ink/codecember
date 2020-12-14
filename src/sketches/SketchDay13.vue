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
  resizeCanvas,
  background,
  fill,
  noFill,
  stroke,
  strokeJoin,
  strokeWeight,
  beginShape,
  endShape,
  vertex,
  sin,
  cos,
  lerp,
  pow,
  millis,
  dist,
  map,
  point,
  PI,
  TWO_PI,
  BEVEL,
  CLOSE,
  line,
  translate,
  rotate,
  push,
  pop,
  circle
} = p5i()

const n = 200
const radius = 1.5
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

function setup({ windowWidth, windowHeight, random, floor }: P5I) {
  createCanvas(dim, dim)
  isDark.value ? fill('white') : fill('black')

  for (let i = 0; i < n; ++i) {
    particles[i] = {
      x: Math.random() * dim,
      y: Math.random() * dim,
      vx: 0,
      vy: 0
    }
  }
}

function draw({ width, height, strokeCap, ROUND, arc, frameCount }: P5I) {
  background(isDark.value ? '#222' : '#fff')

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

    circle(p.x, p.y, radius * 2)
  }

  for (let i = 0; i < n; ++i) {
    for (let j = i + 1; j < n; ++j) {
      const pi = particles[i]
      const pj = particles[j]
      const dx = pi.x - pj.x
      const dy = pi.y - pj.y
      const d2 = dx * dx + dy * dy
      if (d2 < maxDistance2) {
        const alpha =
          d2 > minDistance2
            ? (maxDistance2 - d2) / (maxDistance2 - minDistance2)
            : 1
        if (isDark.value) {
          stroke(255, lerp(0, 255, alpha))
        } else {
          stroke(0, lerp(0, 255, alpha))
        }
        line(pi.x, pi.y, pj.x, pj.y)
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
