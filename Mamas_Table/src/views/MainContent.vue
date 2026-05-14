<script setup>
// You can add logic specific to your main content here
import { RouterView } from 'vue-router'

</script>

<template>
  <div class="main-block">
    <!-- <slot /> This allows RouterView or other content to sit here -->
    <RouterView />
     <!-- <Menu /> -->
  </div>
</template>

<style scoped>
.main-block {
  width: 100%;
  max-width: none;
  margin: 0 auto;
  padding: 1rem 0;
  text-align: center;

}

/* You can move your specific typography styles here */
h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

p {
  line-height: 1.8;
  color: #e0e0e0;
}
</style>