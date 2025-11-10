<script>
export default {
  data() {
    return {
      page: 'home'
    }
  },
}
</script>

<template>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">

  <div id="app">
    <!-- HEADER -->

    <header v-if="$route.name === 'login' || $route.name === 'forgot'" class="portal">
      <img src="./assets/images/Caraga_State_University_-_Cabadbaran_Campus_logo_(Reduced).png" alt="Logo">
      <div class="header-btn">
        <router-link to="/"><button class="dark-btn">Home</button></router-link>
        <router-link to="/signup"><button>Sign Up</button></router-link>
      </div>
    </header>


    <header v-else-if="$route.name === 'signup'" class="portal">
      <img src="./assets/images/Caraga_State_University_-_Cabadbaran_Campus_logo_(Reduced).png" alt="Logo">
      <div class="header-btn">
        <router-link to="/"><button class="dark-btn">Home</button></router-link>
        <router-link to="/login"><button>Login</button></router-link>
      </div>
    </header>

    <header v-else-if="$route.name === 'home'">
      <img src="./assets/images/Caraga_State_University_-_Cabadbaran_Campus_logo_(Reduced).png" alt="Logo">
      <div class="header-btn">
        <router-link to="/login"><button class="dark-btn">Login</button></router-link>
        <router-link to="/signup"><button>Sign Up</button></router-link>
      </div>
    </header>

    <header v-else-if="$route.name === 'dashboard'">
      <img src="./assets/images/Caraga_State_University_-_Cabadbaran_Campus_logo_(Reduced).png" alt="Logo">
      <div class="header-btn">
        <router-link to="/login"><button>Logout</button></router-link>
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
            <router-view></router-view>
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
