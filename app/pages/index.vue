<script setup lang="ts">
import type { Menu } from "~~/shared/types";

useSeoMeta({
  title: "Frontend Engineer | FullStack Node.js Engineer",
  description:
    "Frontend Engineer with 11 years of software development experience, including 5 years in web development using Vue and Nuxt, and 6 years in desktop application development. Skilled in building responsive interfaces, integrating backend APIs, and creating reporting systems. Comfortable working across the full stack using Express.js, SQL databases, and legacy systems like VB6",
});

const mounted = ref(false);

const sectionIdx = ref(0);
const isScrolled = ref(false);
const handleScroll = (e: any) => {
  const { scrollTop, offsetHeight } = e.target;
  if (scrollTop > 10) {
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
  // {
  //   name: "profile",
  //   label: "Brief Introduction",
  // },
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
  <!-- <c-nav
    :list-menu="listMenu"
    :active-menu="activeSection"
    :is-scrolled="isScrolled"
    @scroll-to="scrollToView"
  /> -->
  <div
    class="snap-y snap-mandatory overflow-y-auto max-h-screen"
    @scroll="handleScroll"
  >
    <section-main id="section-main" class="" :mounted="mounted" />
    <!-- <section-profile
      id="section-profile"
      class=""
      :is-visible="sectionIdx > 0"
    /> -->
    <!-- <section-experience
      id="section-experience"
      class="snap-start snap-always"
    ></section-experience> -->
    <section-portfolio
      v-if="mounted"
      id="section-portfolio"
      :active-menu="activeSection"
    />
    <c-footer v-if="mounted" class=""></c-footer>
  </div>
</template>

<style lang="postcss"></style>
