<template>
  <div id="sketch" ref="el" />
</template>

<script setup lang="ts">
import P5 from 'p5'
import { onMounted, ref } from 'vue'
import { isDark } from '/~/logics'

const el = ref<HTMLCanvasElement | null>(null)

const colors = {
  a1: '#ff2d5d',
  a2: '#42dc8e',
  a3: '#2e43eb',
  a4: '#ffe359',
  b1: '#96bfed',
  b2: '#f5ead6',
  b3: '#f1f3f7',
  b4: '#e2e6ef',
}

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

onMounted(() => {
  const myp5 = new P5((s: P5) => {
    s.setup = () => {
      s.createCanvas(canvasWidth, canvasHeight)
    }

    s.draw = () => {
      s.background(isDark.value ? '#222' : '#fff')
      for (let i = 0; i < rows - 1; i++) {
        for (let j = 0; j < columns - 1; j++) {
          const currentOffset = {
            x: j * length + (j + 1) * margin,
            y: (i + 1) * margin + i * strokeWidth + strokeWidth,
          }

          const centerPoint = {
            x: (currentOffset.x + (currentOffset.x + length)) / 2,
            y: (currentOffset.y + (currentOffset.y + length)) / 2,
          }

          const delta = {
            x: currentOffset.x + length / 2 - margin / 2 - s.mouseX,
            y: currentOffset.y - s.mouseY,
          }

          const theta = Math.atan2(delta.y, delta.x)
          const deltaThreshold = 40

          s.strokeWeight(strokeWidth)
          s.stroke(100)

          if (Math.abs(delta.x) < deltaThreshold && Math.abs(delta.y) < deltaThreshold) {
            const amt = (Math.abs(delta.x) + Math.abs(delta.y)) / 2
            const amtMapped = s.map(amt, 0, deltaThreshold, -50, 255)
            s.stroke(100, amtMapped)
          }

          s.push()
          // translate(centerPoint.x, centerPoint.y);
          s.translate(currentOffset.x, currentOffset.y)
          s.rotate(theta)

          s.line(0, 0, 0 + length, 0)
          s.pop()

          s.fill(250, 150, 0)
          s.noStroke()
        }
      }
    }
  }, el.value!)
})
</script>

<style scoped>
#sketch {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
