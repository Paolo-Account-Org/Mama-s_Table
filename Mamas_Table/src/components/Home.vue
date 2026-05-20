<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const todayDate = new Date() 
const today = todayDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
const dayOfWeek = todayDate.toLocaleDateString('en-US', { weekday: 'long' })
const samePrice = 'LYD 12'

const imagePool = [
  new URL('../assets/Foods/Embutido.jpg', import.meta.url).href,
  new URL('../assets/Foods/Kababayan.jpg', import.meta.url).href,
  new URL('../assets/Foods/Kababayan (2).jpg', import.meta.url).href,
  new URL('../assets/Foods/Mamon.jpg', import.meta.url).href,
  new URL('../assets/Foods/SlicedBread.jpg', import.meta.url).href
]

const dailyMenu = {
  Monday: [
    {
      options: 'A',
      name: 'Beef Giniling with Cucumber and Potatoes',
      description: 'Flavorful beef giniling with fresh and crisp cucumber slices.',
      side: 'Big Potatoes'
    },
    {
      options: 'B',
      name: 'Beef Giniling with Cucumber and Rice',
      description: 'Flavorful beef giniling with fresh and crisp cucumber slices.',
      side: 'Steamed Rice'
    },
    {
      options: 'C',
      name: 'Beef Giniling and Steamed Rice',
      description: 'Flavorful beef giniling with fresh and crisp cucumber slices.',
      side: 'Steamed Rice'
    }
  ],
  Tuesday: [
    { name: 'Kare-Kare' },
    { name: 'Pancit Canton' },
    { name: 'Laing' }
  ],
  Wednesday: [
    { name: 'Menudo' },
    { name: 'Pinakbet' },
    { name: 'Bistek Tagalog' }
  ],
  Thursday: [
    { name: 'Bulalo' },
    { name: 'Ginataang Hipon' },
    { name: 'Pork Sinigang' }
  ],
  Friday: [
    { name: 'Laing' },
    { name: 'Pancit Malabon' },
    { name: 'Chicken Inasal' }
  ]
}

const todaysOptions = computed(() =>
  (dailyMenu[dayOfWeek] ?? []).map((option, index) => ({
    ...option,
    image: imagePool[index % imagePool.length]
  }))
)

const isModalOpen = ref(false)
const selectedImage = ref('')
const selectedImageAlt = ref('')
const modalDialogRef = ref(null)

const openImageModal = async (image, alt) => {
  selectedImage.value = image
  selectedImageAlt.value = alt
  isModalOpen.value = true
  await nextTick()
  modalDialogRef.value?.focus()
}

const closeImageModal = () => {
  isModalOpen.value = false
  selectedImage.value = ''
  selectedImageAlt.value = ''
}

const handleEscKey = (event) => {
  if (event.key === 'Escape' && isModalOpen.value) {
    closeImageModal()
  }
}

const handleBackdropClick = (event) => {
  if (event.target === event.currentTarget && isModalOpen.value) {
    closeImageModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleEscKey)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscKey)
})
</script>


<template>
  <div class="wrapper">
    <p class="date">{{ today }}</p>
    <p class="menu-title">Menu for Today</p>
    <div v-if="todaysOptions.length" class="Menu-Wrapper">
      <div v-for="option in todaysOptions" :key="option.name" class="menu-option-wrapper">
        <button
          type="button"
          class="image-button"
          :aria-label="`Open full image of ${option.name}`"
          @click="openImageModal(option.image, option.name)"
        >
          <img :src="option.image" :alt="`Photo of ${option.name}`" class="menu-image" />
        </button>
        <p class="menu-options">Options: {{ option.options }}</p>
        <p class="menu-item">{{ option.name }}</p>
        <p v-if="option.description" class="menu-description">{{ option.description }}</p>
        <p v-if="option.side" class="menu-side">Side: {{ option.side }}</p>
        <p class="price">Price: {{ samePrice }}</p>
      </div>
    </div>
    <div v-else class="Menu-Wrapper">
      <p class="menu-item">No menu available for today.</p>
    </div>

    <div
      v-if="isModalOpen"
      class="image-modal-overlay"
      role="presentation"
      @click="handleBackdropClick"
    >
      <div
        ref="modalDialogRef"
        class="image-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Full size food image"
        tabindex="-1"
      >
        <button type="button" class="modal-close" aria-label="Close image modal" @click="closeImageModal">
          ×
        </button>
        <img :src="selectedImage" :alt="`Full image of ${selectedImageAlt}`" class="modal-image" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ===== Wrapper Container ===== */
