<script setup lang="ts">
import { Icon } from "@iconify/vue";

const props = defineProps<{
username: string | string[]
}>()

const input = ref({
  displayName: "",
  description: "",
});

const snackbar = useSnackbar();

interface Link {
  id: string;
  url: string;
  linkTitle: string;
  clickCount: string;
  imageUrl?: string;
}

interface Profile {
  ID: number;
  CreatedAt?: string;
  UpdatedAt?: string;
  DeletedAt?: null;
  displayName: string;
  primaryColor: string;
  secondaryColor: string;
  description: string;
  displayPicture: string;
  links?: Link[];
}

interface EditProfileResponse {
  profile: Profile;
}

const loading = ref(false);

const editProfile = async (username: string | string[]) => {
  const { data, pending, error } = await useFetch<EditProfileResponse>(
    `http://localhost:8080/api/v1/profile/${username}`,
    {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: input,
      credentials: "include"
    },
  );
  loading.value = pending.value;
  if(data.value){
    snackbar.add({
      type: "success",
      text: "Succesfully edited your profile",
    });
  }
  if (error.value) {
    snackbar.add({
      type: "error",
      text: error.value.data?.error ?? "Error",
    });
  }
};

const isFormValid = computed(
  () => input.value.description !== "" || input.value.displayName !== "",
);
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
    <TextInput title="Display Name" v-model="input.displayName"/>
    <TextInput title="Description" v-model="input.description"/>
    <Button :disabled="!isFormValid" @click="editProfile(props.username)" class="rounded-2xl font-bold text-xl">Save Changes</Button>
  </div>
</template>
