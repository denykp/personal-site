<script setup lang="ts">
import useApiPublic from "~/composables/api/useApiPublic";

const { getList } = useApiPublic();
const { data: listStack } = getList();
</script>

<template>
  <div class="h-full w-full flex items-center justify-center">
    <div class="flex gap-5 gap-y-10 justify-center flex-wrap">
      <NuxtLink
        v-for="(item, index) in listStack"
        :key="index"
        class="flex justify-center items-center shrink-0 group transition-all"
        data-aos="zoom-in"
        :data-aos-delay="index * 50"
        :to="item.url"
        target="_blank"
      >
        <NuxtImg
          v-if="item.logo && item.logo !== 'undefined'"
          :src="item.logo"
          class="w-16 h-16 rounded-lg p-1 transition-transform duration-200 group-hover:scale-150 object-contain"
          :style="{ backgroundColor: item.color || undefined }"
          :alt="item.name"
          :aria-label="item.name"
        />
        <div
          v-else
          class="w-16 h-16 rounded-lg flex items-center justify-center transition-transform duration-200 hover:scale-150 font-black bg-white"
          :style="{ color: item.color }"
        >
          {{ item.name }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
