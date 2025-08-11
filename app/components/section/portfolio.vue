<script setup lang="ts">
import { listPortfolio, type Portfolio } from "~/contents/portfolio";

defineProps({
  activeMenu: String,
});

const capitalize = (str?: string) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
const listProjectType = computed(() => {
  const list = listPortfolio.map((val) => capitalize(val.project_type));
  return ["All"].concat([...new Set(list)]);
});
const highlightTechs = ["Vue", "Nuxt", "React", "Next", "Express"] as const;
const listStack = computed(() => {
  const allStacks = listPortfolio.flatMap((p) => p.stacks);

  // Count frequency
  const freq = allStacks.reduce<Record<string, number>>((acc, tech) => {
    acc[tech] = (acc[tech] ?? 0) + 1;
    return acc;
  }, {});

  const uniqueTechs = Object.keys(freq);

  return uniqueTechs.sort((a, b) => {
    const aIsHighlight = highlightTechs.includes(a as any);
    const bIsHighlight = highlightTechs.includes(b as any);

    // Prioritize highlighted techs first
    if (aIsHighlight && !bIsHighlight) return -1;
    if (bIsHighlight && !aIsHighlight) return 1;

    // Otherwise sort by frequency desc, then alphabetically
    const freqDiff = freq[b]! - freq[a]!;
    return freqDiff !== 0 ? freqDiff : a.localeCompare(b);
  });
});
// const listStack = computed(() => {
//   const list = listPortfolio
//     .map((val) => val.stacks)
//     .reduce((res, val) => {
//       return res.concat(val);
//     });
//   return [...new Set(list.sort())];
// });
const filter = ref({
  project_type: "All",
  stacks: [],
});
const displayedPortfolio = computed(() => {
  return listPortfolio.filter((val) => {
    let project_type = true;
    if (filter.value.project_type !== "All") {
      project_type =
        val.project_type.toLowerCase() ===
        String(filter.value.project_type).toLowerCase();
    }

    return (
      project_type &&
      filter.value.stacks.every((filterStack) =>
        val.stacks.includes(filterStack)
      )
    );
  });
});
const [DefineFormTemplate, ReuseFormTemplate] = createReusableTemplate();

const displayModal = ref(false);
const selectedDetail = ref<Portfolio>();
const openDetail = (item: Portfolio) => {
  selectedDetail.value = item;
  displayModal.value = true;
};
</script>

<template>
  <div
    class="bg-black pb-12 w-full text-white bg-gradient-to-tr from-black to-gray-900 overflow-x-clip pt-24 lg:pt-12"
  >
    <UContainer>
      <div>
        <div class="text-4xl font-bold mb-10">
          These are some projects I've done before.
        </div>
        <DefineFormTemplate>
          <div class="mb-3 flex flex-row gap-4">
            <div class="lg:flex grid grid-1 gap-1 lg:gap-2 items-center">
              <label for="project_type">Project Type:</label>
              <USelect
                id="project_type"
                v-model="filter.project_type"
                :items="listProjectType"
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
        </DefineFormTemplate>
        <ReuseFormTemplate />
        <!-- <div
          v-if="activeMenu === 'portfolio'"
          class="block lg:hidden absolute top-16 left-0 w-full"
        >
          <UContainer class="flex justify-end">
            <UPopover
              :content="{ align: 'center', side: 'bottom' }"
              class="relative"
            >
              <UButton
                icon="i-mdi-filter-menu"
                color="neutral"
                variant="subtle"
                size="xl"
              />

              <template #content>
                <ReuseFormTemplate class="p-4 flex flex-col gap-2" />
              </template>
            </UPopover>
          </UContainer>
        </div> -->
        <div class="h-[75vh] overflow-y-auto scrollable-container-inset">
          <div
            v-for="item in displayedPortfolio"
            class="mb-5 lg:flex lg:gap-8 p-4 transition-all duration-300 hover:outline outline-gray-700 hover:bg-gradient-to-b from-black to-gray-900 rounded-xl lg:h-38 cursor-pointer group lg:hover:h-44"
            @click="openDetail(item)"
          >
            <div class="shrink-0 hidden lg:block">
              <NuxtImg
                :src="item.images[0] || `/images/no-image-placeholder.svg`"
                class="w-48 h-full object-cover rounded-lg"
              />
            </div>
            <div class="flex flex-col gap-2">
              <div
                class="font-bold flex gap-2 items-center shrink-0 justify-between w-full"
              >
                <div class="text-xl line-clamp-1">{{ item.name }}</div>
                <UButton
                  v-if="item.url"
                  label="Visit"
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
                    :label="stack"
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
    </UContainer>
    <!-- <c-footer class="absolute bottom-0"></c-footer> -->

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
              :key="stack"
              class="mt-2 mr-1"
              :label="stack"
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

<style lang="postcss"></style>
