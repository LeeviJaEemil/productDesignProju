<template>
    <div
        :id="'ProductComponent${product.id}'"
        class="
            bg-[#A6CF98]
            inline-block
            rounded
            hover:shadow-[0_0_10px_3px_rgba(0,0,0,0.15)]
            cursor-pointer
        "
    >
        <NuxtLink :to="`/item/${product.id}`">
            <img
                class="rounded-t"
                :src="product.url"
            >
            <div id="ProductDetails">
                <span class="flex items-center justify-start gap-3 px-1 pt-1">
                    <span class="text-black font-semibold">
                        ${{ priceComputed }}
                    </span>
                </span>
            </div>
        </NuxtLink>
    </div>
</template>

<script setup>
const props = defineProps(['product'])
const { product } = toRefs(props)

const priceComputed = computed (() => {
    return product.value.price / 100
})
</script>