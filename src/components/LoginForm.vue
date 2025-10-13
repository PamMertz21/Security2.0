<template>
  <form action="" method="POST" style="padding: 1em 3em .8em;">
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
        <input type="text" id="username" name="username">
        <label for="username">Username:</label>
      </div>
      <div class="form-group">
        <input type="password" id="password" name="password">
        <label for="password">Password:</label>
      </div>
    </div>
    <div class="btn-container" style="margin-top: .4em;">
        <button class="btn mb-4" type="submit">LOGIN</button>
    </div>

    <a v-if="consecutiveError >= 2" @click="goToForgotPass()">Forgot Password</a>
  </form>
</template>

<script>

export default {
  data(){
    return {
      consecutiveError: 0,
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
    goToForgotPass() {
      // emit an event so the parent `App.vue` can switch pages
      this.$emit('go-forgot')
    },
    validatePassword() {

    }
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
</style>
