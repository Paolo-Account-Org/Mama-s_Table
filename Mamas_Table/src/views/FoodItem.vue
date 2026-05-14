<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

import kababayanImg from '../assets/Foods/Kababayan.jpg'
import embutidoImg from '../assets/Foods/Embutido.jpg'
import mamonImg from '../assets/Foods/Mamon.jpg'
import slicedBreadImg from '../assets/Foods/SlicedBread.jpg'

const foods = [
  {
    name: 'Kababayan',
    image: kababayanImg,
    description: 'Description of food item 1.',
  },
  {
    name: 'Embutido',
    image: embutidoImg,
    description: 'Description of food item 2.',
  },
  {
    name: 'Mamon',
    image: mamonImg,
    description: 'Description of food item 3.',
  },
  {
    name: 'Slice Bread',
    image: slicedBreadImg,
    description: 'Description of food item 4.',
  },
  {
    name: 'Food Item 5',
    description: 'Description of food item 5.',
  },
  {
    name: 'Food Item 6',
    description: 'Description of food item 6.',
  },
  {
    name: 'Food Item 7',
    description: 'Description of food item 7.',
  },
  {
    name: 'Food Item 8',
    description: 'Description of food item 8.',
  },
  {
    name: 'Food Item 9',
    description: 'Description of food item 9.',
  },
]

const activeFood = ref(null)

const openImage = (food) => {
  if (food.image) {
    activeFood.value = food
  }
}

const closeModal = () => {
  activeFood.value = null
}

const handleKeydown = (event) => {
  if (event.key === 'Escape' && activeFood.value) {
    closeModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="wrapper">
    <h1 id="Title">Food List</h1>

    <div class="food">
      <div v-for="food in foods" :key="food.name" class="food-item">
        <h2>{{ food.name }}</h2>

        <button
          v-if="food.image"
          class="image-button"
          type="button"
          @click="openImage(food)"
          :aria-label="`Open larger photo of ${food.name}`"
        >
          <img :src="food.image" :alt="food.name" class="food-image" />
        </button>

        <p>{{ food.description }}</p>
      </div>
    </div>

    <div
      v-if="activeFood"
      class="modal-overlay"
      @click.self="closeModal"
      role="dialog"
      aria-modal="true"
      :aria-label="`${activeFood.name} image preview`"
    >
      <div class="modal-content">
        <button class="close-button" type="button" @click="closeModal" aria-label="Close image preview">
          ×
        </button>
        <img :src="activeFood.image" :alt="activeFood.name" class="modal-image" />
      </div>
    </div>
  </div>
</template>

<style>
.food {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
}

.food-item {
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  color: #333;
}

.food-item h2 {
  margin-top: 0;
}

.food-item p {
  margin-bottom: 0;
}

.image-button {
  width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.food-image {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.image-button:hover .food-image,
.image-button:focus-visible .food-image {
  transform: scale(1.05);
}

.image-button:focus-visible {
  outline: 2px solid #333;
  outline-offset: 4px;
  border-radius: 8px;
}

.wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

#Title {
  text-align: center;
  margin-bottom: 40px;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
}

.modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
}

.modal-image {
  display: block;
  max-width: 90vw;
  max-height: 90vh;
  width: auto;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
}

.close-button {
  position: absolute;
  top: -14px;
  right: -14px;
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 999px;
  background: #fff;
  color: #222;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.3);
}

@media (max-width: 900px) {
  .food {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .food {
    grid-template-columns: 1fr;
  }

  .modal-overlay {
    padding: 16px;
  }

  .modal-image {
    max-width: 100%;
    max-height: 80vh;
  }
}
</style>