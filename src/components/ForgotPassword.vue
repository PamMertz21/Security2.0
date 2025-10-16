<template>
  <form @submit.prevent="submitReset">
    <template>
      <h1>Forgot Password</h1>

      <div class="form-group">
        <label for="email">Enter your registered email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>

      <button type="submit">Send Reset Link</button>

      <p v-if="message" class="msg">{{ message }}</p>
    </template>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      message: '',
      step: 1
    };
  },
  methods: {
    async submitReset() {
      if (!this.email.trim()) {
        this.message = 'Please enter your email address.';
        return;
      }

      try {
        const res = await fetch('http://localhost/Security2.0/api/forgot_password.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email })
        });

        const data = await res.json();

        if (!res.ok) {
          this.message = data.error || 'Unable to send reset link.';
          return;
        }

        this.message = 'A reset link has been sent to your email.';
      } catch (err) {
        console.error(err);
        this.message = 'Network error occurred.';
      }
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1em;
  align-items: center;
  justify-content: center;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.3em;
}
.msg {
  margin-top: 0.5em;
  color: green;
}
</style>