.wrapper {
  text-align: center;
  padding: 2rem;
  max-width: 980px;
  margin: 0 auto;
}
p.date {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #222;
  background-color: #f0f0f0;
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 8px;
}
p.menu-options {
  font-size: 0.95rem;
  color: #555;
  margin-top: 0.3rem;
  font-weight: 500;
}

/* ===== Date and Title ===== */
p.date {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #222;
  background-color: #f0f0f0;
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 8px;
}

.menu-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #333;
  display: inline-block;
  background-color: #f0f0f0;
  
  padding: 0.5rem 1rem;
  border-radius: 8px;
}

/* ===== Menu Grid Container ===== */
.Menu-Wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  background-color: #f8f8f8;
  padding: 2rem;
  border-radius: 8px;
  /* color: #333; */
}

/* ===== Individual Menu Option Card ===== */
.menu-option-wrapper {
  background: #fff;
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  padding: 1rem;
  text-align: left;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease;
}

.menu-option-wrapper:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* ===== Image Button and Image ===== */
.image-button {
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  width: 100%;
  border-radius: 8px;
}

.image-button:focus-visible {
  outline: 3px solid #3b82f6;
  outline-offset: 3px;
}

.menu-image {
  width: 100%;
  height: 170px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.2s ease;
}

.image-button:hover .menu-image {
  transform: scale(1.05);
}

/* ===== Menu Text Content ===== */
.menu-item {
  font-size: 1.2rem;
  margin-top: 1rem;
  font-weight: 500;
  color: #222;
}

.menu-description {
  font-size: 0.95rem;
  color: #444;
  margin-top: 0.3rem;
  line-height: 1.4;
}

.menu-side {
  font-size: 0.95rem;
  color: #555;
  margin-top: 0.3rem;
  font-weight: 500;
}

.price {
  font-size: 1rem;
  color: #2d5f2e;
  margin-top: 0.6rem;
  font-weight: 600;
}

/* ===== Modal Overlay ===== */
.image-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: grid;
  place-items: center;
  padding: 1rem;
  z-index: 999;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* ===== Modal Dialog ===== */
.image-modal {
  position: relative;
  width: min(900px, 96vw);
  max-height: 92vh;
  background: #fff;
  border-radius: 10px;
  padding: 2.6rem 1rem 1rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* ===== Modal Close Button ===== */
.modal-close {
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  border: none;
  background: #111;
  color: #fff;
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.modal-close:hover {
  background: #333;
}

.modal-close:active {
  background: #000;
}

.modal-close:focus-visible {
  outline: 3px solid #3b82f6;
  outline-offset: 2px;
}

/* ===== Full Size Image in Modal ===== */
.modal-image {
  width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 8px;
}

/* ===== Responsive Design ===== */
@media (min-width: 1024px) {
  .wrapper {
    text-align: left;
  }
}

@media (max-width: 640px) {
  .wrapper {
    padding: 1rem;
  }

  .Menu-Wrapper {
    grid-template-columns: 1fr;
  }

  .Menu-Wrapper {
    padding: 1rem;
    gap: 0.8rem;
  }

  .menu-option-wrapper {
    width: 100%;
  }

  .menu-image {
    height: 150px;
  }

  .image-modal {
    padding: 2.2rem 0.8rem 0.8rem;
  }
}
</style>
