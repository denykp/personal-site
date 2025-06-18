<script setup lang="ts">
const showMenu = ref(false);
defineProps({
  listMenu: Array(Object),
  activeMenu: String,
  isScrolled: Boolean,
});
defineEmits(["scrollTo"]);
</script>

<template>
  <div class="block lg:hidden fixed right-0 top-12 z-[2]">
    <div
      class="text-4xl text-white font-bold p-1 bg-gray-800 rounded-lg bg-opacity-70 cursor-pointer"
      @click="showMenu = !showMenu"
    >
      <div class="flex">
        <UIcon name="mdi:menu" />
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
        @click="$emit('scrollTo', `section-${item.name}`)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
  <div class="hidden lg:block fixed z-[2] w-full top-3">
    <UContainer>
      <div
        class="flex justify-end gap-4 font-bold text-base text-white rounded-lg py-2 px-5"
      >
        <div class="flex p-3" :class="isScrolled ? 'bg-black rounded-xl' : ''">
          <div
            v-for="(item, idx) in listMenu"
            :key="idx"
            class="section"
            :class="activeMenu == item.name ? 'active-section' : ''"
            @click="$emit('scrollTo', `section-${item.name}`)"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
