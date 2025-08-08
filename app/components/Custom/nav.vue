<script setup lang="ts">
const showMenu = ref(false);
defineProps({
  listMenu: Array(Object) as PropType<Menu[]>,
  activeMenu: String,
  isScrolled: Boolean,
});
const emit = defineEmits(["scrollTo"]);

const handleMobileClick = (item: Menu) => {
  emit("scrollTo", `section-${item.name}`);
  setTimeout(() => {
    showMenu.value = false;
  }, 800);
};
</script>

<template>
  <div class="hidden fixed right-4 top-4 z-[9]">
    <!-- <div
      class="text-4xl text-white font-bold p-1 bg-gray-800 rounded-lg cursor-pointer transition-all"
      @click="showMenu = !showMenu"
    >
      <div class="flex">
        <UIcon name="mdi:menu" />
      </div>
    </div>
    <div
      v-if="showMenu"
      class="absolute text-white right-0 bg-gray-900 rounded-lg z-[9] outline-1"
      :class="showMenu ? 'h-auto' : ''"
    >
      <div
        v-for="(item, idx) in listMenu"
        :key="idx"
        class="section whitespace-nowrap m-2"
        :class="activeMenu == item.name ? 'active-section' : ''"
        @click="handleMobileClick(item)"
      >
        {{ item.label }}
      </div>
    </div> -->

    <UPopover :content="{ align: 'center', side: 'bottom' }" class="relative">
      <UButton
        icon="mdi:menu"
        color="neutral"
        variant="subtle"
        size="xl"
        class="text-white bg-gray-800 rounded-lg cursor-pointer transition-all"
        @click="showMenu = !showMenu"
      />

      <template #content>
        <div class="p-1">
          <div
            v-for="(item, idx) in listMenu"
            :key="idx"
            class="section whitespace-nowrap m-2"
            :class="activeMenu == item.name ? 'active-section' : ''"
            @click="handleMobileClick(item)"
          >
            {{ item.label }}
          </div>
        </div>
      </template>
    </UPopover>
  </div>
  <div class="hidden md:block fixed z-[2] w-full top-3">
    <UContainer>
      <div
        class="flex justify-end gap-4 font-bold text-base text-white rounded-lg py-2 px-2"
      >
        <div
          class="flex p-3 gap-1 transition-all duration-300"
          :class="isScrolled ? 'bg-gray-900 rounded-xl' : ''"
        >
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
