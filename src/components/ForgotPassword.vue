<template>
    <form @submit.prevent="submitReset">
      <div class="form-content" v-if="step === 1" style="width: 100%;">
        <h1>Forgot Password</h1>
        <div class="header">
          <h3>Account Detail</h3>
        </div>
        <hr>
        <div class="form-group" style="width: 90%;">
          <input type="text" v-model="email" id="email" name="email">
          <label for="email">Email:</label>
        </div>
      </div>

      <div class="form-content" v-if="step === 2">
        <h1>Forgot Password</h1>
        <div class="header">
          <h3>Authentication Questions</h3>
        </div>
        <div class="warning-container" v-if="allWarnings.length">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
          <ul>
            <li v-for="(msg, idx) in allWarnings" :key="idx" class="warning">{{ msg }}</li>
          </ul>
        </div>
        <hr>
        <div class="registration-box" style="display: flex; flex-direction: column; justify-content: center;">
          <div class="form-group">
            <div class="form-group">
              <input type="text" id="answer1" v-model="form.answer1" required @input="validateAnswer">
              <label for="answer1" class="question-label">Answer 1: <span>*</span></label>
            </div>

            <div class="form-group">
              <input type="text" id="question1" v-model="form.question1" disabled class="question-display" />
              <label for="question1" class="question-label">Question 1: <span>*</span></label>
            </div>
          </div>

          <div class="form-group">
            <div class="form-group">
              <input type="text" id="answer2" v-model="form.answer2" required @input="validateAnswer">
              <label for="answer2" class="question-label">Answer 2: <span>*</span></label>
            </div>

            <div class="form-group">
              <input type="text" id="question2" v-model="form.question2" disabled class="question-display" />
              <label for="question2" class="question-label">Question 2: <span>*</span></label>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="form-group">
            <input type="text" id="answer3" v-model="form.answer3" required @input="validateAnswer">
            <label for="answer3" class="question-label">Answer 3: <span>*</span></label>
          </div>

          <div class="form-group">
            <input type="text" id="question3" v-model="form.question3" disabled class="question-display" />
            <label for="question3" class="question-label">Question 3: <span>*</span></label>
          </div>
        </div>
      </div>

      <div class="form-content" v-if="step === 3">
        <h1>Forgot Password</h1>
        <div class="header">
          <h3>Re-enter Authentication Answers</h3>
        </div>
        <hr>
        <div class="warning-container" v-if="allWarnings.length">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
          <ul>
            <li v-for="(msg, idx) in allWarnings" :key="idx" class="warning">{{ msg }}</li>
          </ul>
        </div>
        <div class="registration-box" style="display: flex; flex-direction: column; justify-content: center;">
          <div class="form-group">
            <div class="form-group">
              <input type="text" id="answer1" v-model="form.answer1" required @input="validateAnswer">
              <label for="answer1" class="question-label">Answer 1: <span>*</span></label>
            </div>

            <div class="form-group">
              <select id="question1" v-model="form.question1" required disabled>
                <option disabled value="">-- Select a question --</option>
                <option
                  v-for="(q, index) in questionList"
                  :key="'q1-' + index"
                  :value="q.choice"
                  :disabled="[form.question2, form.question3].includes(q.choice)"
                >
                  {{ q.choice }}
              </option>
              </select>
              <label for="question1" class="question-label">Question 1: <span>*</span></label>
            </div>
          </div>

          <div class="form-group">
            <div class="form-group">
              <input type="text" id="answer2" v-model="form.answer2" required @input="validateAnswer">
              <label for="answer2" class="question-label">Answer 2: <span>*</span></label>
            </div>

            <div class="form-group">
              <select id="question2" v-model="form.question2" required disabled>
                <option disabled value="">-- Select a question --</option>
                <option
                    v-for="(q, index) in questionList"
                    :key="'q2-' + index"
                    :value="q.choice"
                    :disabled="[form.question1, form.question3].includes(q.choice)"
                  >
                    {{ q.choice }}
                </option>
              </select>
              <label for="question2" class="question-label">Question 2: <span>*</span></label>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="form-group">
            <input type="text" id="answer3" v-model="form.answer3" required @input="validateAnswer">
            <label for="answer3" class="question-label">Answer 3: <span>*</span></label>
          </div>

          <div class="form-group">
            <select id="question3" v-model="form.question3" required disabled>
              <option disabled value="">-- Select a question --</option>
              <option
                  v-for="(q, index) in questionList"
                  :key="'q3-' + index"
                  :value="q.choice"
                  :disabled="[form.question1, form.question2].includes(q.choice)"
                >
                  {{ q.choice }}
              </option>
            </select>
            <label for="question3" class="question-label">Question 3: <span>*</span></label>
          </div>
        </div>
      </div>

      <div class="form-content" v-if="step === 4">
        <ChangePassword :email="email" ref="changePasswordComponent"/>
      </div>

      <div class="btn-container" v-if="step === 1">
        <button type="button" @click="fetchQuestions" class="btn" :disabled="!email.trim()">Next</button>
      </div>

      <div class="btn-container" v-if="step === 2">
        <button type="button" @click="resetQuestionsAndBack" class="btn">Back</button>
        <button type="submit" @click="goToStep3" class="btn" :disabled="!isStep2Valid">Next</button>
      </div>

      <div class="btn-container" v-if="step === 3">
        <button type="button" @click="step = 2" class="btn">Back</button>
        <button type="submit" @click="goToStep4" class="btn">Next</button>
      </div>

      <div class="btn-container" v-if="step === 4">
        <button type="button" @click="step = 2" class="btn">Back</button>
        <button type="button" @click="handleChangePassword" class="btn">Change Password</button>
      </div>
    </form>
