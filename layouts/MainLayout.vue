<template>
  <div id="MainLayout" class="">
    <div id="TopMenu" class="w-full border-b md:block hidden">
      <div
        class="flex justify-between items-centre text-xs font-light h-9 bg-[#FA7070] mx-auto"
      >
        <div class="flex items-center">
          <button
            @click="toggleMenu"
            class="px-3 h-9 text-[#333333] focus:outline-none"
          >
            <Icon name="mdi:menu" size="15" />
          </button>
          <div class="max-w-[230px] w-full mr-10 md:block hidden">
            <div
              class="flex items-center border-2 bg-[#fff] border-[#FF4646] rounded-md w-full"
            >
              <input
                v-model="searchItem"
                type="search"
                class="fw-full placeholder-gray-400 text-sm pl-3 focus:outline-none"
                placeholder="Search..."
              />
              <Icon
                v-if="isSearching"
                name="eos-icons:loading"
                size="15"
                class="mr-2"
              />

              <button
                class="flex items-center h-[100%] p-1.5 px-3 bg-[#FF4646]"
              >
                <Icon name="ph:magnifying-glass" size="15" color="#fff" />
              </button>
            </div>
          </div>
          <img width="30" src="tonttu.png" class="mr-2" />
          <h1 class="font-bold">Tontun</h1>
        </div>
        <ul class="flex items-center">
          <li
            class="border-r border-r-black-400 px-3 hover:text-[#F2FFE9] cursor-pointer"
          >
            Cart
            <Icon name="ph:shopping-cart-simple-light" size="15" class="ml-1" />
          </li>
          <li
            @mouseenter="isAccountMenu = true"
            @mouseleave="isAccountMenu = false"
            class="relative flex items-center px-2.5 hover:text-[#F2FFE9] h-full cursor-pointer"
          >
            Account
            <Icon name="ph:user-thin" size="17" class="ml-1" />
            <Icon name="mdi:chevron-down" size="17" />
            <div
              id="AccountMenu"
              v-if="isAccountMenu"
              class="absolute top-[38px] text-[#333333]"
            >
              <div v-if="true">
                <div>
                  <NuxtLink to="/login"> Login</NuxtLink>
                </div>
              </div>
              <div>
                <ul>
                  <li @click="navigateTo('#')" v-if="true">2</li>
                  <li @click="navigateTo('#')" v-if="true">3</li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--  -->
    <img src="/tonttu.png" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "~/stores/user";
let isAccountMenu = ref(false);
let isSearching = ref(true);
let searchItem = ref("");
const userStore = useUserStore();
</script>
