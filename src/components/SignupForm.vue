<template>
  <form @submit.prevent="register">
    <h1>Sign Up</h1>
    <div class="form-content" v-if="step === 'personal'">
      <div class="header">
        <h3>Personal Details</h3>
      </div>
      <hr>
      <div class="registration-box">
        <div class="form-group">
          <input type="text" id="fname" name="fname" v-model="form.firstName" required>
          <label for="fname">First Name: <span>*</span></label>
        </div>
        <div class="form-group">
          <input type="text" id="mname" name="mname" v-model="form.middleInitial" required>
          <label for="mname">Middle Initial:</label>
        </div>
        <div class="form-group">
          <input type="text" id="lname" name="lname" v-model="form.lastName" required>
          <label for="lname">Last Name: <span>*</span></label>
        </div>
        <div class="form-group">
          <input type="text" id="suffix" name="suffix" v-model="form.suffix">
          <label for="suffix">Suffix: <span>*</span></label>
        </div>
        <div class="form-group">
          <input type="date" id="birthdate" name="birthdate" v-model="form.birthdate" required @input="calculateAge">
          <label for="birthdate">Birthdate: <span>*</span></label>
        </div>
        <div class="form-group">
          <small id="age-warning" class="warning">{{ ageWarning }}</small>
          <input type="text" id="age" name="age" v-model="form.age" required readonly>
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
          <input type="email" id="email" name="email" v-model="form.email" required>
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
          <input type="text" id="purok" name="purok" v-model="form.purok" required>
          <label for="purok">Purok: <span>*</span></label>
        </div>
        <div class="form-group">
          <input type="text" id="barangay" name="barangay" v-model="form.barangay" required>
          <label for="barangay">Barangay: <span>*</span></label>
        </div>
        <div class="form-group">
          <input type="text" id="city" name="city" v-model="form.city" required>
          <label for="city">City/Municipality: <span>*</span></label>
        </div>
        <div class="form-group">
          <input type="text" id="province" name="province" v-model="form.province" required>
          <label for="province">Province: <span>*</span></label>
        </div>
        <div class="form-group">
          <input type="text" id="country" name="country" v-model="form.country" required>
          <label for="country">Country: <span>*</span></label>
        </div>
        <div class="form-group">
          <input type="text" id="zip" name="zip" v-model="form.zip" required>
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
          <input type="text" id="id" name="id" v-model="form.id" required>
          <label for="id">ID No. <span>*</span></label>
        </div>
        <div class="form-group">
          <input type="text" id="username" name="username" v-model="form.username" required>
          <label for="username">Username: <span>*</span></label>
        </div>
        <div class="form-group">
          <input type="password" id="password" name="password" v-model="form.password" required>
          <label for="password">Password: <span>*</span></label>
        </div>
        <div class="form-group">
          <input type="password" id="repassword" name="repassword" v-model="form.repassword" required>
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
