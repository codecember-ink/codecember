<template>
  <div id="sketch" ref="el" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { p5i } from 'p5i'
import { isDark } from '/~/logics'
import type { P5I } from 'p5i'

const el = ref<HTMLCanvasElement | null>(null)

const canvasWidth = 300
const canvasHeight = canvasWidth
const length = 8
const margin = 10
const strokeWidth = 2
const columns = getNoOfCols(canvasWidth, length, margin)
const rows = getNoOfRows(canvasHeight, strokeWidth, margin)

function getNoOfCols(w: number, length: number, m: number) {
  let totalLength = 0
  let noOfCols = 0

  m = m || 0

  while (totalLength < w) {
    totalLength += m + length
    noOfCols++
  }

  return noOfCols
}

function getNoOfRows(h: number, sw: number, m: number) {
  return getNoOfCols(h, sw, m)
}

const { createCanvas, background, mount, unmount, strokeWeight, push, translate, stroke, map, fill, noStroke, line, pop, rotate } = p5i()

function setup() {
  createCanvas(canvasWidth, canvasHeight)
}

function draw({ mouseX, mouseY }: P5I) {
  background(isDark.value ? '#222' : '#fff')

  for (let i = 0; i < rows - 1; i++) {
    for (let j = 0; j < columns - 1; j++) {
      const currentOffset = {
        x: j * length + (j + 1) * margin,
        y: (i + 1) * margin + i * strokeWidth + strokeWidth,
      }

      const delta = {
        x: currentOffset.x + length / 2 - margin / 2 - mouseX,
        y: currentOffset.y - mouseY,
      }

      const theta = Math.atan2(delta.y, delta.x)
      const deltaThreshold = 40

      strokeWeight(strokeWidth)
      stroke(100)

      if (Math.abs(delta.x) < deltaThreshold && Math.abs(delta.y) < deltaThreshold) {
        const amt = (Math.abs(delta.x) + Math.abs(delta.y)) / 2
        const amtMapped = map(amt, 0, deltaThreshold, -50, 255)
        stroke(100, amtMapped)
      }

      push()
      translate(currentOffset.x, currentOffset.y)
      rotate(theta)

      line(0, 0, 0 + length, 0)
      pop()

      fill(250, 150, 0)
      noStroke()
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
