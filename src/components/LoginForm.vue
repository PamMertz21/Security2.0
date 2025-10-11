<template>
  <form action="" method="POST">
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
    <div class="btn-container">
        <button class="btn mb-4" type="submit">Login</button>
    </div>
    <div class="btn-container" style="margin-top: 1em;">
      <button type="button" class="btn mb-4" @click="goToForgotPass()">Forgot Password</button>
    </div>
  </form>
</template>

<script>

export default {
  data(){
    return {

    }
  },
  methods: {
    goToForgotPass() {
      // emit an event so the parent `App.vue` can switch pages
      this.$emit('go-forgot')
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
  background-color: #5daa89;
  box-shadow: 1px 1px 1px #00000095;
  color: #F1F0E4;
  font-size: .9em;
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
