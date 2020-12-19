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
  stroke,
  noFill,
  circle,
  fill,
  background,
  sin,
  cos,
  PI,
  TWO_PI,
  map,
  createVector,
  random,
  noStroke,
  rect,
  strokeWeight,
  dist,
  triangle,
  constrain,
  colorMode,
  HSB,
  textAlign,
  CENTER,
  text
} = p5i()

var allParticles: Particle[] = []
var maxLevel = 3
var useFill = false

var data = []

function setup() {
  createCanvas(400, 400)
  colorMode(HSB, 360)
  textAlign(CENTER)
  background(isDark.value ? '#222' : '#fff')
}

function draw() {
  noStroke()
  isDark.value ? fill('#222') : fill('#fff')

  rect(0, 0, 400, 400)

  // Move and spawn particles.
  // Remove any that is below the velocity threshold.
  for (var i = allParticles.length - 1; i > -1; i--) {
    allParticles[i].move()

    if (allParticles[i].vel.mag() < 0.01) {
      allParticles.splice(i, 1)
    }
  }

  if (allParticles.length > 0) {
    // Run script to get points to create triangles with.
    data = Delaunay.triangulate(
      allParticles.map(function (pt) {
        return [pt.pos.x, pt.pos.y]
      })
    )

    strokeWeight(0.1)

    // Display triangles individually.
    for (var i = 0; i < data.length; i += 3) {
      // Collect particles that make this triangle.
      var p1 = allParticles[data[i]]
      var p2 = allParticles[data[i + 1]]
      var p3 = allParticles[data[i + 2]]

      // Don't draw triangle if its area is too big.
      var distThresh = 75

      if (dist(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y) > distThresh) {
        continue
      }

      if (dist(p2.pos.x, p2.pos.y, p3.pos.x, p3.pos.y) > distThresh) {
        continue
      }

      if (dist(p1.pos.x, p1.pos.y, p3.pos.x, p3.pos.y) > distThresh) {
        continue
      }

      // Base its hue by the particle's life.
      if (useFill) {
        noStroke()
        fill(165 + p1.life * 1.5, 360, 360)
      } else {
        noFill()
        stroke(165 + p1.life * 1.5, 360, 360)
      }

      triangle(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y, p3.pos.x, p3.pos.y)
    }
  }

  noStroke()

  fill(isDark.value ? '#ffffff88' : '#00000088')
  text(
    'hover on me',
    400 / 2,
    400 - 30
  )
}

class Particle {
  life: number
  pos: any
  vel: any

  constructor(public x: number, public y: number, public level: number) {
    this.life = 0

    this.pos = createVector(x, y)
    this.vel = createVector(random() * 2 - 1, random() * 2 - 1, 0)
    this.vel.mult(map(this.level, 0, maxLevel, 5, 2))
  }

  move() {
    this.life++

    // Add friction.
    this.vel.mult(0.9)

    this.pos.add(this.vel)

    // Spawn a new particle if conditions are met.
    if (this.life % 10 == 0) {
      if (this.level > 0) {
        this.level -= 1
        const newParticle = new Particle(this.pos.x, this.pos.y, this.level - 1)
        allParticles.push(newParticle)
      }
    }
  }
}

function mouseMoved({ mouseX, mouseY }: P5I) {
  allParticles.push(new Particle(mouseX, mouseY, maxLevel))
}

function keyPressed() {
  useFill = !useFill
}

function start() {
  mount(el.value!, { setup, draw, mouseMoved, keyPressed })
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
