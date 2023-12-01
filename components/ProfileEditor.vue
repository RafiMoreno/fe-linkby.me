<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
  <div
    class="fixed flex flex-col z-20 px-3 py-6 bg-white text-black rounded-[30px] top-1/2 left-1/2 gap-3 translate-y-[-50%] translate-x-[-50%] w-[90%] md:w-[80%] lg:w-[60%]"
  >
    <Icon
      @click="$emit('closeEditor')"
      icon="mingcute:close-fill"
      color="#FFFFFF"
      width="24"
      class="absolute top-[-4px] right-[-2px] border-[2px] border-[#FFFFFF] bg-[#A44646] rounded-2xl bg-origin-padding p-1 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 duration-75"
    />
    <p class="text-center font-bold text-xl">Edit Profile</p>
    <TextInput title="Display Name" />
    <TextInput title="Description" />
    <Button class="rounded-2xl font-bold text-xl">Save Changes</Button>
  </div>
</template>
