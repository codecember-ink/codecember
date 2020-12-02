<template>
  <div id="sketch" ref="el" />
</template>

<script setup lang="ts">
import P5 from 'p5'
import { onMounted, ref } from 'vue'
import { isDark } from '/~/logics'

const el = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  const myp5 = new P5((s: P5) => {
    s.setup = () => {
      s.createCanvas(s.windowWidth / 2, s.windowHeight / 2)
    }

    s.windowResized = () => {
      s.resizeCanvas(s.windowWidth / 2, s.windowHeight / 2)
    }

    s.draw = () => {
      const dim = Math.min(s.width, s.height)

      // Black background
      s.background(isDark.value ? '#222' : '#fff')

      // Stroke only with a specific join style and thickness
      s.noFill()
      s.stroke(isDark.value ? 255 : 0)
      s.strokeJoin(s.BEVEL)
      s.strokeWeight(dim * 0.015)

      // Get time in seconds
      const time = s.millis() / 1000

      // Get a value that ping-pongs from 0 ... 1
      const pingPong = s.sin(time * 0.75 - s.PI / 2) * 0.5 + 0.5

      // Get a number of points, using pow() to skew to one end
      const points = s.lerp(2, 100, s.pow(pingPong, 2.5))

      // Size of shape
      const radius = dim / 3

      // Draw shape with an angle offset
      const angle = pingPong * s.PI * 2
      polygon(s.width / 2, s.height / 2, radius, points, angle)
    }

    function polygon(x: number, y: number, radius: number, sides = 3, angle = 0) {
      s.beginShape()
      for (let i = 0; i < sides; i++) {
        const a = angle + s.TWO_PI * (i / sides)
        let sx = x + s.cos(a) * radius
        let sy = y + s.sin(a) * radius
        s.vertex(sx, sy)
      }
      s.endShape(s.CLOSE)
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
