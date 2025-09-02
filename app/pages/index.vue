<script setup lang="ts">
import useApiStack from "~/composables/api/useApiStack";
import type { Menu } from "~~/shared/types";

useSeoMeta({
  title: "Frontend Engineer | FullStack Node.js Engineer",
  description:
    "Frontend Engineer with 11 years of software development experience, including 5 years in web development using Vue and Nuxt, and 6 years in desktop application development. Skilled in building responsive interfaces, integrating backend APIs, and creating reporting systems. Comfortable working across the full stack using Express.js, SQL databases, and legacy systems like VB6",
});

const mounted = ref(false);

onMounted(() => {
  mounted.value = true;
});

const listSocialMedia = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/deny_kp/",
    icon: "mdi:instagram",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/denykpamuji/",
    icon: "mdi:linkedin",
  },
  {
    name: "GitLab",
    url: "https://gitlab.com/denykp",
    icon: "mdi:gitlab",
  },
  {
    name: "GitHub",
    url: "https://github.com/denykp",
    icon: "mdi:github",
  },
];
const listRole = [
  "Frontend Engineer",
  "Fullstack Node.js Engineer",
  // "Desktop App Developer",
];
</script>

<template>
  <div class="h-full flex items-center">
    <div class="text-white z-[2] w-full">
      <h1
        class="text-4xl font-bold transition-transform duration-300 opacity-0"
        data-aos="fade-down"
      >
        Hi, I'm Deny Kristianto Pamuji
      </h1>
      <div
        class="mt-2 text-lg transition-transform duration-300 opacity-0"
        data-aos="fade-down"
      >
        <!-- I used to be a Desktop App Developer, now I'm merely a Frontend Web
            Developer <br />
            (cz i like it more...<span class="italic">hehe</span>) -->
        <TypingAnimation :strings="listRole" leading="I'm a" />
      </div>
      <div
        class="text-xs text-gray-400 transition-all duration-500 overflow-hidden line-clamp-4 lg:w-[75%]"
      >
        With 10+ years of software development experience, including 5 years in
        web development using Vue and Nuxt, and 6 years in desktop application
        development. Skilled in building responsive interfaces, integrating
        backend APIs, and creating reporting systems. Comfortable working across
        the full stack using Express.js, SQL databases, and legacy systems like
        VB6
      </div>
      <div
        class="mt-5 w-[fit-content] flex gap-2 p-3 bg-gray-800 rounded-xl bg-opacity-70 opacity-0"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div v-for="item in listSocialMedia" class="group">
          <nuxt-link
            class="flex items-center justify-end group-hover:gap-3"
            :to="item.url"
            target="_blank"
          >
            <div
              class="text-lg w-0 group-hover:!w-20 text-right overflow-hidden transition-[width]"
            >
              {{ item.name }}
            </div>
            <UIcon
              :name="item.icon"
              size="35"
              class="transition-transform duration-200 group-hover:scale-150"
            />
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss"></style>
