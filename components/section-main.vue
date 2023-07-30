<script setup lang="ts">
defineProps({
  mounted: {
    type: Boolean,
    default: false,
  },
});
const classImage = ref("!-translate-x-[5vw]");
const classDesc = ref("!translate-y-[0vh]");
const classImage2 = ref("!translate-x-[5vw]");
const classSocial = ref("!translate-y-[0vh]");

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
    name: "GitHub",
    url: "https://github.com/denykp",
    icon: "mdi:github",
  },
];
</script>

<template>
  <div
    class="h-screen w-screen bg-gradient-to-tr from-black to-gray-900 relative"
  >
    <div class="h-full flex justify-between items-center container mx-auto">
      <div class="text-white z-[2] px-5 md:px-0">
        <div
          class="text-5xl font-bold -translate-y-[100vh] transition-transform duration-300"
          :class="mounted ? classDesc : ''"
        >
          Hi, I'm Deny Kristianto Pamuji
        </div>
        <div
          class="mt-2 text-lg translate-y-[100vh] transition-transform duration-300"
          :class="mounted ? classDesc : ''"
        >
          I used to be a Desktop App Developer, now I'm merely a Frontend Web
          Developer <br />
          (cz i like it more...<span class="italic">hehe</span>)
        </div>
      </div>
      <div class="h-full text-white flex justify-end py-10">
        <div
          class="mt-auto translate-y-[30vh] transition-transform duration-300 flex"
          :class="mounted ? classSocial : ''"
        >
          <div v-for="item in listSocialMedia" class="group">
            <nuxt-link
              class="mb-2 flex items-center justify-end gap-3"
              :to="item.url"
              target="_blank"
            >
              <div
                class="text-lg w-0 group-hover:!w-20 text-right overflow-hidden transition-[width]"
              >
                {{ item.name }}
              </div>
              <Icon
                :name="item.icon"
                size="35"
                class="transition-transform duration-200 group-hover:scale-150"
              />
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div
      ref="elPicture"
      class="hidden absolute right-0 top-[5vh] transition-transform duration-300 translate-x-[100vw]"
      :class="mounted ? classImage : ''"
    >
      <div
        class="section-main font-mono drop-shadow-[10px_10px_0_#00000066]"
      ></div>
    </div>

    <div
      class="absolute -left-20 -top-[4%] transition-transform -translate-x-[70em] duration-300 z-[1] rotate-[20deg] -skew-x-[42deg]"
      :class="mounted ? classImage2 : ''"
    >
      <div
        class="h-[80em] w-[80em] bg-blue-950 absolute top-0 flex rounded-3xl shadow-lg"
      >
        <div
          class="h-[70em] w-[70em] bg-sky-950 mt-12 rounded-3xl drop-shadow-[35px_35px_35px_black]"
        ></div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.section-main::before {
  @apply text-[5vw] font-extrabold text-black;
  /* @apply text-transparent bg-clip-text bg-gradient-to-r from-gray-950 to-black; */
}
.section-main {
  transform: perspective(50px) rotateY(-5deg) scale(1.9, 1);
  &::before {
    content: "PA\aMU\aJI";
    white-space: pre-wrap;
    line-height: 0.75;
  }
}
</style>
