<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded shadow-md text-center max-w-md">
            <h1 class="text-2xl font-bold text-red-600 mb-4">
                Accès non autorisé
            </h1>

            <p class="text-gray-600 mb-6">
                Vous devez être connecté en tant qu’administrateur pour accéder à cette page.
            </p>

            <router-link to="/admin/login"
                class="inline-block bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition">
                Se connecter
            </router-link>
        </div>
    </div>
</template>
