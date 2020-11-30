<template>
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

  <div class="horizontal-images">
    <figure>
      <img src="/pine-12.png" alt="Pine Day 12" width="400" height="400">
      <figcaption>Pine, Day 12</figcaption>
    </figure>
    <figure>
      <img src="/anthony-plum-13.jpg" alt="Anthony's Plum" width="400" height="400">
      <figcaption>Day 13, Plum by Anthony</figcaption>
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
    <li>Post your artwork on Twitter with the <a href="https://twitter.com/hashtag/codecember" class="link">#codecember</a> tag</li>
    <li>Link to the source code, so others can learn & remix (GitHub/GitLab/Codepen/Glitch/etc)</li>
  </ul>
  <br>
  <p>
    You might ask, how do I do the sketch?
  </p>
  <p>
    By <a href="https://twitter.com/octref" class="link">Pine</a> & <a href="https://twitter.com/antfu7" class="link">Anthony</a>.
  </p>
</template>

<script setup lang="ts">
</script>

<style scoped>
.comic {
  font-family: 'Comic Sans MS', sans-serif;
}
.horizontal-images {
  display: flex;
  flex-flow: row;
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