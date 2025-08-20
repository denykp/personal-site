<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import useApiPortfolio from "~/composables/api/useApiPortfolio";
import FormPage from "./(components)/form.vue";
import { CDialog } from "#components";

definePageMeta({
  layout: "admin",
  middleware: ["admin"],
});
const pageTitle = ref("Tech Stack");

const { getList, deleteData } = useApiPortfolio();
const { data, status, refresh } = getList();

const UButton = resolveComponent("UButton");
const UBadge = resolveComponent("UBadge");
const UPopover = resolveComponent("UPopover");
const UDropdownMenu = resolveComponent("UDropdownMenu");
const toast = useToast();
const overlay = useOverlay();
const modal = overlay.create(CDialog);

const columns: TableColumn<PortfolioData>[] = [
  {
    id: "expand",
    cell: ({ row }) =>
      h(UButton, {
        color: "neutral",
        variant: "ghost",
        icon: "heroicons:chevron-down",
        square: true,
        "aria-label": "Expand",
        ui: {
          leadingIcon: [
            "transition-transform",
            row.getIsExpanded() ? "duration-200 rotate-180" : "",
          ],
        },
        onClick: () => row.toggleExpanded(),
      }),
  },
  {
    accessorKey: "name",
    header: "Stack Name",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) =>
      h(
        UPopover,
        { mode: "hover" },
        {
          default: h(
            "div",
            { class: "max-w-72 whitespace-pre-wrap line-clamp-1" },
            row.original.description
          ),
          content: h(
            "div",
            { class: "max-w-96 p-2 text-xs" },
            row.original.description
          ),
        }
      ),
  },
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "stacks",
    header: "Tech Stacks",
    cell: ({ row }) => {
      return h(
        "div",
        { class: "flex flex-wrap gap-2" },
        row.original.stacks.map((stack) =>
          h(UBadge, {
            label: stack.name,
            color: "primary",
            size: "sm",
            variant: "subtle",
          })
        )
      );
    },
  },
  {
    accessorKey: "project_type",
    header: "Project Type",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "highlight",
    header: "Highlight",
    cell: ({ row }) => {
      const status = row.original.highlight ? "Highlighted" : "Not Highlighted";

      return h(
        UBadge,
        {
          class: "capitalize",
          variant: "subtle",
          color: row.original.highlight ? "primary" : "neutral",
        },
        () => status
      );
    },
  },
  {
    id: "actions", // A common key for action buttons or dropdowns
    enableHiding: false,
    cell: ({ row }) => {
      const items = [
        {
          type: "label",
          label: "Actions",
        },
        {
          label: "Edit",
          icon: "heroicons:pencil-square",
          onSelect: () => {
            selectedData.value = row.original;
            displayModal.value = "edit";
          },
        },
        {
          label: "Delete",
          icon: "heroicons:trash",
          onSelect: async () => {
            const instance = modal.open({
              title: "Delete Portfolio",
              message: "Are you sure you want to delete this portfolio?",
              type: "danger",
              loading: false,
            });
            if (await instance.result) {
              await deleteData(row.original.id);
              await refresh();
            }
          },
        },
      ];

      return h(
        "div",
        {
          class: "text-center",
        },
        h(
          UDropdownMenu,
          {
            content: {
              align: "end",
            },
            items,
            "aria-label": "Actions dropdown",
          },
          () =>
            h(UButton, {
              icon: "heroicons:ellipsis-vertical",
              color: "neutral",
              variant: "ghost",
              class: "ml-auto",
              "aria-label": "Actions dropdown",
            })
        )
      );
    },
  },
];

const selectedData = ref<PortfolioData>();
const formMode = ref<FormMode>(null);
const displayModal = computed({
  get: () => !!formMode.value,
  set: (value: FormMode) => {
    if (value) {
      formMode.value = value;
    } else {
      formMode.value = null;
      selectedData.value = undefined;
    }
  },
});
</script>

<template>
  <div class="page-container">
    <CTable
      v-model:form-mode="formMode"
      :title="pageTitle"
      :data="data"
      :columns="columns"
      :searchable-fields="['name']"
      :status="status"
      :refresh="refresh"
    >
      <template #expanded="{ row }">
        <!-- <div class="p-4 w-full whitespace-pre-wrap">
          {{ row.original.description }}
        </div> -->
        <UCarousel
          v-if="row.original.images.length"
          v-slot="{ item }"
          :items="row.original.images"
          class="w-full max-w-fit mx-auto"
          :ui="{ item: 'basis-1/2' }"
        >
          <NuxtLink :to="item" target="_blank">
            <LazyNuxtImg
              :src="item"
              class="w-[127px] h-[127px] object-cover rounded-lg"
            />
          </NuxtLink>
        </UCarousel>
      </template>
    </CTable>

    <UModal v-model:open="displayModal" :dismissible="false">
      <template #content>
        <div class="flex justify-between p-4 items-center">
          <h1 class="font-bold">
            {{ formMode === "add" ? "Add New" : "Edit" }} {{ pageTitle }}
          </h1>
          <UButton
            icon="heroicons:x-mark-16-solid"
            variant="ghost"
            @click="displayModal = false"
          />
        </div>
        <FormPage
          :detail-data="selectedData"
          @submitted="
            () => {
              displayModal = false;
              refresh();
            }
          "
        />
      </template>
    </UModal>
  </div>
</template>
