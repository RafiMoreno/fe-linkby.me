<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineEmits(["closeEditor"]);

const link = ref({
  title: "",
  url: "",
  iconUrl: "",
});

const isFormValid = computed(
  () => link.value.title !== "" && link.value.url !== "",
);

const handleSubmit = () => {
  if (isFormValid) {
    console.log("submit", link.value);
  } else {
    console.log("not valid", link);
  }
};
</script>

<template>
  <form
    class="fixed flex flex-col z-20 px-3 py-6 bg-white text-black rounded-[30px] top-1/2 left-1/2 gap-3 translate-y-[-50%] translate-x-[-50%] w-[90%] md:w-[80%] lg:w-[60%]"
    @submit.prevent="handleSubmit"
  >
    <Icon
      icon="mingcute:close-fill"
      color="#FFFFFF"
      width="24"
      class="absolute top-[-4px] right-[-2px] border-[2px] border-[#FFFFFF] bg-[#A44646] rounded-2xl bg-origin-padding p-1 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 duration-75"
      @click="$emit('closeEditor')"
    />
    <p class="text-center font-bold text-xl">Add a Link</p>

    <TextInput v-model="link.title" title="Title" />
    <TextInput v-model="link.url" title="URL" />
    <Button
      type="submit"
      class="rounded-2xl font-bold text-xl"
      :disabled="!isFormValid"
      >Add</Button
    >
  </form>
</template>
