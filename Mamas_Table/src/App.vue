<template>
  <div class="app-container">
    <header class="top-header">
      <div class="header-content">
        <img class="logo" alt="Mama's Table Logo" src='/img/Logo.png' />
        <nav class="top-nav">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/food-list">Food List</RouterLink>
          <RouterLink to="/review">Review</RouterLink>
          
        </nav>
      </div>
      <hr class="header-divider" />
    </header>

    <div class="layout-body">
      <!-- Sidebar stays on the left -->
      <!-- <aside class="sidebar-wrapper">
        <SideBar />
      </aside> -->

      <!-- MainContent wraps the router content -->
      <main class="content-wrapper">
        <MainContent>
          <RouterView />
           <!-- <Menu /> -->
        </MainContent>
      </main>

        <!-- WhatsApp component can be placed here or inside MainContent based on design preference -->
        <Whatsapp />
    </div>


    <footer class="footer">
      <p>&copy; 2026 Mama's Table. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SideBar from './views/SideBar.vue';
import MainContent from './views/MainContent.vue'; // Import your new component
import Whatsapp from './components/Whatsapp.vue'; // Import the WhatsApp component

</script>


<style scoped>
footer {
  text-align: center;
  padding: 1rem 0;
  background-color: #333;
  color: #fff;
  margin-top: auto;
}

.app-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
 
}

.top-header {
  width: 100%;
  padding-top: 2rem;
}

.header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.logo {
  width: 100px;
  height: auto;
}

.top-nav {
  display: flex;
  gap: 2.5rem;
}

.top-nav a {
  color: #42b883;
  text-decoration: none;
  font-weight: 600;
}

.header-divider {
  border: 0;
  border-top: 1px solid #333;
  width: 100%;
  margin-top: 1.5rem;
}

/* Layout centering */
.layout-body {
  display: flex;
  width: 100%;
  margin: 0 auto;
  padding-top: 3rem;
  gap: 2rem;
  align-items: flex-start;
}

.content-wrapper {
  flex-grow: 1;
  width: 100%;
  align-items: flex-start;
  padding-left: 0;
  border-left: none;
}

.sidebar-wrapper {
  width: 260px;
  flex-shrink: 0;
  padding-right: 2rem;
}



@media (max-width: 1024px) {
  .layout-body {
    flex-direction: column;
    width: 100%;
  }
  .sidebar-wrapper {
    width: 100%;
    padding-right: 0;
    margin-bottom: 2rem;
  }
  .content-wrapper {
    padding-left: 0;
    border-left: none;
  }
}
</style>