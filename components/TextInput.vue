<script setup>
const props = defineProps(['title', 'hintText'])
console.log(props.hintText)
</script>

<template>
        <div class="select-none w-full">
            <label for="first_name" class="block mb-1 text-sm select-text">{{ title }}</label>
            <input v-bind="$attrs"  class="border w-full border-gray-800 rounded-xl h-12 px-2 focus:ring-blue-500 focus:border-blue-500" :placeholder="hintText" required>
        </div>
</template>