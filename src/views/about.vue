<template>
  <section class="about-page">
    <div class="navbar-about">
      <router-link to="/">Home</router-link>
      <router-link :to="`/board/60f7b1e3c66d343ab4f0c567`">Boards</router-link>
      <router-link to="/about">About</router-link>
    </div>

    <main class="main-container ">
      <div class="info-container animate__animated animate__zoomIn">
        <img src="../assets/img/IMG_7088.jpg" />

        <div class="texts">
          <h3>Avior Kahalani</h3>
          <p>Frontend / Fullstack developer</p>
        </div>

        <div class="contact">
          <a href="https://github.com/aviorkahalani" target="_blank">
            <i class="fab fa-github"></i>
          </a>

          <a href="https://www.linkedin.com/in/avior-kahalani-573911218/" target="_blank">
            <i class="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>

      <section class="stack">
        <h2>Tech Stack</h2>
        <ul>
          <li v-for="(logo, idx) in logos" :key="idx">
            <img :src="require(`../assets/img/${logo}-logo.png`)" :alt="logo" :title="logo" />
          </li>
        </ul>
      </section>

      <div class="story">
        <h2>How this app was born</h2>
        <p>
          This app took my teammates and I 2 weeks to complete. We faced many challenges and learned
          each day about fullstack development.
        </p>
        <p>
          I want to thank Sharon and Rachel for taking this journey with me, I couldnt ask for
          better teamamtes.
        </p>
        <p>I am looking forward to other challenges and other opportunities.</p>
      </div>
    </main>
  </section>
</template>

<script>
export default {
  name: 'about',
  data() {
    return {
      logos: ['vue', 'scss', 'mongodb', 'node', 'express', 'socket'],
    }
  },
}
</script>

<style></style>
