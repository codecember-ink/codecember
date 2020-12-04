<template>
  <div id="sketch" class="select-none">
    <canvas ref="el" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { isDark } from '/~/logics'

const el = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  const canvas = el.value!
  const context = canvas.getContext('2d')!

  const size = 300
  const dpr = window.devicePixelRatio || 1
  canvas.style.width = `${size}px`
  canvas.style.height = `${size}px`
  canvas.width = size * dpr
  canvas.height = size * dpr
  context.scale(dpr, dpr)
  context.lineWidth = 2

  watch(
    isDark,
    (dark) => {
      context.strokeStyle = dark ? 'white' : 'black'
      draw()
    },
  )

  draw()

  canvas.onclick = draw

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height)

    const step = 10
    const lines = []

    // Create the lines
    for (let i = step; i <= size - step; i += step) {
      const line = []
      for (let j = step; j <= size - step; j += step) {
        const distanceToCenter = Math.abs(j - size / 2)
        const variance = Math.max(size / 2 - 50 - distanceToCenter, 0)
        const random = ((Math.random() * variance) / 2) * -1
        const point = { x: j, y: i + random }
        line.push(point)
      }
      lines.push(line)
    }

    // Do the drawing
    for (let i = 5; i < lines.length; i++) {
      context.beginPath()
      context.moveTo(lines[i][0].x, lines[i][0].y)

      for (let j = 0; j < lines[i].length - 2; j++) {
        const xc = (lines[i][j].x + lines[i][j + 1].x) / 2
        const yc = (lines[i][j].y + lines[i][j + 1].y) / 2
        context.quadraticCurveTo(lines[i][j].x, lines[i][j].y, xc, yc)
      }

      context.save()
      context.globalCompositeOperation = 'destination-out'
      context.fill()
      context.restore()
      context.stroke()
    }
  }
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
