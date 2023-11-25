import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware((to, from) => {
        const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive
        const token = useCookie('token'); // get token from cookies
        const username = useCookie('username');
        if (token.value) {
            // check if value exists
            authenticated.value = true; // update the state to authenticated
        } else {
            authenticated.value = false;
        }
        // if token exists and url is /login redirect to homepage
        if (authenticated.value && to?.name === 'login') {
            return navigateTo(`/${username.value}`);
        }
      
        // if token doesn't exist redirect to log in
        if (!authenticated.value && to?.name !== 'login') {
            console.log("not authenticated")
            abortNavigation();
            return navigateTo(`/login`);
        }
})