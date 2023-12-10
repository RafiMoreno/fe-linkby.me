<script setup>
defineProps({
  title: String,
  placeholder: String,
  modelValue: undefined,
});
defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="select-none w-full">
    <label for="first_name" class="block mb-1 text-sm select-text">{{
      title
    }}</label>
    <div>
      <input
        v-bind="$attrs"
        class="border w-full border-[#CCCCCC] rounded-xl h-12 px-2 focus:ring-blue-500 focus:border-blue-500"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>
