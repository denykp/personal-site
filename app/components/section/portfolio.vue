<script setup lang="ts">
import { listPortfolio } from "~/contents/portfolio";

const displayedPortfolio = computed(() => {
  return listPortfolio;
});
</script>

<template>
  <div
    class="bg-black h-screen w-full text-white bg-gradient-to-bl from-gray-900 to-black relative overflow-x-clip pt-24 lg:pt-12"
  >
    <UContainer class="absolute top-12 left-1/2 -translate-x-1/2 z-[2]">
      <div class="px-5">
        <div class="text-4xl font-bold mb-10">
          These are the projects I've been done before.
        </div>
        <div class="-ml-4">
          <div
            v-for="item in displayedPortfolio"
            class="mb-5 flex gap-8 p-4 transition-[padding] duration-300 hover:outline outline-gray-800 bg-gradient-to-tl from-gray-950 to-gray-800 rounded-xl h-36"
          >
            <div class="shrink-0">
              <NuxtImg :src="item.images[0]" class="w-48 h-full rounded-lg" />
            </div>
            <div>
              <div class="font-bold lg:flex w-fit">
                <div class="text-xl line-clamp-1">{{ item.name }}&nbsp;</div>
                <!-- <div class="text-md md:text-xl">({{ item.years }})</div> -->
              </div>
              <div class="text-neutral-300 text-sm line-clamp-2">
                {{ item.description }}
              </div>
              <div class="font-semibold">
                <!-- {{ item.stacks.join(", ") }} -->
                <template v-for="stack in item.stacks" :key="stack">
                  <UBadge
                    class="mt-2 mr-1"
                    :label="stack"
                    color="primary"
                    size="sm"
                  />
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
    <!-- <c-footer class="absolute bottom-0"></c-footer> -->
  </div>
</template>

<style lang="postcss"></style>
