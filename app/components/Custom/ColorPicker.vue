<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
  inputBaseClass?: string;
  placeholder?: string;
}>();
const emit = defineEmits(["update:modelValue"]);
const isValidHex = (hex: string) =>
  /^#([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{3})$/.test(hex);
const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <UInput
    v-model="value"
    :placeholder="placeholder"
    color="neutral"
    variant="outline"
    :ui="{ base: `text-left ${inputBaseClass} text-[${value}]` }"
  >
    <template #leading>
      <UPopover class="text-left">
        <span
          :style="{backgroundColor: value as string || '#000000'}"
          class="size-5 rounded"
        />

        <template #content>
          <UColorPicker
            v-if="isValidHex(value) || !value"
            v-model="value"
            class="p-2"
          />
        </template>
      </UPopover>
    </template>
  </UInput>
</template>
