<script setup lang="ts">
import { Icon } from "@iconify/vue";

const props = defineProps<{
  primaryColor: string;
  secondaryColor: string;
  username: string | string[];
}>();

const snackbar = useSnackbar();

const isColorPrimaryPickerActive = useState<Boolean>(
  "isColorPrimaryPickerActive",
  () => false,
);
const isColorSecondaryPickerActive = useState<Boolean>(
  "isColorSecondaryPickerActive",
  () => false,
);
const colorPrimary = ref(props.primaryColor);
const colorSecondary = ref(props.secondaryColor);

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

const editColor = async (username: string | string[]) => {
  const { data, pending, error } = await useFetch<EditProfileResponse>(
    `http://localhost:8080/api/v1/profile/${username}`,
    {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        primaryColor: colorPrimary.value,
        secondaryColor: colorSecondary.value,
      },
      credentials: "include",
    },
  );
  loading.value = pending.value;
  if (data.value) {
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
    <p class="text-center font-bold text-xl">Edit Theme</p>
    <div class="flex flex-col gap-1">
      <p class="font-normal text-base">Primary Color</p>
      <div
        class="flex flex-row border border-[#B2B2B2] rounded-2xl p-4 align-middle gap-4 cursor-pointer"
        @click="
          isColorPrimaryPickerActive = !isColorPrimaryPickerActive;
          isColorSecondaryPickerActive
            ? (isColorSecondaryPickerActive = !isColorSecondaryPickerActive)
            : null;
        "
      >
        <div
          class="border border-[#B2B2B2] rounded w-[32px] h-[32px]"
          :style="{ 'background-color': colorPrimary }"
        />
        <p class="self-center">{{ colorPrimary }}</p>
      </div>
      <v-color-picker
        v-if="isColorPrimaryPickerActive"
        v-model="colorPrimary"
        hide-inputs
        :modes="['hexa']"
        elevation="5"
        class="fixed z-20 top-[146px] left-10"
        style="width: 75%; height: 75%"
      />
    </div>

    <div class="flex flex-col gap-1">
      <p class="font-normal text-base">Secondary Color</p>
      <div
        class="flex flex-row border border-[#B2B2B2] rounded-2xl p-4 align-middle gap-4 cursor-pointer"
        @click="
          isColorSecondaryPickerActive = !isColorSecondaryPickerActive;
          isColorPrimaryPickerActive
            ? (isColorPrimaryPickerActive = !isColorPrimaryPickerActive)
            : null;
        "
      >
        <div
          class="border border-[#B2B2B2] rounded w-[32px] h-[32px]"
          :style="{ 'background-color': colorSecondary }"
        />
        <p class="self-center">{{ colorSecondary }}</p>
        <v-color-picker
          v-if="isColorSecondaryPickerActive"
          v-model="colorSecondary"
          hide-inputs
          :modes="['hexa']"
          elevation="5"
          class="fixed z-20 top-[252px]"
          style="width: 75%; height: 75%"
        />
      </div>
    </div>
    <Button class="rounded-2xl font-bold text-xl" @click="editColor(username)"
      >Save Changes</Button
    >
  </div>
</template>
