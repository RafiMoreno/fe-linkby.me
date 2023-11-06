<script setup lang="ts">
import TextInput from '~/components/TextInput.vue';
</script>


<template>
    <div class="container m-auto flex flex-col items-center min-h-screen justify-around">
        <h1 class="text-dark-red text-[100px] select-none">Link<sub class="text-[50px]">by.me</sub></h1>
        <div class="flex flex-col px-12 w-[406px] items-center gap-[16px]">
            <p class="text-base"><b>Log in to your account</b></p>
            <TextInput title="Username"/>
            <TextInput title="Password" type="password"/>
            <Button>Log in</Button>
        </div>
        <p class="text-center text-sm">Don't have an account?<br/><NuxtLink to="/sign-up" class="hover:cursor-pointer underline">Sign Up</NuxtLink></p>
    </div>

</template>