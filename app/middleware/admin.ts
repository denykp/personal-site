import useApiAuth from "~/composables/api/useApiAuth";

export default defineNuxtRouteMiddleware(async (to) => {
  const { userData, getMe } = useApiAuth();
  if (!userData.value.username && !RegExp("/admin/login").test(to.path)) {
    const { data } = await getMe();
    if (!data.value?.username) {
      return navigateTo("/admin/login");
    }
  }
  if (userData.value.username && RegExp("/admin/login").test(to.path)) {
    return navigateTo("/admin");
  }
  return;
});
