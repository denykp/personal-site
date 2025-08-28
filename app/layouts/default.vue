<script setup lang="ts">
import type { StepperItem } from "@nuxt/ui";

const items = ref<StepperItem[]>([
  {
    title: "Address",
    description: "Add your address here",
    icon: "i-lucide-house",
  },
  {
    title: "Shipping",
    description: "Set your preferred shipping method",
    icon: "i-lucide-truck",
  },
  {
    title: "Checkout",
    description: "Confirm your order",
  },
]);

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
</script>

<template>
  <div
    class="h-screen w-full not-even:bg-gradient-to-br from-black to-gray-900 flex flex-col"
  >
    <UContainer class="grid grid-cols-5 gap-8 grow">
      <div class="col-span-4">
        <slot></slot>
      </div>
      <div
        class="flex items-center justify-center col-span-1 w-full border-l border-gray-700 rounded-full"
      >
        <div class="w-full pl-12 flex flex-col gap-12">
          <NuxtLink
            v-for="(menu, idx) in listMenu"
            :key="menu.path"
            :to="menu.path"
            class="flex items-start gap-2 transition-transform origin-left text-2xl font-bold group"
          >
            <div>
              <UIcon :name="menu.icon" />
              <!-- <USeparator
                orientation="vertical"
                class="h-6"
                :class="{ hidden: idx === listMenu.length - 1 }"
              /> -->
            </div>
            <div
              class="w-0 h-8 group-hover:!w-96 transition-all overflow-hidden duration-400 whitespace-nowrap"
            >
              {{ menu.label }}
            </div>
          </NuxtLink>
        </div>
      </div>
    </UContainer>
    <c-footer />
  </div>
</template>
