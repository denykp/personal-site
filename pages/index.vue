<script setup lang="ts">
const mounted = ref(false);

const sectionIdx = ref(0);
const handleScroll = (e: any) => {
  const { scrollTop, offsetHeight } = e.target;
  sectionIdx.value = Math.round(scrollTop / offsetHeight);
};

onMounted(() => {
  mounted.value = true;
});

const activeSection = computed(() => {
  const listSection = ["main", "profile", "experience"];
  return listSection[sectionIdx.value];
});

const listMenu = ref([
  {
    name: "main",
    label: "Main",
  },
  {
    name: "profile",
    label: "Brief Introduction",
  },
  {
    name: "experience",
    label: "Work Experience",
  },
]);
</script>

<template>
  <c-nav :list-menu="listMenu" :active-menu="activeSection"></c-nav>
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
      :is-visible="sectionIdx > 0"
    ></section-profile>
    <section-experience
      id="section-experience"
      class="snap-start snap-always"
    ></section-experience>
    <c-footer class="snap-start snap-always"></c-footer>
  </div>
</template>

<style lang="postcss"></style>
