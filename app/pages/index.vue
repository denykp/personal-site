<script setup lang="ts">
import useApiPublic from "~/composables/api/useApiPublic";
import type { Menu, PortfolioData } from "~~/shared/types";

useSeoMeta({
  title: "Frontend Engineer | FullStack Node.js Engineer",
  description:
    "Frontend & Fullstack Node.js Engineer with 10+ years of software engineering experience, specializing in building high-performance web applications with Vue/Nuxt and React/Next.js. Experienced in collaborating with cross-functional teams to build modular UI components, contribute to framework migrations, and optimize page performance.",
});

const mounted = ref(false);

onMounted(() => {
  mounted.value = true;
});

const { getListStack, getListPortfolio } = useApiPublic();
const { data: listStack } = await getListStack();

const coreStacks = computed(() => {
  return listStack.value?.filter((s) => s.highlight) || [];
});

const otherStacks = computed(() => {
  return listStack.value?.filter((s) => !s.highlight) || [];
});
const { data: dataPortfolio } = await getListPortfolio();

const featuredPortfolios = computed(() => {
  return dataPortfolio.value?.filter((p) => p.highlight).slice(0, 3) || [];
});

const displayModal = ref(false);
const selectedDetail = ref<PortfolioData | null>(null);

const openDetail = (item: PortfolioData) => {
  selectedDetail.value = item;
  displayModal.value = true;
};

// Mouse positions & hover preview logic
const activeItem = ref<any>(null);
const showPreview = ref(false);
const mouseX = ref(0);
const mouseY = ref(0);
const previewX = ref(0);
const previewY = ref(0);
let animationFrameId: any = null;
let leaveTimeout: any = null;

const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end;

const tick = () => {
  if (isNaN(previewX.value) || isNaN(mouseX.value)) {
    previewX.value = mouseX.value || 0;
  } else {
    previewX.value = lerp(previewX.value, mouseX.value, 0.15);
  }

  if (isNaN(previewY.value) || isNaN(mouseY.value)) {
    previewY.value = mouseY.value || 0;
  } else {
    previewY.value = lerp(previewY.value, mouseY.value, 0.15);
  }

  if (showPreview.value) {
    animationFrameId = requestAnimationFrame(tick);
  }
};

const onMouseMove = (e: MouseEvent) => {
  if (e && typeof e.clientX === "number" && typeof e.clientY === "number") {
    mouseX.value = e.clientX;
    mouseY.value = e.clientY;
  }
};

const hoverItem = (item: any, e: MouseEvent) => {
  if (leaveTimeout) {
    clearTimeout(leaveTimeout);
    leaveTimeout = null;
  }

  activeItem.value = item;

  // Robust coordinate resolution for browser testing / keyboard focus fallback
  let x = e?.clientX;
  let y = e?.clientY;
  if (x === undefined || y === undefined || (x === 0 && y === 0)) {
    const rect = (e?.target as HTMLElement)?.getBoundingClientRect();
    if (rect) {
      x = rect.left + rect.width / 2;
      y = rect.top;
    } else {
      x = window.innerWidth / 2;
      y = window.innerHeight / 2;
    }
  }

  if (!showPreview.value) {
    mouseX.value = x;
    mouseY.value = y;
    previewX.value = x;
    previewY.value = y;
    showPreview.value = true;
    tick();
  }
};

const leaveItem = () => {
  leaveTimeout = setTimeout(() => {
    showPreview.value = false;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }, 50);
};

onUnmounted(() => {
  if (leaveTimeout) clearTimeout(leaveTimeout);
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
});

// Hero Spotlight mouse tracking
const heroRef = ref<HTMLElement | null>(null);
const heroMouseX = ref(0);
const heroMouseY = ref(0);
const isHoveringHero = ref(false);

const onHeroMouseMove = (e: MouseEvent) => {
  if (heroRef.value) {
    const rect = heroRef.value.getBoundingClientRect();
    heroMouseX.value = e.clientX - rect.left;
    heroMouseY.value = e.clientY - rect.top;
  }
};

