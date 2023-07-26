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
      <div class="text-4xl font-bold mb-5">Companies I've been working for</div>
      <div>
        <div v-for="item in listCompany" class="mb-4 flex gap-2">
          <div>=></div>
          <div>
            <nuxt-link
              class="text-xl font-bold flex w-fit hover:underline"
              :to="item.url"
              target="_blank"
            >
              <span>{{ item.name }}&nbsp;</span>
              <span>({{ item.years }})</span>
            </nuxt-link>
            <div>Stacks: {{ item.stacks.join(", ") }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
