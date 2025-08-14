<script setup lang="ts">
type DataType = File | File[] | string | string[] | null;
interface SingleFile {
  multiple: false;
  modelValue: File | string | null;
  inputBaseClass?: string;
  placeholder?: string;
  accept?: string;
}
interface MultipleFile {
  multiple: true;
  modelValue: File[] | string[] | null;
  inputBaseClass?: string;
  placeholder?: string;
  accept?: string;
}
const props = defineProps<SingleFile | MultipleFile>();
const emit = defineEmits(["update:modelValue"]);
const value = computed<DataType>({
  get: () => props.modelValue,
  set: (val: DataType) => emit("update:modelValue", val),
});
const filePreview = computed(() => {
  if (props.multiple) {
    if (props.modelValue) {
      if (props.modelValue.every((value) => typeof value === "string")) {
        return props.modelValue;
      }
      return Object.values(props.modelValue).map((file) =>
        URL.createObjectURL(file)
      );
    }
  } else {
    if (props.modelValue) {
      if (typeof props.modelValue === "string") {
        return [props.modelValue];
      }
      return [URL.createObjectURL(props.modelValue)];
    }
  }
  return "";
});

const filesTemporary = ref(null);
const handleFileChange = (event: Event) => {
  if (props.multiple) {
    const files = (event.target as HTMLInputElement)?.files;
    value.value = files ? Array.from(files) : null;
  } else {
    value.value = (event.target as HTMLInputElement)?.files?.[0] || null;
  }
};
</script>

<template>
  <div class="flex gap-2" :class="multiple ? 'flex-col' : 'items-start'">
    <UCarousel
      v-if="filePreview"
      v-slot="{ item }"
      :items="filePreview"
      class="w-full max-w-fit mx-auto"
      :ui="{ item: multiple ? `basis-2/${filePreview.length}` : 'basis-1/1' }"
    >
      <NuxtLink :to="item" target="_blank">
        <LazyNuxtImg
          :src="item"
          class="w-[127px] h-[127px] object-cover rounded-lg"
        />
      </NuxtLink>
    </UCarousel>
    <UInput
      v-model="filesTemporary"
      type="file"
      class="w-full"
      :accept="accept"
      :multiple="multiple"
      @change="handleFileChange"
    />
  </div>
</template>
