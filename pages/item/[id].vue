<template>
  <MainLayout />
  <div id="ItemPage" class="mt-4 max-w-[1200px] mx-auto px-2">
    <div class="md:flex gap-4 justify-between mx-auto w-full">
      <div class="md:w-[40%]">
        <img
          v-if="currentImage"
          class="rounded-lg object-fit"
          :src="currentImage"
        />
        <div
          v-if="images[0] !== ''"
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
</template>

<script setup>
import MainLayout from "~/layouts/MainLayout.vue";
import { useUserStore } from "~/stores/user";
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const userStore = useUserStore();
const route = useRoute();
const firestore = getFirestore();

let product = ref(null);
let currentImage = ref(null);
let images = ref([]);

const isInCart = computed(() => {
  return userStore.cart.some((prod) => prod.id === route.params.id);
});

async function fetchProduct() {
  const docRef = doc(firestore, "products", route.params.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    product.value = docSnap.data();
    currentImage.value = product.value.url[0];
    images.value = product.value.url;
  } else {
    console.log("No such product!");
  }
}

onMounted(() => {
  fetchProduct();
});

const addToCart = () => {
  userStore.cart.push(product.value);
};
</script>
