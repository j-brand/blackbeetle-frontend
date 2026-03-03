<template>
  <svg id="svg" xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" :viewBox="'0 0 ' + width + ' ' + height">
    <g fill="none" fill-rule="evenodd" stroke="#3678AC" transform="translate(1 1)">
      <Circle v-for="c in circles()" :key="c" :radius="c" class="anime-circle" :centerX="width / 2" :centerY="height / 2" :color="getColor()" />
    </g>
  </svg>
  <button @click="animation?.restart()">click me</button>
  <span>{{ progressLogEl }}</span>
  <span>{{ updateLogEl }}</span>
</template>

<script setup lang="ts">
import { animate, stagger } from "animejs";

const colors = ["#fff1f2", "#ffe4e6", "#fecdd3", "#fda4af", "#fb7185", "#f43f5e", "#e11d48", "#be123c", "#9f1239", "#881337"];
const animation = ref<ReturnType<typeof animate> | null>(null);
const progressLogEl = ref(0);
const updateLogEl = ref(0);


const circles = () => {
  let space = 0;
  const rList = [];
  for (let i = 40; i >= 0; i--) {
    space = space + 10;
    rList.push(space);
  }
  return rList;
};


let colorCount = -1;
const getColor = () => {
  colorCount++;
  if (colorCount > colors.length) {
    colorCount = 1;
  }
  return colors[colorCount];
};

const width = screen.width / 2;
const height = screen.height / 2 - 84;

onMounted(() => {
  animation.value = animate(".anime-circle", {
    duration: 500,
    loop: true,
    ease: "linear",
    alternate: true,
    stroke: ["rgba(255,75,75,1)", "rgba(80,80,80,.35)", "rgb(51, 102, 255,1)"],
    delay: stagger(10),
  });
});
</script>
<style scoped></style>
