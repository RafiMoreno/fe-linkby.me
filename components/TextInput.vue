<script setup>
const props = defineProps({
    title: String,
    hintText: String,
    modelValue: undefined
})
defineEmits(['update:modelValue'])
</script>

<template>
    <div class="select-none w-full">
        <label for="first_name" class="block mb-1 text-sm select-text">{{ title }}</label>
        <input
            v-bind="$attrs"  
            class="border w-full border-gray-800 rounded-xl h-12 px-2 focus:ring-blue-500 focus:border-blue-500" 
            :placeholder="hintText" 
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            />
    </div>
</template>