<template>
  <form @submit.prevent="register">
    <h1>Sign Up</h1>
    <div class="form-content" v-if="step === 'personal'">
      <div class="warning-container">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
        </svg>

      </div>
      <div class="header">
        <h3>Personal Details</h3>
      </div>
      <hr>
      <div class="registration-box">
        <div class="form-group">
          <input type="text" id="fname" name="fname" v-model="form.firstName" required @input="validateName">
          <label for="fname">First Name: <span>*</span></label>
        </div>
        <div class="form-group">
          <input type="text" id="mname" name="mname" v-model="form.middleInitial" required @input="validateMname">
          <label for="mname">Middle Initial:</label>
        </div>
        <div class="form-group">
          <input type="text" id="lname" name="lname" v-model="form.lastName" required @input="validateName">
          <label for="lname">Last Name: <span>*</span></label>
        </div>
        <div class="form-group">
          <input type="text" id="suffix" name="suffix" v-model="form.suffix" @input="validateSuffix">
          <label for="suffix">Suffix: <span>*</span></label>
        </div>
        <div class="form-group">
          <input type="date" id="birthdate" name="birthdate" v-model="form.birthdate" required @input="onBirthInput">
          <label for="birthdate">Birthdate: <span>*</span></label>
        </div>
        <div class="form-group">
          <small id="age-warning" class="warning">{{ ageWarning }}</small>
          <input type="num" id="age" name="age" v-model="form.age" required readonly>
          <label for="age">Age: <span>*</span></label>
        </div>
        <div class="form-group">
          <select name="sex" id="sex" v-model="form.sex" required>
              <option value="male">Male</option>
              <option value="female">Female</option>
          </select>
          <label for="mname">Sex: <span>*</span></label>
        </div>
        <div class="form-group">
          <input type="email" id="email" name="email" v-model="form.email" required @input="validateEmail">
          <label for="email">Email: <span>*</span></label>
        </div>
      </div>
      <button type="button" @click="step = 'address'" class="btn">Next</button>
    </div>

    <div class="form-content" v-if="step === 'address'">
      <div class="header">
        <h3>Address</h3>
      </div>
      <hr>
      <div class="registration-box">
        <div class="form-group">
          <input type="text" id="purok" name="purok" v-model="form.purok" required @input="validateStreet">
          <label for="purok">Purok: <span>*</span></label>
        </div>
        <div class="form-group">
          <input type="text" id="barangay" name="barangay" v-model="form.barangay" required @input="validateBrgy">
          <label for="barangay">Barangay: <span>*</span></label>
        </div>
        <div class="form-group">
          <input type="text" id="city" name="city" v-model="form.city" required @input="validateCity">
          <label for="city">City/Municipality: <span>*</span></label>
        </div>
        <div class="form-group">
          <input type="text" id="province" name="province" v-model="form.province" required @input="validateProvince">
          <label for="province">Province: <span>*</span></label>
        </div>
        <div class="form-group">
          <input type="text" id="country" name="country" v-model="form.country" required @input="validateCountry">
          <label for="country">Country: <span>*</span></label>
        </div>
        <div class="form-group">
          <input type="num" id="zip" name="zip" v-model="form.zip" required @input="validateZipcode">
          <label for="zip">Zip Code: <span>*</span></label>
        </div>
      </div>
      <div class="btn-container">
        <button type="button" @click="step = 'personal'" class="btn">Back</button>
        <button type="button" @click="step = 'login_details'" class="btn">Next</button>
      </div>
    </div>

    <div class="form-content" v-if="step === 'login_details'">
      <div class="header">
        <h3>Login Details</h3>
      </div>
      <hr>
      <div class="registration-box">
        <div class="form-group">
          <input type="text" id="id" name="id" v-model="form.id" required @input="validateId">
          <label for="id">ID No. <span>*</span></label>
        </div>
        <div class="form-group">
          <input type="text" id="username" name="username" v-model="form.username" required @input="validateUsername">
          <label for="username">Username: <span>*</span></label>
        </div>
        <div class="form-group">
          <input type="password" id="password" name="password" v-model="form.password" required @input="validatePassword">
          <label for="password">Password: <span>*</span></label>
        </div>
        <div class="form-group">
          <input type="password" id="repassword" name="repassword" v-model="form.repassword" required @input="validateConfirmPassword">
          <label for="repassword">Re-enter Password: <span>*</span></label>
        </div>
      </div>
      <div class="btn-container">
        <button type="button" @click="step = 'address'" class="btn">Back</button>
        <button type="submit" class="btn">Register</button>
      </div>
    </div>
