<template>
  <section class="max-w-7xl mx-auto px-6 py-16">
    <h3 class="text-3xl font-bold text-center mb-12">
      Nos plats populaires
    </h3>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      <div v-for="plat in plats" :key="plat.id"
        class="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
        <img :src="plat.image" class="h-48 w-full object-cover" />

        <div class="p-5">
          <h4 class="text-xl font-semibold mb-2">
            {{ plat.nom }}
          </h4>
          <p class="text-gray-500 mb-4">
            {{ plat.description }}
          </p>

          <div class="flex justify-between items-center">
            <span class="text-orange-600 font-bold">
              {{ plat.prix }} FCFA
            </span>
            <button class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded">
              Commander
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const plats = [
  {
    id: 1,
    nom: 'Sauce légumes',
    description: 'Pâte blanche, pâte noire ou riz',
    prix: 7000,
    image: 'https://images.unsplash.com/photo-1604908177522'
  },
  {
    id: 2,
    nom: 'Pizza Quatre saisons',
    description: 'Fromage, jambon, légumes',
    prix: 6500,
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe'
  },
  {
    id: 3,
    nom: 'Spaghetti bolognaise',
    description: 'Sauce tomate et viande',
    prix: 5000,
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0'
  }
]
</script>