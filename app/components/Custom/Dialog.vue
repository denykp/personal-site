<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string;
    message: string;
    type: "info" | "danger" | "warning";
    submitText?: string;
    cancelText?: string;
    loading?: boolean;
  }>(),
  {
    submitText: "Yes",
    cancelText: "No",
    type: "info",
    loading: false,
  }
);

const dialogTitle = computed(() => {
  if (props.title) {
    return props.title;
  } else {
    switch (props.type) {
      case "info": {
        return "Information";
      }
      case "warning": {
        return "Warning";
      }
      case "danger": {
        return "Danger";
      }
    }
  }
});

const emit = defineEmits<{ close: [boolean] }>();

const submitColor = computed(() => {
  switch (props.type) {
    case "info": {
      return "primary";
    }
    case "danger": {
      return "error";
    }
    case "warning": {
      return "warning";
    }
    default: {
      return undefined;
    }
  }
});

const themeColor = computed(() => {
  switch (props.type) {
    case "info": {
      return "text-primary";
    }
    case "danger": {
      return " text-error";
    }
    case "warning": {
      return "text-warning";
    }
    default: {
      return "";
    }
  }
});

function onSubmit() {
  emit("close", true);
}
function onCancel() {
  emit("close", false);
}
</script>

<template>
  <UModal :close="{ onClick: () => emit('close', false) }" title="abc 123">
    <template #content>
      <UCard
        :ui="{
          header: `py-2 rounded-t-lg ${themeColor}`,
          body: 'sm:py-2 py-2',
          footer: 'py-2',
        }"
      >
        <template #header>
          <span class="font-semibold text-lg">{{ dialogTitle }}</span>
        </template>
        <div>{{ message }}</div>
        <template #footer>
          <div class="flex gap-2 justify-end">
            <UButton
              variant="outline"
              color="neutral"
              :disabled="loading"
              @click="onCancel"
            >
              {{ cancelText }}
            </UButton>
            <UButton
              variant="outline"
              :color="submitColor"
              :loading="loading"
              @click="onSubmit"
            >
              {{ submitText }}
            </UButton>
          </div>
        </template>
      </UCard>
    </template>
  </UModal>
</template>
