<script setup lang="ts">
interface TypingOptions {
  typeSpeed?: number;
  backSpeed?: number;
  backDelay?: number;
  startDelay?: number;
  loop?: boolean;
}

const props = withDefaults(
  defineProps<{
    strings: string[];
    options?: TypingOptions;
    leading?: string;
    trailing?: string;
  }>(),
  {
    strings: () => ["Hello, World!", "Welcome to Nuxt!", "This is amazing!"],
    options: () => ({
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 1000,
      startDelay: 500,
      loop: true,
    }),
  }
);

// Reactive state
const displayText = ref("");
const isRunning = ref(false);
const showCursor = ref(true);

// Internal state
const currentStringIndex = ref(0);
const currentCharIndex = ref(0);
const isTyping = ref(true);
const timeoutId = ref<NodeJS.Timeout | null>(null);

// Computed options with defaults
const config = computed(() => ({
  typeSpeed: props.options?.typeSpeed ?? 100,
  backSpeed: props.options?.backSpeed ?? 50,
  backDelay: props.options?.backDelay ?? 1000,
  startDelay: props.options?.startDelay ?? 500,
  loop: props.options?.loop ?? true,
}));

// Cursor blinking effect
const startCursorBlink = () => {
  setInterval(() => {
    showCursor.value = !showCursor.value;
  }, 500);
};

// Main typing function
const typeText = () => {
  if (!isRunning.value) return;

  const currentString = props.strings[currentStringIndex.value] || "";

  if (isTyping.value) {
    // Typing phase
    if (currentCharIndex.value < currentString.length) {
      displayText.value = currentString.substring(
        0,
        currentCharIndex.value + 1
      );
      currentCharIndex.value++;
      timeoutId.value = setTimeout(typeText, config.value.typeSpeed);
    } else {
      // Finished typing, switch to backspacing after delay
      isTyping.value = false;
      timeoutId.value = setTimeout(typeText, config.value.backDelay);
    }
  } else {
    // Backspacing phase
    if (currentCharIndex.value > 0) {
      currentCharIndex.value--;
      displayText.value = currentString.substring(0, currentCharIndex.value);
      timeoutId.value = setTimeout(typeText, config.value.backSpeed);
    } else {
      // Finished backspacing, move to next string
      isTyping.value = true;
      currentStringIndex.value =
        (currentStringIndex.value + 1) % props.strings.length;

      // Stop if not looping and we've completed all strings
      if (!config.value.loop && currentStringIndex.value === 0) {
        stopAnimation();
        return;
      }

      timeoutId.value = setTimeout(typeText, config.value.typeSpeed);
    }
  }
};

// Control functions
const startAnimation = () => {
  if (isRunning.value) return;

  isRunning.value = true;
  setTimeout(typeText, config.value.startDelay);
};

const stopAnimation = () => {
  isRunning.value = false;
  if (timeoutId.value) {
    clearTimeout(timeoutId.value);
    timeoutId.value = null;
  }
};

const resetAnimation = () => {
  stopAnimation();
  currentStringIndex.value = 0;
  currentCharIndex.value = 0;
  isTyping.value = true;
  displayText.value = "";
};

// Lifecycle
onMounted(() => {
  startCursorBlink();
  // Auto-start after component mount
  setTimeout(startAnimation, 1000);
});

onUnmounted(() => {
  stopAnimation();
});

// Watch for props changes
watch(
  () => props.strings,
  () => {
    resetAnimation();
  },
  { deep: true }
);
</script>

<template>
  <div class="space-y-0">
    <div class="min-h-[2rem] flex items-center">
      <span class="text-lg lg:text-2xl font-mono flex items-center">
        <div class="flex gap-2">
          <span v-if="leading">{{ leading }}</span>
          <span class="text-primary">{{ displayText }}</span>
          <span v-if="trailing">{{ trailing }}</span>
        </div>
        <span
          class="inline-block w-1 h-5 bg-primary-500 ml-1 animate-pulse"
          :class="{ 'opacity-100': showCursor, 'opacity-0': !showCursor }"
        />
      </span>
    </div>
  </div>
</template>
