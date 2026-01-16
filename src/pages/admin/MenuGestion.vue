<template>

    <section class="max-w-6xl mx-auto px-6 my-16">
        <h1 class="text-3xl font-bold mb-6 text-center">Gestion du Menu</h1>

        <div class="bg-white p-6 rounded shadow mb-6">
            <h2 class="text-xl font-semibold mb-4">{{ editMode ? "Modifier le plat" : "Ajouter un plat" }}</h2>

            <input v-model="form.name" type="text" placeholder="Nom du plat" class="w-full border p-2 rounded mb-2" />
            <input v-model.number="form.price" type="number" placeholder="Prix"
                class="w-full border p-2 rounded mb-2" />
            <input v-model="form.image_url" type="text" placeholder="URL image"
                class="w-full border p-2 rounded mb-2" />
            <textarea v-model="form.description" placeholder="Description"
                class="w-full border p-2 rounded mb-2"></textarea>
            <select v-model="form.category_id" class="w-full border p-2 rounded mb-2">
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
            </select>
            <label class="flex items-center gap-2 mb-2">
                <input type="checkbox" v-model="form.is_available" />
                Disponible
            </label>

            <button @click="submitForm" class="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                {{ editMode ? "Modifier" : "Ajouter" }}
            </button>
            <button v-if="editMode" @click="resetForm" class="ml-2 px-4 py-2 border rounded">Annuler</button>
        </div>

       
        <table class="w-full table-auto border-collapse border border-gray-300">
            <thead>
                <tr class="bg-gray-100">
                    <th class="border px-4 py-2">Nom</th>
                    <th class="border px-4 py-2">Prix</th>
                    <th class="border px-4 py-2">Catégorie</th>
                    <th class="border px-4 py-2">Disponible</th>
                    <th class="border px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="dish in dishes" :key="dish.id">
                    <td class="border px-4 py-2">{{ dish.name }}</td>
                    <td class="border px-4 py-2">{{ dish.price }} FCFA</td>
                    <td class="border px-4 py-2">{{ getCategoryName(dish.category_id) }}</td>
                    <td class="border px-4 py-2">{{ dish.is_available ? "Oui" : "Non" }}</td>
                    <td class="border px-4 py-2 flex gap-2">
                        <button @click="editDish(dish)"
                            class="px-2 py-1 bg-blue-500 text-white rounded">Modifier</button>
                        <button @click="deleteDish(dish.id)"
                            class="px-2 py-1 bg-red-500 text-white rounded">Supprimer</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../../supabase/supabase'
import Sidebar from '../../components/Sidebar.vue'

const dishes = ref([])
const categories = ref([])

const form = ref({
    id: null,
    name: '',
    price: 0,
    image_url: '',
    description: '',
    category_id: null,
    is_available: true
})

const editMode = ref(false)

const fetchData = async () => {
    const { data: catData } = await supabase.from('categories').select('*')
    categories.value = catData || []

    const { data: dishData } = await supabase.from('dishes').select('*')
    dishes.value = dishData || []
}

onMounted(fetchData)

//crud
const submitForm = async () => {
    try {
        if (!form.value.name || !form.value.price) {
            alert("Nom et prix obligatoires")
            return
        }

        if (editMode.value) {
            // Modifier
            const { error } = await supabase.from('dishes').update({
                name: form.value.name,
                price: form.value.price,
                description: form.value.description,
                image_url: form.value.image_url,
                category_id: form.value.category_id,
                is_available: form.value.is_available
            }).eq('id', form.value.id)
            if (error) throw error
            alert("Plat modifié avec succès")
        } else {
            // Ajouter
            const { error } = await supabase.from('dishes').insert([{
                name: form.value.name,
                price: form.value.price,
                description: form.value.description,
                image_url: form.value.image_url,
                category_id: form.value.category_id,
                is_available: form.value.is_available
            }])
            if (error) throw error
            alert("Plat ajouté avec succès")
        }

        resetForm()
        fetchData()
    } catch (err) {
        console.error(err)
        alert("Erreur lors de l'envoi du formulaire")
    }
}

const editDish = (dish) => {
    form.value = { ...dish }
    editMode.value = true
}

const resetForm = () => {
    form.value = { id: null, name: '', price: 0, image_url: '', description: '', category_id: null, is_available: true }
    editMode.value = false
}

const deleteDish = async (id) => {
    if (!confirm("Voulez-vous vraiment supprimer ce plat ?")) return
    const { error } = await supabase.from('dishes').delete().eq('id', id)
    if (error) {
        console.error(error)
        alert("Erreur lors de la suppression")
        return
    }
    alert("Plat supprimé")
    fetchData()
}

const getCategoryName = (id) => {
    const cat = categories.value.find(c => c.id === id)
    return cat ? cat.name : "—"
}
</script>