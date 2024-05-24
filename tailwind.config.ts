import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  // content: ["*.vue"],
  theme: {
    extend: {
      animation: {
        fade: "fadeIn .5s ease-in-out",
        "marquee-right": "marquee-right 10s linear infinite",
      },
      keyframes: {
        fadein: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
};
