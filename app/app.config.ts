export default defineAppConfig({
  // https://ui.nuxt.com/getting-started/theme#design-system
  ui: {
    colors: {
      primary: "emerald",
      neutral: "slate",
    },
    button: {
      base: "cursor-pointer",
      defaultVariants: {
        // Set default button color to neutral
        // color: 'neutral'
        color: "primary",
      },
    },
    carousel: {
      variants: {
        active: {
          true: {
            dot: "emerald",
          },
        },
      },
    },
  },
});
