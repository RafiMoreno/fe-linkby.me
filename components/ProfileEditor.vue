<script setup lang="ts">
import { Icon } from "@iconify/vue";

const emit = defineEmits(["closeEditor"]);

const props = defineProps<{
  username: string | string[];
  displayName: string;
  description: string;
}>();

const isLoading = ref(false);

const input = ref<ProfileEditPayload>({
  displayName: props.displayName,
  description: props.description,
});

const snackbar = useSnackbar();
const { editProfile } = useProfileStore();
const { error } = storeToRefs(useProfileStore());

const isFormValid = computed(
  () => input.value.description !== "" || input.value.displayName !== "",
);

const handleSubmit = async () => {
  if (isFormValid) {
    isLoading.value = true;
    await editProfile(input.value, props.username.toString());
    if (error.value) {
      snackbar.add({
        type: "error",
        text: error.value.data?.error ?? "Error while editing profile",
      });
    } else {
      snackbar.add({
        type: "success",
        text: "Profile edited",
      });
    }
    emit("closeEditor");
  }
};
</script>

<template>
  <div
    class="fixed flex flex-col z-20 px-3 py-6 bg-white text-black rounded-[30px] top-1/2 left-1/2 gap-3 translate-y-[-50%] translate-x-[-50%] w-[90%] md:w-[50%] lg:w-[30%]"
  >
    <Icon
      icon="mingcute:close-fill"
      color="#FFFFFF"
      width="30"
      class="absolute top-[-4px] right-[-2px] border-[2px] border-[#FFFFFF] bg-[#A44646] rounded-2xl bg-origin-padding p-1 transition ease-in-out delay-75 hover:-translate-x-[-2px] hover:scale-105 duration-75"
      @click="$emit('closeEditor')"
    />
    <p class="text-center font-bold text-xl">Edit Profile</p>
    <TextInput v-model="input.displayName" title="Display Name" />
    <LargeTextInput v-model="input.description" title="Description" />
    <Button
      :disabled="!isFormValid || isLoading"
      class="rounded-2xl font-bold text-xl"
      @click="handleSubmit"
    >
      <LoadingSpinner v-if="isLoading" size="20px" />
      Save Changes
    </Button>
  </div>
</template>
