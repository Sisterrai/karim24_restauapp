<template>
  <nav class="bg-white shadow p-4 flex justify-between items-center">
    <div class="text-xl font-bold">KARIM 24</div>

    <!-- Liens desktop -->
    <div class="hidden md:flex items-center gap-6">
      <router-link to="/" class="hover:text-orange-500">Accueil</router-link>
      <router-link to="/menue" class="hover:text-orange-500">Menu</router-link>
      <router-link to="/a-propos" class="hover:text-orange-500">À propos</router-link>
      <router-link to="/commander" class="hover:text-orange-500 relative flex items-center">
        <ShoppingCartIcon class="w-6 h-6" />
        <span v-if="cart.totalItems > 0"
          class="absolute -top-2 -right-3 bg-orange-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
          {{ cart.totalItems }}
        </span>
      </router-link>
    </div>

    <button @click="open = !open" class="md:hidden text-gray-700">
      ☰
    </button>

    
    <div v-if="open" class="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col p-4 gap-4 md:hidden">
      <router-link @click="open=false" to="/" class="hover:text-orange-500">Accueil</router-link>
      <router-link @click="open=false" to="/menue" class="hover:text-orange-500">Menu</router-link>
      <router-link @click="open=false" to="/a-propos" class="hover:text-orange-500">À propos</router-link>
      <router-link @click="open=false" to="/commander" class="hover:text-orange-500 relative flex items-center">
        <ShoppingCartIcon class="w-6 h-6" />
        <span v-if="cart.totalItems > 0"
          class="absolute -top-2 -right-3 bg-orange-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
          {{ cart.totalItems }}
        </span>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/cart'
import { ShoppingCartIcon } from '@heroicons/vue/24/outline'

const cart = useCartStore()
const open = ref(false)
</script>
