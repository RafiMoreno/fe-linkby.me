<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useProfileStore, type LinkSubmitPayload } from "~/store/profile";

const emit = defineEmits(["closeEditor"]);

const { addLink } = useProfileStore();

const { error } = storeToRefs(useProfileStore());

const route = useRoute();

const snackbar = useSnackbar();

const username: string = route.params.username.toString();

const linkInput = ref<LinkSubmitPayload>({
  title: "",
  url: "",
  iconUrl: "",
});

const isFormValid = computed(
  () => linkInput.value.title !== "" && linkInput.value.url !== "",
);

const handleSubmit = async () => {
  if (isFormValid) {
    console.log("submit", linkInput.value);
    await addLink(linkInput.value, username);
    if (error.value) {
      snackbar.add({
        type: "error",
        text: error.value.data?.error ?? "Error",
      });
    } else {
      snackbar.add({
        type: "success",
        text: "Link added",
      });
    }
  } else {
    console.log("not valid", linkInput);
  }
  emit("closeEditor");
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

    <TextInput v-model="linkInput.title" title="Title" />
    <TextInput v-model="linkInput.url" title="URL" />
    <Button
      type="submit"
      class="rounded-2xl font-bold text-xl"
      :disabled="!isFormValid"
      >Add</Button
    >
  </form>
</template>
