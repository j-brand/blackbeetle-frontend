import * as tsConfig  from "@/tailwind.config";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      tailwind: tsConfig.default.theme.extend,
    },
  };
});
