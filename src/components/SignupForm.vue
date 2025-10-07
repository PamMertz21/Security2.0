<template>
  <form action="" method="POST" @submit.prevent>
    <h1>Register</h1>
    <div class="form-content" v-if="step === 'personal'">
      <div class="header">
        <h3>Personal Details</h3>
      </div>
      <hr>
      <div class="registration-box">
        <div class="form-group">
          <input type="text" id="id" name="id" v-model="form.id" required>
          <label for="id">ID No.</label>
        </div>
        <div class="form-group">
          <input type="text" id="fname" name="fname" v-model="form.firstName" required>
          <label for="fname">First Name:</label>
        </div>
        <div class="form-group">
          <input type="text" id="mname" name="mname" v-model="form.middleInitial" required>
          <label for="mname">Middle Initial:</label>
        </div>
        <div class="form-group">
          <input type="text" id="lname" name="lname" v-model="form.lastName" required>
          <label for="lname">Last Name:</label>
        </div>
        <div class="form-group">
          <input type="text" id="suffix" name="suffix" v-model="form.suffix">
          <label for="suffix">Suffix:</label>
        </div>
        <div class="form-group">
          <input type="date" id="birthdate" name="birthdate" v-model="form.birthdate" required @input="calculateAge">
          <label for="birthdate">Birthdate:</label>
        </div>
        <div class="form-group">
          <small id="age-warning" class="warning"></small>
          <input type="text" id="age" name="age" v-model="form.age" required readonly>
          <label for="age">Age:</label>
        </div>
        <div class="form-group">
          <select name="sex" id="sex" v-model="form.sex" required>
              <option value="male">Male</option>
              <option value="female">Female</option>
          </select>
          <label for="mname">Sex:</label>
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
          <input type="text" id="purok" name="purok" v-model="form.purok" required>
          <label for="purok">Purok:</label>
        </div>
        <div class="form-group">
          <input type="text" id="barangay" name="barangay" v-model="form.barangay" required>
          <label for="barangay">Barangay:</label>
        </div>
        <div class="form-group">
          <input type="text" id="city" name="city" v-model="form.city" required>
          <label for="city">City/Municipality:</label>
        </div>
        <div class="form-group">
          <input type="text" id="province" name="province" v-model="form.province" required>
          <label for="province">Province:</label>
        </div>
        <div class="form-group">
          <input type="text" id="country" name="country" v-model="form.country" required>
          <label for="country">Country:</label>
        </div>
        <div class="form-group">
          <input type="text" id="zip" name="zip" v-model="form.zip" required>
          <label for="zip">Zip Code:</label>
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
          <input type="text" id="username" name="username" v-model="form.username" required>
          <label for="username">Username:</label>
        </div>
        <div class="form-group">
          <input type="password" id="password" name="password" v-model="form.password" required>
          <label for="password">Password:</label>
        </div>
        <div class="form-group">
          <input type="password" id="repassword" name="repassword" v-model="repassword" required>
          <label for="repassword">Re-enter Password:</label>
        </div>
        <div class="form-group">
          <input type="email" id="email" name="email" v-model="form.email" required>
          <label for="email">Email:</label>
        </div>
      </div>
      <div class="btn-container">
        <button type="button" @click="step = 'address'" class="btn">Back</button>
        <button type="button" class="btn" @click="onRegister" :disabled="loading">{{ loading ? 'Registering...' : 'Register' }}</button>
      </div>
      <small v-if="error" style="color:#b00020">{{ error }}</small>
    </div>
</form>
</template>

<script>
export default {
  emits: ['register-success'],
  data() {
    return {
      step: 'personal',
      repassword: '',
      loading: false,
      error: '',
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
        email: ''
      }
    }
  },
  methods: {
    calculateAge() {
      const dob = this.form.birthdate
      const warning = document.getElementById('age-warning');
      let messages = [];
      if (!dob) {
        this.form.age = ''
        warning.textContent = ''
        return;
      }
      const dobDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - dobDate.getFullYear();
      const m = today.getMonth() - dobDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
        age--;
      }
      this.form.age = String(age)

      if (isNaN(age) || age < 0) {
        messages.push('Age is invalid!');
      } else if (age < 18) {
        messages.push('Age is below 18 years old');
      }
      warning.textContent = messages.join('! ');
    },
    async onRegister() {
      if (this.form.password !== this.repassword) {
        alert('Passwords do not match');
        return;
      }
      this.loading = true
      this.error = ''
      try {
        const res = await fetch('http://localhost/Security-main/api/register.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: this.form.username.trim(),
            email: this.form.email.trim(),
            password: this.form.password,
            profile: {
              firstName: this.form.firstName,
              middleInitial: this.form.middleInitial,
              lastName: this.form.lastName,
              suffix: this.form.suffix,
              birthdate: this.form.birthdate || null,
              age: this.form.age ? Number(this.form.age) : null,
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
          })
        })
        const data = await res.json()
        if (!res.ok || !data.ok) {
          throw new Error(data.error || 'Registration failed')
        }
        this.$emit('register-success', data.user)
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

.form-content {
  width: 100%;
  height: 80%;
  gap: .5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #9b9b8cae;
  padding: 1.5em 2em;
  border-radius: 1em;
  margin: auto;
}

.registration-box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1em 1em .5em 1em;
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
  border: 1px solid #111;
}

.header {
  width: 100%;
  text-align: start;
  margin-left: 1em;
}

h3 {
  font-weight: 600;
}

h1 {
  font-weight: bolder;
  text-transform: uppercase;
}

hr {
  width: 100%;
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
  background-color: #7D8D86;
  box-shadow: 1px 1px 1px #00000095;
  color: #F1F0E4;
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
