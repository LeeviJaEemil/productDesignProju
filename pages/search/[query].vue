<template>
  <MainLayout />
  <div class="bg-[#A6CF98] mx-auto px-2 min-h-screen">
    <div
      v-if="products.length"
      class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4"
    >
      <div v-if="products.length" v-for="product in products" :key="product.id">
        <NuxtLink :to="`/item/${product.id}`">
          <div
            class="product-card"
            @mouseover="startImageRotation(product)"
            @mouseleave="stopImageRotation"
          >
            <img
              :src="getProductImageUrl(product)"
              :alt="product.title"
              class="product-image"
            />
            <div class="product-info">
              <h3>{{ product.title }}</h3>
              <p>${{ (product.price / 100).toFixed(2) }}</p>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
    <div v-else class="text-center text-xl font-medium">
      Ei tuotteita jotka vastaavat hakuehtoja.
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { useRoute } from "vue-router";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "~/firebaseConfig";
import MainLayout from "~/layouts/MainLayout.vue";

const products = ref([]);
const activeProduct = reactive({ id: null, imageIndex: 0, interval: null });
const route = useRoute();

async function fetchProducts(searchTerms) {
  const productsRef = collection(db, "products");
  let allResults = new Set();

  for (const term of searchTerms) {
    const q = query(productsRef, where("desc", "array-contains", term));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      allResults.add({ id: doc.id, ...doc.data() });
    });
  }

  return Array.from(allResults);
}

onMounted(async () => {
  const searchTerm = route.params.query.replace(/_/g, " ").toLowerCase();
  const searchTerms = searchTerm.split(" ");
  products.value = await fetchProducts(searchTerms);
});

function startImageRotation(product) {
  stopImageRotation();
  activeProduct.id = product.id;
  activeProduct.imageIndex = 0;
  activeProduct.interval = setInterval(() => {
    activeProduct.imageIndex =
      (activeProduct.imageIndex + 1) % product.url.length;
  }, 2500);
}

function stopImageRotation() {
  clearInterval(activeProduct.interval);
  activeProduct.id = null;
}

function getProductImageUrl(product) {
  if (activeProduct.id === product.id) {
    return product.url[activeProduct.imageIndex];
  }
  return product.url;
}

onBeforeUnmount(() => {
  stopImageRotation();
});
</script>
