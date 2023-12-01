<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
        <div class="fixed flex flex-col z-20 px-6 py-3 bg-white text-black rounded-[30px] top-1/2 left-1/2 gap-3 translate-y-[-50%] translate-x-[-50%] w-[90%] md:w-[50%] lg:w-[30%]">
            <Icon @click="$emit('closeEditor')" icon="mingcute:close-fill" color=#FFFFFF width="30" 
            class="absolute top-[-4px] right-[-2px] border-[2px] border-[#FFFFFF] bg-[#A44646] rounded-2xl bg-origin-padding p-1
            transition ease-in-out delay-75 hover:-translate-x-[-2px] hover:scale-105 duration-75" />
            <p class="text-center font-bold text-xl"> Edit Theme </p>
            <div class="flex flex-col gap-1">
                <p class="font-normal text-base">Primary Color</p>
                <div class="flex flex-row border border-[#B2B2B2] rounded-2xl p-4 align-middle gap-4 cursor-pointer">
                    <div class="bg-[#A44646] border border-[#B2B2B2] rounded w-[32px] h-[32px]" />
                    <p class="self-center">#A44646</p>
                </div>
            </div>
            <div class="flex flex-col gap-1">
                <p class="font-normal text-base">Secondary Color</p>
                <div class="flex flex-row border border-[#B2B2B2] rounded-2xl p-4 align-middle gap-4 cursor-pointer">
                    <div class="bg-[#FFFFFF] border border-[#B2B2B2] rounded w-[32px] h-[32px]" />
                    <p class="self-center">#FFFFFF</p>
                </div>
            </div>
            <Button class="rounded-2xl font-bold text-xl">Save Changes</Button>
        </div>
</template>
