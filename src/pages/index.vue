<template>
  <!-- <p class="my-8 mb-5">
    About
  </p>
  <p>
    Learn and create computation form, one sketch a day.<br>
    Created by <a class="link" href="https://twitter.com/octref" target="_blank">@octref</a> and <a class="link" href="https://twitter.com/antfu7" target="_blank">@antfu7</a>.
  </p> -->

  <p class="my-8 mb-5">
    Hi there,
  </p>
  <p>
    We are <a href="https://twitter.com/octref" class="link">Pine</a> & <a href="https://twitter.com/antfu7" class="link">Anthony</a>.
    Codecember is a challenge to do one compform (computational form) sketch a day throughout December, 2020.
    We are both doing 100-day compform challenges
    (<a href="https://100.matsu.io" class="link">Pine's gallery</a>, <a href="https://100.antfu.me" class="link">Anthony's gallery</a>)
    and we would love to share the journey with you.
  </p>

  <br>

  <div class="horizontal-images">
    <figure>
      <img src="/pine-12.png" alt="Pine Day 12" width="320" height="320">
      <figcaption><a href="https://100.matsu.io/12" class="link">Day 12</a> by Pine</figcaption>
    </figure>
    <figure>
      <img src="/anthony-plum-13.jpg" alt="Anthony's Plum" width="320" height="320">
      <figcaption><a href="https://100.antfu.me/013" class="link">Day 13, Plum</a> by Anthony</figcaption>
    </figure>
  </div>

  <br>
  <p>
    We started our 100-day challenges as we wanted to <b>learn</b> creative coding while having <b>fun</b>. That's why we decided to
    use the name <i>compform</i> instead of <s>generative art</s>. Art is such a serious topic & we just want to do some
    <span class="comic">doodlez</span>, which, according to
    <a href="https://www.urbandictionary.com/define.php?term=Doodlez" class="link">Urban Dictionary</a>, could be your best creation ever!
  </p>
  <br>
  <p>
    OK, count you in. Here are the (pretty lax) rules:
  </p>
  <br>
  <ul class="list-disc list-inside">
    <li>We'll give you a prompt every day that includes an artwork, its source code and a blurb</li>
    <li>One sketch a day (you can be late, we both have been late)</li>
    <li>Post your artwork on Twitter with the <a href="https://twitter.com/hashtag/codecember" class="link">#codecember</a> tag and a day tag such as <a href="https://twitter.com/hashtag/day1" class="link">#day1</a></li>
    <li>Link to the source code, so others can learn & remix (GitHub/CodeSandbox/Codepen/Glitch/whatever)</li>
  </ul>
  <br>
  <p>
    You might say, "how do I do the sketch though? I haven't done much creative coding whatsoever."
    <br>
    Or you are worried: "I'm kinda busy and only have 30 minutes everyday. Can I still do it?"
  </p>
  <br>
  <p>
    That's ok! We both don't have much experience in creative coding before and we are busy as well. Unlike other challenges such
    as <a href="https://inktober.com" class="link">Inktober</a> or <a href="http://codevember.xyz" class="link">Codevember</a>, Codecember
    is designed for busy beginners like you and me. Everyday, we'll post an inspirational sketch <b>with its source code</b> as the
    prompt, and your job is to understand, recreate and remix it.
    The least you get out of every day is having <b>learned</b> a new compform.
  </p>
  <br>
  <p>
    Seriously, just copying the code line by line to understand the logic & tweaking the constants to explore the form is totally fine. Take
    this as an opportunity for learning and exploration, rather than a serious commitment for "art".
  </p>
  <br>
  <p>
    Join us by following our <a href="https://twitter.com/codecember_ink" class="link">Twitter account</a>. We look forward to seeing you
    on the <a href="https://twitter.com/hashtag/codecember" class="link">#codecember</a> hashtag!
  </p>
  <br>
  <p>
    Yours,
    <br>
    <a href="https://twitter.com/octref" class="link">Pine</a> & <a href="https://twitter.com/antfu7" class="link">Anthony</a>.
  </p>
</template>

<script setup lang="ts">
</script>

<style lang="postcss" scoped>
.comic {
  font-family: 'Comic Sans MS', sans-serif;
}
.horizontal-images {
  @apply flex flex-wrap justify-center;
}
.horizontal-images figure {
  padding: 1rem 2rem;
}
.horizontal-images img {
  width: 400px;
  height: 400px;
  margin-bottom: 1rem;
  border: 1px solid #ffffff00;
}
.horizontal-images figure:hover img {
  border: 1px solid #eee;
}
</style>
