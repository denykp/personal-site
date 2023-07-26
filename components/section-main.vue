<script setup lang="ts">
defineProps({
  mounted: {
    type: Boolean,
    default: false,
  },
});
const classImage = ref("!-translate-x-[13vw]");
const classDesc = ref("!translate-y-[0vh]");
const classImage2 = ref("translate-x-[5vw]");
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
          Used to be a Desktop App Developer, but now I'm merely a Frontend Web
          Developer <br />
          (cz i like it more...<span class="italic">hehe</span>)
        </div>
      </div>
      <div class="flex"></div>
    </div>
    <div
      ref="elPicture"
      class="hidden absolute right-0 top-[50%] -translate-y-[50%] transition-transform duration-300 translate-x-[100vw]"
      :class="mounted ? classImage : ''"
    >
      <div
        class="section-main font-mono drop-shadow-[10px_10px_0_#00000066]"
      ></div>
    </div>

    <div
      class="absolute -left-20 -top-[20%] transition-transform -translate-x-[60em] duration-300 z-[1] rotate-[30deg] -skew-x-[25deg]"
      :class="mounted ? classImage2 : ''"
    >
      <div
        class="h-[70em] w-[70em] bg-blue-950 absolute top-0 flex rounded-3xl shadow-lg"
      >
        <div
          class="h-[50em] w-[50em] bg-sky-950 m-auto rounded-3xl drop-shadow-[35px_35px_35px_black]"
        ></div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.section-main::before {
  @apply text-[15vw] font-extrabold text-black;
  /* @apply text-transparent bg-clip-text bg-gradient-to-r from-gray-950 to-black; */
}
.section-main {
  transform: perspective(100px) rotateY(-5deg) scale(1.9, 1);
  &::before {
    content: "PA\aMU\aJI";
    white-space: pre-wrap;
    line-height: 0.75;
  }
}
</style>
