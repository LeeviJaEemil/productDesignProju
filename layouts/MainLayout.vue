<template>
    <div id="MainLayout" class="">
        <div
            id="TopMenu"
            class="w-full border-b md:block hidden"
        >
            <ul
                class="
                relative
                flex
                items-centre
                justify-end
                text-xs
                text-[#33333]
                font-light
                h-9
                bg-[#fafafafa]
                max-w-[1200px]
                "
            >   
                <li class="relative flex items-center border-r border-r-black-400 px-3 hover:text-[#FF4646] cursor-pointer">
                    1
                </li>
                <li class="relative flex items-center border-r border-r-black-400 px-3 hover:text-[#FF4646] cursor-pointer">
                    2
                </li>
                <li class="relative flex items-center border-r border-r-black-400 px-3 hover:text-[#FF4646] cursor-pointer">
                    3
                </li>
                <li 
                    class="relative flex items-center border-r border-r-black-400 px-3 hover:text-[#FF4646] cursor-pointer"
                    :class="isAccountMenu ? 'bg-white border z-40' : border"
                >
                    Cart
                    <Icon name="ph:shopping-cart-simple-light" size="15" class="ml-1"/>
                </li>
                
                <li
                    @mouseenter="isAccountMenu = true"
                    @mouseleave="isAccountMenu = false" 
                    class="relative flex items-center px-2.5 hover:text-[#FF4646] h-full cursor-pointer"
                    :class="isAccountMenu ? 'bg-white border z-40' : border"
                >
                    Account
                    <Icon name="ph:user-thin" size="17" class="ml-1"/>
                    <Icon name="mdi:chevron-down" size="17"/>
                    <div
                        id="AccountMenu"
                        v-if="isAccountMenu"
                        class="absolute w-[220px] text-[#333333] z-40 top-[50px]"
                    >
                        <div v-if="true">
                            <div class="flex items-center gap-1 px-3 mb-3">
                                <NuxtLink
                                    to="/auth"
                                    >
                                    Login
                                </NuxtLink>
                            </div>
                        </div>
                        <div class="border-b">
                        <ul>
                            <li
                                @click="navigateTo('/1')"
                            >
                                2
                            </li>   
                        </ul>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user';
const userStore = useUserStore()

let isAccountMenu = ref(false)
</script>
