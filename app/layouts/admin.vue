<script setup lang="ts">
import { UButton } from "#components";
import type { NavigationMenuItem } from "@nuxt/ui";
import useApiAuth from "~/composables/api/useApiAuth";

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

const { userData, logout } = useApiAuth();
const nameInitial = computed(() => getInitial(userData.value?.name));
const handleLogout = async () => {
  const response = await logout();
  if (response) {
    navigateTo(`/admin/login`);
  }
};
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
      <nav
        class="w-full bg-neutral-950 p-4 rounded-2xl box-shadow flex justify-between"
      >
        <UButton
          icon="heroicons:bars-3-16-solid"
          @click="sidebarCollapsed = !sidebarCollapsed"
        />
        <ClientOnly>
          <div class="flex items-center">
            <USkeleton v-if="!userData" class="w-52 h-6 bg-neutral-5 mr-3" />
            <span v-else class="text-gray-700 mr-3 dark:text-neutral-200"
              >Halo, {{ userData?.name }}!</span
            >
            <UPopover
              :content="{ align: 'center', side: 'bottom', sideOffset: 14 }"
            >
              <img
                v-if="userData?.name"
                :src="`https://placehold.co/40x40/51a2ff/020420?text=${nameInitial}`"
                alt="Avatar Pengguna"
                class="w-10 h-10 rounded-full border-2 border-neutral-200 dark:border-neutral-700 cursor-pointer"
              />
              <template #content>
                <div class="p-2 w-40">
                  <UButton
                    block
                    variant="ghost"
                    icon="i-heroicons-arrow-left-on-rectangle"
                    class="justify-start font-bold"
                    @click="handleLogout"
                  >
                    Logout
                  </UButton>
                </div>
              </template>
            </UPopover>
          </div>
        </ClientOnly>
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
