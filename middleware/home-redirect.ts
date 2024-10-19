export default defineNuxtRouteMiddleware((to, from) => {
  return navigateTo("/dashboard", { redirectCode: 301 });
});
