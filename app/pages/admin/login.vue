<script setup lang="ts">
import * as v from "valibot";
import useApiAuth from "~/composables/api/useApiAuth";

useHead({
  title: "Login",
});
definePageMeta({
  middleware: ["admin"],
  layout: "empty",
});

const schema = v.object({
  username: v.pipe(v.string(), v.nonEmpty("Mohon isi username")),
  password: v.pipe(v.string(), v.nonEmpty("Mohon isi password")),
});

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(schema),
});

const { login, userData } = useApiAuth();
const loadingSubmit = ref(false);
const onSubmit = handleSubmit(async (values) => {
  loadingSubmit.value = true;
  const response = await login(values as LoginData);
  if (response) {
    navigateTo("/admin");
  }
  loadingSubmit.value = false;
});
</script>

<template>
  <div
    class="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-primary-400"
  >
    <UCard>
      <div class="flex">
        <div class="flex justify-center">
          <NuxtImg
            src="/android-chrome-512x512.png"
            alt="logo"
            width="425px"
            class="h-full object-cover"
          />
        </div>
        <USeparator orientation="vertical" class="h-64 w-1 mx-6" />
        <form
          class="w-full flex flex-col justify-center"
          @submit.prevent="onSubmit"
        >
          <div class="flex flex-col gap-4">
            <VFormField
              label="Username"
              name="username"
              :required="true"
              as="input"
              class="w-full"
              placeholder="Masukkan username..."
            />
            <VFormField
              label="Password"
              name="password"
              :required="true"
              as="input"
              type="password"
              class="w-full"
              placeholder="Masukkan password..."
            />
          </div>
          <div class="mt-4">
            <UButton
              label="Login"
              class="w-full justify-center"
              type="submit"
              :loading="loadingSubmit"
            />
          </div>
        </form>
      </div>
    </UCard>
  </div>
</template>
