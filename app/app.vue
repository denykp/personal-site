<script setup lang="ts">
// definePageMeta({
//   colorMode: "dark",
// });
const isMounted = ref(false);
onMounted(() => {
  // useColorMode().preference = "ligth";
  isMounted.value = true;
});
</script>

<template>
  <!-- <NuxtWelcome /> -->
  <div
    v-if="!isMounted"
    class="h-screen w-screen flex justify-center items-center overflow-hidden absolute top-0 left-0 bg-neutral-900 z-50"
  >
    <NuxtImg
      src="/android-chrome-512x512.png"
      alt="logo"
      width="125px"
      class="animate-deep-pulse"
    />
  </div>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
