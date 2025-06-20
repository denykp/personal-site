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
  <div class="block md:hidden fixed right-4 top-4 z-[3]">
    <div
      class="text-4xl text-white font-bold p-1 bg-gray-800 rounded-lg cursor-pointer"
      @click="showMenu = !showMenu"
    >
      <div class="flex">
        <UIcon name="mdi:menu" />
      </div>
    </div>
    <div
      v-if="showMenu"
      class="absolute text-white right-0 bg-gray-900 rounded-lg z-[3] outline-1"
      :class="showMenu ? 'h-auto' : ''"
    >
      <div
        v-for="(item, idx) in listMenu"
        :key="idx"
        class="section whitespace-nowrap m-2"
        :class="activeMenu == item.name ? 'active-section' : ''"
        @click="$emit('scrollTo', `section-${item.name}`)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
  <div class="hidden md:block fixed z-[2] w-full top-3">
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
