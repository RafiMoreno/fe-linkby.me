import { defineStore } from 'pinia';

interface UserPayload {
  username: string;
  password: string;
}

interface LogIn {
    token: string
}

interface Validate {
  message: string,
  username?: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
    username: null as string | null
  }),
  actions: {
    async authenticateUser(payload: UserPayload) {
      // useFetch from nuxt 3
      const { data, pending } = await useFetch<LogIn>('http://localhost:8080/api/v1/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: payload
      });
      this.loading = pending.value;
      if (data.value) {
        console.log(data)
        const token = useCookie('token'); // useCookie new hook in nuxt 3
        console.log(`this is the ${token}`)
        console.log(token)
        token.value = data.value.token; // set token to cookie
        const username = useCookie('username'); // useCookie new hook in nuxt 3
        username.value = payload.username; // set token to cookie
        this.authenticated = true; // set authenticated  state value to true
        this.username = payload.username
      }
    },
    
    logUserOut() {
      const token = useCookie('token'); // useCookie new hook in nuxt 3
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
    },

    async validateToken(){
      const token = useCookie('token'); 
      const { data, pending, error } = await useFetch<Validate>('http://localhost:8080/api/v1/validate', {
        method: 'get',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token.value ?? ''
        },
      });
      this.loading = pending.value;
      console.log(data.value, error.value)
      if (data.value) {
        console.log("data")
        this.authenticated = true;
        console.log(data.value.message);
        this.username = data.value.username ?? '';
      }
      else if (error) {
        console.log("error",error.value?.message)
        this.logUserOut()
      }
    }
  },
});