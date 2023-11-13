<template>
  <MainLayout />
  <div
    id="AuthPage"
    class="flex justify-center items-center h-screen space-x-4 bg-[#A6CF98]"
  >
    <!-- -->
    <div class="bg-white p-4 rounded-lg shadow-md max-w-xs w-full">
      <h2 class="text-lg font-semibold mb-4">Kirjaudu sisään</h2>
      <form @submit.prevent="login" class="space-y-2">
        <input
          type="email"
          v-model="loginEmail"
          placeholder="Sähköposti"
          class="w-full px-2 py-1 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          v-model="loginPassword"
          placeholder="Salasana"
          class="w-full px-2 py-1 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
        >
          Kirjaudu
        </button>
      </form>
    </div>

    <!-- Rekisteröintikortti -->
    <div class="bg-white p-4 rounded-lg shadow-md max-w-xs w-full">
      <h2 class="text-lg font-semibold mb-4">Luo käyttäjä</h2>
      <form @submit.prevent="register" class="space-y-2">
        <input
          type="email"
          v-model="registerEmail"
          placeholder="Sähköposti"
          class="w-full px-2 py-1 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          v-model="registerPassword"
          placeholder="Salasana"
          class="w-full px-2 py-1 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          v-model="confirmPassword"
          placeholder="Vahvista salasana"
          class="w-full px-2 py-1 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          class="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
        >
          Rekisteröidy
        </button>
      </form>
    </div>
    <!-- -->
  </div>
</template>

<script setup>
import MainLayout from "~/layouts/MainLayout.vue";

// const client = useFirebaseCLient();
// const user = useFirebaseUser();

// watchEffect(() => {
//   if (user.value) {
//     return navigateTo("/");
//   }
// });

// const login = async (prov) => {};
</script>
