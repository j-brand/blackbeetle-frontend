import Toast, { POSITION } from "vue-toastification/dist/index.mjs";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, { position: POSITION.BOTTOM_CENTER });
});
