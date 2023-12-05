import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    isMenuOverlay: false,
    isLoading: false,
    cart: [],
    checkout: [],
  }),
  actions: {
    deleteFromCart(cartItemId) {
      const index = this.cart.findIndex(
        (item) => item.cartItemID === cartItemId
      );
      if (index !== -1) {
        this.cart.splice(index, 1);
      }
    },
  },
  persist: true,
});
