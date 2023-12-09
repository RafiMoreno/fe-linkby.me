<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
defineProps({
  disabled: Boolean,
  variant: {
    type: String,
    validators: (value) => ["fill", "outline"].includes(value),
    default: "fill",
  },
});
</script>

<template>
  <button
    v-bind="$attrs"
    :disabled="disabled"
    :class="variant"
    class="w-full rounded-xl h-12"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<style scoped>
.fill {
  background-color: #a44646;
  color: #ffffff;
}

.outline {
  background-color: #ffffff;
  color: #a44646;
}

button:disabled {
  background-color: #dddddd;
  color: black;
}

button:hover:enabled {
  filter: brightness(80%);
}
</style>
