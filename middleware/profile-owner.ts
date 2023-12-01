export default defineNuxtRouteMiddleware((to, from) => {
  const username = useCookie("username");
  const pathParam = to.path.split("/")[1];

  console.log("check profile owner");
  if (username.value !== pathParam) {
    return navigateTo(`/${pathParam}`);
  }
});
