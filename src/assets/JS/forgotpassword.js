import ChangePassword from '../../components/ChangePassword.vue';

export default {
  components: {
    ChangePassword
  },
  data() {
    return {
      isStep2Loading: false,
      warnings: {
        server: []
      },
      idNumber: '',
      message: '',
      userId: null,
      username: '',
      questionsLoaded: false,
      step: 1,
      form: {
        question1: '',
        answer1: '',
        question2: '',
        answer2: '',
        question3: '',
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
    isIdValid() {
      return (
        this.idNumber.trim() !== '' &&
        (!this.warnings.idNumber || this.warnings.idNumber.length === 0)
      );
    },
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
    isChangePasswordValid() {
      // Check if the ChangePassword component has validation errors
      if (!this.$refs.changePasswordComponent) return false;

      const component = this.$refs.changePasswordComponent;
      const hasPasswordWarnings =
        (component.warnings.newPassword && component.warnings.newPassword.length > 0) ||
        (component.warnings.confirmPassword && component.warnings.confirmPassword.length > 0);

      const hasError = Boolean(component.error);
      const emptyFields = !component.newPassword || !component.confirmPassword;

      return !hasPasswordWarnings && !hasError && !emptyFields;
    },
  },

  methods: {
    containsSymbol(value) {
      // Returns true if any non-alphanumeric (except space) characters are found
      return /[^a-zA-Z0-9\s]/.test(value);
    },

    validateIdNumber() {
      const value = this.idNumber.trim();
      const messages = [];

      if (!value) {
        messages.push('ID number is required.');
      } else if (!/^\d{4}-\d{4}$/.test(value)) {
        messages.push('ID must be in the format 0000-0000!');
      }

      this.warnings.idNumber = messages;
      return messages.length === 0;
    },

    validateRequiredFields() {
      let isValid = true;

      // Validate ID number in step 1
      if (this.step === 1) {
        if (!this.idNumber.trim()) {
          this.warnings.idNumber = ['ID number is required.'];
          isValid = false;
        }
      }

      // Validate answers in step 2
      if (this.step === 2) {
        if (!this.form.answer1.trim()) {
          this.warnings.answer1 = ['Answer 1 is required.'];
          isValid = false;
        }
        if (!this.form.answer2.trim()) {
          this.warnings.answer2 = ['Answer 2 is required.'];
          isValid = false;
        }
        if (!this.form.answer3.trim()) {
          this.warnings.answer3 = ['Answer 3 is required.'];
          isValid = false;
        }
      }

      return isValid;
    },

    validateAnswer(evt) {
      const value = evt.target.value.trim();
      const id = evt.target.id;
      let messages = [];
      if (!value) {
        messages.push('This answer is required.');
      } else if (value.length < 2) {
        messages.push('Answer too short.');
      }
      if (value && this.containsSymbol(value)) {
        messages.push('Avoid using special symbols.');
      }
      this.warnings[id] = messages;

      // Clear server errors and specific field errors when user starts typing again
      if (this.warnings.server && this.warnings.server.length) {
        this.warnings.server = [];
      }

      // Clear the specific field error for the field being typed in
      // This allows field-specific database mismatch errors to be cleared when user retypes

      this.isStep2Loading = false;
    },

    async goToStep3() {
      // Validate required fields first
      if (!this.validateRequiredFields()) {
        return; // Stop if required fields are missing
      }

      this.isStep2Loading = true;
      this.warnings.server = [];

      try {
        const res = await fetch('http://localhost/Security2.0/api/verify_security_answers.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id_number: this.idNumber,
            answer1: this.form.answer1,
            answer2: this.form.answer2,
            answer3: this.form.answer3
          })
        });

        const data = await res.json();

        if (!res.ok || !data.match) {
          // Clear any existing field errors first
          this.warnings.answer1 = [];
          this.warnings.answer2 = [];
          this.warnings.answer3 = [];
          this.warnings.server = [];

          // If we have specific incorrect answer information, show field-specific errors
          if (data.incorrect_answers && Array.isArray(data.incorrect_answers)) {
            data.incorrect_answers.forEach(answerNum => {
              const fieldName = `answer${answerNum}`;
              this.warnings[fieldName] = ['This answer does not match our records.'];
            });
          } else {
            // Fallback to generic server error if no specific info available
            this.warnings.server = ['Your answers do not match our records.'];
          }

          // Disable the Next button because of error
          this.isStep2Loading = true;
          return; // stop — do not proceed
        }

        this.form.answer1 = '';
        this.form.answer2 = '';
        this.form.answer3 = '';
        this.warnings.server = [];
        this.warnings.answer1 = [];
        this.warnings.answer2 = [];
        this.warnings.answer3 = [];
        this.step = 3;
      } catch (err) {
        console.error(err);
        this.warnings.server = ['Network or server error occurred.'];
      } finally {
        // Re-enable only if there's no server warning
        // Field-specific warnings don't disable the button permanently
        if (!this.warnings.server.length) {
          this.isStep2Loading = false;
        }
      }
    },
    async handleChangePassword() {
      // Validate ID number format before proceeding
      if (!this.validateIdNumber()) {
        this.message = 'Please enter a valid ID number in the format 0000-0000.';
        return;
      }

      const child = this.$refs.changePasswordComponent;
      if (!child || !child.submitChange) {
        this.message = 'Unable to change password: component not available.';
        return;
      }

      try {
        //  Call child ChangePassword component
        const result = await child.submitChange();

        if (!result || !result.ok) {
          this.message = result?.error || 'Failed to change password.';
          return;
        }

        this.message = result.data?.message || 'Password changed successfully.';

        // Reset form after success
        this.step = 1;
        this.idNumber = '';
        this.warnings.idNumber = [];
      } catch (err) {
        console.error(err);
        this.message = 'Unexpected error occurred.';
      }
    },

    async submitReset() {
      if (!this.idNumber.trim()) {
        this.message = 'Please enter your ID number.';
        return;
      }

      try {
        const res = await fetch('http://localhost/Security2.0/api/forgot_password.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id_number: this.idNumber })
        });

        const data = await res.json();

        if (!res.ok) {
          this.message = data.error || 'Unable to send reset request.';
          return;
        }

        this.message = 'Password reset initiated successfully.';
      } catch (err) {
        console.error(err);
        this.message = 'Network error occurred.';
      }
    },
    // Fetch security questions for the supplied id
    async fetchQuestions() {
      this.message = '';
      this.warnings.idNumber = []; // clear old warnings

      if (!this.validateIdNumber()) {
        this.warnings.idNumber = ['Please enter your ID number in the format 0000-0000.'];
        return;
      }

      try {
        const res = await fetch('http://localhost/Security2.0/api/get_security_questions.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id_number: this.idNumber  })
        });

        const data = await res.json();

        if (!res.ok) {
          this.warnings.idNumber = [data.error || 'This ID number does not exist.'];
          return;
        }

        if (!data.questions || !Array.isArray(data.questions)) {
          this.message = 'No security questions returned.';
          return;
        }

        // Populate questionList with returned questions
        this.questionList = data.questions.map(q => ({ choice: q, value: q }));
        this.userId = data.user_id || null;
        this.username = data.username || '';

        // Auto-select the three questions for the form so user doesn't need to pick
        this.form.question1 = data.questions[0] || '';
        this.form.question2 = data.questions[1] || '';
        this.form.question3 = data.questions[2] || '';
        this.questionsLoaded = true;
        this.message = '';
        this.step = 2;
      } catch (err) {
        console.error(err);
        this.warnings.idNumber = 'Network error while fetching questions.';
      }
    },
    resetQuestionsAndBack() {
      this.questionsLoaded = false;
      this.form.question1 = '';
      this.form.question2 = '';
      this.form.question3 = '';
      this.username = '';
      this.userId = null;
      this.step = 1;
    }
  }
};
