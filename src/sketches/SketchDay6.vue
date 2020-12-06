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

function setup({ windowWidth, windowHeight, random, floor }: P5I) {
  createCanvas(windowWidth / 2, windowHeight / 2)

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

function windowResized({ windowWidth, windowHeight }: P5I) {
  resizeCanvas(windowWidth / 2, windowHeight / 2)
}

function draw({ width, height, strokeCap, ROUND, arc }: P5I) {
  // background(0)
  background(isDark.value ? '#222' : '#fff')

  const minDim = Math.min(width, height)

  noFill()
  strokeWeight(minDim * 0.015)
  strokeCap(ROUND)
  stroke(isDark.value ? '#fff' : '#000')

  let d = minDim
  d -= d * 0.25

  for (let i = 0; i < rings.length; i++) {
    const { diameter, arcLength, arcAngle, spinSpeed } = rings[i]
    const spin = (millis() / 1000) * spinSpeed
    arc(
      width / 2,
      height / 2,
      diameter * d,
      diameter * d,
      spin + arcAngle,
      spin + arcAngle + Math.PI * arcLength
    )
  }
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
