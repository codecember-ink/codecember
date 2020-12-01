<template>
  <div class="markdown-body">
    <h1>Point and Line to Plane</h1>
    <p>
      Daniel Eden is a Design Manager at Facebook. You might know him as the author of
      <a href="https://animate.style">animate.css</a> and <a href="https://justmytype.co/">Just My Type</a>. He keeps a
      blog at: <a href="https://daneden.me/blog">https://daneden.me/blog</a>.
    </p>
    <p>
      I have been following Daniel personally since my college years. Despite being a world-class designer,
      Daniel writes about his work with down-to-earth humbleness. So I thought it would be nice to
      kick off this month with one of his early sketches. Let’s start simple and keep improving.
    </p>
    <h2>The Task</h2>
    <p>In <a href="https://daneden.me/blog/2016/drawing-with-numbers">Drawing With Numbers</a>, Daniel wrote:</p>
    <blockquote class="p-4 italic border-l-4 bg-neutral-100 text-neutral-600 border-neutral-500 quote">
      <p>
        My “sketches” started with one goal; to recreate a design I first saw on the back of one of Dropbox’s design
        team sweatshirts, created by Kristen Spilman. It’s simple enough—an array of rectangles, each rotated so they’re
        pointing towards a point in space.
      </p>
    </blockquote>
    <img alt="Dropbox Design Hoodie" src="/2020/1/dropbox-design-hoodie.jpg" width="400px" />
    <p>
      Here’s Daniel’s sketch on <a href="https://codepen.io/daneden/pen/MjNZJa">CodePen</a>.
      <br />
      We have reproduced it below:
    </p>

    <div id="sketch"></div>

    <p>
      Your task is to recreate it. We suggest that you use <a href="https://p5js.org">p5.js</a>, which is easy to get
      started. With <a href="https://editor.p5js.org">p5.js editor</a>, the only thing you need to get started is a
      browser. Of course, feel free to use any creative coding libraries that you prefer.
    </p>
    <p>
      Here's the sketch ported to p5.js, on <a href="https://editor.p5js.org/octref/sketches/p_QAOdC73">p5.js editor</a>.
    </p>
    <p>
      If this is your first time using p5.js, read the docs, try to understand the code and reproduce it in the editor.
      If you can comfortably reproduce this, try tweaking the code a little bit to introduce something new into the
      sketch. Here are some ideas:
    </p>
    <ul class="list-disc list-inside">
      <li>Can you give each line a different color, depending on its position & orientation?</li>
      <li>Can you make the lines rotate gradually to their final pointing direction?</li>
      <li>
        Let's imagine the center as a live stage, surrounded by the line-crowds — can you make the center "shine"
        every few seconds to indicate an exciting performance? Can you make the line-crowds perform a
        <a href="https://en.wikipedia.org/wiki/Wave_(audience)">stadium wave</a>? There's no limit to your
        imagination. Impress us!
      </li>
    </ul>
    <p>
      When you are all done, post your work on Twitter with the hashtag
      <a href="https://twitter.com/hashtag/codecember" class="link" data-v-27fa3075="">#codecember</a> and
      <a href="https://twitter.com/hashtag/day1" class="link" data-v-27fa3075="">#day1</a>.
      Remember to include a link to the source code, so others can learn from your creation.
      We look forward to seeing your sketch!
    </p>
    <p>
      Yours,
      <br />
      <a href="https://twitter.com/octref" class="link">Pine</a> &
      <a href="https://twitter.com/antfu7" class="link">Anthony</a>
    </p>
    <p>
      P.S. <a href="https://www.wassilykandinsky.net/book-117.php">Point and Line to Plane</a> is a book
      by the Bauhaus master & director, Wassily Kandinsky. We feel you might like it.
    </p>
  </div>
</template>

<script lang="ts">
/// <reference path="../node_modules/@types/p5/global.d.ts" />
import { defineComponent } from 'vue'

var colors = {
  a1: '#ff2d5d',
  a2: '#42dc8e',
  a3: '#2e43eb',
  a4: '#ffe359',
  b1: '#96bfed',
  b2: '#f5ead6',
  b3: '#f1f3f7',
  b4: '#e2e6ef'
}

var canvasWidth = 300,
  canvasHeight = canvasWidth,
  length = 8,
  margin = 10,
  strokeWidth = 2,
  columns = getNoOfCols(canvasWidth, length, margin),
  rows = getNoOfRows(canvasHeight, strokeWidth, margin)

function getNoOfCols(w: number, length: number, m: number) {
  var totalLength = 0,
    noOfCols = 0

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

export default defineComponent({
  mounted() {
    let myp5 = new p5((s: p5) => {
      s.setup = () => {
        s.createCanvas(canvasWidth, canvasHeight)
      }

      s.draw = () => {
        s.background(255)
        for (var i = 0; i < rows - 1; i++) {
          for (var j = 0; j < columns - 1; j++) {
            var currentOffset = {
              x: j * length + (j + 1) * margin,
              y: (i + 1) * margin + i * strokeWidth + strokeWidth
            }

            var centerPoint = {
              x: (currentOffset.x + (currentOffset.x + length)) / 2,
              y: (currentOffset.y + (currentOffset.y + length)) / 2
            }

            var delta = {
              x: currentOffset.x + length / 2 - margin / 2 - s.mouseX,
              y: currentOffset.y - s.mouseY
            }

            var theta = Math.atan2(delta.y, delta.x),
              deltaThreshold = 40

            s.strokeWeight(strokeWidth)
            s.stroke(100)

            if (Math.abs(delta.x) < deltaThreshold && Math.abs(delta.y) < deltaThreshold) {
              var amt = (Math.abs(delta.x) + Math.abs(delta.y)) / 2
              var amtMapped = s.map(amt, 0, deltaThreshold, -50, 255)
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
    }, 'sketch')
  }
})
</script>

<style scoped>
blockquote {
  margin-bottom: 1rem;
}
blockquote p {
  margin-bottom: 0;
}
img {
  width: 350px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1rem;
}
#sketch {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
ul {
  margin-bottom: 1rem;
}
</style>