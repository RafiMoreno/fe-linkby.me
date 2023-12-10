<script setup lang="ts">
import { Icon } from "@iconify/vue";

const emit = defineEmits(["closeEditor"]);

const props = defineProps<{
  username: string | string[];
  displayName: string;
  description: string;
}>();

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
    await editProfile(input.value, props.username);
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
      @click="$emit('closeEditor')"
      icon="mingcute:close-fill"
      color="#FFFFFF"
      width="30"
      class="absolute top-[-4px] right-[-2px] border-[2px] border-[#FFFFFF] bg-[#A44646] rounded-2xl bg-origin-padding p-1 transition ease-in-out delay-75 hover:-translate-x-[-2px] hover:scale-105 duration-75"
    />
    <p class="text-center font-bold text-xl">Edit Profile</p>
    <TextInput title="Display Name" v-model="input.displayName" />
    <TextInput title="Description" v-model="input.description" />
    <Button
      :disabled="!isFormValid"
      @click="handleSubmit"
      class="rounded-2xl font-bold text-xl"
      >Save Changes</Button
    >
  </div>
</template>
