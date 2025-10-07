<template>
  <form action="" method="POST" @submit.prevent="onSubmit">
    <h1>Login</h1>
    <div class="form-content">
      <div class="form-group">
        <input type="text" id="username" name="username" v-model="username" required>
        <label for="username">Username:</label>
      </div>
      <div class="form-group">
        <input type="password" id="password" name="password" v-model="password" required>
        <label for="password">Password:</label>
      </div>
      <div class="btn-container">
          <button class="btn mb-4" type="submit" :disabled="loading">{{ loading ? 'Logging in...' : 'Login' }}</button>
      </div>
      <small v-if="error" style="color:#b00020">{{ error }}</small>
    </div>
  </form>
</template>

<script>
export default {
  emits: ['login-success'],
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      error: ''
    }
  },
  methods: {
    async onSubmit() {
      this.error = ''
      this.loading = true
      try {
        const res = await fetch('http://localhost/Security-main/api/login.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: this.username.trim(), password: this.password })
        })
        const data = await res.json()
        if (!res.ok || !data.ok) {
          throw new Error(data.error || 'Login failed')
        }
        this.$emit('login-success', data.user)
      } catch (e) {
        this.error = e.message
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
form {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
}

h1 {
  font-weight: bolder;
  text-transform: uppercase;
}

.form-content {
  width: 25em;
  height: 20em;
  gap: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #9b9b8cae;
  padding: 1em 2em;
  border-radius: 1em;
  margin: auto 0;
}

.form-group label {
  text-align: start;
  margin-left: 1em;
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
  background-color: #7D8D86;
  box-shadow: 1px 1px 1px #00000095;
  color: #F1F0E4;
  font-size: .9em;
}
</style>
