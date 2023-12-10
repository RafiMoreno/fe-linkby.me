<!-- eslint-disable no-console -->
<script setup lang="ts">
import { Icon } from "@iconify/vue";

const isModalActive = ref(false);

const isColorPickerActive = ref(false);

const iconSearchInput = ref<IconInput>({ name: "", color: "#070707" });

const icons = ref([]);

const emit = defineEmits<{
  onIconSelect: [icon: IconInput];
}>();

async function searchIcons() {
  const apiUrl = `https://api.iconify.design/search?query=${encodeURIComponent(
    iconSearchInput.value.name,
  )}`;
  console.log(iconSearchInput);

  try {
    const response = await fetch(apiUrl);
    icons.value = (await response.json()).icons;
    console.log(icons);
  } catch (error) {
    console.error("Error retrieving icons:", error);
  }
}

function handleIconSelect(icon: string) {
  emit("onIconSelect", { name: icon, color: iconSearchInput.value.color });
  isModalActive.value = false;
}
</script>

<template>
  <Button type="button" @click="isModalActive = true">Find an icon!</Button>
  <div
    v-if="isModalActive"
    class="bg-[#000000] fixed h-[150vh] w-[150vw] opacity-60 z-25 ml-[-30vw] mt-[-200px]"
  />
  <div
    v-if="isModalActive"
    class="fixed flex flex-col z-30 px-3 py-6 bg-white text-black rounded-[30px] top-1/2 left-1/2 gap-3 translate-y-[-50%] translate-x-[-50%] w-full h-full"
  >
    <Icon
      icon="mingcute:close-fill"
      color="#FFFFFF"
      width="24"
      class="absolute top-[-4px] right-[-2px] border-[2px] border-[#FFFFFF] bg-[#A44646] rounded-2xl bg-origin-padding p-1 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 duration-75"
      @click="isModalActive = false"
    />
    <p class="text-center font-bold text-xl">Click on an icon to select</p>
    <form
      class="flex flex-row items-center gap-4"
      @submit.prevent="searchIcons"
    >
      <div class="flex flex-row items-center p-4 align-middle gap-4 w-full">
        <div
          class="border border-[#B2B2B2] rounded w-[32px] h-[32px] cursor-pointer"
          :style="{ 'background-color': iconSearchInput.color }"
          @click.stop="isColorPickerActive = !isColorPickerActive"
        >
          <v-color-picker
            v-if="isColorPickerActive"
            v-model="iconSearchInput.color"
            hide-inputs
            :modes="['hexa']"
            elevation="5"
            class="z-50 select-none"
          />
        </div>
        <TextInput v-model="iconSearchInput.name" placeholder="E.g. 'error'" />
        <div
          class="bg-dark-red link-box-icon-button w-12 aspect-square rounded-[50%] grid place-items-center link-circle-button"
        >
          <button type="submit">
            <Icon icon="ic:outline-search" color="white" width="28" class="" />
          </button>
        </div>
      </div>
    </form>
    <div
      class="iconify-modal-icons flex flex-wrap flex-row overflow-y-auto justify-between"
    >
      <div
        v-for="(icon, index) in icons"
        :key="index"
        class="cursor-pointer"
        @click="() => handleIconSelect(icon as string)"
      >
        <v-tooltip :text="icon">
          <template #activator="{ props }">
            <Icon
              :icon="icon"
              :color="iconSearchInput.color"
              v-bind="props"
              width="40"
              height="40"
              class="m-4"
            />
          </template>
        </v-tooltip>
      </div>
    </div>
  </div>
</template>
