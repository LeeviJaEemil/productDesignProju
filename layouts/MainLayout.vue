<template>
  <div
    id="MainLayout"
    class="justify- text-center bg-[#F2FFE9] border-b-2 border-[#557C55]"
  >
    <!--konenäkymä-->
    <div
      id="descview"
      class="hidden md:flex items-row text-xs font-light h-9 px-2 relative"
    >
      <nuxt-link
        to="/"
        class="flex-grow flex items-center justify-center md:justify-start"
      >
        <img
          width="30"
          src="https://firebasestorage.googleapis.com/v0/b/productdesignproju.appspot.com/o/otherimages%2Ftonttu.png?alt=media&token=880f19e7-3451-4f05-ac31-92e8de2c1c1d"
          alt="no img"
        />
        <h1 class="static font-bold ml-2">Tontun paja</h1>
      </nuxt-link>
      <div class="flex ml-2 items-center space-x-4">
        <div class="flex">
          <div
            name="hakukenttä"
            class="render-fixed static w-[95%] md:block hidden"
          >
            <div
              class="flex items-center border-2 bg-[#A6CF98] border-[#557C55] rounded-md"
            >
              <input
                v-model="searchItem"
                @input="searchProducts"
                class="fw-full w-[500px] placeholder-[#557C55] bg-[#A6CF98] text-sm pl-3 focus:outline-none"
                type="search"
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

            <div
              v-if="searchResults.length > 0"
              class="mt-1 absolute border-2 border-[#557C55] bg-[#F2FFE9] max-w-[515px] h-auto w-full"
            >
              <nuxt-link
                :to="'/item/' + product.id"
                v-for="product in searchResults"
                :key="product.id"
                class="flex items-cener justify-between w-full cursor-pointer hover:bg-gray-100 mb-1"
              >
                <div class="flex items-center">
                  <img
                    class="rounded-md border-2 border-[#557C55]"
                    width="40"
                    :src="product.url"
                    alt="no image"
                  />
                  <div class="truncate ml-2">
                    {{ product.title }}
                  </div>
                </div>
                <div class="truncate">
                  ${{ (product.price / 100).toFixed(2) }}
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>

      <div class="flex ml-2 items-center space-x-4">
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
            class="absolute text-center right-0 mt-2 bg-[#F2FFE9] border-[2px] border-[#557C55] shadow-md w-40 py-2 top-[30px] text-[#333333]"
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
    </div>
    <!--mobiilinäkymä-->
    <div id="mobileview" class="md:hidden flex:col">
      <div class="flex items-row text-xs font-light h-9 px-2 relative">
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

        <button @click="toggleMenu">
          <Icon name="mdi:menu" size="20" class="" />
        </button>
        <div
          v-if="isMenuOpen"
          class="absolute text-center right-0 top-full mt-2 bg-[#F2FFE9] shadow-md w-40 py-2 md:hidden border-[2px] border-[#557C55]"
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
      <div>
        <div
          v-if="showSearch"
          class="static md:hidden w-full bg-[#F2FFE9] px-3 py-3"
        >
          <div
            class="flex items-center border-2 bg-[#A6CF98] border-[#557C55] rounded-md"
          >
            <input
              v-model="searchItem"
              type="search"
              class="w-full placeholder-[#557C55] bg-[#A6CF98] text-sm pl-3 focus:outline-none"
              placeholder="Search..."
            />
            <button class="flex items-center h-[100%] p-1.5 px-3 bg-[#557C55]">
              <Icon name="ph:arrow-right" size="15" color="#fff" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onAuthStateChanged } from "firebase/auth";
import { ref } from "vue";
import { auth } from "~/firebaseConfig";
import { signOut } from "firebase/auth";
import { app } from "~/firebaseConfig";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { useUserStore } from "~/stores/user";
const userStore = useUserStore();
const user = ref(null);
const db = getFirestore(app);
const searchItem = ref("");
const searchResults = ref([]);

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
async function searchProducts() {
  if (searchItem.value) {
    const productsRef = collection(db, "products");
    const q = query(
      productsRef,
      where("desc", "array-contains", searchItem.value.toLowerCase())
    );

    const querySnapshot = await getDocs(q);
    searchResults.value = querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .slice(0, 5);
  } else {
    searchResults.value = [];
  }
}

let isMenuOpen = ref(false);
let showSearch = ref(false);
let isAccountMenu = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
const toggleAccouuntMenu = () => {
  isAccountMenu.value = !isAccountMenu.value;
};
</script>
