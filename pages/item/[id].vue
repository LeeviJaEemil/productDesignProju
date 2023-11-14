
<template>
    <MainLayout/>
        <div id="ItemPage" class="mt-4 max-w-[1200px] mx-auto px-2">
            <div class="md:flex gap-4 justify-between mx-auto w-full">
                <div class="md:w-[40%]">
                    <img
                        v-if="currentImage"
                        class="rounded-lg object-fit"
                        :src="currentImage" 
                    > 
                    <div v-if="images[0] !== ''" class="flex items-center justify-center mt-2">
                        <div v-for="image in images">
                            <img 
                                @mouseover="currentImage = image"
                                @click="currentImage = image"
                                width="70"
                                class="rounded-md object-fit border-[3px] cursor-pointer"
                                :class="currentImage === image ? 'border-[#FF5353]' : ''"
                                :src="image"
                            >
                        </div>
                    </div>

                    

                    <button 
                        @click="addToCart()"
                        :disabled="isInCart"
                        class="
                            px-6 
                            py-2 
                            rounded-lg 
                            text-white 
                            text-lg 
                            font-semibold 
                            bg-gradient-to-r 
                            from-[#557C55] 
                            to-[#A6CF98]
                        "
                    >
                        <div v-if="isInCart">Is Added</div>
                        <div v-else>Add to Cart</div>
                    </button>       
                </div>
            </div>
        </div>
    
</template>

<script setup>
import MainLayout from '~/layouts/MainLayout.vue';
import { useUserStore } from '~/stores/user';
const userStore = useUserStore()

const route = useRoute()

let product = ref(null)
let currentImage = ref(null)


const isInCart = computed(() => {
    let res = false
    userStore.cart.forEach(prod => {
        if (route.params.id == prod.id) {
            res = true
        }
    })
    return res
})

    onMounted(() => {
        watchEffect(() => {
            currentImage.value = 'https://picsum.photos/id/77/800/800'
            images.value[0] = 'https://picsum.photos/id/77/800/800'
        })
    })

    const images = ref([
    '',
    'https://picsum.photos/id/212/800/800',
    'https://picsum.photos/id/233/800/800',
    'https://picsum.photos/id/165/800/800',
    'https://picsum.photos/id/99/800/800',
    'https://picsum.photos/id/144/800/800',
])

const addToCart = () => {
    alert('ADDED')
}
</script>