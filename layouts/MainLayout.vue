<template>
  <div
    id="MainLayout"
    class="w-full border-b-2 border-[#557C55] md:block hidden"
  >
    <div
      class="flex justify-between items-centre text-xs font-light h-9 bg-[#F2FFE9] mx-auto"
      class="flex justify-between items-centre text-xs font-light h-9 bg-[#F2FFE9] mx-auto"
    >
      <div class="flex items-center">
        <button
          @click="toggleMenu"
          class="px-3 h-9 text-[#333333] focus:outline-none"
        >
          <Icon name="mdi:menu" size="15" />
        </button>
        <div class="max-w-[550px] w-full mr-2 md:block hidden">
          <div
            class="flex items-center border-2 bg-[#A6CF98] border-[#557C55] rounded-md"
          >
            <input
              v-model="searchItem"
              type="search"
              class="fw-full w-[550px] placeholder-[#557C55] bg-[#A6CF98] text-sm pl-3 focus:outline-none"
              placeholder="Search..."
            />
            <Icon
              v-if="isSearching"
              name="eos-icons:loading"
              size="15"
              class="mr-2"
            />

            <button class="flex items-center h-[100%] p-1.5 px-3 bg-[#557C55]">
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
      <ul class="flex items-center">
        <li>
          <img width="30" src="tonttu.png" />
        </li>
        <li>
          <h1 class="font-bold">Tontun paja</h1>
        </li>
        <li
          class="border-r-[1px] border-r-black px-1 hover:text-[#557C55] cursor-pointer"
        >
          <nuxt-link to="/cart" class="flex items-center">
            <div class="min-w-[40pxs]">
              <Icon
                name="ph:shopping-cart-simple-light"
                size="15"
                class="ml-1"
              />
              <span
                class="flex items-center justify-center bg-[#FA7070] h-[13px] min-w-[13px] text-xs text-black px-0.5 rounded-full"
              >
                100</span
              >
            </div>
          </nuxt-link>
        </li>

        <li
          @mouseenter="isAccountMenu = true"
          @mouseleave="isAccountMenu = false"
          class="relative flex items-center px-1 hover:text-[#557C55] h-full cursor-pointer"
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
                <NuxtLink to="/auth"> Login</NuxtLink>
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
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "~/stores/user";
let isAccountMenu = ref(false);
let isSearching = ref(true);
let searchItem = ref("");
const userStore = useUserStore();
</script>
