<template>
  <h1>Change Password</h1>

    <div
      class="warning-container"
      v-if="allWarnings.length || error || success"
      :class="{
        'warning-success': success,
        'warning-error': error,
        'warning-default': allWarnings.length && !error && !success
      }"
    >
      <svg v-if="success"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6" :class="{'warning-success': success}"
      >
        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd"/>
      </svg>

      <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"/>
      </svg>

      <ul>
        <p v-if="warnings.idNumber && warnings.idNumber.length" class="warning">
          {{ warnings.idNumber[0] }}
        </p>
        <li v-for="(msg, i) in allWarnings" :key="i" class="warning">{{ msg }}</li>
        <li v-if="error" class="warning">{{ error }}</li>
        <li v-if="success" class="success">{{ success }}</li>
      </ul>

  </div>

  <div v-if="newPassword" class="password-strength-container">
    <p class="strength-text">{{ passwordStrengthLabel }}</p>
    <div class="strength-bar-background">
      <div class="strength-bar-fill" :class="passwordStrengthClass" :style="{ width: strengthWidth }"></div>
    </div>
  </div>

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
  props: {
    idNumber: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      newPassword: "",
      confirmPassword: "",
      showNewPassword: false,
      showConfirmPassword: false,
      error: "",
      success: "",
      passwordStrengthScore: 0,
      warnings: {
        idNumber: [],
        newPassword: [],
        confirmPassword: [],
      },
    };
  },
  computed: {
    allWarnings() {
      const vals = Object.values(this.warnings || {});
      const flat = [];

      for (const v of vals) {
        if (Array.isArray(v)) {
          for (const msg of v) {
            if (msg && String(msg).trim()) flat.push(String(msg).trim());
          }
        } else if (v && String(v).trim()) {
          flat.push(String(v).trim());
        }
      }

      return flat;
    },

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
    },

    validatePassword(evt) {
      const input = evt.target;
      const value = input.value;
      let messages = [];

      if (!value) {
        this.warnings.newPassword = ["Password cannot be empty."];
        this.passwordStrengthScore = 0;
        return;
      }

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
      this.passwordStrengthScore = score >= 4 ? 3 : score <= 1 ? 1 : 2;

      // Validation messages
      if (!isLong) messages.push("Password must be at least 8 characters long");
      if (!hasUpper) messages.push("Password must include at least one uppercase letter");
      if (!hasLower) messages.push("Password must include at least one lowercase letter");
      if (!hasNumber) messages.push("Password must include at least one number");
      if (!hasSymbol) messages.push("Password must include at least one special symbol");

      this.warnings.newPassword = messages;
    },

    validateConfirmPassword() {
      let messages = [];
      if (this.confirmPassword && this.confirmPassword !== this.newPassword) {
        messages.push("Passwords do not match");
      }
      this.warnings.confirmPassword = messages;
    },
    async submitChange() {
      this.error = "";
      this.success = "";

      // Validate ID number format
      if (!this.idNumber || !/^\d{4}-\d{4}$/.test(this.idNumber.trim())) {
        this.warnings.idNumber = ["ID must be in the format 0000-0000!"];
        console.log('ID warning triggered', this.warnings.idNumber);
        return;
      } else {
        this.warnings.idNumber = [];
      }


      // Run validations
      this.validatePassword({ target: { value: this.newPassword } });
      this.validateConfirmPassword();

      if (
        (this.warnings.newPassword && this.warnings.newPassword.length) ||
        (this.warnings.confirmPassword && this.warnings.confirmPassword.length)
      ) {
        this.error;
        return;
      }
      try {
        const res = await fetch('http://localhost/Security2.0/api/reset_password.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id_number: this.idNumber, new_password: this.newPassword }),
        });

        const data = await res.json();
        if (!res.ok || data.error) {
          this.error = data.error || "Failed to change password.";
        } else {
          this.success = "Successfully Changed Password";
          this.newPassword = "";
          this.confirmPassword = "";
          setTimeout(() => {
            this.$router.push("/login"); // Redirect after a delay of 1 second
          }, 1000);
        }
      } catch {
        this.error = "Network error, please try again.";
      }
      console.log('Sending to backend:', {
        id_number: this.idNumber,
        new_password: this.newPassword
      });

    }

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

.warning-container {
  transition: background-color 0.3s ease;
}

/* Default (red warning background) */
.warning-default,
.warning-error {
  background-color: #f8d7da;
  color: #842029;
}

/* Success (green) */
.warning-success {
  background-color: #d1e7dd;
  color: #0f5132;
}
</style>
