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
  CLOSE
} = p5i()

let hue
interface Ring {
  spinSpeed: number
  diameter: number
  arcLength: number
  arcAngle: number
}
const rings: Ring[] = []

let numFrames = 60

function setup({ windowWidth, windowHeight, random, floor }: P5I) {
  createCanvas(400, 400)

  hue = random(0, 360)
  const count = floor(random(10, 20))
  for (let i = 0; i < count; i++) {
    const diameter = (i + 1) / count
    const arcLength = random(PI * 0.05, PI * 2)
    const arcAngle = random(-PI * 2, PI * 2)
    const spinSpeed = random(-1, 1)
    rings.push({
      spinSpeed,
      diameter,
      arcLength,
      arcAngle
    })
  }
}

function periodicFunction(p: number) {
  return map(sin(TWO_PI * p), -1, 1, 2, 8)
}

function offset(x: number, y: number, width: number, height: number) {
  return 0.01 * dist(x, y, width / 2, height / 2)
}

function draw({ width, height, strokeCap, ROUND, arc, frameCount }: P5I) {
  background(isDark.value ? '#222' : '#fff')
  stroke(isDark.value ? '#fff' : '#000')

  background(255)

  const t = (1.0 * frameCount) / numFrames

  const m = 40

  stroke(0)

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < m; j++) {
      const x = map(i, 0, m - 1, 0, width)
      const y = map(j, 0, m - 1, 0, height)

      const size = periodicFunction(t - offset(x, y, width, height))
      strokeWeight(size)

      point(x, y)
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
