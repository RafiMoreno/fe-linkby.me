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

const style =
  props.variant === "outline"
    ? {
        "background-color": "#ffffff",
        color: "#a44646",
        border: "1px solid #dddddd",
      }
    : {
        "background-color": "#a44646",
        color: "#ffffff",
      };
</script>

<template>
  <button
    v-bind="$attrs"
    :disabled="disabled"
    :style="style"
    class="w-full rounded-xl h-12 font-bold"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<style scoped>
button:disabled {
  background-color: #dddddd;
  color: black;
}

button:hover:enabled {
  filter: brightness(95%);
}
</style>