const scrollToTechStack = () => {
  const el = document.getElementById("tech-stack-section");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

const getBrandColor = (name: string): string => {
  const n = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  const colors: Record<string, string> = {
    vue: "#41B883",
    vuejs: "#41B883",
    vuex: "#41B883",
    nuxt: "#00DC82",
    nuxtjs: "#00DC82",
    react: "#61DAFB",
    reactjs: "#61DAFB",
    next: "#ffffff",
    nextjs: "#ffffff",
    node: "#339933",
    nodejs: "#339933",
    express: "#ffffff",
    expressjs: "#ffffff",
    tailwind: "#06B6D4",
    tailwindcss: "#06B6D4",
    typescript: "#3178C6",
    javascript: "#F7DF1E",
    nestjs: "#E0234E",
    nest: "#E0234E",
    angular: "#DD0031",
    postgresql: "#4169E1",
    postgres: "#4169E1",
    mysql: "#00758F",
    mssqlserver: "#CC292B",
    sqlserver: "#CC292B",
    pinia: "#FFE56C",
    android: "#3DDC84",
    axios: "#5A29E4",
    zod: "#3068B7",
    zustand: "#453E3B",
    tanstack: "#FF4154",
    yup: "#E7000B",
    visualbasic6: "#000080",
    vb6: "#000080",
    visualbasicnet: "#512BD4",
    vbnet: "#512BD4",
    crystalreport: "#003366",
    crystalreports: "#003366",
    materialui: "#007FFF",
    mui: "#007FFF",
    reacthookform: "#EC5990",
  };
  return colors[n] || "#60a5fa";
};

const hasLogo = (logo: string | undefined): boolean => {
  return !!logo && logo !== "undefined" && logo.trim() !== "";
};

const isCopied = ref(false);
const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText("deny@pamuji.id");
    isCopied.value = true;
    setTimeout(() => {
      isCopied.value = false;
    }, 2000);
  } catch (err) {
    console.error("Failed to copy email: ", err);
  }
};

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
];
</script>

