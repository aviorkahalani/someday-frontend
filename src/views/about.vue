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
                    <p>Frontend / Fullstuck developer</p>
                </div>

                <div class="contact">
                    <a href="https://github.com/AviorKahalani" target="_blank">
                        <i class="fab fa-github"></i>
                    </a>

                    <a href="https://www.linkedin.com/in/avior-kahalani-573911218/" target="_blank">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                </div>
            </div>
        </main>
    </section>
</template>

<script>
export default {
    name: 'about',
};
</script>

<style></style>
