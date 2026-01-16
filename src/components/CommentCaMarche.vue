<template>
  <section class="bg-white py-16">
    <div class="max-w-6xl mx-auto px-6">
      <h3 class="text-3xl font-bold text-center mb-12">
        Comment ça marche ?
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        <div v-for="step in steps" :key="step.titre">
          <component :is="step.icon" class="w-12 h-12 text-orange-500 mx-auto mb-4" />

          <h4 class="font-semibold text-xl mb-2">
            {{ step.titre }}
          </h4>
          <p class="text-gray-600">
            {{ step.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ShoppingCartIcon, CurrencyDollarIcon, TruckIcon } from '@heroicons/vue/24/outline'

const steps = [
  { icon: ShoppingCartIcon, titre: 'Choisissez', description: 'Parcourez le menu' },
  { icon: CurrencyDollarIcon, titre: 'Commandez', description: 'Ajoutez au panier' },
  { icon: TruckIcon, titre: 'Recevez', description: 'Sur place ou livraison' }
]
</script>