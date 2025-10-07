<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <p v-if="user">Welcome, {{ user.firstName }} {{ user.lastName }} ({{ user.username }})</p>
    <p v-else>Welcome!</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null
    }
  },
  created() {
    const savedSession = localStorage.getItem('sessionUser')
    if (savedSession) {
      try {
        this.user = JSON.parse(savedSession)
      } catch (_) {
        this.user = null
      }
    }
  }
}
</script>
