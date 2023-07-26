<script setup lang="ts">
const mounted = ref(false);

const sectionIdx = ref(0);
const handleScroll = (e: any) => {
  const { scrollTop, offsetHeight } = e.target;
  sectionIdx.value = Math.round(scrollTop / offsetHeight);
};

onMounted(() => {
  mounted.value = true;
  console.log("mounted");

  document.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  console.log("onUnmounted");

  document.removeEventListener("scroll", handleScroll);
});

const activeSection = computed(() => {
  const listSection = ["home", "profile", "experience"];
  return listSection[sectionIdx.value];
});

const scrollToView = (sectionId: string) => {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
};
</script>

<template>
  <div class="fixed mx-auto z-[2] w-full">
    <div
      class="container mx-auto flex justify-end gap-4 font-bold text-lg text-white rounded-lg py-2 opacity-0 transition-opacity duration-300"
      :class="[mounted ? 'opacity-100' : '']"
    >
      <div
        class="section"
        :class="activeSection == 'home' ? 'active-section' : ''"
        @click="scrollToView('section-main')"
      >
        Main
      </div>
      <div
        class="section"
        :class="activeSection == 'profile' ? 'active-section' : ''"
        @click="scrollToView('section-profile')"
      >
        Brief Introduction
      </div>
      <div
        class="section"
        :class="activeSection == 'experience' ? 'active-section' : ''"
        @click="scrollToView('section-experience')"
      >
        Work Experience
      </div>
    </div>
  </div>
  <div
    class="snap-y snap-mandatory overflow-y-auto max-h-screen"
    @scroll="handleScroll"
  >
    <section-main
      id="section-main"
      class="snap-start snap-always"
      :mounted="mounted"
    ></section-main>
    <section-profile
      id="section-profile"
      class="snap-start snap-always"
    ></section-profile>
    <section-experience
      id="section-experience"
      class="snap-start snap-always"
    ></section-experience>
  </div>
</template>

<style lang="postcss">
.section {
  @apply cursor-pointer hover:outline rounded-lg px-4;
}
.active-section {
  @apply bg-gray-600 px-4 rounded-lg !outline-none;
}
</style>
