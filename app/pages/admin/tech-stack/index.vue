<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const { data } = useFetch(`/api/stacks`);
</script>

<template>
  <div class="page-container">
    <div>Hi there, this is tech stack page</div>
    <UTable :data="data" class="flex-1" />
  </div>
</template>
