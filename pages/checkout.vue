<template>
  <MainLayout />
  <div id="CheckoutPage" class="mt-4 min-h-screen max-w-[1200px] mx-auto px-2">
    <div class="md:flex gap-4 justify-between mx-auto w-full">
      <div class="md:w-[65%]">
        <div class="bg-[#A6CF98] rounded-lg p-4">
          <div class="text-xl font-semibold mb-2">Shipping Address</div>

          <div class="pt-2 border-t">
            <div class="underline pb-1">Delivery Address</div>
            <form @submit.prevent="submit()">
              <TextInput
                class="w-full"
                placeholder="Contact Name"
                v-model:input="contactName"
                inputType="text"
                :error="
                  error && error.type == 'contactName' ? error.message : ''
                "
              />

              <TextInput
                class="w-full mt-2"
                placeholder="Address"
                v-model:input="address"
                inputType="text"
                :error="error && error.type == 'address' ? error.message : ''"
              />

              <TextInput
                class="w-full mt-2"
                placeholder="Zip Code"
                v-model:input="zipCode"
                inputType="text"
                :error="error && error.type == 'zipCode' ? error.message : ''"
              />

              <TextInput
                class="w-full mt-2"
                placeholder="City"
                v-model:input="city"
                inputType="text"
                :error="error && error.type == 'city' ? error.message : ''"
              />

              <TextInput
                class="w-full mt-2"
                placeholder="Country"
                v-model:input="country"
                inputType="text"
                :error="error && error.type == 'country' ? error.message : ''"
              />
            </form>
          </div>
        </div>
      </div>

      <div class="md:hidden block my-4" />
      <div class="md:w-[35%]">
        <div id="PlaceOrder" class="bg-[#A6CF98] rounded-lg p-4">
          <div class="text-2xl font-extrabold mb-2">Summary</div>

          <div class="border-t" />

          <div class="flex items-center justify-between my-4">
            <div class="font-semibold">Total</div>
            <div class="text-2xl font-semibold">
              <span class="font-extrabold"> $ {{ totalPriceComputed }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MainLayout from "~/layouts/MainLayout.vue";
import { useUserStore } from "~/stores/user";
import { auth } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
const userStore = useUserStore();
const route = useRoute();

const user = ref(null);

let contactName = ref(null);
let address = ref(null);
let zipCode = ref(null);
let city = ref(null);
let country = ref(null);

let isUpdate = ref(false);
let isWorking = ref(false);
let error = ref(null);

onAuthStateChanged(auth, (firebaseUser) => {
  user.value = firebaseUser;
});

let stripe = null;
let elements = null;
let card = null;
let form = null;
let total = ref(0);
let clientSecret = null;
let currentAddress = ref(null);
let isProcessing = ref(false);

/*watchEffect(async () => {
  currentAddress.value = await useFetch(`${user.value.id}`);

  if (currentAddress.value.data) {
    contactName.value = currentAddress.value.data.name;
    address.value = currentAddress.value.data.address;
    zipCode.value = currentAddress.value.data.zipcode;
    city.value = currentAddress.value.data.city;
    country.value = currentAddress.value.data.country;

    isUpdate.value = true;
  }

  userStore.isLoading = false;
});*/

const submit = async () => {
  isWorking.value = true;
  error.value = null;

  if (!contactName.value) {
    error.value = {
      type: "contactName",
      message: "A contact name is required",
    };
  } else if (!address.value) {
    error.value = {
      type: "address",
      message: "An address is required",
    };
  } else if (!zipCode.value) {
    error.value = {
      type: "zipCode",
      message: "A zip code is required",
    };
  } else if (!city.value) {
    error.value = {
      type: "city",
      message: "A city is required",
    };
  } else if (!country.value) {
    error.value = {
      type: "country",
      message: "A country is required",
    };
  }

  if (error.value) {
    isWorking.value = false;
    return;
  }
};

const totalPriceComputed = computed(() => {
  let price = 0;
  userStore.cart.forEach((prod) => {
    price += prod.price;
  });
  return (price / 100).toFixed(2);
});

/*onBeforeMount(async () => {
  if (userStore.checkout.length < 1) {
      return navigateTo('/cart')
  }
})*/

/*watchEffect(() => {
  if (route.fullPath == '/checkout' && !user.value) {
      return navigateTo('/auth')
  }
})*/

onMounted(async () => {
  isProcessing.value = true;

  userStore.checkout.forEach((item) => {
    total.value += item.price;
  });
});

watch(
  () => total.value,
  () => {
    if (total.value > 0) {
      stripeInit();
    }
  }
);

const stripeInit = async () => {
  const runtimeConfig = useRuntimeConfig();
  stripe = Stripe(runtimeConfig.stripePk);

  let res = await $fetch("/api/stripe/paymentintent", {
    method: "POST",
    body: {
      amount: total.value,
    },
  });
  clientSecret = res.client_secret;

  elements = stripe.elements();
  var style = {
    base: {
      fontSize: "18px",
    },
    invalid: {
      fontFamily: "Arial, sans-serif",
      color: "#EE4B2B",
      iconColor: "#EE4B2B",
    },
  };
  card = elements.create("card", {
    hidePostalCode: true,
    style: style,
  });

  // Stripe injects an iframe into the DOM
  card.mount("#card-element");
  card.on("change", function (event) {
    // Disable the Pay button if there are no card details in the Element
    document.querySelector("button").disabled = event.empty;
    document.querySelector("#card-error").textContent = event.error
      ? event.error.message
      : "";
  });

  isProcessing.value = false;
};

const pay = async () => {
  if (currentAddress.value && currentAddress.value.data == "") {
    showError("Please add shipping address");
    return;
  }
  isProcessing.value = true;

  let result = await stripe.confirmCardPayment(clientSecret, {
    payment_method: { card: card },
  });

  if (result.error) {
    showError(result.error.message);
    isProcessing.value = false;
  } else {
    await createOrder(result.paymentIntent.id);
    userStore.cart = [];
    userStore.checkout = [];
    setTimeout(() => {
      return navigateTo("/success");
    }, 500);
  }
};

const createOrder = async (stripeId) => {
  await useFetch("/api/prisma/create-order", {
    method: "POST",
    body: {
      userId: user.value.id,
      stripeId: stripeId,
      name: currentAddress.value.data.name,
      address: currentAddress.value.data.address,
      zipcode: currentAddress.value.data.zipcode,
      city: currentAddress.value.data.city,
      country: currentAddress.value.data.country,
      products: userStore.checkout,
    },
  });
};

const showError = (errorMsgText) => {
  let errorMsg = document.querySelector("#card-error");

  errorMsg.textContent = errorMsgText;
  setTimeout(() => {
    errorMsg.textContent = "";
  }, 4000);
};
</script>
