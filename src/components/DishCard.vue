<template>
  <div class="bg-white rounded-xl shadow">
    <img :src="dish.image_url" class="h-40 w-full object-cover" />

    <div class="p-4">
      <h3 class="font-semibold">{{ dish.name }}</h3>

      <p v-if="dish.description" class="text-sm text-gray-500 mb-2">
        {{ dish.description }}
      </p>

      <div class="flex justify-between items-center">
        <span class="font-bold text-orange-500">
          {{ dish.price }} FCFA
        </span>

        <button @click="$emit('add', dish)" class="bg-orange-500 text-white px-3 py-1 rounded">
          Ajouter
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  dish: Object
})
</script>
