<script setup lang="ts">
defineProps({
  size: { type: String, default: "16" },
  color: { type: String, default: "white" },
  thickness: { type: String, default: "2px" },
});
</script>

<template>
  <span v-bind="$attrs" class="spinner"></span>
</template>
<style>
.spinner {
  width: v-bind(size);
  height: v-bind(size);
  border: v-bind(thickness) solid v-bind(color);
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
