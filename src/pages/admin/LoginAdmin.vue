<template>
  <section class="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
    <h1 class="text-2xl font-bold mb-6 text-center">Connexion Admin</h1>

    <input v-model="email" type="email" placeholder="Email" class="w-full border p-2 rounded mb-4" />
    <input v-model="password" type="password" placeholder="Mot de passe" class="w-full border p-2 rounded mb-4" />

    <button @click="login" class="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
      Se connecter
    </button>

    <p v-if="errorMessage" class="text-red-500 mt-4 text-center">{{ errorMessage }}</p>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../../supabase/supabase'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const login = async () => {
  errorMessage.value = ''
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  if (error) {
    errorMessage.value = 'Email ou mot de passe incorrect'
    console.error(error)
  } else {
    router.push('/admin/commandes')
  }
}
</script>
