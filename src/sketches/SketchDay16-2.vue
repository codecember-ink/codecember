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
  fill,
  background,
  sin,
  cos,
  PI,
  TWO_PI,
} = p5i()

interface Particle {
  x: number
  y: number
  rad: number
}

const particles: Particle[] = []
const dim = 400
const radius = 20
const spacing = radius * 1.2
const speed = Math.PI / 50

function setup() {
  createCanvas(400, 400)

  for (let x = 0; x < dim + spacing; x += spacing) {
    for (let y = 0; y < dim + spacing; y += spacing) {
      particles.push({
        x,
        y,
        rad: sin((x + y) / spacing / 10) * TWO_PI,
      })
    }
  }
}

function draw() {
  background(isDark.value ? '#222' : '#fff')

  // move particles
  particles.forEach((particle) => {
    particle.rad += speed
  })

  // tracks
  noFill()
  stroke(isDark.value ? '#363636' : '#ccc')
  particles.forEach(({
    x,
    y,
    rad,
  }) => {
    circle(x, y, radius * 2)
  })

  // particles
  fill(isDark.value ? '#eee' : '#222')
  stroke(isDark.value ? '#eee' : '#222')
  particles.forEach(({
    x,
    y,
    rad,
  }) => {
    circle(x - cos(rad) * radius, y + sin(rad) * radius, 3)
  })
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
