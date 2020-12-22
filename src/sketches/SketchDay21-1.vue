<template>
  <div id="sketch" ref="el" @click="start" />
</template>

<script setup lang="ts">
import { p5i } from 'p5i'
import type { P5I } from 'p5i'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { isDark } from '/~/logics'

const el = ref<HTMLCanvasElement | null>(null)

const {
  createCanvas,
  background,
  mount,
  unmount,
  random,
  lerp,
  noFill,
  stroke,
  push,
  translate,
  scale,
  strokeWeight,
  line,
  pop,
  noLoop,
  circle,
} = p5i()

interface Circle {
  x: number
  y: number
  radius: number
}

const dim = 400
let circles: Circle[] = []
const minRadius = 2
const maxRadius = 150
const totalCircles = 800
const createCircleAttempts = 500

function setup() {
  circles = []
  createCanvas(dim, dim)
}

function draw() {
  background(isDark.value ? '#222' : '#fff')
  stroke(isDark.value ? '#fff' : '#222')
  noFill()

  for (let i = 0; i < totalCircles; i++)
    createAndDrawCircle()

  noLoop()
}

function createAndDrawCircle() {
  let newCircle: Circle = undefined!
  let circleSafeToDraw = false
  for (let tries = 0; tries < createCircleAttempts; tries++) {
    newCircle = {
      x: Math.floor(Math.random() * dim),
      y: Math.floor(Math.random() * dim),
      radius: minRadius,
    }

    if (doesCircleHaveACollision(newCircle)) {
      continue
    }
    else {
      circleSafeToDraw = true
      break
    }
  }

  if (!circleSafeToDraw)
    return

  for (let radiusSize = minRadius; radiusSize < maxRadius; radiusSize++) {
    newCircle.radius = radiusSize
    if (doesCircleHaveACollision(newCircle)) {
      newCircle.radius--
      break
    }
  }

  circles.push(newCircle)
  circle(newCircle.x, newCircle.y, newCircle.radius * 2)
}

function doesCircleHaveACollision(circle: Circle) {
  for (let i = 0; i < circles.length; i++) {
    const otherCircle = circles[i]
    const a = circle.radius + otherCircle.radius
    const x = circle.x - otherCircle.x
    const y = circle.y - otherCircle.y

    if (a >= Math.sqrt((x * x) + (y * y)))
      return true
  }

  if (circle.x + circle.radius >= dim
    || circle.x - circle.radius <= 0)
    return true

  if (circle.y + circle.radius >= dim
    || circle.y - circle.radius <= 0)
    return true

  return false
}

function start() {
  mount(el.value!, { setup, draw })
}

onMounted(() => {
  watch(isDark, start, { immediate: true })
})
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
