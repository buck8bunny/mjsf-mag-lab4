<template>
  <div class="categories-container">
    <h1 class="categories-title">Categories (Composition API)</h1>
    <ul class="categories-list">
      <li v-for="category in categories" :key="category.id" class="category-item">
        {{ category.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { useServiceProvider } from '@/composables/useServiceProvider'; // Функція, яку ми створили

export default {
  setup() {
    const categories = ref([]);
    const { getCategoriesService } = useServiceProvider();

    onMounted(() => {
      const categoriesService = getCategoriesService();
      if (categoriesService && typeof categoriesService.get === 'function') {
        categoriesService.get({}) // Можна передати параметри за потреби
          .then((data) => {
            categories.value = data;
          })
          .catch((error) => {
            console.error('Failed to fetch categories:', error);
          });
      } else {
        console.error('CategoriesService is not available or get is not a function');
      }
    });

    return {
      categories
    };
  }
};
</script>

<style scoped>
.categories-container {
  max-width: 600px; /* Максимальна ширина контейнера */
  margin: 0 auto; /* Центрування контейнера */
  padding: 20px; /* Внутрішні відступи */
  background-color: #f9f9f9; /* Колір фону */
  border-radius: 8px; /* Закруглені кути */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Тінь для контейнера */
}

.categories-title {
  font-size: 24px; /* Розмір шрифту заголовка */
  margin-bottom: 15px; /* Відступи знизу */
  color: #333; /* Колір тексту заголовка */
  text-align: center; /* Вирівнювання заголовка по центру */
}

.categories-list {
  list-style: none; /* Вимкнення маркерів списку */
  padding: 0; /* Вимкнення відступів */
}

.category-item {
  padding: 10px; /* Внутрішні відступи для кожного пункту списку */
  margin: 5px 0; /* Відступи між пунктами списку */
  background-color: #fff; /* Колір фону для пунктів списку */
  border: 1px solid #ddd; /* Кордон для пунктів списку */
  border-radius: 4px; /* Закруглені кути для пунктів списку */
  transition: background-color 0.3s; /* Плавний перехід фону */
}

.category-item:hover {
  background-color: #e0f7fa; /* Колір фону при наведенні */
}
</style>
