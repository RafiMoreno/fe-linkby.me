import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: false,
    loading: false,
    username: null as string | null,
    error: null as ErrorResponse | null,
  }),
  actions: {
    async authenticateUser(payload: LoginSubmitPayload) {
      // useFetch from nuxt 3
      // console.log(payload)
      const { data, pending, error } = await useFetch<LogInResponse>(
        "/api/v1/login",
        {
          baseURL: useRuntimeConfig().public.APIBaseUrl,
          method: "post",
          headers: { "Content-Type": "application/json" },
          key: payload.username + payload.password,
          credentials: "include",
          body: payload,
        },
      );
      console.log("store/auth.ts authenticateUser");
      console.log("response", data.value, "loading", pending.value);
      this.loading = pending.value;
      if (data.value) {
        console.log(data);
        const username = useCookie("username"); // useCookie new hook in nuxt 3
        username.value = payload.username; // set token to cookie
        this.authenticated = true; // set authenticated  state value to true
        this.username = payload.username;
      } else if (error.value) {
        console.log("error", error);
        this.error = error.value as ErrorResponse;
      }
    },

    logUserOut() {
      const token = useCookie("token"); // useCookie new hook in nuxt 3
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
    },

    async validateToken() {
      const token = useCookie("token");
      const { data, pending, error } = await useFetch<ValidateResponse>(
        "/api/v1/validate",
        {
          baseURL: useRuntimeConfig().public.APIBaseUrl,
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: token.value ?? "",
          },
        },
      );
      this.loading = pending.value;
      console.log(data.value, error.value);
      if (data.value) {
        console.log("data");
        this.authenticated = true;
        console.log(data.value.message);
        this.username = data.value.username ?? "";
      } else if (error) {
        console.log("error", error.value?.message);
        this.logUserOut();
      }
    },
  },
});
