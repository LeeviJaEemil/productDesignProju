<template>
  <MainLayout />
  <div
    id="AuthPage"
    class="flex flex-col md:flex-row justify-center items-center h-screen bg-gray-100 space-x-0 md:space-x-4 space-y-4 md:space-y-0"
  >
    <!-- -->
    <div class="bg-[#A6CF98] p-4 rounded-lg shadow-md max-w-xs w-full">
      <h2 class="text-lg font-semibold mb-4">Log in</h2>
      <form @submit.prevent="login" class="space-y-2">
        <input
          type="email"
          v-model="loginEmail"
          placeholder="Email"
          class="w-full px-2 py-1 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          v-model="loginPassword"
          placeholder="Password"
          class="w-full px-2 py-1 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          class="w-full bg-[#557C55] hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
        >
          Log in
        </button>
      </form>
    </div>

    <!-- Rekisteröintikortti -->
    <div class="bg-[#A6CF98] p-4 rounded-lg shadow-md max-w-xs w-full">
      <h2 class="text-lg font-semibold mb-4">Create account</h2>
      <form @submit.prevent="register" class="space-y-2">
        <input
          type="email"
          v-model="registerEmail"
          placeholder="Email"
          class="w-full px-2 py-1 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          v-model="registerPassword"
          placeholder="Password"
          class="w-full px-2 py-1 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          v-model="confirmPassword"
          placeholder="Confirm password"
          class="w-full px-2 py-1 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          class="w-full bg-[#557C55] hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
        >
          Create account
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
