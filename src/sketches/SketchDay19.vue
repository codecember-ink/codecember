<template>
  <div id="sketch" ref="el" @click="start" />
</template>

<script setup lang="ts">
import { p5i } from 'p5i'
import type { P5I } from 'p5i'
import { onMounted, onUnmounted, ref } from 'vue'
import { isDark } from '/~/logics'

const el = ref<HTMLCanvasElement | null>(null)

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
} = p5i()

const initialLines = 100
const maxLines = 1000

interface Line {
  origin: number[]
  position: number[]
  direction: number[]
  speed: number
  hits: Line[]
  moving: boolean
}

let lines: Line[]

function setup() {
  lines = []
  createCanvas(400, 400)

  background(isDark.value ? '#222' : '#fff')

  for (let i = 0; i < initialLines && i < maxLines; i++)
    lines.push(createLine())
}

function createLine(origin?: number[], direction?: number[]) {
  // Default to randomly within -1..1 space
  origin = origin || [random(-1, 1), random(-1, 1)]

  // Default to a random direction
  direction = direction || randomUnitVector()

  // We will use normalized coordinates
  // And then scale them to the screen size
  const line = {
    origin: origin.slice(), // starting position
    position: origin.slice(), // initially start at origin
    direction: direction.slice(),
    speed: random(0.1, 0.25),
    hits: [],
    moving: true,
  }
  return line
}

function stepLine(line: Line, deltaTime: number) {
  // Ignore stopped lines
  if (!line.moving) return

  // Line start position
  const x0 = line.origin[0]
  const y0 = line.origin[1]

  // New line end position
  let x1 = line.position[0] + line.direction[0] * line.speed * deltaTime
  let y1 = line.position[1] + line.direction[1] * line.speed * deltaTime

  // If we hit another...
  let hitLine

  // Check intersections against others
  for (let i = 0; i < lines.length; i++) {
    const other = lines[i]

    // ignore self
    if (other === line) continue

    // if the lines have collided already, skip
    if (line.hits.includes(other) || other.hits.includes(line))
      continue

    const hit = intersectLineSegments(
      // this line A->B
      [x0, y0],
      [x1, y1],
      // other line A->B
      [other.origin[0], other.origin[1]],
      [other.position[0], other.position[1]],
    )

    // We hit another line, make sure we didn't go further than it
    if (hit) {
      // Clamp position to the intersection point so it doesn't go beyond
      x1 = hit[0]
      y1 = hit[1]

      hitLine = other
      break
    }

    // Line has reached outside of frame, stop it
    const outsideBounds = x1 > 1 || x1 < -1 || y1 > 1 || y1 < -1
    if (outsideBounds) {
      line.moving = false
      break
    }
  }

  line.position[0] = x1
  line.position[1] = y1

  if (hitLine) {
    // Mark this line as stopped
    line.moving = false

    // Mark the lines as hit so they don't check again
    line.hits.push(hitLine)
    hitLine.hits.push(line)

    if (lines.length < maxLines) {
      // Produce a new line at perpendicular
      const producedLine = produceLine(line)

      // Make sure the line knows we already hit these two
      producedLine.hits = [line, hitLine]

      // Also make sure the hit line knows not to check it
      hitLine.hits.push(producedLine)

      // Add to list
      lines.push(producedLine)
    }
  }
}

function produceLine(line: Line): Line {
  // Select a random point along the line and create a new
  // line extending in a perpendicular angle
  const t = random(0.15, 0.85)
  const px = lerp(line.origin[0], line.position[0], t)
  const py = lerp(line.origin[1], line.position[1], t)

  // Get a perpendicular to the line
  const direction = [-line.direction[1], line.direction[0]]

  // Randomly negate it
  const sign = random(0, 1) > 0.5 ? 1 : -1
  direction[0] *= sign
  direction[1] *= sign

  return createLine([px, py], direction)
}

function randomUnitVector() {
  const radius = 1 // unit circle
  const theta = random(0, 1) * 2.0 * Math.PI
  const out = []
  out[0] = radius * Math.cos(theta)
  out[1] = radius * Math.sin(theta)
  return out
}

function intersectLineSegments(
  p1: number[],
  p2: number[],
  p3: number[],
  p4: number[],
) {
  const t = intersectLineSegmentsFract(p1, p2, p3, p4)
  if (t >= 0 && t <= 1)
    return [p1[0] + t * (p2[0] - p1[0]), p1[1] + t * (p2[1] - p1[1])]

  return false
}

function intersectLineSegmentsFract(
  p1: number[],
  p2: number[],
  p3: number[],
  p4: number[],
) {
  // Reference:
  // https://github.com/evil-mad/EggBot/blob/master/inkscape_driver/eggbot_hatch.py
  const d21x = p2[0] - p1[0]
  const d21y = p2[1] - p1[1]
  const d43x = p4[0] - p3[0]
  const d43y = p4[1] - p3[1]

  // denominator
  const d = d21x * d43y - d21y * d43x
  if (d === 0) return -1

  const nb = (p1[1] - p3[1]) * d21x - (p1[0] - p3[0]) * d21y
  const sb = nb / d
  if (sb < 0 || sb > 1) return -1

  const na = (p1[1] - p3[1]) * d43x - (p1[0] - p3[0]) * d43y
  const sa = na / d
  if (sa < 0 || sa > 1) return -1
  return sa
}

function draw({ width, height }: P5I) {
  background(isDark.value ? '#222' : '#fff')

  // Step all the lines first
  // Use a fixed delta-time
  const dt = 1 / 24
  lines.forEach(line => stepLine(line, dt))

  // Now draw all the lines
  const dim = Math.min(width, height)
  noFill()
  stroke(isDark.value ? '#fff' : '#000')

  push()
  translate(width / 2, height / 2)
  scale(dim, dim)
  strokeWeight(0.01)
  lines.forEach(({ origin, position }) => {
    const [x0, y0] = origin
    const [x1, y1] = position
    line(x0, y0, x1, y1)
  })
  pop()
}

function start() {
  mount(el.value!, { setup, draw })
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
