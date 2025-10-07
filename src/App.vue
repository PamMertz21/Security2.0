<script>
import Signup from './components/SignupForm.vue';
import Login from './components/LoginForm.vue';
import Home from './components/HomePage.vue';
import Dashboard from './components/UserDashboard.vue';

export default {
  components: {
    Signup,
    Login,
    Home,
    Dashboard
  },
  data() {
    return {
      page: 'home',
      currentUser: null
    }
  },
  created() {
    const savedSession = localStorage.getItem('sessionUser')
    if (savedSession) {
      try {
        this.currentUser = JSON.parse(savedSession)
        this.page = 'dashboard'
      } catch {
        localStorage.removeItem('sessionUser')
      }
    }
  },
  methods: {
    getUsers() {
      const raw = localStorage.getItem('users')
      return raw ? JSON.parse(raw) : []
    },
    saveUsers(users) {
      localStorage.setItem('users', JSON.stringify(users))
    },
    handleRegisterSuccess() {
      alert('Registration successful. You can now log in.')
      this.page = 'login'
    },
    handleLogin({ username, password }) {
      const users = this.getUsers()
      const user = users.find(u => u.username.toLowerCase() === username.toLowerCase())
      if (!user || user.password !== password) {
        alert('Invalid username or password')
        return
      }
      this.currentUser = { username: user.username, email: user.email, firstName: user.firstName, lastName: user.lastName }
      localStorage.setItem('sessionUser', JSON.stringify(this.currentUser))
      this.page = 'dashboard'
    },
    handleApiLoginSuccess(user) {
      this.currentUser = user
      localStorage.setItem('sessionUser', JSON.stringify(user))
      this.page = 'dashboard'
    },
    handleLogout() {
      this.currentUser = null
      localStorage.removeItem('sessionUser')
      this.page = 'login'
    }
  }
}
</script>

<template>
  <div id="app">
    <header v-if="page === 'signup'" class="portal">
      <img src="./assets/images/Caraga_State_University_-_Cabadbaran_Campus_logo_(Reduced).png" alt="Logo">
      <div class="header-btn">
        <button @click="page = 'home'" class="dark-btn">Home</button>
        <button @click="page = 'login'">Login</button>
      </div>
    </header>
    <header v-if="page === 'login'" class="portal">
      <img src="./assets/images/Caraga_State_University_-_Cabadbaran_Campus_logo_(Reduced).png" alt="Logo">
      <div class="header-btn">
        <button @click="page = 'home'" class="dark-btn">Home</button>
        <button @click="page = 'signup'">Sign Up</button>
      </div>
    </header>
    <header v-if="page === 'home'">
      <img src="./assets/images/Caraga_State_University_-_Cabadbaran_Campus_logo_(Reduced).png" alt="Logo">
      <div class="header-btn">
        <button @click="page = 'login'" class="dark-btn">Login</button>
        <button @click="page = 'signup'">Sign Up</button>
      </div>
    </header>
    <header v-if="page === 'dashboard'">
      <img src="./assets/images/Caraga_State_University_-_Cabadbaran_Campus_logo_(Reduced).png" alt="Logo">
      <div class="header-btn">
        <button @click="handleLogout">Logout</button>
      </div>
    </header>

    <main>
      <div class="page-container" v-if="page === 'signup' || page === 'login'">
        <div class="logo-container">
          <img src="./assets/images/findmyprof-3.png" alt=" Logo">
        </div>
        <div class="form-container">
          <div class="form-box">
            <Signup v-if="page === 'signup'" @register-success="handleRegisterSuccess"/>
            <Login v-else-if="page === 'login'" @login-success="handleApiLoginSuccess"/>
          </div>
        </div>
      </div>

      <div class="page-container" v-if="page === 'dashboard'">
        <Dashboard/>
      </div>

      <div class="page-container" v-if="page === 'home'">
        <Home/>
      </div>
    </main>

    <footer>
      <p>&copy;  2025 www.handy.com - All Rights Reserved</p>
    </footer>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(./assets/images/background.jpg);
  background-size: cover;
}

header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1em;
  background-color: #008000;
}

.portal {
  background-color: #bcf9bc86;
}

header img {
  height: 3em;
  position: absolute;
  left: 1em;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5),
            0 0 1px rgba(0, 0, 0, 0.6);
}

header .header-btn {
  display: flex;
  justify-content: space-between;
  gap: 1em;
}

header .header-btn button {
  padding: .6em .8em;
  border: none;
  border-radius: 1em;
  box-shadow: 1px 1px 1px #00000087;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.dark-btn {
  background-color: #625b71;
  color: #fff;
}

main {
  flex: 1;
  display: flex;
}

.page-container {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 0;
}

.logo-container {
  flex: 1;
  display: flex;
  justify-content: center;
}

.logo-container img {
  margin: auto;
  width: 30em;
}

.form-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;
  border-left: 1px solid grey;
}

.form-box {
  width: fit-content;
  height: fit-content;
  padding: 1em 2.5em 2em;
  border: none;
  border-radius: 1em;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

footer {
  color: #716C6C;
  margin-top: auto;
  text-align: center;
  background-color: #ADEDAD;
  padding: .5em;
  font-size: .8em;
}

.footer-portal {
  background-color: #bcf9bc86;
  color: #fff;
}
</style>
