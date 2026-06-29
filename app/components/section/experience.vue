<script setup lang="ts">
interface CompanyExperience {
  name: string;
  url: string;
  role: string;
  location: string;
  years: string;
  stacks: string[];
  description: string[];
}

const listCompany: CompanyExperience[] = [
  {
    name: "Mekari Qontak",
    url: "https://qontak.com/",
    role: "Software Engineer",
    location: "Yogyakarta, Indonesia (Hybrid)",
    years: "Oct 2025 - Present",
    stacks: ["Vue.js", "Nuxt.js", "TypeScript", "Pinia", "REST API Integration", "Tailwind CSS"],
    description: [
      "Contributed to the end-to-end feature development, system maintenance, and bug resolution for the Qontak Omnichannel Dashboard.",
      "Serve in a weekly on-call rotation to provide rapid technical support, handle live confirmations, and deploy urgent hotfixes, ensuring high system availability.",
      "Coordinate bi-weekly production deployments as part of a scheduled PIC release rotation.",
      "Actively contributed to a major architectural migration from legacy Nuxt 2 to a modern Nuxt 4 ecosystem, driving a 40% improvement in the platform's Lighthouse performance score.",
      "Leverage AI-assisted development tools (Claude Code and GitHub Copilot) to accelerate feature delivery, optimize code quality, and maintain the Qontak Omnichannel Dashboard."
    ],
  },
  {
    name: "PT Kita Semua Satu",
    url: "https://www.meda.technology/",
    role: "Frontend Developer",
    location: "Sleman, D.I Yogyakarta",
    years: "Dec 2024 - Jul 2025",
    stacks: ["Vue.js", "Nuxt.js", "JavaScript", "TypeScript", "Tailwind CSS"],
    description: [
      "Maintained and enhanced 10+ dynamic components for tables and forms.",
      "Developed interfaces based on UI/UX team designs, resulting in a 15% improvement in user satisfaction.",
      "Collaborated with the backend team to optimize data structures and facilitate data integration, leading to a 20% reduction in data processing time."
    ],
  },
  {
    name: "PT Privy Identitas Digital",
    url: "https://privy.id/",
    role: "Frontend Engineer",
    location: "Sleman, D.I Yogyakarta",
    years: "Oct 2022 - Nov 2024",
    stacks: ["Vue.js", "Nuxt.js", "JavaScript", "TypeScript", "Vuex"],
    description: [
      "Collaborated with the project team to develop applications for various companies, integrating Privy digital signatures for enterprise users.",
      "Partnered with the UI/UX team to design optimal applications based on user requirements.",
      "Teamed up with the backend team to integrate API data into the web application interface."
    ],
  },
  {
    name: "PT Sprint Asia Technology",
    url: "https://www.sprintasia.co.id/",
    role: "Frontend Developer",
    location: "Malang, East Java",
    years: "Nov 2019 - Oct 2022",
    stacks: ["Vue.js", "Nuxt.js", "JavaScript", "TypeScript", "Axios"],
    description: [
      "Managed reconciliation and disbursement systems.",
      "Developed user interfaces according to PM designs.",
      "Collaborated with backend teams for API integration.",
      "Built a company profile website for Bayarind, a subsidiary."
    ],
  },
  {
    name: "3PM Solution",
    url: "https://www.3pm-solution.com/",
    role: "Software Engineer",
    location: "Malang, East Java",
    years: "Oct 2013 - Nov 2019",
    stacks: ["VB6", "VB.Net", "Crystal Report", "MS SQL Server", "PostgreSQL", "Angular 4", "TypeScript"],
    description: [
      "Designed the interfaces for the desktop applications based on user requirements.",
      "Wrote robust code based on UI designs, tested code logic, and verified software execution flows.",
      "Deployed systems directly to client PCs, provided hands-on training, troubleshooting, and direct technical support."
    ],
  },
];
</script>

<template>
  <div class="w-full text-white min-h-screen relative pb-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <!-- Header with Resume Download -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12" data-aos="fade-down">
        <h1 class="text-3xl sm:text-4xl font-bold text-center sm:text-left">
          Professional Experience
        </h1>
        <UButton
          to="/files/Resume - Deny Kristianto Pamuji.pdf"
          target="_blank"
          download="Resume - Deny Kristianto Pamuji.pdf"
          icon="heroicons:arrow-down-tray"
          size="md"
          color="primary"
          variant="outline"
          class="font-bold cursor-pointer transition-transform duration-200 hover:scale-105 shrink-0 self-center sm:self-auto"
        >
          Download CV / Resume
        </UButton>
      </div>

      <!-- Timeline wrapper -->
      <div class="relative border-l border-gray-700 ml-4 sm:ml-6 space-y-12">
        <div 
          v-for="(item, index) in listCompany" 
          :key="index" 
          class="relative pl-8 group animate-fade-up"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <!-- Timeline dot -->
          <div class="absolute -left-[7.5px] top-1.5 bg-gray-900 border-2 border-primary rounded-full w-3.5 h-3.5 group-hover:bg-primary transition-all duration-300"></div>

          <!-- Card content -->
          <div class="p-6 bg-linear-to-br from-neutral-900 to-black hover:outline outline-gray-800 rounded-2xl transition-all duration-300">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
              <div>
                <nuxt-link 
                  :to="item.url" 
                  target="_blank"
                  class="text-xl font-bold hover:underline hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  {{ item.name }}
                  <UIcon name="heroicons:arrow-top-right-on-square" class="text-sm text-gray-500 shrink-0" />
                </nuxt-link>
                <div class="text-sm font-semibold text-primary mt-0.5">
                  {{ item.role }}
                </div>
              </div>
              <div class="text-right sm:text-right">
                <span class="inline-block px-3 py-1 bg-gray-800 bg-opacity-50 text-xs text-gray-300 font-mono rounded-full">
                  {{ item.years }}
                </span>
                <div class="text-xs text-gray-500 mt-1">
                  {{ item.location }}
                </div>
              </div>
            </div>

            <!-- Stacks badges -->
            <div class="flex flex-wrap gap-1.5 mb-4">
              <UBadge 
                v-for="stack in item.stacks" 
                :key="stack"
                :label="stack"
                size="sm"
                color="primary"
                variant="subtle"
              />
            </div>

            <!-- Achievements list -->
            <ul class="list-disc pl-4 space-y-1.5 text-sm text-gray-300 leading-relaxed">
              <li v-for="(desc, idx) in item.description" :key="idx">
                {{ desc }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
</style>