</template>

<script>
import ChangePassword from './ChangePassword.vue';

export default {
  components: {
    ChangePassword
  },
  data() {
    return {
      warnings: {},
      email: '',
      emailValid: true,
      message: '',
          userId: null,
          questionsLoaded: false,
      step: 1,
      warningMessage: '',
      form: {
        question1: '',
        answer1: '',
        question2: '',
        answer2: '',
        question3: '',
        answer3: ''
      },
      originalAnswers: {
        answer1: '',
        answer2: '',
        answer3: ''
      },
      questionList: [
        {choice: 'What is your favorite color?', value: 'What is your favorite color?'},
        {choice: 'What is your favorite place?', value: 'What is your favorite place?'},
        {choice:'What was the name of your first pet?', value: 'What was the name of your first pet?'},
        {choice: 'What is your favorite movie or TV show?', value: 'What is your favorite movie or TV show?'},
        {choice: 'What is your favorite book?', value: 'What is your favorite book?'},
      ],
    };
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
    },
    isStep2Valid() {
      const f = this.form;
      return (
        f.question1 && f.answer1.trim() &&
        f.question2 && f.answer2.trim() &&
        f.question3 && f.answer3.trim()
      );
    },
    isStep3Valid() {
      const f = this.form;
      const o = this.originalAnswers;
      return (
        f.answer1.trim() === o.answer1.trim() &&
        f.answer2.trim() === o.answer2.trim() &&
        f.answer3.trim() === o.answer3.trim()
      );
    }
  },

  methods: {
    containsSymbol(value) {
      // Returns true if any non-alphanumeric (except space) characters are found
      return /[^a-zA-Z0-9\s]/.test(value);
    },
    validateEmail() {
      const val = (this.email || '').trim();
      // simple email regex
      const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      this.emailValid = re.test(val);
      this.warnings.email = this.emailValid ? [] : ['Please enter a valid email address.'];
      return this.emailValid;
    },
    validateAnswer(evt) {
      const value = evt.target.value.trim();
      const id = evt.target.id;
      let messages = [];
      if (!value) messages.push('Answer cannot be empty.');
      if (value.length < 2 && value.length != 1) messages.push('Answer too short.');
      if (this.containsSymbol(value)) messages.push('Avoid using special symbols.');
      this.warnings[id] = messages;
    },
    goToStep3() {
      this.originalAnswers = {
        answer1: this.form.answer1.trim(),
        answer2: this.form.answer2.trim(),
        answer3: this.form.answer3.trim()
      };
      this.form.answer1 = '';
      this.form.answer2 = '';
      this.form.answer3 = '';
      this.warningMessage = '';
      this.step = 3;
    },

    // ✅ Step 3 → Step 4: Show warning if answers don’t match
    goToStep4() {
      const f = this.form;
      const o = this.originalAnswers;

      if (
        f.answer1.trim() !== o.answer1.trim() ||
        f.answer2.trim() !== o.answer2.trim() ||
        f.answer3.trim() !== o.answer3.trim()
      ) {
        this.warningMessage = 'Your re-entered answers do not match the previous ones.';
        return; // stop here, don’t move forward
      }

      this.warningMessage = ''; // clear any old warning
      this.step = 4; // move to change password
    },
    async handleChangePassword() {
      const child = this.$refs.changePasswordComponent;
      if (!child || !child.submitChange) {
        this.message = 'Unable to change password: component not available.';
        return;
      }

      this.message = 'Submitting new password...';
      const result = await child.submitChange();

      if (!result.ok) {
        this.message = result.error || 'Failed to change password.';
        return;
      }

      this.message = (result.data && result.data.message) || 'Password changed successfully.';
      // Optionally reset steps or redirect to login
      this.step = 1;
      this.email = '';
    },
    async submitReset() {
      if (!this.email.trim()) {
        this.message = 'Please enter your email address.';
        this.emailValid = false;
        return;
      }

      if (!this.validateEmail()) {
        this.message = 'Please enter a valid email address.';
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
    ,
    // Fetch security questions for the supplied email
    async fetchQuestions() {
      this.message = '';
      if (!this.email.trim()) {
        this.message = 'Please enter your email address.';
        return;
      }
      if (!this.validateEmail()) {
        this.message = 'Please enter a valid email address.';
        return;
      }

      try {
        const res = await fetch('http://localhost/Security2.0/api/get_security_questions.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email })
        });

        const data = await res.json();

        if (!res.ok) {
          this.message = data.error || 'Unable to fetch security questions for this email.';
          return;
        }

        if (!data.questions || !Array.isArray(data.questions)) {
          this.message = 'No security questions returned.';
          return;
        }

        // Populate questionList with returned questions
        this.questionList = data.questions.map(q => ({ choice: q, value: q }));
        this.userId = data.user_id || null;

        // Auto-select the three questions for the form so user doesn't need to pick
        this.form.question1 = data.questions[0] || '';
        this.form.question2 = data.questions[1] || '';
        this.form.question3 = data.questions[2] || '';
        this.questionsLoaded = true;
        this.message = '';
        this.step = 2;
      } catch (err) {
        console.error(err);
        this.message = 'Network error while fetching questions.';
      }
    }
    ,
    resetQuestionsAndBack() {
      this.questionsLoaded = false;
      this.form.question1 = '';
      this.form.question2 = '';
      this.form.question3 = '';
      this.step = 1;
    }
  }
};
</script>

<style scoped>
form {
  padding: 1em;
}

.header {
  width: 100%;
  text-align: start;
}

h3 {
  font-weight: 600;
}

hr {
  width: 100%;
}
</style>
