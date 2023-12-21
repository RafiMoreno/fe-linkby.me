<script setup lang="ts">
import { Icon } from "@iconify/vue";
const props = defineProps({
  variant: {
    type: String,
    validators: (value: string) =>
      ["default", "edit", "view", "add"].includes(value),
    default: "default",
  },
  link: {
    type: Object as PropType<Link>,
    default: () => ({}),
  },
  primaryColor: {
    type: String,
    default: "#A44646",
  },
  secondaryColor: {
    type: String,
    default: "#FFFFFF",
  },
  showClickCount: {
    type: Boolean,
  },
});

const handleClick = () => {
  if (process.browser && props.variant === "default") {
    const w = window.open(props.link.url, "_blank");
    if (w) {
      w.focus();
    }
  }
};

const formatClickCount = (n: number) => {
  const count =
    n >= 1000
      ? `${Math.floor(n / 1000)}k`
      : n >= 1000000
        ? `${Math.floor(n / 1000000)}m`
        : n;
  const click = n === 1 ? "click" : "clicks";
  return `${count} ${click}`;
};
</script>

<template>
  <div
    class="link-box transition ease-in-out delay-75 hover:-translate-y-[-4px] hover:scale-105 duration-75"
    :class="variant"
    v-bind="$attrs"
    @click="handleClick"
  >
    <Icon
      v-if="variant != 'create' && link.iconUrl != '' && link != undefined"
      :icon="link.iconUrl!"
      :color="link.iconColor"
      class="object-contain w-[32px] h-[32px]"
    />
    <Icon
      v-else-if="variant == 'create'"
      icon="ic:outline-add"
      :color="primaryColor"
      width="32"
      class=""
    />
    <div v-else class="w-[32px] h-[32px]" />

    <div class="flex-1 flex flex-col">
      <span class="font-bold"><slot /></span>
      <span v-if="showClickCount" class="">
        {{ formatClickCount(link.clickCount) }}
      </span>
    </div>
    <div
      v-if="variant == 'edit'"
      class="link-box-icon-button w-[32px] aspect-square rounded-[50%] grid place-items-center link-circle-button"
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
