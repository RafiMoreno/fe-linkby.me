<script setup lang="ts">
import { Icon } from "@iconify/vue";

const emit = defineEmits(["closeEditor"]);

const snackbar = useSnackbar();
const { editDisplayImage } = useProfileStore();
const { error } = storeToRefs(useProfileStore());

const props = defineProps<{
  currentDisplayPicture: string;
  username: string;
}>();

const isLoading = ref(false);

const imgUrl = ref(props.currentDisplayPicture);
const fd = new FormData();

const handleFormData = (form: FormData, image: Blob) => {
  if (form.has("image")) {
    form.delete("image");
    form.append("image", image);
  } else {
    form.append("image", image);
  }
};

const onFileChange = (e: any) => {
  const file = e.target.files[0];
  handleFormData(fd, file);
  if (file) {
    imgUrl.value = URL.createObjectURL(file);
    URL.revokeObjectURL(file);
  }
};

const handleSubmit = async () => {
  if (imgUrl.value != props.currentDisplayPicture) {
    isLoading.value = true;
    await editDisplayImage(fd, props.username);
    if (error.value) {
      snackbar.add({
        type: "error",
        text: error.value.data?.error ?? "Error while editing display picture",
      });
    } else {
      snackbar.add({
        type: "success",
        text: "Display picture changed",
      });
      emit("closeEditor");
    }
  } else {
    snackbar.add({
      type: "error",
      text: "Please select a image",
    });
  }
};
</script>

<template>
  <div
    class="fixed flex flex-col z-20 px-6 py-3 bg-white text-black rounded-[30px] top-1/2 left-1/2 gap-3 translate-y-[-60%] translate-x-[-50%] w-[90%] md:w-[50%] lg:w-[40%]"
  >
    <Icon
      icon="mingcute:close-fill"
      color="#FFFFFF"
      width="30"
      class="absolute top-[-4px] right-[-2px] border-[2px] border-[#FFFFFF] bg-[#A44646] rounded-2xl bg-origin-padding p-1 transition ease-in-out delay-75 hover:-translate-x-[-2px] hover:scale-105 duration-75"
      @click="$emit('closeEditor')"
    />
    <p class="text-center font-bold text-xl">Edit Display Picture</p>
    <div class="flex justify-center">
      <NuxtImg
        v-if="currentDisplayPicture != undefined && currentDisplayPicture != ''"
        class="object-cover w-[150px] rounded-[50%] aspect-square profileImg"
        :src="imgUrl"
      />
    </div>
    <p class="text-center font-normal text-md text-[#a44646]">Image Preview</p>
    <div class="flex flex-row gap-3">
      <input
        id="imageinput"
        type="file"
        class="hidden"
        @change="onFileChange"
      />
      <label
        for="imageinput"
        class="flex w-full rounded-3xl border-solid border-2 border-[#A44646] text-[#a44646] bg-[#FFFFFF] font-bold text-lg text-center justify-center align-center hover:brightness-95 hover:cursor-pointer"
      >
        Choose File
      </label>
      <Button
        class="rounded-2xl font-bold text-lg"
        :disabled="isLoading"
        @click="handleSubmit"
      >
        <LoadingSpinner v-if="isLoading" size="20px" />
        Submit
      </Button>
    </div>
  </div>
</template>

<style scoped>
.profileImg {
  filter: drop-shadow(0px 6px 4px rgba(0, 0, 0, 0.3));
}
</style>
