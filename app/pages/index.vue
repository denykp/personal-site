<script setup lang="ts">
import type { Menu } from "~/types";

const mounted = ref(false);

const sectionIdx = ref(0);
const isScrolled = ref(false);
const handleScroll = (e: any) => {
  const { scrollTop, offsetHeight } = e.target;
  if (scrollTop > 300) {
    isScrolled.value = true;
  } else {
    isScrolled.value = false;
  }
  sectionIdx.value = Math.round(scrollTop / offsetHeight);
};

onMounted(() => {
  mounted.value = true;
});

const listMenu: Menu[] = [
  {
    name: "main",
    label: "Main",
  },
  {
    name: "profile",
    label: "Brief Introduction",
  },
  {
    name: "portfolio",
    label: "Portfolio",
  },
];

const activeSection = computed(() => {
  const listSection = listMenu.map((item) => item.name);
  return listSection[sectionIdx.value];
});
const scrollToView = (sectionId: string) => {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
};
</script>

<template>
  <c-nav
    :list-menu="listMenu"
    :active-menu="activeSection"
    :is-scrolled="isScrolled"
    @scroll-to="scrollToView"
  />
  <div
    class="snap-y snap-mandatory overflow-y-auto max-h-screen"
    @scroll="handleScroll"
  >
    <section-main id="section-main" class="" :mounted="mounted" />
    <section-profile
      id="section-profile"
      class=""
      :is-visible="sectionIdx > 0"
    />
    <!-- <section-experience
      id="section-experience"
      class="snap-start snap-always"
    ></section-experience> -->
    <section-portfolio id="section-portfolio" :active-menu="activeSection" />
    <c-footer class=""></c-footer>
  </div>
</template>

<style lang="postcss"></style>
