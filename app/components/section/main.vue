<script setup lang="ts">
defineProps({
  mounted: {
    type: Boolean,
    default: false,
  },
});
// const classImage = ref("!-translate-x-[5vw]");
const classDesc = ref("!translate-y-[0vh]");
// const classImage2 = ref("!translate-x-[5vw]");
const classSocial = ref("!translate-y-0");

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

const listStack = [
  {
    name: "Vue",
    url: "https://vuejs.org/",
    icon: "logos:vue",
  },
  {
    name: "Nuxt",
    url: "https://nuxt.com/",
    icon: "logos:nuxt-icon",
  },
  {
    name: "React",
    url: "https://react.dev/",
    icon: "logos:react",
  },
  {
    name: "Next",
    url: "https://nextjs.org/",
    icon: "logos:nextjs-icon",
  },
  {
    name: "Node",
    url: "https://nodejs.org/",
    icon: "logos:nodejs-icon",
  },
  {
    name: "Express",
    url: "https://expressjs.com/",
    icon: "logos:express",
  },
  {
    name: "Tailwind",
    url: "https://tailwindcss.com/",
    icon: "logos:tailwindcss-icon",
  },
  {
    name: "MySQL",
    url: "https://www.mysql.com/",
    icon: "logos:mysql",
  },
  {
    name: "PostgreSQL",
    url: "https://www.postgresql.org/",
    icon: "logos:postgresql",
  },
  {
    name: "MS SQL Server",
    url: "https://www.microsoft.com/en-us/sql-server",
    icon: "devicon:microsoftsqlserver",
  },
  {
    name: "TypeScript",
    url: "https://www.typescriptlang.org/",
    icon: "logos:typescript-icon",
  },
  {
    name: "Javascript",
    url: "https://www.javascript.com/",
    icon: "logos:javascript",
  },
  {
    name: "Pinia",
    url: "https://pinia.vuejs.org/",
    icon: "logos:pinia",
  },
  {
    name: "Vuex",
    url: "https://vuex.vuejs.org/",
    icon: "material-icon-theme:vuex-store",
  },
  {
    name: "Yup",
    url: "https://yup.js.org/",
    icon: "",
  },
  {
    name: "Zod",
    url: "https://zod.dev/",
    icon: "logos:zod",
  },
];

const screenWidth = window?.innerWidth;
const screenHeight = window?.innerHeight;
</script>

<template>
  <div
    class="flex h-screen w-full bg-gradient-to-tr from-black to-gray-900 overflow-x-clip relative"
  >
    <UContainer class="relative py-40 grid grid-cols-2 gap-16">
      <div class="h-full flex items-center">
        <div class="text-white z-[2] w-full">
          <div
            class="text-4xl font-bold -translate-y-[100vh] transition-transform duration-300"
            :class="mounted ? classDesc : ''"
          >
            Hi, I'm Deny Kristianto Pamuji
          </div>
          <div
            class="mt-2 text-lg translate-y-[100vh] transition-transform duration-300"
            :class="mounted ? classDesc : ''"
          >
            <!-- I used to be a Desktop App Developer, now I'm merely a Frontend Web
            Developer <br />
            (cz i like it more...<span class="italic">hehe</span>) -->
            <TypingAnimation :strings="listRole" leading="I'm a" />
          </div>
          <div class="text-xs text-gray-400">
            With 10+ years of software development experience, including 5 years
            in web development using Vue and Nuxt, and 6 years in desktop
            application development. Skilled in building responsive interfaces,
            integrating backend APIs, and creating reporting systems.
            Comfortable working across the full stack using Express.js, SQL
            databases, and legacy systems like VB6
          </div>
          <div
            class="mt-5 w-[fit-content] transition-opacity duration-500 delay-300 flex gap-2 p-3 bg-gray-800 rounded-xl bg-opacity-70 opacity-0"
            :class="mounted ? 'opacity-100' : ''"
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
      <div class="flex items-center justify-center inner-shadow rounded-[25%]">
        <div class="grid grid-cols-4 gap-5 gap-y-10 justify-center">
          <div
            v-for="(item, index) in listStack"
            :key="index"
            class="flex justify-center items-center"
          >
            <UIcon
              v-if="item.icon"
              :name="item.icon"
              size="35"
              class="transition-transform duration-200 hover:scale-150"
            />
            <span
              v-else
              class="transition-transform duration-200 hover:scale-150 font-black text-red-600 cursor-default"
            >
              {{ item.name }}
            </span>
          </div>
        </div>
      </div>
    </UContainer>
    <!-- <UIcon
      v-for="(item, index) in listStack"
      :key="index"
      :name="item.icon"
      size="35"
      class="transition-transform duration-200 group-hover:scale-150 absolute opacity-50"
      :style="{
        top: `${Math.random() * (screenHeight - 35)}px`,
        left: `${Math.random() * (screenWidth - 35)}px`,
      }"
    /> -->
    <!-- <div
      class="hidden lg:block absolute -left-[280vw] lg:-left-[135vw] top-[80vh] lg:top-[90vh] transition-transform z-[1] -rotate-[70deg] skew-y-[45deg]"
    >
      <div
        class="h-[200vw] w-[200vw] lg:h-[100vw] lg:w-[100vw] bg-blue-950 absolute top-0 flex rounded-3xl shadow-lg transition-transform translate-x-[-80em] duration-300"
        :class="mounted ? '!translate-x-0' : ''"
      >
        <div
          class="h-[175vw] w-[175vw] lg:h-[92vw] lg:w-[92vw] bg-sky-950 mt-12 rounded-3xl drop-shadow-[-25px_25px_25px_black] flex transition-transform translate-y-[-3em] translate-x-[-70em] duration-300 delay-150 relative"
          :class="mounted ? '!translate-x-18' : ''"
        >
          <div class="absolute bottom-5 right-5 text-neutral-600">
            Nuxt|Vue|Next|React
          </div>
        </div>
        <div class="absolute bottom-5 right-5 text-neutral-600">
          ExpressJS|MS SQL Server|MySQL|PostgreSQL
        </div>
      </div>
    </div> -->
  </div>
</template>

<style lang="postcss">
/* .section-main::before {
  @apply text-[5vw] font-extrabold text-black;
  @apply text-transparent bg-clip-text bg-gradient-to-r from-gray-950 to-black;
}
.section-main {
  transform: perspective(50px) rotateY(-5deg) scale(1.9, 1);
  &::before {
    content: "PA\aMU\aJI";
    white-space: pre-wrap;
    line-height: 0.75;
  }
} */

/* .bg {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0) 100%
  );
} */
.bg-child {
  /* background-clip: text;
  -webkit-background-clip: text;
  color: transparent; */
  -webkit-mask-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(0, 0, 0, 1)),
    to(rgba(0, 0, 0, 0))
  );
  mask-image: linear-gradient(to left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
}
</style>
