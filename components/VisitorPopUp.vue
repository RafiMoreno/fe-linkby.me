<script setup lang="ts">
import { Icon } from "@iconify/vue";
const props = defineProps<{
  primaryColor: string;
  secondaryColor: string;
}>();
</script>

<template>
    <div class="popup flex flex-row items-center justify-center rounded-xl py-1 px-2 text-sm font-bold gap-2 animate-bounce" >
        <p @click="navigateTo(`/sign-up`)">Create your own page</p>
        <Icon 
        icon="ph:x-bold" 
        class="icon-x flex  rounded-xl p-[2px]"
        @click="$emit('closePopUp')"
        />
    </div>
</template>

<style scoped>
.popup{
    color: v-bind(secondaryColor);
    background-color: v-bind(primaryColor);
    filter: drop-shadow(0px 6px 4px rgba(0, 0, 0, 0.3));
}

.icon-x{
    background-color: v-bind(secondaryColor);
    color: v-bind(primaryColor);
}
</style>