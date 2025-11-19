<template>
  <div class="not-found">
    <h1>Error 404</h1>
    <p>The page you’re looking for doesn’t exist or may have been moved.</p>
    <router-link to="/">
      <button class="cta-btn">Back to Home</button>
    </router-link>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  min-width: 40rem;
  min-height: 14rem;
  padding-top: 1rem;
}

.not-found h1 {
  margin: 0;
  font-size: 3rem;
  color: #000000;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.not-found p {
  color: #333333;
  font-size: 1.1rem;
  margin: 1rem 0 2rem;
}

.cta-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 999px;
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: 600;
  background-color: #625b71;
  color: #ffffff;
  cursor: pointer;
}

.cta-btn:hover {
  opacity: 0.9;
}
</style>

