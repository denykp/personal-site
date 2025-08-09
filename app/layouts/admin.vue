<script setup lang="ts">
import { UButton } from "#components";
import type { NavigationMenuItem } from "@nuxt/ui";

const menu = ref<NavigationMenuItem[][]>([
  [
    {
      label: "Dashboard",
      name: "dashboard",
      to: "/admin",
      icon: "heroicons:home",
    },
    {
      label: "Tech Stack",
      name: "tech-stack",
      icon: "hugeicons:nano-technology",
      to: "/admin/tech-stack",
    },
    {
      label: "Portfolio",
      name: "portfolio",
      to: "/admin/portfolio",
      icon: "heroicons:briefcase",
    },
  ],
]);
const sidebarCollapsed = ref(false);
</script>

<template>
  <div class="flex">
    <aside
      class="col-span-1 p-4 pr-0 h-screen transition-all shrink-0 duration-400"
      :class="sidebarCollapsed ? 'w-17 !p-0' : 'w-72'"
    >
      <div
        class="bg-neutral-950 p-4 h-full box-shadow w-full transition-all duration-400"
        :class="sidebarCollapsed ? '' : 'rounded-2xl'"
      >
        <div
          v-if="!sidebarCollapsed"
          class="mb-4 text-2xl font-bold line-clamp-1 text-center"
        >
          Admin Dashboard
        </div>
        <UNavigationMenu
          :collapsed="sidebarCollapsed"
          :items="menu"
          orientation="vertical"
          :ui="{
            item: 'py-1',
            link: 'h-11 text-md',
            linkLeadingIcon: 'size-6 mr-1',
          }"
        />
      </div>
    </aside>
    <div class="col-span-4 p-4 flex flex-col gap-4 w-full">
      <nav class="w-full bg-neutral-950 p-4 rounded-2xl box-shadow">
        <UButton
          icon="heroicons:bars-3-16-solid"
          @click="sidebarCollapsed = !sidebarCollapsed"
        />
      </nav>
      <main class="w-full">
        <slot />
      </main>
    </div>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translate(0, 25px);
}
</style>
