<script setup lang="ts">
import { computed } from "vue";
import { useField } from "vee-validate";

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  as?: "input" | "select" | "textarea" | "color-picker" | "file-picker";
  items?: Array<{ label: string; value: string | number }>;
  required?: boolean;
  class?: string;
  size?: "sm" | "md" | "lg" | "xl";
  preview?: string;
  accept?: string;
  multiple?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "change", value: FileList | null): void;
}>();

const { value, errorMessage, handleChange, meta } = useField(props.name);

// const hasError = computed(() => !!errorMessage.value)

const showPassword = ref(false);
const isPasswordType = computed(
  () => props.type === "password" && (!props.as || props.as === "input")
);
const inputType = computed(() => {
  if (isPasswordType.value) {
    return showPassword.value ? "text" : "password";
  }
  return props.type ?? "text";
});

const filesTemporary = ref<FileList | null>(null);
const filePreview = computed(() => {
  if (props.as === "input" && props.type === "file") {
    if (filesTemporary.value) {
      return Array.from(filesTemporary.value).map((file) =>
        URL.createObjectURL(file)
      );
    } else if (props.preview) {
      const data = props.preview;
      return Array(1).fill(data);
    }
  }
  return [];
});

const inputProps = computed(() => ({
  modelValue: value.value,
  "onUpdate:modelValue": handleChange,
  onChange: (event: Event) => {
    if (props.as === "input" && props.type === "file") {
      filesTemporary.value = (event.target as HTMLInputElement)?.files || null;
      emit("change", filesTemporary.value);
    }
  },
  placeholder: props.placeholder,
  type: inputType.value,
  items: props.items,
  class: props.class,
  size: props.size ?? "lg",
  accept: props.accept,
  multiple: props.multiple,
}));

const UInput = resolveComponent("UInput");
const USelect = resolveComponent("USelect");
const UTextarea = resolveComponent("UTextarea");
const CColorPicker = resolveComponent("CColorPicker");
const CFilePicker = resolveComponent("CFilePicker");
const renderComponent = computed(() => {
  switch (props.as) {
    case "select":
      return USelect;
    case "textarea":
      return UTextarea;
    case "textarea":
      return UTextarea;
    case "color-picker":
      return CColorPicker;
    case "file-picker":
      return CFilePicker;
    default:
      return UInput;
  }
});
const parsedErrorMessage = computed(() => {
  return errorMessage.value?.split(",");
});
</script>

<template>
  <UFormField
    :label="label"
    :error="errorMessage"
    :help="meta.touched && errorMessage ? '' : undefined"
    :required="required"
  >
    <div class="flex gap-4">
      <component :is="renderComponent" v-bind="inputProps">
        <template v-if="isPasswordType" #trailing>
          <UButton
            variant="ghost"
            tabindex="-1"
            :icon="
              showPassword ? 'heroicons:eye-slash-solid' : 'heroicons:eye-solid'
            "
            @click="showPassword = !showPassword"
          />
        </template>
      </component>
    </div>
    <template #error>
      <div v-for="(error, idx) in parsedErrorMessage" :key="idx">
        {{ error }}
      </div>
    </template>
  </UFormField>
</template>
