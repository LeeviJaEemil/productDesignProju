<template>
  <MainLayout />
  <div id="IndexPage" class="bg-[#A6CF98] mx-auto px-2">
    <div
      class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4"
    >
      <div v-if="products.length" v-for="product in products" :key="product.id">
        <NuxtLink :to="`/item/${product.id}`">
          <div class="product-card">
            <img :src="product.url" :alt="product.title" class="product-image" />
            <div class="product-info">
              <h3>{{ product.title }}</h3>
              <p>${{ (product.price / 100).toFixed(2) }}</p>
            </div>
          </div>
        </NuxtLink>
      </div>
      <div v-else>Loading products...</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "~/firebaseConfig";
import MainLayout from "~/layouts/MainLayout.vue";

const products = ref([]);

onMounted(async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    products.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching products: ", error);
  }
});
</script>
