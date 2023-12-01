<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
defineProps(["onClick"]);
</script>

<template>
  <button
    v-bind="$attrs"
    class="bg-dark-red w-full text-white rounded-xl h-12 hover:bg-red-900"
    @click="onClick"
  >
    <slot />
  </button>
</template>
