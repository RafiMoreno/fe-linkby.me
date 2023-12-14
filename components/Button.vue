<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const props = defineProps({
  disabled: Boolean,
  variant: {
    type: String,
    validators: (value) => ["fill", "outline"].includes(value),
    default: "fill",
  },
});

const buttonStyle = computed(() =>
  props.disabled
    ? {}
    : props.variant === "outline"
      ? {
          backgroundColor: "#ffffff",
          color: "#a44646",
          border: "1px solid #dddddd",
        }
      : {
          backgroundColor: "#a44646",
          color: "#ffffff",
          border: "none",
        },
);
</script>

<template>
  <button
    v-bind="$attrs"
    :disabled="disabled"
    class="w-full rounded-xl h-12 font-bold flex flex-row items-center justify-center gap-2"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<style scoped>
button {
  background-color: v-bind("buttonStyle.backgroundColor");
  color: v-bind("buttonStyle.color");
  border: v-bind("buttonStyle.border");
}
button:disabled {
  background-color: #dddddd;
  color: black;
  cursor: default;
}
button:hover:enabled {
  filter: brightness(95%);
}
</style>