<template>
  <div class="flex flex-col gap-12 sm:gap-16 pb-20" @mousemove="onMouseMove">
    <!-- Hero Section -->
    <div ref="heroRef"
      class="min-h-screen flex flex-col justify-center relative overflow-hidden border-b border-gray-900/50 bg-neutral-950/20 py-16 md:py-24"
      @mousemove="onHeroMouseMove" @mouseenter="isHoveringHero = true" @mouseleave="isHoveringHero = false">
      <!-- Background Grid Overlay -->
      <div
        class="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />

      <!-- Background Ambient Glows -->
      <div
        class="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div
        class="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <!-- Interactive Spotlight Layer -->
      <div class="absolute inset-0 z-0 pointer-events-none transition-opacity duration-750 ease-out hidden md:block"
        :class="isHoveringHero ? 'opacity-100' : 'opacity-0'" :style="{
          background: `radial-gradient(600px circle at ${heroMouseX}px ${heroMouseY}px, rgba(96, 165, 250, 0.08), transparent 75%)`
        }" />

      <div class="max-w-6xl mx-auto px-4 sm:px-6 w-full z-2 pt-28 pb-12 lg:pt-36 lg:pb-16">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center w-full">
          <!-- Hero Details (Left Column) -->
          <div class="lg:col-span-7 text-white flex flex-col gap-5">
            <h1 class="text-3xl sm:text-5xl font-extrabold leading-tight animate-fade-up">
              Hi, I'm <span class="bg-clip-text text-transparent bg-linear-to-r from-primary to-purple-400">Deny
                Kristianto Pamuji</span>
            </h1>
            <div class="text-lg sm:text-xl font-medium text-gray-200 animate-fade-up" style="animation-delay: 150ms;">
              <TypingAnimation :strings="listRole" leading="I'm a" />
            </div>
            <div class="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-[90%] animate-fade-up" style="animation-delay: 300ms;">
              Frontend & Fullstack Node.js Engineer with 10+ years of software engineering experience,
              specializing in building high-performance web applications with Vue/Nuxt and React/Next.js.
              Experienced in collaborating with cross-functional teams to build clean, modular UI components,
              contribute to framework migrations, and optimize page performance for a smooth user experience.
              Comfortable working across the stack using Node.js, Express, and SQL, and bridging modern web
              architectures with legacy systems.
            </div>

            <div class="mt-4 flex flex-wrap gap-4 items-center animate-fade-up" style="animation-delay: 450ms;">
              <!-- Connect / Social Media Popover -->
              <UPopover :content="{ align: 'start', side: 'bottom', sideOffset: 8 }">
                <UButton icon="heroicons:sparkles" size="lg" color="neutral" variant="outline"
                  class="font-bold cursor-pointer transition-transform duration-200 hover:scale-105">
                  Find Me
                </UButton>

                <template #content>
                  <div class="p-1 flex flex-col gap-1 min-w-36">
                    <NuxtLink v-for="item in listSocialMedia" :key="item.name" :to="item.url" target="_blank"
                      class="flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-850 rounded-lg transition-all duration-200">
                      <UIcon :name="item.icon" size="20" class="text-primary" />
                      <span class="font-medium">{{ item.name }}</span>
                    </NuxtLink>
                  </div>
                </template>
              </UPopover>

              <!-- CV / Resume Download CTA -->
              <UButton to="/files/Resume - Deny Kristianto Pamuji.pdf" target="_blank"
                download="Resume - Deny Kristianto Pamuji.pdf" icon="heroicons:arrow-down-tray" size="lg"
                color="neutral" variant="outline"
                class="font-bold cursor-pointer transition-transform duration-200 hover:scale-105">
                Download Resume
              </UButton>

              <!-- Copy Email Button -->
              <UButton :icon="isCopied ? 'heroicons:check' : 'heroicons:envelope'"
                :trailing-icon="isCopied ? undefined : 'heroicons:document-duplicate'" size="lg" color="neutral"
                variant="outline" class="font-bold cursor-pointer transition-transform duration-200 hover:scale-105"
                :class="{ 'text-purple-500!': isCopied }" @click="copyEmail">
                {{ isCopied ? 'Copied!' : 'deny@pamuji.id' }}
              </UButton>
            </div>
          </div>

          <!-- Profile Picture Widget (Right Column) -->
          <div class="lg:col-span-5 flex justify-center w-full">
            <div class="relative group hover:scale-[1.02] hover:-rotate-1 transition-all duration-500 ease-out animate-fade-up" style="animation-delay: 200ms;">
              <!-- Background Ambient Glow -->
              <div
                class="absolute -inset-1.5 bg-linear-to-tr from-primary to-purple-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none" />

              <!-- Card Wrapper -->
              <div
                class="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-neutral-900/50 backdrop-blur-md border border-gray-800/80 rounded-3xl p-3.5 shadow-2xl flex items-center justify-center overflow-hidden">
                <NuxtImg src="/images/Profile Picture Compressed.webp" alt="Deny Kristianto Pamuji" width="640" height="640" priority
                  class="w-full h-full object-cover rounded-2xl shadow-xl transition-all duration-500 ease-out group-hover:scale-105 transform-[scale(1.5)_translate(0px,35px)]" />
              </div>

              <!-- Overlapping Float Badge 1 (Top-Left): Status -->
              <div
                class="absolute -top-3 -left-3 bg-neutral-950/90 border border-gray-800 rounded-full px-3 py-1 text-[10px] sm:text-xs font-semibold text-gray-200 flex items-center gap-1.5 shadow-xl backdrop-blur-md">
                <span class="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                <span>Let's Collaborate</span>
              </div>

              <!-- Overlapping Float Badge 2 (Bottom-Right): Location -->
              <div
                class="absolute -bottom-3 -right-3 bg-neutral-950/90 border border-gray-800 rounded-full px-3 py-1 text-[10px] sm:text-xs font-semibold text-gray-200 flex items-center gap-1.5 shadow-xl backdrop-blur-md">
                <UIcon name="heroicons:map-pin-20-solid" class="text-primary text-sm" />
                <span>Yogyakarta, ID</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Animated Scroll Indicator -->
      <div
        class="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50 hover:opacity-90 transition-opacity duration-300 cursor-pointer z-2"
        @click="scrollToTechStack">
        <span class="text-[10px] font-mono tracking-widest text-gray-500 uppercase">Technologies</span>
        <UIcon name="heroicons:chevron-down-20-solid" class="text-lg animate-bounce text-primary" />
      </div>
    </div>

    <!-- Tech Stack Section -->
    <div id="tech-stack-section" class="py-20" data-aos="fade-up">
      <h2 class="text-xs font-bold uppercase tracking-widest text-primary mb-10 text-center">
        Technologies I Work With
      </h2>

      <!-- Core Tech Stacks -->
      <div class="max-w-6xl mx-auto px-4 w-full mb-16">
        <div class="flex flex-wrap items-center justify-center gap-4">
          <NuxtLink v-for="item in coreStacks" :key="item.id" :to="item.url" target="_blank"
            class="w-[calc(50%-8px)] sm:w-44 flex flex-col items-center justify-center gap-3 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group relative overflow-hidden bg-neutral-900/20 hover:bg-neutral-900/60 border border-gray-800/40 hover:border-gray-700/60 rounded-2xl p-5">
            <!-- Background Glow on Hover -->
            <div
              class="absolute -inset-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              :style="{
                background: `radial-gradient(120px circle at center, ${item.color}0d, transparent)`
              }" />

            <div v-if="hasLogo(item.logo)"
              class="w-12 h-12 flex items-center justify-center p-1 rounded-xl bg-neutral-950/40 border border-gray-850/60 group-hover:scale-105 transition-transform duration-300">
              <NuxtImg :src="item.logo" :alt="item.name" width="40" height="40" loading="lazy" class="w-10 h-10 object-contain" />
            </div>
            <div v-else
              class="w-12 h-12 flex items-center justify-center p-1.5 rounded-xl bg-neutral-950/40 border border-gray-850/60 font-black text-[10px] tracking-tight group-hover:scale-105 transition-transform duration-300 select-none leading-none text-center"
              :style="{ color: item.color || '#4b5563', borderColor: (item.color || '#4b5563') + '33' }">
              {{ item.name }}
            </div>
            <span class="text-xs sm:text-sm font-bold text-gray-300 group-hover:text-white transition-colors">
              {{ item.name }}
            </span>
          </NuxtLink>
        </div>
      </div>

      <!-- Other Tech Stacks (Badges) -->
      <div class="max-w-4xl mx-auto px-4 w-full">
        <h3 class="text-[10px] font-mono tracking-widest text-gray-500 uppercase text-center mb-6">
          Other Libraries & Tools
        </h3>
        <div class="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-3.5">
          <NuxtLink v-for="item in otherStacks" :key="item.id" :to="item.url" target="_blank"
            class="px-3.5 py-1.5 bg-neutral-900/25 hover:bg-neutral-900/70 border border-gray-850/60 hover:border-gray-750 rounded-full text-xs transition-all duration-200 hover:scale-105 flex items-center gap-1.5 font-medium shadow-sm hover:brightness-110 cursor-pointer">
            <NuxtImg v-if="hasLogo(item.logo)" :src="item.logo" :alt="item.name" width="16" height="16" loading="lazy" class="w-3.5 h-3.5 object-contain" />
            <span :style="{ color: hasLogo(item.logo) ? undefined : item.color }" :class="{
              'text-gray-400 hover:text-white': hasLogo(item.logo),
              'font-bold': !hasLogo(item.logo)
            }">
              {{ item.name }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Featured Projects Section -->
    <div id="featured-projects-section" class="py-16 border-t border-gray-800/40" data-aos="fade-up">
      <div class="max-w-6xl mx-auto px-4">
        <h2 class="text-xs font-bold uppercase tracking-widest text-primary mb-2 text-center">
          Featured Projects
        </h2>
        <h3 class="text-2xl sm:text-3xl font-bold text-white text-center mb-10">
          Selected works from my portfolio
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="item in featuredPortfolios" :key="item.id"
            class="bg-neutral-900/40 hover:bg-neutral-900/85 border border-gray-800/50 hover:border-gray-700/80 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer group flex flex-col h-full"
            @click="openDetail(item)">
            <!-- Card Image -->
            <div class="aspect-video overflow-hidden shrink-0 relative bg-neutral-950">
              <NuxtImg :src="item.images[0] || `/images/no-image-placeholder.svg`"
                width="400" height="225" loading="lazy"
                class="w-full h-full object-cover transition-all duration-500 scale-100 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                :alt="item.name" />
              <div
                class="absolute inset-0 bg-linear-to-t from-neutral-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span class="text-xs font-medium text-white flex items-center gap-1">
                  View Project Details
                  <UIcon name="heroicons:arrow-right-20-solid" class="text-sm" />
                </span>
              </div>
            </div>

            <!-- Card Details -->
            <div class="p-6 flex flex-col justify-between grow">
              <div>
                <div class="flex items-center justify-between gap-2 mb-2">
                  <span class="text-[10px] font-bold uppercase tracking-wider text-primary">
                    {{ item.project_type }}
                  </span>
                  <span class="text-[10px] font-semibold text-gray-500">
                    {{ item.role }}
                  </span>
                </div>
                <h4 class="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                  {{ item.name }}
                </h4>
                <p class="text-xs text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                  {{ item.description }}
                </p>
              </div>

              <!-- Badges -->
              <div class="flex flex-wrap gap-1.5 pt-2">
                <UBadge v-for="stack in item.stacks.slice(0, 3)" :key="stack.id" :label="stack.name" color="primary"
                  size="sm" variant="subtle" class="text-[10px] py-0.5 px-1.5" />
                <span v-if="item.stacks.length > 3" class="text-[10px] text-gray-500 self-center pl-1">
                  +{{ item.stacks.length - 3 }} more
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- View All Projects CTA -->
        <div class="mt-12 text-center">
          <UButton to="/portfolio" icon="heroicons:arrow-right-20-solid" trailing size="lg" variant="outline"
            class="font-bold cursor-pointer transition-transform duration-200 hover:scale-105">
            View All Projects
          </UButton>
        </div>
      </div>
    </div>

    <!-- Project Detail Modal -->
    <UModal v-model:open="displayModal">
      <template #content>
        <div class="text-2xl font-bold mb-4 flex items-center gap-2 p-5 justify-between">
          <div>{{ selectedDetail?.name }}</div>
          <UButton v-if="selectedDetail?.url" label="Visit" icon="heroicons:arrow-top-right-on-square"
            :to="selectedDetail?.url" target="_blank" />
        </div>
        <div class="p-5 overflow-y-auto">
          <UCarousel v-slot="{ item }" :items="selectedDetail?.images.length
            ? selectedDetail?.images
            : [`/images/no-image-placeholder.svg`]
            " class="w-full max-w-xs mx-auto" arrows>
            <div class="flex justify-center items-center min-h-64">
              <NuxtImg :src="item" :alt="selectedDetail?.name || 'Project screenshot'" class="max-w-full max-h-64 object-contain rounded-lg"
                style="height: auto; width: auto" />
            </div>
          </UCarousel>
          <div class="text-neutral-300 mb-4 text-sm mt-4 leading-relaxed">
            {{ selectedDetail?.description }}
          </div>
          <div class="flex flex-wrap gap-2 mb-4">
            <UBadge v-for="stack in selectedDetail?.stacks" :key="stack.id" class="mt-2 mr-1" :label="stack.name"
              color="primary" size="sm" variant="subtle" />
          </div>
        </div>
        <UButton label="Close" class="m-4 justify-center" color="neutral" variant="outline"
          @click="displayModal = false" />
      </template>
    </UModal>

    <!-- Floating Magnetic Tech Card -->
    <div class="fixed pointer-events-none z-50 transition-all duration-300 ease-out"
      :class="showPreview && activeItem ? 'opacity-100 scale-100' : 'opacity-0 scale-75'" :style="{
        left: `${previewX}px`,
        top: `${previewY}px`,
        transform: 'translate(-50%, -120%)',
      }">
      <div v-if="activeItem"
        class="p-4 bg-neutral-900/90 border rounded-2xl flex flex-col items-center justify-center gap-2 shadow-2xl backdrop-blur-md transition-all duration-300"
        :style="{
          boxShadow: `0 20px 40px -15px ${getBrandColor(activeItem.name)}44`,
          borderColor: getBrandColor(activeItem.name)
        }">
        <NuxtImg v-if="activeItem.logo && activeItem.logo !== 'undefined'" :src="activeItem.logo"
          class="w-16 h-16 object-contain" :alt="activeItem.name" />
        <div v-else class="w-16 h-16 rounded-xl flex items-center justify-center font-black bg-white"
          :style="{ color: getBrandColor(activeItem.name) }">
          {{ activeItem.name }}
        </div>
        <span class="text-xs font-bold text-gray-300 mt-1">{{ activeItem.name }}</span>
      </div>
    </div>
  </div>
</template>
