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
  mount, unmount,
  createCanvas, resizeCanvas, background,
  noFill, stroke, strokeJoin, strokeWeight, beginShape, endShape, vertex,
  sin, cos, lerp, pow, millis,
  PI, TWO_PI, BEVEL, CLOSE,
} = p5i()

function setup({ windowWidth, windowHeight }: P5I) {
  createCanvas(windowWidth / 2, windowHeight / 2)
}

function windowResized({ windowWidth, windowHeight }: P5I) {
  resizeCanvas(windowWidth / 2, windowHeight / 2)
}

function draw({ width, height }: P5I) {
  const dim = Math.min(width, height)

  // Black background
  background(isDark.value ? '#222' : '#fff')

  // Stroke only with a specific join style and thickness
  noFill()
  stroke(isDark.value ? 255 : 0)
  strokeJoin(BEVEL)
  strokeWeight(dim * 0.015)

  // Get time in seconds
  const time = millis() / 1000

  // Get a value that ping-pongs from 0 ... 1
  const pingPong = sin(time * 0.75 - PI / 2) * 0.5 + 0.5

  // Get a number of points, using pow() to skew to one end
  const points = lerp(2, 100, pow(pingPong, 2.5))

  // Size of shape
  const radius = dim / 3

  // Draw shape with an angle offset
  const angle = pingPong * PI * 2
  polygon(width / 2, height / 2, radius, points, angle)
}

function polygon(x: number, y: number, radius: number, sides = 3, angle = 0) {
  beginShape()
  for (let i = 0; i < sides; i++) {
    const a = angle + TWO_PI * (i / sides)
    const sx = x + cos(a) * radius
    const sy = y + sin(a) * radius
    vertex(sx, sy)
  }
  endShape(CLOSE)
}

onMounted(() => mount(el.value!, { setup, draw, windowResized }))
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
