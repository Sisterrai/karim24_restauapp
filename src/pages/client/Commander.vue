<template>
    <Navbar />

    <section class="max-w-4xl mx-auto px-6 my-16">
        <h1 class="text-3xl font-bold mb-8 text-center">
            Votre commande
        </h1>

        <p v-if="cart.items.length === 0" class="text-center text-gray-500">
            Votre panier est vide <br>
            <router-link to="/" class="text-orange-500">Accueil</router-link>
        </p>

        <div v-else class="space-y-4">
            <div v-for="item in cart.items" :key="item.id"
                class="flex justify-between items-center bg-white p-4 rounded shadow">
                <div>
                    <h3 class="font-semibold">{{ item.name }}</h3>
                    <p class="text-sm text-gray-500">
                        {{ item.price }} FCFA × {{ item.qty }}
                    </p>
                </div>

                <div class="flex items-center gap-4">
                    <span class="font-bold">
                        {{ item.price * item.qty }} FCFA
                    </span>

                    <button @click="cart.remove(item.id)" class="text-red-500 text-sm">
                        Supprimer
                    </button>
                </div>
            </div>

            
            <div class="text-right font-bold text-xl mt-6">
                Total : {{ cart.totalPrice }} FCFA
            </div>


            <div class="bg-white p-6 rounded shadow space-y-4 mt-6">
                <h2 class="text-2xl font-semibold mb-4">Vos informations</h2>

                <input v-model="customer_name" type="text" placeholder="Nom complet"
                    class="w-full border p-2 rounded" />
                <input v-model="customer_phone" type="text" placeholder="Téléphone" class="w-full border p-2 rounded" />
                <textarea v-model="customer_address" placeholder="Adresse" class="w-full border p-2 rounded"></textarea>

                <select v-model="delivery_type" class="w-full border p-2 rounded">
                    <option value="livraison">Livraison</option>
                    <option value="sur_place">Sur place</option>
                    <option value="a_emporter">À emporter</option>
                </select>
            </div>


            <div class="text-right mt-4">
                <button @click="passerCommande" class="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">
                    Passer la commande
                </button>
            </div>
        </div>
    </section>

    <Footer />
</template>


<script setup>
import Footer from '../../components/Footer.vue'
import Navbar from '../../components/Navbar.vue'
import { useCartStore } from '../../stores/cart'
import { supabase } from '../../supabase/supabase'


const cart = useCartStore()


let customer_name = ''
let customer_phone = ''
let customer_address = ''
let delivery_type = 'livraison'


async function sendTelegramNotification(message) {
    const token = "7728127990:AAEwxfRl6hC0G6pjN40yStLjOMvKCsN2LR4";  
    const chatId = "6901816397"; 
    const text = encodeURIComponent(message);

    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${text}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log("Notification Telegram envoyée :", data);
    } catch (err) {
        console.error("Erreur en envoyant la notification Telegram :", err);
    }
}

const passerCommande = async () => {
    if (cart.items.length === 0) {
        alert("Votre panier est vide !")
        return
    }

    if (!customer_name || !customer_phone) {
        alert("Veuillez renseigner votre nom et téléphone")
        return
    }

    try {

        const orderNumber = 'CMD-' + Date.now()

        
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert([{
                order_number: orderNumber,
                customer_name,
                customer_phone,
                customer_address,
                delivery_type,
                total_amount: cart.totalPrice,
                status: 'pending'
            }])
            .select() 

        if (orderError) throw orderError

        const orderId = order[0].id

        const itemsToInsert = cart.items.map(item => ({
            order_id: orderId,
            dish_id: item.id,
            dish_name: item.name,
            quantity: item.qty,
            unit_price: item.price,
            subtotal: item.price * item.qty
        }))

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(itemsToInsert)

        if (itemsError) throw itemsError

        const message = `
            Nouvelle commande reçue !
            Nom : ${customer_name}
            Téléphone : ${customer_phone}
            Adresse : ${customer_address}
            Livraison : ${delivery_type}
            Total : ${cart.totalPrice} FCFA
            Plats :
            ${cart.items.map(i => `- ${i.name} × ${i.qty} = ${i.price * i.qty} FCFA`).join('\n')}
                `

        
        await sendTelegramNotification(message)

       
        cart.clear()
        customer_name = ''
        customer_phone = ''
        customer_address = ''
        delivery_type = 'livraison'

        alert("Commande passée avec succès !")

    } catch (error) {
        console.error(error)
        alert("Erreur lors de l'envoi de la commande")
    }
}
</script>
