<script setup>
import { Icon } from "@iconify/vue";
const props = defineProps({
  variant: {
    type: String,
    validators: (value) => ["default", "edit", "view", "add"].includes(value),
    default: "default",
  },
  url: {
    type: String,
    default: null,
  },
  imageUrl: {
    type: String,
    default: "",
  },
  handleEditClick: {
    type: Function,
    default: null,
  },
  primaryColor: {
    type: String,
    default: null,
  },
  secondaryColor: {
    type: String,
    default: null,
  },
});

const handleClick = () => {
  if (process.browser && props.variant === "default") {
    window.open(props.url, "_blank").focus();
  }
};
</script>

<template>
  <div
    class="link-box transition ease-in-out delay-75 hover:-translate-y-[-4px] hover:scale-105 duration-75"
    :class="variant"
    v-bind="$attrs"
    @click="handleClick"
  >
    <NuxtImg
      v-if="variant != 'create' && imageUrl != ''"
      class="object-contain w-[32px] h-[32px]"
      :src="imageUrl"
    />
    <Icon
      v-else-if="variant == 'create'"
      icon="ic:outline-add"
      :color="primaryColor"
      width="32"
      class=""
    />
    <div v-else class="w-[32px] h-[32px]" />

    <div class="flex-1 font-bold">
      <slot />
    </div>
    <div
      v-if="variant == 'edit'"
      class="link-box-icon-button w-[32px] aspect-square rounded-[50%] grid place-items-center link-circle-button"
      @click="handleEditClick"
    >
      <Icon icon="mdi:pencil" :color="secondaryColor" width="16.8" class="" />
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
  color: v-bind(primaryColor);
  background-color: v-bind(secondaryColor);
}

.link-box-icon-button {
  color: v-bind(secondaryColor);
  background-color: v-bind(primaryColor);
}
/* .link-circle-button:hover,
.default:hover {
  filter: brightness(80%);
} */
</style>
