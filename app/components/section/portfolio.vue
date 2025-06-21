<script setup lang="ts">
import { listPortfolio, type Portfolio } from "~/contents/portfolio";

const displayedPortfolio = computed(() => {
  return listPortfolio;
});

const displayModal = ref(false);
const selectedDetail = ref<Portfolio>();
const openDetail = (item: Portfolio) => {
  selectedDetail.value = item;
  displayModal.value = true;
};
</script>

<template>
  <div
    class="bg-black pb-12 w-full text-white bg-gradient-to-bl from-gray-900 to-black relative overflow-x-clip pt-24 lg:pt-12"
  >
    <UContainer class="">
      <div class="px-5">
        <div class="text-4xl font-bold mb-10">
          These are the projects I've been done before.
        </div>
        <div class="-ml-4">
          <div
            v-for="item in displayedPortfolio"
            class="mb-5 flex gap-8 p-4 transition-all duration-300 hover:outline outline-gray-800 bg-gradient-to-tl from-gray-950 to-gray-800 rounded-xl h-32 cursor-pointer group hover:h-38"
            @click="openDetail(item)"
          >
            <div class="shrink-0">
              <NuxtImg
                :src="item.images[0] || `/images/no-image-placeholder.svg`"
                class="w-48 h-full rounded-lg"
              />
            </div>
            <div>
              <div class="font-bold flex gap-2 w-fit items-center">
                <div class="text-xl line-clamp-1">{{ item.name }}</div>
                <UButton
                  v-if="item.url"
                  icon="i-line-md-external-link"
                  :to="item.url"
                  target="_blank"
                  variant="link"
                  @click.stop
                />
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
              <div class="hidden group-hover:flex justify-end">
                <div class="hover:underline w-fit">View more...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
    <!-- <c-footer class="absolute bottom-0"></c-footer> -->
  </div>

  <UModal v-model:open="displayModal" size="lg">
    <template #content>
      <div class="p-5">
        <div class="text-2xl font-bold mb-4 flex items-center gap-2">
          <div>{{ selectedDetail?.name }}</div>
          <UButton
            v-if="selectedDetail?.url"
            icon="i-line-md-external-link"
            :to="selectedDetail?.url"
            target="_blank"
            variant="link"
          />
        </div>

        <UCarousel
          v-slot="{ item }"
          :items="
            selectedDetail?.images.length
              ? selectedDetail?.images
              : [`/images/no-image-placeholder.svg`]
          "
          class="w-full max-w-xs mx-auto"
          arrows
        >
          <div class="flex justify-center items-center min-h-64">
            <NuxtImg
              :src="item"
              class="max-w-full max-h-64 object-contain rounded-lg"
              style="height: auto; width: auto"
            />
          </div>
        </UCarousel>
        <div class="text-neutral-300 mb-4">
          {{ selectedDetail?.description }}
        </div>
        <div class="flex flex-wrap gap-2 mb-4">
          <UBadge
            v-for="stack in selectedDetail?.stacks"
            :key="stack"
            class="mt-2 mr-1"
            :label="stack"
            color="primary"
            size="sm"
          />
        </div>
        <!-- <UCarousel
          v-slot="{ item }"
          :items="selectedDetail?.images"
          class="w-full mx-auto h-64"
          arrows
          auto-height
        >
          <NuxtImg
            :src="item"
            class="w-full h-full object-contain rounded-lg mb-4"
          />
        </UCarousel> -->
      </div>
    </template>
  </UModal>
</template>

<style lang="postcss"></style>
