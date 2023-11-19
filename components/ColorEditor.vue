<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
        <div class="fixed flex flex-col px-6 py-3 bg-white text-black rounded-[30px] top-1/2 left-1/2 gap-3 translate-y-[-50%] translate-x-[-50%] w-[90%] md:w-[80%] lg:w-[60%]">
            <Icon @click="$emit('closeEditor')" icon="mingcute:close-fill" color=#A44646 width="24" class="ml-auto" />
            <p class="text-center font-bold text-xl"> Pick your colours </p>
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
            <Button class="rounded-2xl font-bold text-xl">Submit</Button>
        </div>
</template>
