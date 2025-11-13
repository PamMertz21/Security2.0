export default {
  data(){
    return {
      warnings: {},
      consecutiveError: 0,
      page: 'login',
      username: '',
      password: '',
      lockoutActive: false,
      lockoutTimeRemaining: 0,
      lockoutTimer: null,
      showPassword: false,
    }
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
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    startLockout(seconds) {
      this.lockoutActive = true;
      this.lockoutTimeRemaining = seconds;

      this.lockoutTimer = setInterval(() => {
        this.lockoutTimeRemaining--;
        if (this.lockoutTimeRemaining <= 0) {
          clearInterval(this.lockoutTimer);
          this.lockoutActive = false;
        }
      }, 1000);
    },
    disableButton() {
      if (this.consecutiveError % 3 === 0) {
        let lockoutTime = 15; // first 3 errors
        if (this.consecutiveError === 6) lockoutTime = 30;
        else if (this.consecutiveError >= 9) lockoutTime = 60;
        this.startLockout(lockoutTime);
      }
},
    async login() {
      this.warnings = {};
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!username || !password) {
        this.warnings.general = ["Please enter both username and password."];
        return;
      }

      try {
        const response = await fetch("http://localhost/Security2.0/api/login.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({  username: this.username, password: this.password }),
        });

        const data = await response.json();
        console.log(data);

        if (!response.ok) {
          this.consecutiveError++;

          if (response.status === 404) {
            this.warnings.username = ["Username does not exist."];
          } else if (response.status === 401) {
            this.warnings.password = ["Incorrect password."];
          } else {
            this.warnings.general = [data.error || "Login failed."];
          }

          this.disableButton();

          return;
        }

        // success
        localStorage.setItem("user", JSON.stringify(data.user));
        this.$router.push('/dashboard');
        this.consecutiveError = 0;

      } catch (error) {
        console.error(error);
        this.warnings.general = ["Network or server error occurred."];
      }
    },
  }
}
