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
</script>

<template>
  <div
    class="flex h-screen w-full bg-gradient-to-tr from-black to-gray-900 overflow-x-clip relative"
  >
    <UContainer class="relative">
      <div class="h-full flex items-center">
        <div class="text-white z-[2]">
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
      <!-- <div
        class="text-white absolute right-5 bottom-[5vh] lg:right-10 lg:bottom-10 z-[2] hidden lg:block"
      >
        <div
          class="mt-auto translate-y-[30vh] transition-transform duration-500 delay-300 flex gap-2 p-3 bg-gray-800 rounded-xl bg-opacity-70"
          :class="mounted ? classSocial : ''"
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
      </div> -->
      <!-- <div
      ref="elPicture"
      class="hidden absolute right-0 top-[5vh] transition-transform duration-300 translate-x-[100vw]"
    >
      <div
        class="section-main font-mono drop-shadow-[10px_10px_0_#00000066]"
      ></div>
    </div> -->

      <!-- main triangle -->
      <!-- <div class="absolute right-0 bottom-0 z-[1] bg">
      <img src="/assets/images/sendiri.jpg" alt="" class="h-[100vh] bg-child" />
    </div> -->
    </UContainer>
    <div
      class="absolute -left-[1750px] top-[90vh] lg:-left-[105vw] lg:top-[88vh] transition-transform z-[1] -rotate-[70deg] skew-y-[45deg]"
    >
      <div
        class="h-[160vh] w-[160vh] bg-blue-950 absolute top-0 flex rounded-3xl shadow-lg transition-transform translate-x-[-80em] duration-300"
        :class="mounted ? '!translate-x-0' : ''"
      >
        <div
          class="h-[145vh] w-[145vh] bg-sky-950 mt-12 rounded-3xl drop-shadow-[-25px_25px_25px_black] flex transition-transform translate-y-[-3em] translate-x-[-70em] duration-300 delay-150 relative"
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
    </div>
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
