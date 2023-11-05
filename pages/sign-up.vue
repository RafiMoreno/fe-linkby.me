<script setup>
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
            <Button text="Submit" />
        </div>
        <p class="text-center text-sm"><b>Already have an account?<br/><u class="hover:cursor-pointer">Log in</u></b></p>
    </div>

</template>