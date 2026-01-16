<template>
  <section class="my-16 max-w-7xl mx-auto px-6">
    <h2 class="text-3xl font-bold mb-6 text-center">Notre Menu</h2>

    <div class="flex justify-center gap-4 mb-10 flex-wrap">
      <button class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        :class="{ 'bg-orange-500 text-white': selectedCategory === null }" @click="selectedCategory = null">
        Tous
      </button>

      <button v-for="cat in categories" :key="cat.id" class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        :class="{ 'bg-orange-500 text-white': selectedCategory === cat.id }" @click="selectedCategory = cat.id">
        {{ cat.name }}
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <DishCard v-for="dish in filteredDishes" :key="dish.id" :dish="dish" @add="addToCart" />
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../supabase/supabase'
import DishCard from '../components/DishCard.vue'
import { useCartStore } from '../stores/cart'

const cart = useCartStore()
const categories = ref([])
const dishes = ref([])
const selectedCategory = ref(null)


onMounted(async () => {
  const { data: catData, error: catError } = await supabase.from('categories').select('*')
  if (catError) console.error(catError)
  categories.value = catData || []

  
  const { data: dishData, error: dishError } = await supabase
    .from('dishes')
    .select('*')
    .eq('is_available', true)
  if (dishError) console.error(dishError)
  dishes.value = dishData || []
})


const filteredDishes = computed(() => {
  if (selectedCategory.value === null) return dishes.value 
  return dishes.value.filter(d => d.category_id === selectedCategory.value)
})


const addToCart = (dish) => {
  console.log('Plat ajouté :', dish.name)
  cart.add(dish)
}
</script>
