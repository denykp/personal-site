<script setup lang="ts">
defineProps({
  isVisible: Boolean,
});
</script>

<template>
  <div
    class="h-screen w-full text-white bg-gradient-to-tl from-gray-900 to-black relative overflow-x-clip"
  >
    <UContainer class="pt-24 lg:pt-40 z-[2]">
      <div
        class="text-3xl font-bold mb-5 text-center lg:grid lg:grid-cols-4 lg:text-left"
      >
        <div class="col-start-2 col-span-3">
          My Journey as a Software Engineer
        </div>
      </div>
      <div class="lg:grid lg:grid-cols-4">
        <div class="hidden lg:block">
          <div
            class="h-64 w-52 bg-gray-800 text-white flex justify-center items-center rounded-xl px-6 text-center"
          >
            Imagine this as a picture of me (lol)
          </div>
        </div>
        <div class="lg:col-span-3 text-justify leading-4 lg:leading-normal">
          <!-- I have 3 years of experience in Frontend Web Programming, I have a few
          experiences on Angular and React.js projects, but I work mainly on
          Vue.js/NuxtJS. Previously I work in Desktop Programming for 6 years. I
          can use VB6, VB.Net, SQL server, MySQL, and crystal report. Most of
          the program I work on is about retail and small factory production. -->

          It all started in 2013 after I finished my associate degree. I join a
          software house company called 3PM Solution and worked as Desktop App
          Developer. I work mainly on Visual Basic which I'm pretty sure not
          many developers nowadays even have heard about it (lmao). Since the
          desktop app is not separated by a frontend and backend like a web app,
          I have a requirement to understand SQL queries too. I learn queries
          from databases like MS SQL Server and PostgreSQL which actually have a
          lot of similarities in between. In this company, I get experience to
          make apps for retail, warehouse, and manufacturing.<br /><br />
          After a few years of wandering around desktop programming, I realized
          that the programming world is already shifting to the web app and
          mobile app. I felt like being left behind (╥﹏╥). Then I got my first
          experience with the web app from an Angular 4 project, it feels like a
          different world to me. Since then I fell in love with web app
          development, I switch my career to a Frontend Engineer and I work
          daily on Nuxt and Vue.<br /><br />
          But as we all know, technology never fall asleep. We shall never stop
          learning to stay relevant with the latest technology. So I jump up
          into another framework and learning Next and React. For the backend
          environment I learn ExpressJS, it kind of old tech for some people but
          I think it's a good start to learn on backend stuff since it also
          based on javascript.
        </div>
      </div>
    </UContainer>
    <!-- <div
      class="relative z-[1] mt-72 w-[25em] ml-auto transition-all duration-700 delay-150 hidden lg:block animate-spin"
      :class="isVisible ? '!mt-20' : ''"
      style="animation-duration: 5s"
    >
      <div
        class="h-[25em] w-[25em] border-8 border-blue-950 rounded-full"
      ></div>
      <div
        class="absolute right-0 top-0 h-[10em] w-[10em] border-8 border-sky-950 rounded-full"
      ></div>
      <div
        class="absolute left-0 top-0 translate-y-[160%] h-[10em] w-[10em] border-8 border-sky-950 rounded-full"
      ></div>
    </div> -->
  </div>
</template>
