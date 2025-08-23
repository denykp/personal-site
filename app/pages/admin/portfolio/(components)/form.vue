<script setup lang="ts">
import * as v from "valibot";
import useApiPortfolio from "~/composables/api/useApiPortfolio";
import useApiStack from "~/composables/api/useApiStack";

const props = defineProps<{
  detailData?: PortfolioData;
}>();
const emit = defineEmits(["submitted"]);
const isCreate = computed(() => !props.detailData?.id);

const { getList } = useApiStack();
const { data: dataStack, refresh: refreshStack } = getList();
const listStack = computed(
  () =>
    dataStack.value?.map((val) => ({
      value: val.id,
      label: val.name,
    })) || []
);
const listProjectType = computed(() => {
  const list = ["Personal", "Company"];
  return list.map((val) => ({ value: val, label: val }));
});
const listRole = computed(() => {
  const list = ["Frontend", "Backend", "Fullstack", "Fullstack Desktop"];
  return list.map((val) => ({ value: val, label: val }));
});

const schema = v.object({
  name: v.pipe(v.string(), v.nonEmpty("Name is required")),
  description: v.pipe(v.string(), v.nonEmpty("Description is required")),
  url: v.optional(v.string()),
  images: v.optional(
    v.union([v.array(v.pipe(v.instance(File))), v.array(v.string())])
  ),
  stacks: v.array(v.pipe(v.string(), v.nonEmpty("Tech stack is required"))),
  project_type: v.pipe(v.string(), v.nonEmpty("Project type is required")),
  role: v.pipe(v.string(), v.nonEmpty("Role is required")),
  highlight: v.optional(v.boolean()),
});
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
    description: "",
    url: "",
    images: undefined as File[] | undefined,
    stacks: [],
    project_type: "",
    role: "",
    highlight: false,
  },
});

onMounted(async () => {
  if (props.detailData) {
    resetForm({
      values: {
        name: props.detailData.name,
        description: props.detailData.description,
        url: props.detailData.url,
        images: props.detailData.images,
        stacks: props.detailData.stacks.map((stack) => stack.id),
        project_type: props.detailData.project_type,
        role: props.detailData.role,
        highlight: props.detailData.highlight,
      },
    });
  }
});

const { submitData } = useApiPortfolio();
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
</script>

<template>
  <div>
    <div
      class="p-4 max-h-[70vh] overflow-x-hidden overflow-y-auto scrollable-container-inset"
    >
      <div class="flex flex-col gap-4">
        <VFormField
          label="Project Name"
          name="name"
          :required="true"
          as="input"
          class="w-full"
          placeholder="Input Project Name"
        />
        <VFormField
          label="Description"
          name="description"
          :required="true"
          as="textarea"
          class="w-full"
          placeholder="Input Description"
        />
        <VFormField
          label="URL"
          name="url"
          as="input"
          class="w-full"
          placeholder="Input URL"
        />
        <VFormField
          label="Images"
          name="images"
          as="file-picker"
          class="w-full"
          accept="image/*"
          multiple
        />
        <VFormField
          label="Stacks"
          name="stacks"
          as="select-menu"
          :items="listStack"
          valueKey="value"
          :required="true"
          multiple
          class="w-full"
          placeholder="Choose Stack"
          @click="refreshStack"
        />
        <VFormField
          label="Project Type"
          name="project_type"
          :required="true"
          as="select"
          :items="listProjectType"
          class="w-full"
          placeholder="Choose Project Type"
        />
        <VFormField
          label="Role"
          name="role"
          :required="true"
          as="select"
          :items="listRole"
          class="w-full"
          placeholder="Choose Role"
        />
        <VFormField
          label="Highlight"
          name="highlight"
          as="switch"
          size="xl"
          class="w-full"
        />
      </div>
    </div>

    <div class="p-4 flex justify-end mt-4 bg-neutral-900 w-full shadow-top">
      <UButton
        :label="isCreate ? 'Create' : 'Update'"
        class="w-32 justify-center"
        :loading="loadingSubmit"
        @click="onSubmit()"
      />
    </div>
  </div>
</template>
