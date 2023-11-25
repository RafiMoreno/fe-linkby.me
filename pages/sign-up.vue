<script setup lang="ts">
import TextInput from '~/components/TextInput.vue';

interface SignUpResponse {
    message: String
}


const user = reactive({
  username: '',
  password: '',
  confirm: ''
})

const loading = ref(false)
const router = useRouter();
const snackbar = useSnackbar();

const signUp = async () => {
    console.log(user)
    if (user.password === user.confirm){
        console.log("calling api")
        const { data, pending, error, refresh } = await useFetch<SignUpResponse>('http://localhost:8080/api/v1/sign-up', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: user,
        key: user.username
      });
      loading.value = pending.value;
      console.log("data", data.value)
      if (data.value) {
        console.log(data.value.message)
        snackbar.add({
          type: 'success',
          text: data.value.message
        })
        router.push("/login")
      }
      else{
        snackbar.add({
          type: 'error',
          text: error.value?.data?.error ?? "An error has occured"
        })

    }
  }
  else {
    snackbar.add({
          type: 'error',
          text: "Password did not match"
        })
  }
}
</script>


<template>
    <div class="container m-auto flex flex-col items-center min-h-screen justify-around">
        <h1 class="text-dark-red text-[100px] select-none font-black">Link<sub class="text-[50px]">by.me</sub></h1>
        <div class="flex flex-col px-12 w-[406px] items-center gap-[16px]">
            <p class="text-base"><b>Create Your Account</b></p>
            <TextInput v-model="user.username" title="Username" required/>
            <TextInput v-model="user.password" title="Password" type="password" required/>
            <TextInput v-model="user.confirm" title="Confirm Password" type="password"/>
            <Button @click.prevent="signUp"> Sign Up </Button>
        </div>
        <p class="text-center text-sm">Already have an account?<br/><NuxtLink to="/login" class="hover:cursor-pointer underline">Log in</NuxtLink></p>
    </div>

</template>