</form>
</template>

<script>
export default {
  data() {
    return {
      step: 'personal',
      ageWarning: '',
      form: {
        id: '',
        firstName: '',
        middleInitial: '',
        lastName: '',
        suffix: '',
        birthdate: '',
        age: '',
        sex: 'male',
        purok: '',
        barangay: '',
        city: '',
        province: '',
        country: '',
        zip: '',
        username: '',
        password: '',
        repassword: '',
        email: ''
      }
    }
  },
  methods: {
    // this gets or creates inline warning span next to input
    getOrCreateWarning(input) {
      if (!input) return { textContent: '' };
      const warningId = input.id + '-warning';
      let warning = document.getElementById(warningId);
      if (!warning) {
        warning = document.createElement('small');
        warning.id = warningId;
        warning.className = 'warning';
        warning.style.color = 'red';
        input.parentNode.insertBefore(warning, input.nextSibling);
      }
      return warning;
    },

    // Utility validators
    wordsCapitalized(value) {
      const words = value.trim().split(/\s+/);
      for (let word of words) {
        if (word.length > 0 && word[0] !== word[0].toUpperCase()) {
          return false;
        }
      }
      return true;
    },
    allCaps(value) {
      return value && value === value.toUpperCase() && /[A-Z]/.test(value);
    },
    containsNum(value){
      return /[0-9]/.test(value);
    },
    containsSymbol(value) {
      return /[^a-zA-Z0-9\s]/.test(value);
    },
    hasThreeConsecutiveSpaces(value) {
      return /\s{3,}/.test(value);
    },
    hasThreeSameConsecutiveLetters(value) {
      return /([a-zA-Z])\1\1/.test(value);
    },
    numisFollowedByAlphabet(value) {
      return /\d[a-zA-Z]/.test(value);
    },
    numDashLetter(value) {
      return /\d-[a-zA-Z]/.test(value);
    },
    onlyDashAllowed(value) {
      return /^[a-zA-Z0-9\s-]+$/.test(value);
    },

    // Wrapper to keep existing calculateAge behavior triggered from template
    onBirthInput() {
      this.calculateAge();
      // also validate DOB for errors
      const input = document.getElementById('birthdate');
      const warning = this.getOrCreateWarning(input);
      let messages = [];
      const dob = this.form.birthdate;
      if (!dob) {
        warning.textContent = '';
        return;
      }
      const dobDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - dobDate.getFullYear();
      const m = today.getMonth() - dobDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
        age--;
      }
      if (isNaN(age) || age < 0) {
        messages.push('Invalid Input!');
      }
      warning.textContent = messages.join('! ');
    },

    calculateAge() {
      const dob = this.form.birthdate;
      this.ageWarning = '';
      if (!dob) {
        this.form.age = '';
        return;
      }
      const dobDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - dobDate.getFullYear();
      const m = today.getMonth() - dobDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
        age--;
      }
      this.form.age = age;
      if (isNaN(age) || age < 0) {
        this.ageWarning = 'Age is invalid!';
      } else if (age < 18) {
        this.ageWarning = 'Age is below 18 years old';
      }
    },
    // --- Field-specific validators ---
    validateId() {
      const input = document.getElementById('id');
      const warning = this.getOrCreateWarning(input);
      let messages = [];
      const idFormatRegex = /^\d{4}-\d{4}$/;
      if (!this.form.id) {
        warning.textContent = '';
        return;
      }
      if (!idFormatRegex.test(this.form.id)) {
        messages.push('ID must be in the format 0000-0000!');
        warning.textContent = messages.join(' ');
        return;
      }
      // Local duplicate check (server check would be better)
      if (this.existingIds.includes(this.form.id)) {
        messages.push('This User ID already exists!');
      }
      warning.textContent = messages.join(' ');
    },

    validateName(evt) {
      // Prefer using v-model value when evt is not provided
      const value = (evt && evt.target && evt.target.value) ? evt.target.value : this.form.firstName || this.form.lastName || '';
      const input = evt ? evt.target : document.getElementById('fname');
      const warning = this.getOrCreateWarning(input);
      let messages = [];
      if (this.allCaps(value)) messages.push('All caps is not allowed!');
      if (this.containsNum(value) || this.containsSymbol(value)) messages.push('Invalid Input!');
      if (value.length > 0 && !this.wordsCapitalized(value)) messages.push('First letter of each word must be capitalized!');
      if (this.hasThreeSameConsecutiveLetters(value)) messages.push('Three consecutive same letters are not allowed!');
      if (this.hasThreeConsecutiveSpaces(value)) messages.push('Three consecutive spaces are not allowed!');
      warning.textContent = messages.join('! ');
    },

    validateMname(evt) {
      const input = evt.target;
      const value = input.value;
      const warning = this.getOrCreateWarning(input);
      let messages = [];
      if (value.length > 2) messages.push('Input too long!');
      if (value.length > 0 && !this.wordsCapitalized(value)) messages.push('First letter of each word must be capitalized!');
      if (/^[a-zA-Z.]+$/.test(value) === false && value.length > 0) messages.push('Invalid Input!');
      if (this.hasThreeSameConsecutiveLetters(value) || this.hasThreeConsecutiveSpaces(value)) messages.push('Three consecutive inputs error!');
      warning.textContent = messages.join('! ');
    },

    validateSuffix(evt) {
      const input = evt.target;
      const value = input.value;
      const warning = this.getOrCreateWarning(input);
      let messages = [];
      if (value.length > 4) messages.push('Input too long!');
      if (value.length > 0 && !this.wordsCapitalized(value)) messages.push('First letter of each word must be capitalized!');
      if (/^[a-zA-Z.]+$/.test(value) === false && value.length > 0) messages.push('Invalid Input!');
      warning.textContent = messages.join('! ');
    },

    validateEmail(evt) {
      const input = evt.target;
      const warning = this.getOrCreateWarning(input);
      let messages = [];
      if (!input.value) { warning.textContent = ''; return; }
      if (this.existingEmails.includes(input.value)) messages.push('This email already exists!');
      warning.textContent = messages.join('! ');
    },

    validateAddress(evt) {
      const input = evt.target;
      const value = input.value;
      let messages = [];
      if (!value) return messages;
      if (this.allCaps(value)) messages.push('All caps not allowed!');
      if (value.length > 0 && !this.wordsCapitalized(value)) messages.push('First letter of each word must be capitalized!');
      if (this.hasThreeSameConsecutiveLetters(value) || this.hasThreeConsecutiveSpaces(value)) messages.push('Three consecutive inputs not allowed!');
      return messages;
    },

    validateStreet(evt) {
      const input = evt.target;
      const warning = this.getOrCreateWarning(input);
      let messages = this.validateAddress(evt);
      if (input.value.length > 0 && !this.onlyDashAllowed(input.value)) messages.push('Invalid input!');
      warning.textContent = messages.join('! ');
    },

    validateBrgy(evt) {
      const input = evt.target;
      const warning = this.getOrCreateWarning(input);
      let messages = this.validateAddress(evt);
      if (this.numisFollowedByAlphabet(input.value)) messages.push('Invalid Input!');
      if (this.numDashLetter(input.value)) messages.push('Invalid Input!');
      if (/^[a-zA-Z0-9.]+$/.test(input.value) === false && input.value.length > 0) messages.push('Invalid Input!');
      warning.textContent = messages.join('! ');
    },

    validateCity(evt) {
      const input = evt.target;
      const warning = this.getOrCreateWarning(input);
      let messages = this.validateAddress(evt);
      if (this.containsNum(input.value)) messages.push('Invalid Input');
      if (this.containsSymbol(input.value)) messages.push('Invalid Input!');
      warning.textContent = messages.join('! ');
    },

    validateProvince(evt) {
      const input = evt.target;
      const warning = this.getOrCreateWarning(input);
      let messages = this.validateAddress(evt);
      if (this.containsNum(input.value) || this.containsSymbol(input.value)) messages.push('Invalid Input!');
      warning.textContent = messages.join('! ');
    },

    validateCountry(evt) {
      const input = evt.target;
      const warning = this.getOrCreateWarning(input);
      let messages = this.validateAddress(evt);
      if (this.containsNum(input.value) || this.containsSymbol(input.value)) messages.push('Invalid Input!');
      warning.textContent = messages.join('! ');
    },

    validateZipcode(evt) {
      const input = evt.target;
      const warning = this.getOrCreateWarning(input);
      let messages = this.validateAddress(evt);
      const zipFormatRegex = /^\d{4}$/;
      if (!/[0-9]/.test(input.value)) messages.push('Invalid Input!');
      if (!zipFormatRegex.test(input.value)) messages.push('Zipcode must be 4 digits!');
      warning.textContent = messages.join('! ');
    },

    validateUsername(evt) {
      const input = evt.target;
      const warning = this.getOrCreateWarning(input);
      let messages = [];
      if (!input.value) { warning.textContent = ''; return; }
      if (this.existingUsername.includes(input.value)) messages.push('This username already exists!');
      warning.textContent = messages.join('! ');
    },

    validatePassword(evt) {
      const input = evt.target;
      const warning = this.getOrCreateWarning(input);
      let messages = [];
      if (!input.value) { warning.textContent = ''; return; }
      // Basic password rules can be added here
      if (this.existingPassword.includes(input.value)) messages.push('This password is already used!');
      warning.textContent = messages.join('! ');
    },

    validateConfirmPassword(evt) {
      const input = evt.target;
      const warning = this.getOrCreateWarning(input);
      let messages = [];
      if (this.form.password !== input.value) messages.push('Password do not match');
      warning.textContent = messages.join('! ');
    },
    async register() {
      // Basic client-side validation
      if (!this.form.username || !this.form.email || !this.form.password) {
        alert('Please fill username, email and password');
        return;
      }
      if (this.form.password !== this.form.repassword) {
        alert('Passwords do not match');
        return;
      }

      const payload = {
        username: this.form.username,
        email: this.form.email,
        password: this.form.password,
        profile: {
          firstName: this.form.firstName,
          middleInitial: this.form.middleInitial,
          lastName: this.form.lastName,
          suffix: this.form.suffix,
          birthdate: this.form.birthdate,
          age: this.form.age,
          sex: this.form.sex
        },
        address: {
          purok: this.form.purok,
          barangay: this.form.barangay,
          city: this.form.city,
          province: this.form.province,
          country: this.form.country,
          zip: this.form.zip
        }
      };

      try {
        // Use explicit Apache URL so the request reaches XAMPP even when dev server (Vite) is running on a different origin
        const endpoint = 'http://localhost/Security/api/register.php';
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        // Try to parse JSON (backend returns JSON). If parsing fails, read text for debugging.
        let data;
        try {
          data = await res.json();
        } catch (e) {
          const text = await res.text();
          console.error('Non-JSON response from register endpoint:', text, e);
          alert('Server returned unexpected response. See console for details.');
          return;
        }
        console.log('Register response', res.status, data);
        if (!res.ok) {
          alert(data.error || 'Registration failed');
          return;
        }
        // success
        alert('Registration successful');
        this.$emit('go-login');
      } catch (err) {
        console.error(err);
        alert('Network or server error');
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

.form-content {
  width: 100%;
  height: 80%;
}

.registration-box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: .8em 1em ;
  width: 100%;
}

.form-group {
  display: flex;
  flex-direction: column-reverse;
  gap: .2em;
}

.form-group label {
  text-align: start;
  margin-left: 1em;
}

.form-group input, select {
  width: 90%;
  align-self: center;
  padding: .5em .5em .5em 1em;
  border-radius: 1em;
  border: none;
}

.header {
  width: 100%;
  text-align: start;
  margin-left: 1em;
}

h3 {
  font-weight: 600;
}

hr {
  width: 100%;
}

span {
  color: red;
}

.btn-container {
  display: flex;
  gap: 1em;
  width: 100%;
  justify-content: center;
  margin-top: 3em;
}

.btn {
  border-radius: .9em;
  padding: .8em 1.5em;
  border: none;
  background-color: #64d6a5;
  box-shadow: 1px 1px 1px #00000095;
  color: #3d3939;
  text-transform: uppercase;
  font-weight: 550;
  font-size: .9em;
}

.form-content > .btn {
  align-self: center;
  margin-top: auto;
}

a {
  text-decoration: none;
  color: #F1F0E4;
}
</style>
