<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import PropTypes from 'vue-types';

const isModalOpen = ref(false);
const phoneNumber = ref('639178048926'); // Replace with a dynamic value or prop

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleEscKey = (event) => {
  if (event.key === 'Escape' && isModalOpen.value) {
    closeModal();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleEscKey);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscKey);
});
</script>

<template>
  <div>
    <a
      :href="`https://wa.me/${phoneNumber}`"
      target="_blank"
      rel="noopener noreferrer"
      class="whatsapp-floating-button"
    >
      <img
        src="../assets/whatsapp-icon.png"
        alt="WhatsApp Icon"
        class="whatsapp-icon"
      />
    </a>
  </div>
</template>

<style scoped>
.whatsapp-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.whatsapp-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #25d366;
  font-weight: bold;
  margin-bottom: 1rem;
}

.whatsapp-icon {
  width: 24px;
  height: 24px;
  margin-right: 0.5rem;
  
}

.open-modal-button {
  background-color: #25d366;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.open-modal-button:hover {
  background-color: #1da851;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.whatsapp-floating-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: #25d366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  z-index: 1000;
  text-decoration: none;
}

.whatsapp-floating-button:hover {
  background-color: #1da851;
}

.whatsapp-icon {
  width: 24px;
  height: 24px;
}
</style>