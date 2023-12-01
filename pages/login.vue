<script setup lang="ts">
import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia

import { useAuthStore } from "~/store/auth"; // import the auth store we just created

const { authenticateUser } = useAuthStore(); // use authenticateUser action from  auth store

const { authenticated, error } = storeToRefs(useAuthStore());

const snackbar = useSnackbar();

const user = ref({
  username: "",
  password: "",
});

const router = useRouter();

const login = async () => {
  useAuthStore().$reset();
  await authenticateUser(user.value); // call authenticateUser and pass the user object
  // redirect to homepage if user is authenticated
  if (authenticated.value) {
    snackbar.add({
      type: "success",
      text: "Log in successfull",
    });
    router.push(`${user.value.username}`);
  }
  if (error.value) {
    snackbar.add({
      type: "error",
      text: error.value.data?.error ?? "Error",
    });
  }
};

definePageMeta({
  middleware: ["auth"], // this should match the name of the file inside the middleware directory
});
</script>

<template>
  <div
    class="container m-auto flex flex-col items-center min-h-screen justify-around"
  >
    <h1 class="text-dark-red text-[100px] select-none font-black">
      Link<sub class="text-[50px]">by.me</sub>
    </h1>
    <div class="flex flex-col px-12 w-[406px] items-center gap-[16px] form">
      <p class="text-base"><b>Log in to your account</b></p>
      <TextInput v-model="user.username" title="Username" required />
      <TextInput
        v-model="user.password"
        title="Password"
        type="password"
        required
      />
      <Button @click.prevent="login">Log in</Button>
    </div>
    <p class="text-center text-sm">
      Don't have an account?<br /><NuxtLink
        to="/sign-up"
        class="hover:cursor-pointer underline"
        >Sign Up</NuxtLink
      >
    </p>
  </div>
</template>
