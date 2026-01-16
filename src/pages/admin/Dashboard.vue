<template>
    <div class="flex">
        <Sidebar />

        <div class="flex-1 p-6">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-3xl font-bold">Dashboard Admin</h1>
                <button @click="logout" class="bg-orange-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    Déconnexion
                </button>
            </div>

            <router-view />
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { supabase } from '../../supabase/supabase'
import Sidebar from '../../components/Sidebar.vue'

const router = useRouter()

const logout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
}
</script>
