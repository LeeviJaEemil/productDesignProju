<template>
  <MainLayout />
  <div id="IndexPage" class="bg-[#A6CF98] px-2 min-h-screen">
    <div
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
      <div v-else>Loading products...</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, reactive } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "~/firebaseConfig";
import MainLayout from "~/layouts/MainLayout.vue";

const products = ref([]);
const activeProduct = reactive({ id: null, imageIndex: 0, interval: null });

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
