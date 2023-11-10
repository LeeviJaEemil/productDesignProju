<template>
  <MainLayout />
  <div id="CartPage" class="bg-[#A6CF98] mx-auto px-2">
    <div v-if="true" class="flex items-center justify-center">
      <div class="pt-20">
        <img class="mx-auto" width="250" src="/cart.png" />

        <div class="text-xl text-center mt-4">no items yet?</div>

        <div v-if="true" class="flex text-center">
          <NuxtLink
            to="/auth"
            class="bg-[#557C55] w-full text-black text-[21px] font-semibold p-1.5 rounded-full mt-4"
          >
            Sign in
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MainLayout from "~/layouts/MainLayout.vue";
</script>
