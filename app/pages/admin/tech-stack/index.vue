<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import useApiStack from "~/composables/api/useApiStack";
import FormPage from "./(components)/form.vue";
import { CDialog } from "#components";

definePageMeta({
  layout: "admin",
  middleware: ["admin"],
});
const pageTitle = ref("Tech Stack");

const { getList, deleteData } = useApiStack();
const { data, status, refresh } = getList();

const UButton = resolveComponent("UButton");
const UDropdownMenu = resolveComponent("UDropdownMenu");
const UBadge = resolveComponent("UBadge");
const toast = useToast();
const overlay = useOverlay();
const modal = overlay.create(CDialog);

const columns: TableColumn<StackData>[] = [
  {
    accessorKey: "name",
    header: "Stack Name",
  },
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "logo",
    header: "Logo",
    cell: ({ row }) => {
      // return h(
      //   "a",
      //   {
      //     href: row.original.logo,
      //     target: "_blank",
      //     rel: "noopener noreferrer",
      //   },
      //   { default: () => row.original.logo }
      // );
      return h(
        "div",
        {
          class: `w-8 h-8`,
          style: `background-color: ${
            String(row.original.logo) !== "undefined" ? row.original.color : ""
          }`,
        },
        [
          String(row.original.logo) !== "undefined"
            ? h("img", {
                src: row.original.logo,
                alt: row.original.name,
                class: `w-8 h-8`,
              })
            : h(
                "div",
                {
                  class: `text-lg font-bold`,
                  style: `color: ${row.original.color}`,
                },
                row.original.name
              ),
        ]
      );
    },
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => {
      return h("div", { class: "flex gap-2 items-center" }, [
        h("div", {
          class: `w-4 h-4 rounded-lg`,
          style: `background-color: ${row.original.color}`,
        }),
        row.original.color || "-",
      ]);
    },
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
              title: "Delete Stack",
              message: "Are you sure you want to delete this stack?",
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

const selectedData = ref<StackData>();
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
    <div class="bg-[#f5f5f5]">ABC</div>
    <CTable
      v-model:form-mode="formMode"
      :title="pageTitle"
      :data="data"
      :columns="columns"
      :searchable-fields="['name']"
      :status="status"
      :refresh="refresh"
    />

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
