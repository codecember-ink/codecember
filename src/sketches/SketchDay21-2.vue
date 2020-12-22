<template>
  <div id="sketch" ref="el" @click="start" />
</template>

<script setup lang="ts">
import { p5i } from 'p5i'
import type { P5I } from 'p5i'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { isDark } from '/~/logics'
import { useMouseInElement } from '@vueuse/core'

const el = ref<HTMLCanvasElement | null>(null)

const { isOutside } = useMouseInElement(el, { handleOutside: true })

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

type Circle = [number, number, number]

function gasket(t: number) {
  if (Math.abs(t) >= 1)
    return []
  const x0 = 0
  const y0 = 0
  const r0 = 1
  const b0 = -1 / r0
  const x1 = (1 + t) / 2
  const y1 = 0
  const r1 = r0 - Math.sqrt(x1 * x1 + y1 * y1)
  const b1 = 1 / r1
  const x2 = -r1
  const y2 = y1
  const r2 = x1
  const b2 = 1 / r2
  const c0: Circle = [x0, x0, b0]
  const c1: Circle = [x1, y1, b1]
  const c2: Circle = [x2, y2, b2]
  const b3 = solve(b0, b1, b2)
  const c3: Circle = [
    solve(b0 * x0, b1 * x1, b2 * x2, 2) / b3,
    solve(b0 * y0, b1 * y1, b2 * y2, 2) / b3,
    b3,
  ]
  return [
    c0, c1, c2, c3,
    ...circles(c0, c1, c2, c3),
    ...circles(c3, c1, c2, c0),
    ...circles(c0, c2, c3, c1),
    ...circles(c0, c1, c3, c2),
  ]
}

function* circles(c0: Circle, c1: Circle, c2: Circle, c3: Circle): Generator<Circle> {
  const c = innerSoddy(c0, c1, c2, c3)
  if (Math.abs(c[2]) > 200)
    return
  yield c
  yield * circles(c0, c1, c, c2)
  yield * circles(c1, c, c2, c0)
  yield * circles(c2, c, c0, c1)
}

function innerSoddy(
  [x0, y0, b0]: Circle,
  [x1, y1, b1]: Circle,
  [x2, y2, b2]: Circle,
  [x3, y3, b3]: Circle,
): Circle {
  const b = 2 * (b0 + b1 + b2) - b3
  return [
    (2 * (b0 * x0 + b1 * x1 + b2 * x2) - b3 * x3) / b,
    (2 * (b0 * y0 + b1 * y1 + b2 * y2) - b3 * y3) / b,
    b,
  ]
}

function solve(x: number, y: number, z: number, offset = 0) {
  const b = x + y + z
  const c = x * x + y * y + z * z - b * b / 2 - offset
  return Math.sqrt(Math.max(0, b * b - 2 * c)) + b
}

const dim = 400
const half = dim / 2
const speed = 6000
let t = 0

function setup() {
  createCanvas(dim, dim)
  scale(dim / 2)
  t = speed
}

function draw({ deltaTime }: P5I) {
  if (isOutside.value && t !== speed)
    return

  background(isDark.value ? '#222' : '#fff')
  stroke(isDark.value ? '#fff' : '#222')
  noFill()

  translate(dim / 2, dim / 2)
  const factor = dim / 2.1
  for (const [x, y, c] of gasket(t / speed % 2 - 1)) {
    const r = Math.abs(1 / c)
    circle(x * factor, y * factor, r * factor * 2)
  }

  t += deltaTime
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
