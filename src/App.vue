<script>
import appLogic from './assets/JS/app.js';

export default {
  ...appLogic
}
</script>

<template>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">

  <div id="app">
    <!-- HEADER -->

    <header v-if="$route.name === 'login' || $route.name === 'forgot'" class="portal">
      <div class="page-title">
        <img src="./assets/images/Caraga_State_University_-_Cabadbaran_Campus_logo_(Reduced).png" alt="Logo">
        <h3>FindMyProf</h3>
      </div>
      <div class="header-btn">
        <router-link to="/" @click="preventNavigationIfLocked" :class="{ 'disabled-link': lockoutActive && $route.name === 'login' }">
          <p class="dark-btn" :disabled="lockoutActive && $route.name === 'login'" :class="{ 'disabled-btn': lockoutActive && $route.name === 'login' }">Home</p>
        </router-link>
        <router-link to="/signup" @click="preventNavigationIfLocked" :class="{ 'disabled-link': lockoutActive && $route.name === 'login' }">
          <p :disabled="lockoutActive && $route.name === 'login'" :class="{ 'disabled-btn': lockoutActive && $route.name === 'login' }">Sign Up</p>
        </router-link>
      </div>
    </header>


    <header v-else-if="$route.name === 'signup'" class="portal">
      <div class="page-title">
        <img src="./assets/images/Caraga_State_University_-_Cabadbaran_Campus_logo_(Reduced).png" alt="Logo">
        <h3>FindMyProf</h3>
      </div>
      <div class="header-btn">
        <router-link to="/"><p class="dark-btn">Home</p></router-link>
        <router-link to="/login"><p>Login</p></router-link>
      </div>
    </header>

    <header v-else-if="$route.name === 'home'">
      <div class="page-title">
        <img src="./assets/images/Caraga_State_University_-_Cabadbaran_Campus_logo_(Reduced).png" alt="Logo">
        <h3>FindMyProf</h3>
      </div>
      <div class="header-btn">
        <router-link to="/login"><p class="dark-btn">Login</p></router-link>
        <router-link to="/signup"><p>Sign Up</p></router-link>
      </div>
    </header>

    <header v-else-if="$route.name === 'dashboard'">
      <div class="page-title">
        <img src="./assets/images/Caraga_State_University_-_Cabadbaran_Campus_logo_(Reduced).png" alt="Logo">
        <h3>FindMyProf</h3>
      </div>
      <div class="header-btn">
        <router-link to="/login"><p>Logout</p></router-link>
      </div>
    </header>

    <main>
      <div class="page-container" v-if="$route.name === 'signup' || $route.name === 'login' || $route.name === 'forgot'">
        <div class="logo-container">
          <div class="mask">
            <img src="./assets/images/icon.png" alt="Logo">
          </div>
        </div>
        <div class="form-container">
          <div class="form-box">
            <router-view @lockout-changed="handleLockoutChanged"></router-view>
          </div>
        </div>
      </div>

      <div class="page-container" v-else-if="$route.name === 'dashboard'">
        <router-view></router-view>
      </div>

      <div class="page-container" v-else-if="$route.name === 'home'">
        <router-view></router-view>
      </div>
    </main>

    <!-- 🔹 FOOTER -->
    <footer>
      <p>&copy; 2025 CSUCC - All Rights Reserved</p>
    </footer>
  </div>
</template>

<style src="./assets/CSS/app.css" scoped></style>
