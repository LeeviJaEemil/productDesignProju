<template>
  <div
    id="MainLayout"
    class="justify-between w-full border-b-2 border-[#557C55]"
  >
    <div
      class="flex items-center text-xs font-light h-9 bg-[#F2FFE9] px-2 relative"
    >
      <button @click="showSearch = !showSearch" class="md:hidden">
        <Icon name="ph:magnifying-glass" size="15" />
      </button>

      <nuxt-link
        to="/"
        class="flex-grow flex items-center justify-center md:justify-start"
      >
        <img width="30" src="tonttu.png" alt="Logo" />
        <h1 class="static font-bold ml-2">Tontun paja</h1>
      </nuxt-link>

      <button @click="toggleMenu" class="md:hidden">
        <Icon name="mdi:menu" size="20" />
      </button>

      <div class="hidden md:flex ml-2 items-center space-x-4">
        <div class="flex">
          <div
            name="hakukenttä"
            class="render-fixed static w-[95%] mr-2 md:block hidden"
          >
            <div
              class="flex items-center border-2 bg-[#A6CF98] border-[#557C55] rounded-md"
            >
              <input
                v-model="searchItem"
                type="search"
                class="fw-full w-[500px] placeholder-[#557C55] bg-[#A6CF98] text-sm pl-3 focus:outline-none"
                placeholder="Search..."
              />
              <Icon
                v-if="isSearching"
                name="eos-icons:loading"
                size="15"
                class="mr-2"
              />

              <button
                class="flex items-center h-[100%] p-1.5 px-3 bg-[#557C55]"
              >
                <Icon name="ph:magnifying-glass" size="15" color="#fff" />
              </button>
            </div>

            <div class="absolute bg-white max-w-[550px] h-auto w-full">
              <div v-if="false" class="p-1">
                <nuxt-link
                  to="'/item/1'"
                  class="flex items-cener justify-between w-full cursor-pointer hover:bg-gray-100"
                >
                  <div class="flex items-center">
                    <img
                      class="rounded-md"
                      width="40"
                      src="https://picsum.photos/id82/300/320"
                    />
                    <div class="truncate ml-2">Testi</div>
                  </div>
                  <div class="truncate">100 €</div>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <nuxt-link
          to="/cart"
          class="flex items-center border-r-[1px] border-r-black px-1 hover:text-[#557C55]"
        >
          <Icon name="ph:shopping-cart-simple-light" class="mr-2" size="15" />
        </nuxt-link>
        <div
          @click="toggleAccouuntMenu"
          class="h-[30px] relative flex items-center hover:text-[#557C55] cursor-pointer"
        >
          <h1>Account</h1>
          <Icon name="ph:user-thin" size="17" class="ml-1" />
          <Icon name="mdi:chevron-down" size="17" />
          <ul
            id="AccountMenu"
            v-if="isAccountMenu"
            class="absolute right-0 mt-2 bg-[#F2FFE9] border-[2px] border-[#557C55] shadow-md w-40 py-2 top-[30px] text-[#333333]"
          >
            <nuxt-link
              to="/auth"
              v-if="!user"
              class="block px-4 py-1 hover:bg-[#A6CF98]"
              >Login</nuxt-link
            >
            <div
              @click="hanleLogout"
              v-if="user"
              class="block px-4 py-1 bg-[#FA7070] hover:bg-red-300"
            >
              Log out
            </div>
          </ul>
        </div>
      </div>

      <div
        v-if="isMenuOpen"
        class="absolute right-0 top-full mt-2 bg-[#F2FFE9] shadow-md w-40 py-2 md:hidden border-[2px] border-[#557C55]"
      >
        <!-- Valikon sisältö -->
        <nuxt-link to="/cart" class="block px-4 py-1 hover:bg-gray-100"
          ><Icon
            name="ph:shopping-cart-simple-light"
            class="mr-1"
            size="12"
          />Cart
        </nuxt-link>
        <nuxt-link
          to="/auth"
          v-if="!user"
          class="block px-4 py-1 hover:bg-[#A6CF98] border-t-[1px] border-b-[1px] border-[#557C55]"
          >Login</nuxt-link
        >
        <div
          @click="hanleLogout"
          v-if="user"
          class="block px-4 py-1 bg-[#FA7070] hover:bg-red-300"
        >
          Log out
        </div>
      </div>
    </div>

    <div v-if="showSearch" class="md:hidden w-full bg-[#F2FFE9] px-2 py-2">
      <div
        class="flex items-center border-2 bg-[#A6CF98] border-[#557C55] rounded-md"
      >
        <input
          v-model="searchItem"
          type="search"
          class="w-full placeholder-[#557C55] bg-[#A6CF98] text-sm pl-3 focus:outline-none"
          placeholder="Search..."
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onAuthStateChanged } from "firebase/auth";
import { ref } from "vue";
import { auth } from "@/firebaseConfig";
import { signOut } from "firebase/auth";

const user = ref(null);

onAuthStateChanged(auth, (firebaseUser) => {
  user.value = firebaseUser;
});

function hanleLogout() {
  signOut(auth)
    .then(() => {
      alert("logged out succesfully");
    })
    .catch((error) => {
      alert("Error while trying to sign out: ", error);
    });
}

let isMenuOpen = ref(false);
let showSearch = ref(false);
let isAccountMenu = ref(false);
let searchItem = ref("");
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
const toggleAccouuntMenu = () => {
  isAccountMenu.value = !isAccountMenu.value;
};
</script>
