<template>
  <h1>Change Password</h1>

  <!-- Central warning container -->
  <div v-if="error" class="error-message">{{ error }}</div>
  <div v-if="success" class="success-message">{{ success }}</div>

  <div v-if="newPassword" class="password-strength-container">
    <p class="strength-text">{{ passwordStrengthLabel }}</p>
    <div class="strength-bar-background">
      <div class="strength-bar-fill" :class="passwordStrengthClass" :style="{ width: strengthWidth }"></div>
    </div>
  </div>
  <p v-if="warnings.confirmPassword && warnings.confirmPassword.length" class="warning-text">
    {{ warnings.confirmPassword[0] }}
  </p>

  <!-- New Password -->
  <div class="form-group password-group">
    <input
      :type="showNewPassword ? 'text' : 'password'"
      id="newPassword"
      v-model.trim="newPassword"
      required
      placeholder="Enter new password"
       @input="validatePassword"
    />
    <label for="newPassword">New Password</label>


    <span class="toggle-password" @click="togglePassword('new')">
      <!-- Show -->
      <svg
        v-if="!showNewPassword"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="eye-icon"
      >
        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        <path
          fill-rule="evenodd"
          d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
          clip-rule="evenodd"
        />
      </svg>

      <!-- Hide -->
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="eye-icon"
      >
        <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
        <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
        <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
      </svg>
    </span>
  </div>

  <!-- Confirm Password -->
  <div class="form-group password-group">
    <input
      :type="showConfirmPassword ? 'text' : 'password'"
      id="confirmPassword"
      v-model.trim="confirmPassword"
      required
      placeholder="Confirm new password"
      @input="validateConfirmPassword"
    />
    <label for="confirmPassword">Confirm New Password</label>
    <span class="toggle-password" @click="togglePassword('confirm')">
      <!-- Show -->
      <svg
        v-if="!showConfirmPassword"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="eye-icon"
      >
        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        <path
          fill-rule="evenodd"
          d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
          clip-rule="evenodd"
        />
      </svg>

      <!-- Hide -->
      <svg
        v-if="showConfirmPassword"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="eye-icon"
      >
        <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
        <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
        <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
      </svg>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newPassword: "",
      confirmPassword: "",
      showNewPassword: false,
      showConfirmPassword: false,
      error: "",
      success: "",
      passwordStrengthScore: 0,
      warnings: {},
    };
  },
  computed: {
    strengthWidth() {
      if (!this.newPassword) return '0%';
      if (this.passwordStrengthScore <= 1) return '33%';
      if (this.passwordStrengthScore === 2) return '66%';
      return '100%';
    },

    passwordStrengthClass() {
      if (this.passwordStrengthScore <= 1) return 'weak';
      if (this.passwordStrengthScore === 2) return 'medium';
      return 'strong';
    },
    passwordStrengthLabel() {
      if (this.passwordStrengthScore <= 1) return 'Weak Password';
      if (this.passwordStrengthScore === 2) return 'Medium Password';
      return 'Strong Password';
    },
  },
  methods: {
    togglePassword(field) {
      if (field === "new") this.showNewPassword = !this.showNewPassword;
      if (field === "confirm") this.showConfirmPassword = !this.showConfirmPassword;
    },validatePassword(evt) {
      const input = evt.target;
      const id = input.id;
      const value = input.value;
      let messages = [];
      if (!input.value) { this.warnings[id] = []; return; }

      // Strength checks
      const hasUpper = /[A-Z]/.test(value);
      const hasLower = /[a-z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSymbol = /[^A-Za-z0-9]/.test(value);
      const isLong = value.length >= 8;

      // Compute strength score
      let score = 0;
      if (isLong) score++;
      if (hasUpper && hasLower) score++;
      if (hasNumber) score++;
      if (hasSymbol) score++;
      this.passwordStrengthScore = score >= 4 ? 3 : score <= 1 ? 1 : 2; // Normalize to 1–3

      // Validation messages
      if (!isLong) messages.push('Password must be at least 8 characters long');
      if (!hasUpper) messages.push('Password must include at least one uppercase letter');
      if (!hasLower) messages.push('Password must include at least one lowercase letter');
      if (!hasNumber) messages.push('Password must include at least one number');
      if (!hasSymbol) messages.push('Password must include at least one special symbol');

      this.warnings[id] = messages;
    },

    validateConfirmPassword(evt) {
      const input = evt.target;
      const id = input.id;
      let messages = [];
      if (this.form.password !== input.value) messages.push('Password do not match');
      this.warnings[id] = messages;
    },
  },
};
</script>

<style scoped>
/* Hide default browser eye icon on password inputs */
input[type="password"]::-ms-reveal,
input[type="password"]::-ms-clear {
  display: none;
}

input[type="password"]::-webkit-credentials-auto-fill-button,
input[type="password"]::-webkit-password-toggle {
  display: none;
  visibility: hidden;
  appearance: none;
}

input[type="password"] {
  -webkit-text-security: disc !important; /* prevents showing default reveal */
}

.password-group {
  position: relative;
  width: 100%;
}

.password-group input {
  padding-right: 2.5em;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 70%;
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;
  align-items: center;
}
.eye-icon {
  width: 1.2em;
  height: 1.2em;
  color: #3d3d3d;
}
.eye-icon:hover {
  color: #238605;
}
.password-strength {
  display: block;
  margin-top: 0.3em;
  font-size: 0.9em;
}
.password-strength.weak {
  color: #dc2626;
}
.password-strength.medium {
  color: #d97706;
}
.password-strength.strong {
  color: #16a34a;
}

.password-strength-container {
  margin-bottom: 0.8em;
  width: 100%;

}

.strength-bar-background {
  width: 100%;
  height: 8px;
  background-color: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.strength-bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease, background-color 0.3s ease;
}

/* Color levels */
.strength-bar-fill.weak {
  background-color: #dc2626;
}

.strength-bar-fill.medium {
  background-color: #d97706;
}

.strength-bar-fill.strong {
  background-color: #16a34a;
}

.strength-text {
  margin-top: 4px;
  font-size: 0.85em;
  color: #4b5563;
  text-align: left;
}
</style>
