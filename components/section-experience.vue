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
    class="bg-black h-screen w-full text-white bg-gradient-to-bl from-gray-900 to-black relative overflow-x-clip"
  >
    <div class="container mx-auto pt-24 lg:pt-40 px-5">
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
            <div class="font-bold lg:flex w-fit">
              <div class="text-xl">{{ item.name }}&nbsp;</div>
              <div class="text-md md:text-xl">({{ item.years }})</div>
            </div>
            <div>Stacks: {{ item.stacks.join(", ") }}</div>
          </div>
        </nuxt-link>
      </div>
    </div>
    <div class="absolute bottom-0 -mx-5 h-64 pt-24 hidden lg:block w-full">
      <div class="animate-marquee-right flex">
        <div class="animate-bounce flex">
          <div
            class="relative h-[10em] w-[10em] animate-[spin_3.5s_linear_infinite]"
          >
            <div
              class="absolute right-0 top-0 h-[10em] w-[10em] border-4 border-blue-950 rounded-full"
            ></div>
            <div
              class="absolute right-0 top-0 h-[3em] w-[3em] border-4 border-sky-950 rounded-full"
            ></div>
            <div
              class="absolute left-0 top-0 translate-y-[230%] h-[3em] w-[3em] border-4 border-sky-950 rounded-full"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
/* .bounce2 {
  animation: bounce2 1s linear infinite;
}
@keyframes bounce2 {
  0%,
  100% {
    transform: translateY(-45%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: none;
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
} */
</style>
