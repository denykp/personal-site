<script setup lang="ts">
import useApiPublic from "~/composables/api/useApiPublic";

const filter = ref({
  role: "All",
  stacks: [],
});
const listRole = computed(() => {
  const list = ["All", "Frontend", "Backend", "Fullstack", "Fullstack Desktop"];
  return list.map((val) => ({ value: val, label: val }));
});
const { getListStack, getListPortfolio } = useApiPublic();
const { data: dataStack } = await getListStack();
const listStack = computed(
  () =>
    dataStack.value?.map((val) => ({ value: val.id, label: val.name })) || []
);

// Portfolio Data Related
const { data: dataPortfolio } = await getListPortfolio();
const listPortfolio = computed(() => dataPortfolio.value || []);
const displayedPortfolio = computed(() => {
  return listPortfolio.value.filter((val) => {
    let role = true;
    if (filter.value.role !== "All") {
      role =
        val.role.toLowerCase() === String(filter.value.role).toLowerCase() ||
        filter.value.role === "All";
    }

    return (
      role &&
      filter.value.stacks.every((filterStack) =>
        val.stacks.map((stack) => stack.id).includes(filterStack)
      )
    );
  });
});
const displayModal = ref(false);
const selectedDetail = ref<PortfolioData>();
const openDetail = (item: PortfolioData) => {
  selectedDetail.value = item;
  displayModal.value = true;
};
</script>

<template>
  <div>
    <div class="mt-12">
      <div class="text-4xl font-bold mb-10" data-aos="fade-right">
        These are some projects I've done before.
      </div>
      <div class="mb-3 flex flex-row gap-4" data-aos="zoom-in-up">
        <div class="lg:flex grid grid-1 gap-1 lg:gap-2 items-center">
          <label for="role">Role:</label>
          <USelect
            id="role"
            v-model="filter.role"
            :items="listRole"
            class="w-36"
          />
        </div>
        <div class="lg:flex grid grid-1 gap-1 lg:gap-2 items-center">
          <label for="stacks">Tech Stack:</label>
          <USelect
            id="stacks"
            multiple
            v-model="filter.stacks"
            :items="listStack"
            class="w-36"
          />
        </div>
      </div>
      <div
        class="overflow-y-auto p-[1px] scrollable-container-inset"
        data-aos="fade-down"
      >
        <!-- h-[75vh] -->
        <div
          v-for="item in displayedPortfolio"
          class="mb-5 lg:flex lg:gap-8 p-4 transition-all duration-300 hover:outline outline-gray-700 hover:bg-gradient-to-b from-black to-gray-900 rounded-xl lg:h-38 cursor-pointer group lg:hover:h-44"
          @click="openDetail(item)"
        >
          <div class="shrink-0 hidden lg:block">
            <NuxtImg
              :src="item.images[0] || `/images/no-image-placeholder.svg`"
              class="w-48 h-full object-cover rounded-lg grayscale-100 group-hover:grayscale-0"
            />
          </div>
          <div class="flex flex-col gap-2">
            <div class="font-bold flex gap-2 items-center shrink-0">
              <div class="text-xl line-clamp-1">{{ item.name }}</div>
              <UButton
                v-if="item.url"
                label="Visit"
                variant="outline"
                icon="heroicons:arrow-top-right-on-square"
                :to="item.url"
                target="_blank"
                @click.stop
              />
              <!-- <div class="text-md md:text-xl">({{ item.years }})</div> -->
            </div>
            <div class="text-neutral-300 text-sm line-clamp-2 shrink-0">
              {{ item.description }}
            </div>
            <div class="font-semibold line-clamp-2 shrink-0">
              <!-- {{ item.stacks.join(", ") }} -->
              <template v-for="stack in item.stacks" :key="stack">
                <UBadge
                  class="mt-1 mr-1"
                  :label="stack.name"
                  color="primary"
                  size="sm"
                  variant="subtle"
                />
              </template>
            </div>
            <div class="hidden lg:group-hover:flex justify-end">
              <div class="hover:underline w-fit">View more...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <UModal v-model:open="displayModal">
      <template #content>
        <div
          class="text-2xl font-bold mb-4 flex items-center gap-2 p-5 justify-between"
        >
          <div>{{ selectedDetail?.name }}</div>
          <UButton
            v-if="selectedDetail?.url"
            label="Visit"
            icon="heroicons:arrow-top-right-on-square"
            :to="selectedDetail?.url"
            target="_blank"
          />
        </div>
        <div class="p-5 overflow-y-auto">
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
              :key="stack.id"
              class="mt-2 mr-1"
              :label="stack.name"
              color="primary"
              size="sm"
              variant="subtle"
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
        <UButton
          label="Close"
          class="m-4 justify-center"
          color="neutral"
          variant="outline"
          @click="displayModal = false"
        />
      </template>
    </UModal>
  </div>
</template>
