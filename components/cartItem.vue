<template>
  <div class="flex justify-start my-2">
    <img class="rounded-md md:w-[150px] w-[90px]" :src="product.url" />

    <div class="overflow-hidden pl-2 w-full">
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center justify-between truncate">
          <div class="truncate sm:pl-2">
            {{ product.title }}
          </div>
        </div>
        <button
          @click="removeFromCart(product.cartItemID)"
          class="mx-3 sm:block hidden -mt-0.5 hover:text-red-500"
        >
          <Icon name="material-symbols:delete-outline" size="20" />
        </button>
      </div>

      <div class="text-xl font-semibold">
        <span class="font-bold">$ {{ (product.price / 100).toFixed(2) }}</span>
      </div>

      <div class="flex items-center justify-end">
        <button
          @click="removeFromCart(product.cartItemID)"
          class="sm:hidden block -mt-0.5 hover:text-red-500"
        >
          <Icon name="material-symbols:delete-outline" size="20" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, toRefs, defineEmits } from "vue";
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();

const props = defineProps(["product", "selectedArray"]);
const { product, selectedArray } = toRefs(props);

const emit = defineEmits(["selectedRadio"]);

let isHover = ref(false);
let isSelected = ref(false);

const removeFromCart = (cartItemId) => {
  userStore.deleteFromCart(cartItemId);
};

watch(
  () => isSelected.value,
  (val) => {
    emit("selectedRadio", { id: product.value.id, val: val });
  }
);
</script>
