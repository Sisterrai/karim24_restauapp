<template>
    <aside class="w-64 h-screen bg-gray-800 text-white p-4">
        <h1 class="text-2xl font-bold mb-8">Admin</h1>

        <nav class="flex flex-col gap-3">
            <router-link to="/admin/commandes" class="px-4 py-2 rounded hover:bg-gray-700"
                active-class="bg-orange-500 text-white">
                Commandes
            </router-link>

            <router-link to="/admin/menu" class="px-4 py-2 rounded hover:bg-gray-700"
                active-class="bg-orange-500 text-white">
                Menu
            </router-link>

            <router-link to="/admin/dashboardstats" class="px-4 py-2 rounded hover:bg-gray-700"
                active-class="bg-orange-500 text-white">
                Statistiques
            </router-link>
        </nav>
    </aside>
</template>

<script setup>
</script>
