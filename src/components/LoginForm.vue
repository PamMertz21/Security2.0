<template>
  <form action="" method="POST">
    <h1>Login</h1>
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
  <div class="btn-container">
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
}

h1 {
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  text-transform: uppercase;
}

.form-content {
  gap: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1em 2em;
  border-radius: 1em;
  margin: auto 0;
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
</style>
