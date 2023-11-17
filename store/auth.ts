import { defineStore } from 'pinia';

interface UserPayload {
  username: string;
  password: string;
}

interface Token {
    token: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
  }),
  actions: {
    async authenticateUser({ username, password }: UserPayload) {
      // useFetch from nuxt 3
      const { data, pending } = await useFetch<Token>('http://localhost:8080/api/v1/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          username,
          password,
        },
      });
      this.loading = pending.value;
      if (data.value) {
        console.log(data)
        const token = useCookie('token'); // useCookie new hook in nuxt 3
        token.value = data?.value?.token; // set token to cookie
        this.authenticated = true; // set authenticated  state value to true
      }
    },
    logUserOut() {
      const token = useCookie('token'); // useCookie new hook in nuxt 3
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
    },
  },
});