<template>
  <MainLayout />
  <div id="ItemPage" class="mt-4 max-w-[1200px] mx-auto px-2 min-h-screen">
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
      <div class="md:w-[40%] bg-[#A6CF98] p-3 rounded-lg" v-if="product">
        <p class="mb-2">{{ product.title }}</p>
        <p class="relative font-light text-[12px] mb-2">
          {{ product.description }}
        </p>
        <div class="absolute bottom-0 mb-3"></div>
        <p class="font-semibold text-lg">
          ${{ (product.price / 100).toFixed(2) }}
        </p>
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
import { onMounted, ref, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const userStore = useUserStore();
const route = useRoute();
const firestore = getFirestore();
const products = ref([]);

let product = ref(null);
let currentImage = ref(null);
let images = ref([]);
let isInCart = ref(false);
let isAddingToCart = ref(false);

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

  watch(
    () => userStore.cart,
    () => {
      isInCart.value = userStore.cart.some((prod) => prod.id === id.value);
    }
  );
});

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
