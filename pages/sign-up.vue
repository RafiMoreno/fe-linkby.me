<script setup lang="ts">
import TextInput from '~/components/TextInput.vue';
</script>


<template>
    <div class="container m-auto flex flex-col items-center min-h-screen justify-around">
        <h1 class="text-dark-red text-[100px] select-none">Link<sub class="text-[50px]">by.me</sub></h1>
        <div class="flex flex-col px-12 w-[406px] items-center gap-[16px]">
            <p class="text-base"><b>Create Your Account</b></p>
            <TextInput title="Username"/>
            <TextInput title="Password" type="password"/>
            <TextInput title="Confirm Password" type="password"/>
            <Button> Sign Up </Button>
        </div>
        <p class="text-center text-sm">Already have an account?<br/><NuxtLink to="/login" class="hover:cursor-pointer underline">Log in</NuxtLink></p>
    </div>

</template>