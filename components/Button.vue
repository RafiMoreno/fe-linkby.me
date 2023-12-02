<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
defineProps({
  disabled: Boolean,
});
</script>

<template>
  <button
    v-bind="$attrs"
    :disabled="disabled"
    class="bg-dark-red w-full text-white rounded-xl h-12"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<style>
button:disabled {
  background-color: #dddddd;
  color: black;
}
button:hover:enabled {
  filter: brightness(80%);
}
</style>
