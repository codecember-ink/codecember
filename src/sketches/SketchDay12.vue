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
  CLOSE,
  line,
  translate,
  rotate,
  push,
  pop
} = p5i()

let ds: PenroseLSystem

function setup({ windowWidth, windowHeight, random, floor }: P5I) {
  createCanvas(400, 400)

  ds = new PenroseLSystem()
  ds.simulate(5)
}

function draw({ width, height, strokeCap, ROUND, arc, frameCount }: P5I) {
  background(isDark.value ? '#222' : '#fff')
  stroke(isDark.value ? 255 : 0)
  ds.render(width, height)
}

class PenroseLSystem {
  steps: number
  axiom: string
  ruleW: string
  ruleX: string
  ruleY: string
  ruleZ: string
  startLength: number
  theta: number
  production: any
  drawLength: number
  generations: number
  repeats: number

  constructor() {
    this.steps = 0

    this.axiom = '[X]++[X]++[X]++[X]++[X]'
    this.ruleW = 'YF++ZF----XF[-YF----WF]++'
    this.ruleX = '+YF--ZF[---WF--XF]+'
    this.ruleY = '-WF++XF[+++YF++ZF]-'
    this.ruleZ = '--YF++++WF[+ZF++++XF]--XF'

    this.startLength = 460.0
    this.theta = TWO_PI / 10.0
    this.production = this.axiom
    this.drawLength = this.startLength
    this.generations = 0

    this.repeats = 0
  }

  simulate(gen: number) {
    while (this.getAge() < gen) {
      this.iterate()
    }
  }

  getAge() {
    return this.generations
  }

  iterate() {
    let newProduction = ''

    for (let i = 0; i < this.production.length; ++i) {
      let step = this.production.charAt(i)
      if (step == 'W') {
        newProduction = newProduction + this.ruleW
      } else if (step == 'X') {
        newProduction = newProduction + this.ruleX
      } else if (step == 'Y') {
        newProduction = newProduction + this.ruleY
      } else if (step == 'Z') {
        newProduction = newProduction + this.ruleZ
      } else {
        if (step != 'F') {
          newProduction = newProduction + step
        }
      }
    }

    this.drawLength = this.drawLength * 0.5
    this.generations++
    this.production = newProduction
  }
  render(width: number, height: number) {
    translate(width / 2, height / 2)

    this.steps += 20
    if (this.steps > this.production.length) {
      this.steps = this.production.length
    }

    for (let i = 0; i < this.steps; ++i) {
      let step = this.production.charAt(i)

      if (step == 'F') {
        if (isDark.value) {
          stroke(255, 60)
        } else {
          stroke(0, 60)
        }
        for (let j = 0; j < this.repeats; j++) {
          line(0, 0, 0, -this.drawLength)
          noFill()
          translate(0, -this.drawLength)
        }
        this.repeats = 1
      } else if (step == '+') {
        rotate(this.theta)
      } else if (step == '-') {
        rotate(-this.theta)
      } else if (step == '[') {
        push()
      } else if (step == ']') {
        pop()
      }
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
