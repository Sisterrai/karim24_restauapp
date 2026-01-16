<template>
    <div class="flex min-h-screen bg-gray-100">


        <section class="flex-1 px-6 py-10">
            <h1 class="text-3xl font-bold mb-8 text-center">
                Commandes
            </h1>

            <div v-if="orders.length === 0" class="text-center text-gray-500">
                Aucune commande pour le moment.
            </div>

            <table v-else class="w-full table-auto border-collapse border border-gray-300 bg-white">
                <thead>
                    <tr class="bg-gray-100">
                        <th class="border px-4 py-2">#</th>
                        <th class="border px-4 py-2">Nom client</th>
                        <th class="border px-4 py-2">Téléphone</th>
                        <th class="border px-4 py-2">Adresse</th>
                        <th class="border px-4 py-2">Type livraison</th>
                        <th class="border px-4 py-2">Repas</th>
                        <th class="border px-4 py-2">Total</th>
                        <th class="border px-4 py-2">Statut</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(order, index) in orders" :key="order.id">
                        <td class="border px-4 py-2">{{ index + 1 }}</td>
                        <td class="border px-4 py-2">{{ order.customer_name }}</td>
                        <td class="border px-4 py-2">{{ order.customer_phone }}</td>
                        <td class="border px-4 py-2">{{ order.customer_address }}</td>
                        <td class="border px-4 py-2">{{ order.delivery_type }}</td>

                       
                        <td class="border px-4 py-2">
                            <ul class="list-disc pl-4">
                                <li v-for="item in order.items" :key="item.id">
                                    {{ item.dish_name }} × {{ item.quantity }}
                                </li>
                            </ul>
                        </td>

                        <td class="border px-4 py-2">
                            {{ order.total_amount }} FCFA
                        </td>

                        <td class="border px-4 py-2">
                            <select v-model="order.status" @change="updateStatus(order)" class="border p-1 rounded">
                                <option value="pending">En attente</option>
                                <option value="confirmed">Confirmée</option>
                                <option value="cancelled">Annulée</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../../supabase/supabase'
import Sidebar from '../../components/Sidebar.vue'

const orders = ref([])

onMounted(async () => {
    const { data, error } = await supabase
        .from('orders')
        .select(`
      *,
      order_items(*)
    `)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Erreur fetch commandes :', error)
        return
    }

    orders.value = data.map(o => ({
        ...o,
        items: o.order_items || []
    }))
})

const updateStatus = async (order) => {
    try {
        const { error } = await supabase
            .from('orders')
            .update({ status: order.status })
            .eq('id', order.id)

        if (error) throw error

       
        const index = orders.value.findIndex(o => o.id === order.id)
        if (index !== -1) orders.value[index] = { ...order }

        alert(`Statut de la commande ${order.customer_name} mis à jour !`)
    } catch (err) {
        console.error(err)
        alert("Erreur lors de la mise à jour du statut")
    }
}
</script>
