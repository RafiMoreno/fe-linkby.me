<script setup>
import { Icon } from "@iconify/vue";
const props = defineProps({
  variant: {
    type: String,
    validators: (value) => ["default", "edit", "view", "add"].includes(value),
    default: "default",
  },
  url: String,
  imageUrl: String,
  handleEditClick: Function,
});

const handleClick = () => {
  if (process.browser && props.variant == "default") {
    window.open(props.url, "_blank").focus();
  }
};
</script>

<template>
  <div class="link-box" :class="variant" v-bind="$attrs" @click="handleClick">
    <NuxtImg
      v-if="variant != 'create' && imageUrl != undefined && imageUrl != ''"
      class="object-contain w-[32px] h-[32px]"
      :src="imageUrl"
    />
    <Icon
      v-else-if="variant == 'create'"
      icon="ic:outline-add"
      color="white"
      width="32"
      class=""
    />
    <div v-else class="w-[32px] h-[32px]" />

    <div class="flex-1 font-bold"><slot /></div>
    <div
      v-if="variant == 'edit'"
      class="w-[32px] aspect-square rounded-[50%] bg-dark-red grid place-items-center link-circle-button"
      @click="handleEditClick"
    >
      <Icon icon="mdi:pencil" color="white" width="16.8" class="" />
    </div>
  </div>
</template>

<style scoped>
.link-box {
  display: flex;
  width: 90%;
  height: fit-content;
  min-height: 64;
  padding: 16px;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
  border-radius: 30px;
  box-shadow: 0px 6px 4px 0px rgba(0, 0, 0, 0.25);
}

.link-circle-button:hover,
.default:hover {
  filter: brightness(80%);
}
</style>
