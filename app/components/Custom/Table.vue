<script setup lang="ts" generic="T, K extends keyof T">
import type { TableColumn } from "@nuxt/ui";
// import type { FormMode, Pagination, RequestQuery } from "~~/shared/types";

interface Prop {
  data: T[] | undefined;
  status: string;
  columns: TableColumn<T>[];
  title?: string;
  searchableFields?: K[] | undefined;
  formMode: FormMode;
  refresh: () => void;
}
const props = defineProps<Prop>();
const emit = defineEmits<{
  (e: "update:formMode", mode: FormMode): void;
}>();
const componentReady = ref(false);
onMounted(() => {
  componentReady.value = true;
});
const isLoading = computed(() => {
  if (componentReady.value) {
    return props.status === "pending";
  } else {
    return false;
  }
});

const search = ref("");
const searchDebounced = refDebounced(search, 500);
const displayedData = computed(() => {
  if (searchDebounced.value && props.searchableFields?.length) {
    return props.data?.filter((item) => {
      let match = false;
      for (const field of props.searchableFields!) {
        match = String(item[field])
          .toLowerCase()
          .includes(searchDebounced.value.toLowerCase());
      }
      return match;
    });
  } else {
    return props.data;
  }
});
</script>

<template>
  <div class="w-full h-full">
    <div class="flex items-center justify-between">
      <div class="flex gap-4 items-center">
        <div class="font-bold">{{ title }}</div>
        <UInput
          v-model="search"
          placeholder="Search..."
          leading-icon="heroicons:magnifying-glass-16-solid"
        />
      </div>
      <div>
        <UButton
          label="Create"
          icon="heroicons:plus-16-solid"
          @click="emit('update:formMode', 'add')"
        />
      </div>
    </div>
    <div class="mt-4 flex h-full overflow-y-auto">
      <UTable
        :data="displayedData"
        :columns="columns"
        :loading="isLoading"
        sticky
        class="w-full flex-1 max-h-[calc(100vh-12.5rem)] scrollable-container-inset"
        :column-pinning="{ right: ['actions'] }"
      >
        <template #expanded="{ row }">
          <slot :row="row" name="expanded"></slot>
        </template>
      </UTable>
    </div>
  </div>
</template>
