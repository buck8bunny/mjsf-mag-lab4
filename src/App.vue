<template>
  <div id="app">
    <CategoriesOptions />
    <CategoriesComposition />
    <TooltipTest /> <!-- Добавлен компонент TooltipTest -->
  </div>
</template>

<script>
import CategoriesOptions from './components/CategoriesOptions.vue';
import CategoriesComposition from './components/CategoriesComposition.vue';
import TooltipTest from './components/TooltipTest.vue'; // Импортируем компонент TooltipTest

export default {
  components: {
    CategoriesOptions,
    CategoriesComposition,
    TooltipTest // Добавляем TooltipTest в список компонентов
  }
};
</script>


