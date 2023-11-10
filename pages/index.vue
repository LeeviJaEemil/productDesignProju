<template>
  <MainLayout />
  <div id="IndexPage" class="bg-[#A6CF98] mx-auto px-2">
    <div class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
      <div v-if="products" v-for="product in products" :key="product">
        <ProductComponent :product="product"/>
        {{ product }}
      </div>
    </div>
  </div>
</template>

<script setup>
import MainLayout from "~/layouts/MainLayout.vue";

const products = [
  {id: 1, title: "Title 1", description: " this is descccc", url: "https://picsum.photos/id/7/800/800", price: 9999 },
  {id: 2, title: "Title 2", description: " this is descccc", url: "https://picsum.photos/id/7/800/800", price: 9929 },
  {id: 3, title: "Title 3", description: " this is descccc", url: "https://picsum.photos/id/7/800/800", price: 9449 },
  {id: 4, title: "Title 4", description: " this is descccc", url: "https://picsum.photos/id/7/800/800", price: 9669 },
  {id: 5, title: "Title 5", description: " this is descccc", url: "https://picsum.photos/id/7/800/800", price: 1919 },
  {id: 6, title: "Title 6", description: " this is descccc", url: "https://picsum.photos/id/7/800/800", price: 6969 },
  {id: 7, title: "Title 7", description: " this is descccc", url: "https://picsum.photos/id/7/800/800", price: 9912 },
  {id: 8, title: "Title 8", description: " this is descccc", url: "https://picsum.photos/id/7/800/800", price: 9123 },
  {id: 9, title: "Title 9", description: " this is descccc", url: "https://picsum.photos/id/7/800/800", price: 9119 },
  {id: 10, title: "Title 10", description: " this is descccc", url: "https://picsum.photos/id/7/800/800", price: 1299 },
]
</script>
