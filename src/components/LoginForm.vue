<template>
  <form action="" method="POST" @submit.prevent="login" style="padding: 1em 3em .8em;">
    <h1>Login</h1>

    <!-- central warning container (shows all current field messages) -->
    <div class="warning-container" v-if="allWarnings.length">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
      </svg>
      <ul>
        <li v-for="(msg, idx) in allWarnings" :key="idx" class="warning">{{ msg }}</li>
      </ul>
    </div>

    <div class="form-content">
      <div class="form-group">
        <input type="text" v-model="username" id="username" name="username">
        <label for="username">Username:</label>
      </div>
      <div class="form-group password-group">
        <input
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          id="password"
          name="password"
          :disabled="lockoutActive"
        >
        <label for="password">Password:</label>
        <span class="toggle-password" @click="togglePassword">
          <!-- Show -->

          <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 eye-icon">
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd" />
          </svg>

          <!-- Hide -->
          <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 eye-icon">
            <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
            <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
            <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
          </svg>

        </span>
      </div>
    </div>
    <div class="btn-container" style="margin-top: .4em;">
        <button class="btn mb-4" type="submit" :disabled="lockoutActive">
          {{ lockoutActive ? `Try again in ${lockoutTimeRemaining}s` : "LOGIN" }}
        </button>
    </div>

    <a v-if="consecutiveError >= 2"
      @click="!lockoutActive && this.$router.push('/forgot');"
      :class="{ disabled: lockoutActive }"
    >Forgot Password</a>
  </form>
</template>

<script>

export default {
  data(){
    return {
      warnings: {},
      consecutiveError: 0,
      page: 'login',
      username: '',
      password: '',
      lockoutActive: false,
      lockoutTimeRemaining: 0,
      lockoutTimer: null,
      showPassword: false,
    }
  },
  computed: {
    allWarnings() {
      // flatten arrays and return non-empty trimmed messages
      const vals = Object.values(this.warnings || {});
      const flat = [];
      for (const v of vals) {
        if (Array.isArray(v)) {
          for (const m of v) {
            if (m && String(m).trim()) flat.push(String(m).trim());
          }
        } else if (v && String(v).trim()) {
          flat.push(String(v).trim());
        }
      }
      return flat;
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    startLockout(seconds) {
      this.lockoutActive = true;
      this.lockoutTimeRemaining = seconds;

      this.lockoutTimer = setInterval(() => {
        this.lockoutTimeRemaining--;
        if (this.lockoutTimeRemaining <= 0) {
          clearInterval(this.lockoutTimer);
          this.lockoutActive = false;
        }
      }, 1000);
    },
    disableButton() {
      if (this.consecutiveError % 3 === 0) {
        let lockoutTime = 15; // first 3 errors
        if (this.consecutiveError === 6) lockoutTime = 30;
        else if (this.consecutiveError >= 9) lockoutTime = 60;
        this.startLockout(lockoutTime);
      }
},
    async login() {
      this.warnings = {};
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!username || !password) {
        this.warnings.general = ["Please enter both username and password."];
        return;
      }

      try {
        const response = await fetch("http://localhost/Security2.0/api/login.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({  username: this.username, password: this.password }),
        });

        const data = await response.json();
        console.log(data);

        if (!response.ok) {
          this.consecutiveError++;

          if (response.status === 404) {
            this.warnings.username = ["Username does not exist."];
          } else if (response.status === 401) {
            this.warnings.password = ["Incorrect password."];
          } else {
            this.warnings.general = [data.error || "Login failed."];
          }

          this.disableButton();

          return;
        }

        // success
        localStorage.setItem("user", JSON.stringify(data.user));
        this.$router.push('/dashboard');
        this.consecutiveError = 0;

      } catch (error) {
        console.error(error);
        this.warnings.general = ["Network or server error occurred."];
      }
    },
  }
}
</script>

<style>
form {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0em 2em;
  gap: 1em;
}

h1 {
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  text-transform: uppercase;
}

.form-content {
  gap: .7em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 1em;
}

.form-group label {
  text-align: start;
  font-size: .8em;
  display: flex;
  align-items: center;
  gap: .3em;
}

.form-group {
  display: flex;
  flex-direction: column-reverse;
  gap: .2em;
}

.form-group input, select {
  width: 100%;
  align-self: center;
  padding: .5em .5em .5em 1em;
  border-radius: 1em;
  border: 1px solid #111;
}

.question-label {
  padding-left: 1%;
}

span {
  color: #da0303;
}

span.optional {
  font-size: .8em;
}

/* button div */
.btn-container {
  display: flex;
  gap: 1em;
  width: 100%;
  justify-content: center;
  margin-top: .5em;
}

.btn {
  border-radius: .9em;
  padding: .8em 1.5em;
  border: none;
  background-color: #64d6a5;
  box-shadow: 1px 1px 1px #00000095;
  color: #3b3838;
  text-transform: uppercase;
  font-weight: 550;
  font-size: .9em;
}

a {
  font-size: .8em;
}

/* error warning */
.warning-container {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1em;
  border: none;
  border-radius: 1em;
  background-color: rgba(233, 157, 157, 0.712);
  font-size: .8em;
  gap: 1em
}

.warning-container svg {
  height: 3em;
  color: #da0303;
}

.warning {
  color: #da0303;
}
.warning-container ul {
  margin: 0;
  padding-left: 1rem;
}
.warning-container li.warning {
  margin: 0;
  padding: 0;
  line-height: 1.25;
}

.password-group {
  position: relative;
  width: 100%;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 68%;
  transform: translateY(-50%);
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
}

.eye-icon {
  width: 1.2em;
  height: 1.2em;
  color: #3d3d3d;
  background-color: white;
}

.eye-icon:hover {
  color: #576b58;
}

.btn[disabled] {
  opacity: 0.45;
  cursor: not-allowed;
  box-shadow: none;
}

a.disabled {
  pointer-events: none;
  color: gray;
  text-decoration: none;
  cursor: not-allowed;
}

.password-strength {
  margin-top: 0.5em;
  width: 100%;
  align-self: center;
}

.strength-bar {
  height: 6px;
  border-radius: 4px;
  margin-bottom: 0.3em;
  transition: background-color 0.3s, width 0.3s;
  width: 100%;
}

.strength-bar.weak {
  background-color: #e74c3c;
  width: 33%;
}
.strength-bar.medium {
  background-color: #f1c40f;
  width: 66%;
}
.strength-bar.strong {
  background-color: #2ecc71;
  width: 100%;
}

.strength-text {
  font-size: 0.85em;
  text-align: left;
  margin-left: 0.5em;
  font-weight: 500;
}

</style>
