<template>
  <section class="max-w-6xl mx-auto px-6 my-16">
    <h2 class="text-3xl font-bold mb-8 text-center">Statistiques</h2>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
      <div class="bg-white p-6 rounded shadow">
        <h3 class="text-xl font-semibold mb-2">Commandes totales</h3>
        <p class="text-2xl font-bold">{{ totalOrders }}</p>
      </div>

      <div class="bg-white p-6 rounded shadow">
        <h3 class="text-xl font-semibold mb-2">Montant total</h3>
        <p class="text-2xl font-bold">{{ totalAmount }} FCFA</p>
      </div>

      <div class="bg-white p-6 rounded shadow">
        <h3 class="text-xl font-semibold mb-2">Plats vendus</h3>
        <p class="text-2xl font-bold">{{ totalDishes }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { supabase } from '../supabase/supabase'

const orders = ref([])

onMounted(async () => {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')

  if (error) {
    console.error(error)
    return
  }

  orders.value = data.map(o => ({
    ...o,
    items: o.order_items || []
  }))
})


const totalOrders = computed(() => orders.value.length)

const totalAmount = computed(() =>
  orders.value.reduce((sum, order) => sum + (order.total_amount || 0), 0)
)

const totalDishes = computed(() =>
  orders.value.reduce((sum, order) =>
    sum + order.items.reduce((s, i) => s + i.quantity, 0)
    , 0)
)
</script>
