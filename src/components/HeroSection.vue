<template>
  <section class="relative h-[70vh]">
    <img src="../assets/images/accueil_restaurant.jpg" alt="Accueil" class="w-full h-full object-cover"/>
   
    <div class="absolute inset-0 bg-black opacity-80 flex flex-col justify-center items-center text-center px-6">
      <h2 class="text-white text-4xl md:text-5xl font-bold mb-4">
        Des plats savoureux, livrés avec amour
      </h2>
      <p class="text-gray-200 text-lg mb-6 max-w-xl">
        Découvrez notre menu varié et commandez facilement en ligne.
      </p>
      <router-link to="/menu" class="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition" >
        Voir le menu
      </router-link>
    </div>
  </section>
</template>
