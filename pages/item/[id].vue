<template>
  <MainLayout />
  <div id="ItemPage" class="mt-4 min-h-screen max-w-[1200px] mx-auto px-2">
    <div class="md:flex gap-4 justify-between mx-auto w-full">
      <div class="md:w-[40%]">
        <img
          v-if="currentImage"
          class="rounded-lg object-fit"
          :src="currentImage"
        />
        <div
          v-if="images.length > 0"
          class="flex items-center justify-center mt-2"
        >
          <div v-for="image in images">
            <img
              @mouseover="currentImage = image"
              @click="currentImage = image"
              width="70"
              class="rounded-md object-fit border-[3px] cursor-pointer"
              :class="currentImage === image ? 'border-[#FF5353]' : ''"
              :src="image"
            />
          </div>
        </div>
      </div>
      <div
        class="relative border-2 border-[#557C55] bg-[#f2ffe9] md:w-[50%] mb-3 mt-3"
      >
        <div class="mt-2 ml-2">
          <h1 class="text-xl font-bold">{{ title }}</h1>
          <h2>{{ description }}</h2>
          <div class="absolute bottom-0 mb-2">
            <div class="text-lg font-bold">
              Price: ${{ (price / 100).toFixed(2) }}
            </div>
            <button
              @click="addToCart()"
              :disabled="isInCart"
              class="px-6 py-2 rounded-lg text-white text-lg font-semibold bg-gradient-to-r from-[#557C55] to-[#A6CF98]"
            >
              <div v-if="isInCart">Is Added</div>
              <div v-else>Add to Cart</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MainLayout from "~/layouts/MainLayout.vue";
import { useUserStore } from "~/stores/user";
import { onMounted, ref, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const userStore = useUserStore();
const route = useRoute();
const firestore = getFirestore();

let product = ref(null);
let currentImage = ref(null);
let images = ref([]);
let id = ref([]);
let title = ref([]);
let description = ref([]);
let price = ref([]);
let isInCart = ref(false);
let isAddingToCart = ref(false);

async function fetchProduct() {
  const docRef = doc(firestore, "products", route.params.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    product.value = docSnap.data();
    currentImage.value = product.value.url[0];
    images.value = product.value.url;
    title.value = product.value.title;
    id.value = product.value.id;
    description.value = product.value.description;
    price.value = product.value.price;
  } else {
    console.log("No such product!");
  }
}

onMounted(() => {
  fetchProduct();

  watch(
    () => userStore.cart,
    () => {
      isInCart.value = userStore.cart.some((prod) => prod.id === id.value);
    }
  );
});

const addToCart = () => {
  if (isAddingToCart.value) {
    return;
  }
  userStore.cart.push(product.value);

  isInCart.value = true;

  nextTick(() => {
    setTimeout(() => {
      isInCart.value = false;
      isAddingToCart.value = false;
    }, 3000);
  });
};
</script>
