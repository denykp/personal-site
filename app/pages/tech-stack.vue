<script setup lang="ts">
import useApiPublic from "~/composables/api/useApiPublic";

const { getListStack } = useApiPublic();
const { data: listStack } = await getListStack();
</script>

<template>
  <div class="h-full w-full flex items-center justify-center">
    <div>
      <h1 class="text-center text-2xl sm:text-4xl font-bold mb-4">
        These are the stacks I usually use
      </h1>
      <div
        class="flex gap-5 gap-y-10 justify-center flex-wrap p-4 lg:p-8 lg:w-3/4 lg:mx-auto border border-gray-600 rounded-4xl">
        <NuxtLink v-for="(item, index) in listStack" :key="index"
          class="relative flex flex-col items-center justify-center shrink-0 group transition-all" data-aos="zoom-in"
          :data-aos-delay="index * 25" :to="item.url" target="_blank">
          <NuxtImg v-if="item.logo && item.logo !== 'undefined'" :src="item.logo"
            class="w-10 h-10 lg:w-16 lg:h-16 rounded-lg p-1 transition-transform duration-200 hover:scale-150 object-contain"
            :style="{ backgroundColor: item.color || undefined }" :alt="item.name" :aria-label="item.name" />
          <div v-else
            class="w-10 h-10 lg:w-16 lg:h-16 rounded-lg flex items-center justify-center transition-transform duration-200 hover:scale-150 font-black bg-white"
            :style="{ color: item.color }">
            {{ item.name }}
          </div>
          <!-- Tech Stack Name Tooltip -->
          <span class="absolute top-full mt-4 px-2 py-1 text-xs font-medium text-white bg-neutral-900 border border-gray-800 rounded-md shadow-2xl opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 pointer-events-none whitespace-nowrap z-10">
            {{ item.name }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
