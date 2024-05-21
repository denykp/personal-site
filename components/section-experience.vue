<script setup lang="ts">
const listCompany = [
  {
    name: "3PM Solution",
    url: "https://www.3pm-solution.com/",
    years: "2013 - 2019",
    stacks: [
      "VB6",
      "VB.Net",
      "Crystal Report",
      "MS SQL Server",
      "PostgreSQL",
      "Angular 4",
      "Typescript",
    ],
  },
  {
    name: "Sprint Asia Technology",
    url: "https://www.sprintasia.co.id/",
    years: "2019 - 2022",
    stacks: ["Vue.js", "Nuxt", "Javascript", "Typescript"],
  },
  {
    name: "Privy Identitas Digital",
    url: "https://privy.id/",
    years: "2022 - Now",
    stacks: ["Vue.js", "Nuxt", "Javascript", "Typescript"],
  },
];
</script>

<template>
  <div
    class="bg-black h-screen w-screen text-white py-10 bg-gradient-to-bl from-gray-900 to-black relative"
  >
    <div class="container mx-auto pt-32">
      <div class="text-4xl font-bold mb-10">
        Companies I've been working for
      </div>
      <div class="-ml-4">
        <nuxt-link
          v-for="item in listCompany"
          class="mb-5 flex transition-[padding] duration-300 hover:outline hover:py-3 px-4 outline-gray-800 hover:bg-gradient-to-tl from-black to-gray-800 rounded-xl cursor-pointer"
          :to="item.url"
          target="_blank"
        >
          <div>
            <div class="text-xl font-bold flex w-fit">
              <span>{{ item.name }}&nbsp;</span>
              <span>({{ item.years }})</span>
            </div>
            <div>Stacks: {{ item.stacks.join(", ") }}</div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
