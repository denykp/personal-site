<script setup lang="ts">
const listMenu = [
  {
    label: "Home",
    path: "/",
    icon: "heroicons:home",
  },
  {
    label: "Tech Stack",
    path: "/tech-stack",
    icon: "heroicons:square-3-stack-3d",
  },
  {
    label: "Portfolio",
    path: "/portfolio",
    icon: "heroicons:briefcase",
  },
];

const route = useRoute();

const isMenuExpanded = ref(true);
const menuTimeout = ref<NodeJS.Timeout | null>(null);
const enterMenu = () => {
  isMenuExpanded.value = true;
  if (menuTimeout.value) {
    clearTimeout(menuTimeout.value);
  }
};
const leaveMenu = () => {
  isMenuExpanded.value = true;
  menuTimeout.value = setTimeout(() => {
    isMenuExpanded.value = false;
  }, 1000);
};
// reset on mount
onMounted(() => {
  leaveMenu();
});
</script>

<template>
  <div
    class="h-screen w-full bg-gradient-to-br from-black to-gray-900 flex flex-col overflow-auto scrollable-container-inset"
  >
    <div class="flex items-center justify-center sticky top-0 z-10">
      <div
        class="flex gap-4 border-b border-x border-gray-700 -mt-4.5 p-4 pt-8 rounded-3xl transition-all duration-300"
        style="backdrop-filter: blur(10px)"
        @mouseenter="enterMenu"
        @mouseleave="leaveMenu"
      >
        <NuxtLink
          v-for="menu in listMenu"
          :key="menu.path"
          :to="menu.path"
          class="flex items-center gap-2"
          :class="{
            'text-primary': menu.path === route.path,
          }"
        >
          <UIcon
            :name="menu.icon"
            class="text-lg transition-all duration-400"
            :class="{ 'lg:!text-3xl': isMenuExpanded }"
          />
          <div
            class="text-sm lg:text-lg font-bold max-w-0 overflow-hidden h-6 transition-all duration-400"
            :class="{ '!max-w-32': isMenuExpanded }"
          >
            {{ menu.label }}
          </div>
        </NuxtLink>
      </div>
    </div>

    <UContainer class="flex gap-8 grow">
      <div class="grow" @mousemove="leaveMenu">
        <slot></slot>
      </div>
    </UContainer>
    <c-footer />
  </div>
</template>
