<template>
    <form @submit.prevent="submitReset">
      <h1 v-if="step === 1 || step === 2">Forgot Password</h1>
      <h1 v-if="step === 3">Change Password</h1>

      <div class="steps">
        <div class="step-indicator">
          <div
            v-for="(stepInfo, index) in steps"
            :key="stepInfo.id"
            class="step-item"
            :class="{
              'active': step === stepInfo.id,
              'completed': isStepCompleted(stepInfo.id)
            }"
          >
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-label">{{ stepInfo.label }}</div>
          </div>
        </div>
      </div>
      <div class="form-content" v-if="step === 1">
        <div class="header">
          <h3>Account Detail</h3>
        </div>
        <hr>
        <div class="registration-box">
          <div class="form-group">
            <div class="form-group">
              <input type="text" v-model="idNumber" id="idNumber" name="idNumber" @input="validateIdNumber">
              <label for="idNumber">ID Number: <span>*</span></label>
              <div class="field-error" v-if="warnings.idNumber && warnings.idNumber.length">
                <div class="error-message">{{ warnings.idNumber[0] }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="form-content" v-if="step === 2">
        <div class="account-info" v-if="username && userId">
          <p><strong>Username:</strong> {{ username }}</p>
          <p><strong>ID:</strong> {{ userId }}</p>
        </div>
        <div class="header">
          <h3>Authentication Questions</h3>
        </div>
        <hr>
        <div class="field-error" v-if="warnings.server && warnings.server.length">
          <div class="error-message">{{ warnings.server[0] }}</div>
        </div>
        <div class="registration-box">
          <div class="form-group">
            <div class="form-group">
              <input type="text" id="answer1" v-model="form.answer1" required @input="validateAnswer">
              <label for="answer1" class="question-label">Answer 1: <span>*</span></label>
              <div class="field-error" v-if="warnings.answer1 && warnings.answer1.length">
                <div class="error-message">{{ warnings.answer1[0] }}</div>
              </div>
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
              <div class="field-error" v-if="warnings.answer2 && warnings.answer2.length">
                <div class="error-message">{{ warnings.answer2[0] }}</div>
              </div>
            </div>

            <div class="form-group">
              <input type="text" id="question2" v-model="form.question2" disabled class="question-display" />
              <label for="question2" class="question-label">Question 2: <span>*</span></label>
            </div>
          </div>
            <div class="form-group">
              <div class="form-group">
                <input type="text" id="answer3" v-model="form.answer3" required @input="validateAnswer">
                <label for="answer3" class="question-label">Answer 3: <span>*</span></label>
                <div class="field-error" v-if="warnings.answer3 && warnings.answer3.length">
                  <div class="error-message">{{ warnings.answer3[0] }}</div>
                </div>
              </div>

              <div class="form-group">
                <input type="text" id="question3" v-model="form.question3" disabled class="question-display" />
                <label for="question3" class="question-label">Question 3: <span>*</span></label>
              </div>
            </div>
        </div>
      </div>

      <div class="form-content" v-if="step === 3">
        <div class="account-info" v-if="username && userId">
          <p><strong>Username:</strong> {{ username }}</p>
          <p><strong>ID:</strong> {{ userId }}</p>
        </div>
        <hr>
        <ChangePassword :id-number="idNumber" ref="changePasswordComponent"/>
      </div>

      <div class="btn-container" v-if="step === 1">
        <button type="button" @click="$router.push('/login')" class="btn">Back</button>
        <button type="button"
          @click="() => { if (validateRequiredFields() && validateIdNumber()) fetchQuestions(); }"
          class="btn"
          :disabled="!isIdValid">
          Next
        </button>
      </div>

      <div class="btn-container" v-if="step === 2">
        <button type="button" @click="resetQuestionsAndBack" class="btn">Back</button>
        <button type="submit"
          @click="goToStep3"
          class="btn"
          :disabled="!isStep2Valid || isStep2Loading"
        >
          Next
        </button>
      </div>

      <div class="btn-container" v-if="step === 3">
        <button type="button" @click="step = 2" class="btn">Back</button>
        <button type="button" @click="handleChangePassword" class="btn" :disabled="!isChangePasswordValid">Change Password</button>
      </div>
    </form>
</template>

<script>
import forgotPasswordLogic from '../assets/JS/forgotpassword.js';

export default forgotPasswordLogic;
</script>

<style src="../assets/CSS/forgot_password.css" scoped></style>
