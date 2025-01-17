<template>
  <MainLayout />
  <div
    id="ShoppingCartPage"
    class="mt-4 max-w-[1200px] min-h-screen mx-auto px-2"
  >
    <div
      v-if="!userStore.cart.length"
      class="h-[500px] flex items-center justify-center"
    >
      <div class="pt-20">
        <img class="mx-auto" width="250" src="/cart.png" />

        <div class="text-xl text-center mt-4">No items yet?</div>

        <div v-if="!user" class="flex text-center">
          <NuxtLink
            to="/auth"
            class="bg-[#557C55] w-full text-white text-[21px] font-semibold p-1.5 rounded-full mt-4"
          >
            Sign in
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-else class="md:flex gap-4 justify-between mx-auto w-full">
      <div class="md:w-[65%]">
        <div class="bg-[#A6CF98] rounded-lg p-4">
          <div class="text-2xl font-bold mb-2">
            Shopping Cart ({{ userStore.cart.length }})
          </div>
        </div>

        <div id="Items" class="bg-[#A6CF98] rounded-lg p-4 mt-4">
          <div v-for="product in userStore.cart">
            <CartItem
              :product="product"
              :selectedArray="selectedArray"
              @selectedRadio="selectedRadioFunc"
            />
          </div>
        </div>
      </div>

      <div class="md:hidden block my-4" />
      <div class="md:w-[35%]">
        <div id="Summary" class="bg-[#A6CF98] rounded-lg p-4">
          <div class="text-2xl font-extrabold mb-2">Summary</div>
          <div class="flex items-center justify-between my-4">
            <div class="font-semibold">Total</div>
            <div class="text-2xl font-semibold">
              <span class="font-extrabold">$ {{ totalPriceComputed }}</span>
            </div>
          </div>
          <button
            @click="goToCheckout"
            class="flex items-center justify-center bg-[#557C55] w-full text-white text-[21px] font-semibold p-1.5 rounded-full mt-4"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MainLayout from "~/layouts/MainLayout.vue";
import { useUserStore } from "~/stores/user";
import { onAuthStateChanged } from "firebase/auth";
import { ref } from "vue";
import { auth } from "@/firebaseConfig";

const user = ref(null);

onAuthStateChanged(auth, (firebaseUser) => {
  user.value = firebaseUser;
});

const userStore = useUserStore();
let selectedArray = ref([]);

onMounted(() => {
  setTimeout(() => (userStore.isLoading = false), 200);
});

const totalPriceComputed = computed(() => {
  let price = 0;
  userStore.cart.forEach((prod) => {
    price += prod.price;
  });
  return (price / 100).toFixed(2);
});

const selectedRadioFunc = (e) => {
  if (!selectedArray.value.length) {
    selectedArray.value.push(e);
    return;
  }

  selectedArray.value.forEach((item, index) => {
    if (e.id != item.id) {
      selectedArray.value.push(e);
    } else {
      selectedArray.value.splice(index, 1);
    }
  });
};

const goToCheckout = () => {
  let ids = [];
  userStore.checkout = [];

  selectedArray.value.forEach((item) => ids.push(item.id));

  let res = userStore.cart.filter((item) => {
    return ids.indexOf(item.id) != -1;
  });

  res.forEach((item) => userStore.checkout.push(toRaw(item)));

  return navigateTo("/checkout");
};
</script>
