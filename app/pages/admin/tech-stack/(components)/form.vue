<script setup lang="ts">
import * as v from "valibot";
import useApiStack from "~/composables/api/useApiStack";

const props = defineProps<{
  detailData?: StackData;
}>();
const emit = defineEmits(["submitted"]);
const isCreate = computed(() => !props.detailData?.id);

const schema = v.pipe(
  v.object({
    name: v.pipe(v.string(), v.nonEmpty("Name is required")),
    url: v.pipe(v.string(), v.nonEmpty("URL is required")),
    logo: v.optional(v.union([v.file(), v.string()])),
    color: v.union([
      v.pipe(v.string(), v.hexColor("Invalid hex color format.")),
      v.literal(""),
    ]),
  }),
  v.forward(
    v.check((input) => {
      const hasLogo = input.logo !== undefined;
      const hasColor = input.color !== "";
      return hasLogo || hasColor;
    }, "Either logo or color must be provided"),
    ["logo"] // This will attach the error to the logo field
  )
);
const {
  handleSubmit,
  resetForm,
  setFieldError,
  setFieldValue,
  errors,
  values,
} = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    name: "",
    url: "",
    logo: undefined as File | undefined,
    color: "",
  },
});

onMounted(async () => {
  if (props.detailData) {
    resetForm({
      values: {
        name: props.detailData.name,
        url: props.detailData.url,
        logo: props.detailData.logo,
        color: props.detailData.color,
      },
    });
  }
});

const { submitData } = useApiStack();
const loadingSubmit = ref(false);
const onSubmit = handleSubmit(async (data) => {
  loadingSubmit.value = true;
  const res = await submitData(props.detailData?.id, data);
  if (res) {
    emit("submitted");
  } else {
    const errorParams = res;
  }
  loadingSubmit.value = false;
});
// onUnmounted(() => {
//   resetForm();
// });
</script>

<template>
  <div class="p-4 max-h-[70vh] overflow-x-hidden overflow-y-auto">
    <div class="flex flex-col gap-4">
      <VFormField
        label="Name"
        name="name"
        :required="true"
        as="input"
        class="w-full"
      />
      <VFormField
        label="URL"
        name="url"
        :required="true"
        as="input"
        class="w-full"
      />
      <VFormField
        label="Logo"
        name="logo"
        as="file-picker"
        class="w-full"
        accept="image/*"
      />
      <VFormField
        label="Color"
        name="color"
        as="color-picker"
        class="w-full"
        placeholder="Choose color"
      />
    </div>

    <div class="flex justify-end mt-4">
      <UButton
        :label="isCreate ? 'Create' : 'Update'"
        class="w-32 justify-center"
        :loading="loadingSubmit"
        @click="onSubmit()"
      />
    </div>
  </div>
</template>
