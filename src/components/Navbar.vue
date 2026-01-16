<template>
  <nav class="bg-white shadow px-6 py-4">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      
      <div class="text-xl font-bold">KARIM 24</div>

      <button @click="menuOpen = !menuOpen"
              class="md:hidden text-gray-700 focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div :class="{'flex': menuOpen, 'hidden': !menuOpen}" 
           class="flex-col md:flex md:flex-row md:items-center md:gap-6 gap-4 absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow md:shadow-none p-4 md:p-0">
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
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/cart'
import { ShoppingCartIcon } from '@heroicons/vue/24/outline'

const cart = useCartStore()
const menuOpen = ref(false)
</script>
