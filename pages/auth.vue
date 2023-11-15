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
          :class="[loginEmailClass, 'w-full px-2 py-1 rounded-md']"
          placeholder="Email"
        />
        <div v-if="loginEmailError" class="text-red-500">
          {{ loginEmailError }}
        </div>

        <input
          type="password"
          v-model="loginPassword"
          :class="[loginPasswordClass, 'w-full px-2 py-1 rounded-md']"
          placeholder="Password"
        />
        <div v-if="loginPasswordError" class="text-red-500">
          {{ loginPasswordError }}
        </div>

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
          :class="[emailClass, 'w-full px-2 py-1 rounded-md']"
          placeholder="Email"
        />
        <div v-if="emailError" class="text-red-500">{{ emailError }}</div>
        <input
          type="password"
          v-model="registerPassword"
          :class="[passwordClass, 'w-full px-2 py-1 rounded-md']"
          placeholder="Password"
        />
        <div v-if="passwordError" class="text-red-500">{{ passwordError }}</div>

        <input
          type="password"
          v-model="confirmPassword"
          :class="[confirmPasswordClass, 'w-full px-2 py-1 rounded-md']"
          placeholder="Confirm password"
        />
        <div v-if="confirmPasswordError" class="text-red-500">
          {{ confirmPasswordError }}
        </div>
        <div v-if="userCreated" class="text-[#F2FFE9]">
          {{ userCreated }}
        </div>

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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { auth } from "~/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const registerEmail = ref("");
const registerPassword = ref("");
const confirmPassword = ref("");
const emailClass = ref("border border-gray-300");
const emailError = ref("");
const passwordClass = ref("border border-gray-300");
const confirmPasswordClass = ref("border border-gray-300");
const passwordError = ref("");
const confirmPasswordError = ref("");
const userCreated = ref("");

const loginEmail = ref("");
const loginPassword = ref("");
const loginEmailClass = ref("border border-gray-300");
const loginPasswordClass = ref("border border-gray-300");
const loginEmailError = ref("");
const loginPasswordError = ref("");

const router = useRouter();

const login = async () => {
  // Nollaa virheet
  loginEmailError.value = "";
  loginEmailClass.value = "border border-gray-300";
  loginPasswordError.value = "";
  loginPasswordClass.value = "border border-gray-300";

  if (!loginEmail.value) {
    loginEmailError.value = "Please enter your email";
    loginEmailClass.value = "border border-red-500";
    return;
  }

  if (!loginPassword.value) {
    loginPasswordError.value = "Please enter your password";
    loginPasswordClass.value = "border border-red-500";
    return;
  }

  try {
    await signInWithEmailAndPassword(
      auth,
      loginEmail.value,
      loginPassword.value
    );
    // ...onnistunut kirjautuminen...
  } catch (error) {
    console.error("Error logging in: ", error);
    // Näytä yleinen virheviesti

    loginEmailClass.value = "border border-red-500";
    loginPasswordError.value = "Invalid login credentials";
    loginPasswordClass.value = "border border-red-500";
  }
};

const register = async () => {
  // Tyhjennä virheviestit ensin
  emailError.value = "";
  emailClass.value = "border border-gray-300";
  emailError.value = "";
  emailClass.value = "border border-gray-300";
  passwordError.value = "";
  passwordClass.value = "border border-gray-300";
  confirmPasswordError.value = "";
  confirmPasswordClass.value = "border border-gray-300";
  userCreated.value = "";

  if (!registerPassword.value) {
    passwordError.value = "Give a password";
    passwordClass.value = "border border-red-500";
    confirmPasswordClass.value = "border border-red-500";
    return;
  }

  if (!confirmPassword.value) {
    confirmPasswordError.value = "Please confirm password";
    confirmPasswordClass.value = "border border-red-500";
    return;
  }

  if (registerPassword.value !== confirmPassword.value) {
    passwordError.value = "Passwords do not match";
    confirmPasswordError.value = "Passwords do not match";
    passwordClass.value = "border border-red-500";
    confirmPasswordClass.value = "border border-red-500";
    return;
  }

  try {
    await createUserWithEmailAndPassword(
      auth,
      registerEmail.value,
      registerPassword.value
    );
    //rekisteröinti onnistuu
    loginEmailClass.value = "border border-w-5px border-[#F2FFE9]";
    loginPasswordClass.value = "border border-w-5px border-[#F2FFE9]";
    userCreated.value = "Account created";
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      emailError.value = "This email address is already in use";
      emailClass.value = "border border-red-500";
      return;
    } else {
      alert("Error creating an account: ");
    }
  }
};
</script>
