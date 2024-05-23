<script setup lang="ts">
const showMenu = ref(false);
defineProps({
  listMenu: Array(Object),
  activeMenu: String,
});
const scrollToView = (sectionId: string) => {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
};
</script>

<template>
  <div class="block lg:hidden fixed right-3 top-3 z-[2]">
    <div
      class="text-4xl text-white font-bold p-1 bg-gray-800 rounded-lg bg-opacity-70 cursor-pointer"
      @click="showMenu = !showMenu"
    >
      <div class="flex">
        <Icon name="mdi:menu" />
      </div>
    </div>
    <div
      v-if="showMenu"
      class="absolute text-white right-0 bg-gray-900 rounded-lg"
      :class="showMenu ? 'h-auto' : ''"
    >
      <div
        v-for="(item, idx) in listMenu"
        :key="idx"
        class="section whitespace-nowrap"
        :class="activeMenu == item.name ? 'active-section' : ''"
        @click="scrollToView(`section-${item.name}`)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
  <div class="hidden lg:block fixed mx-auto z-[2] w-full">
    <div
      class="container mx-auto flex justify-end gap-4 font-bold text-base text-white rounded-lg py-2"
    >
      <div
        v-for="(item, idx) in listMenu"
        :key="idx"
        class="section"
        :class="activeMenu == item.name ? 'active-section' : ''"
        @click="scrollToView(`section-${item.name}`)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.section {
  @apply cursor-pointer hover:outline rounded-lg px-4 py-1 bg-opacity-0;
}
.active-section {
  @apply bg-gradient-to-tr from-gray-800 to-gray-600 rounded-lg !outline-none transition-all duration-300;
}
</style>
