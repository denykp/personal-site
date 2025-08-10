<script setup lang="ts">
const props = defineProps<{
  modelValue: File | string | null;
  inputBaseClass?: string;
  placeholder?: string;
  accept?: string;
}>();
const emit = defineEmits(["update:modelValue"]);
const value = computed<File | string | null>({
  get: () => props.modelValue,
  set: (val: File | string | null) => emit("update:modelValue", val),
});
const filePreview = computed(() => {
  if (props.modelValue) {
    if (typeof props.modelValue === "string") {
      return props.modelValue;
    }
    return URL.createObjectURL(props.modelValue);
  }
  return "";
});

const filesTemporary = ref(null);
const handleFileChange = (event: Event) => {
  value.value = (event.target as HTMLInputElement)?.files?.[0] || null;
};
</script>

<template>
  <div class="flex gap-2 items-start">
    <NuxtLink
      v-if="filePreview"
      class="shrink-0"
      :to="filePreview"
      target="_blank"
    >
      <NuxtImg
        :src="filePreview"
        class="w-[127px] h-[127px] object-cover rounded-lg mb-2"
      />
    </NuxtLink>
    <UInput
      v-model="filesTemporary"
      type="file"
      class="w-full"
      :accept="accept"
      @change="handleFileChange"
    />
  </div>
</template>
