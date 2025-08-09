<script setup lang="ts">
import * as v from "valibot";
import useApiStack from "~/composables/api/useApiStack";

const props = defineProps<{
  detailData?: StackData;
}>();
const emit = defineEmits(["submitted"]);
const isCreate = computed(() => !props.detailData?.id);

const schema = v.object({
  name: v.pipe(v.string(), v.nonEmpty("Name is required")),
  url: v.pipe(v.string(), v.nonEmpty("URL is required")),
  logo: v.optional(v.file()),
  color: v.union([
    v.pipe(v.string(), v.hexColor("Invalid hex color format.")),
    v.literal(""),
  ]),
});
const { handleSubmit, resetForm, setFieldError, setFieldValue, values } =
  useForm({
    validationSchema: toTypedSchema(schema),
    initialValues: {
      name: "",
      url: "",
      logo: undefined as File | undefined,
      color: "",
    },
  });
const handleLogoChange = (files: FileList | null) => {
  // console.log("handleLogoChange", files);
  if (files && files.length > 0) {
    const file = files[0];
    setFieldValue("logo", file);
  }
};

onMounted(() => {
  if (props.detailData) {
    resetForm({
      values: {
        name: props.detailData.name,
        url: props.detailData.url,
        logo: undefined as File | undefined,
        color: props.detailData.color,
      },
    });
  }
});

const { submitData } = useApiStack();
const loadingSubmit = ref(false);
const onSubmit = handleSubmit(async (data) => {
  console.log(data);
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
  <div class="p-4 max-h-[70vh] overflow-y-auto">
    <div class="flex flex-col gap-4">
      {{ values }}
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
        name="logo_temporary"
        as="input"
        type="file"
        class="w-full"
        :preview="props.detailData?.logo as string"
        @change="handleLogoChange"
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
