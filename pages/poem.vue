<template>
  <div id="poem" class="h-full flex justify-center mb-10">
    <div class="poem inline-block ml-8 md:ml-20">
      <h3 class="text-xl md:text-2xl anaglyph leading-none">für</h3>
      <h2 class="text-3xl md:text-4xl bold anaglyph mb-6 uppercase leading-none">Isabell</h2>

      <p class="opacity-0 mb-4">
        An einem Morgen ging er los,<br />
        von seinem bergig Heimatschoß.
      </p>

      <p class="opacity-0 mb-4">
        Sein Weg ging über ebnes Land,<br />
        ihm jedoch gänzlich unbekannt.
      </p>

      <p class="opacity-0 mb-4">
        Er kam zur Ruh in fremdem Heim,<br />
        da fand er es, das Glück zu zwein.
      </p>

      <p class="opacity-0 mb-4">
        Doch eines Tages zog er fort,<br />
        mit Ihr an einen andren Ort.
      </p>

      <p class="opacity-0 mb-4">
        Schwangen sich auf zu neuen Höhen,<br />
        wollten die Welt von oben sehen.
      </p>

      <p class="opacity-0 mb-4">
        Sie flogen um die ganze Welt,<br />
        um zu erleben, was gefällt.
      </p>

      <p class="opacity-0 mb-6">
        Wo sie nun weilen bleibt geheim,<br />
        doch wo Sie ist, wird er auch sein.
      </p>

      <p class="opacity-0 text-xl bold">Alles Gute zum Geburtstag. 🎁</p>
    </div>
    <canvas ref="canvasEl" id="fireworks" class="fireworks absolute w-full top-0 mx-auto max-w-full"> </canvas>
  </div>
</template>

<script setup lang="ts">
import anime from "animejs/lib/anime.es.js";

interface Particule {
  x: number;
  y: number;
  color: string;
  radius: number;
  endPos: { x: number; y: number };
  draw: () => void;
}

interface Circle {
  x: number;
  y: number;
  color: string;
  radius: number;
  alpha: number;
  lineWidth: number;
  draw: () => void;
}

const canvasEl = ref<HTMLCanvasElement | null>(null);

useHead({
  title: "Poem",
});

if (process.client) {
  const fireworksEl = document.getElementById("fireworks") as HTMLCanvasElement | null;
  const centerX = ref(fireworksEl?.width ?? window.innerWidth);
  const centerY = ref(fireworksEl?.height ?? window.innerHeight);
  const numberOfParticules = 30;
  const colors = ["#FF1461", "#18FF92", "#5A87FF", "#FBF38C"];
  const pointerX = ref(0);
  const pointerY = ref(0);

  const ctx = computed(() => {
    return canvasEl.value?.getContext("2d") ?? null;
  });

  function setCanvasSize() {
    if (!canvasEl.value) return;
    
    canvasEl.value.width = document.body.offsetWidth;
    canvasEl.value.height = document.body.scrollHeight;

    canvasEl.value.style.width = document.body.offsetWidth + "px";
    canvasEl.value.style.height = document.body.scrollHeight + "px";

    canvasEl.value.getContext("2d")?.scale(2, 2);
  }

  function updateCoords(e: MouseEvent | TouchEvent) {
    if ("touches" in e) {
      pointerX.value = e.touches[0]?.clientX ?? 0;
      pointerY.value = e.touches[0]?.clientY ?? 0;
    } else {
      pointerX.value = e.clientX;
      pointerY.value = e.clientY;
    }
  }

  function setParticuleDirection(p: { x: number; y: number }) {
    const angle = (anime.random(0, 360) * Math.PI) / 180;
    const value = anime.random(50, 180);
    const directions = [-1, 1];
    const radius = (directions[anime.random(0, 1)] ?? 1) * value;
    return {
      x: p.x + radius * Math.cos(angle),
      y: p.y + radius * Math.sin(angle),
    };
  }
  function createParticule(x: number, y: number): Particule {
    const p: Particule = {
      x,
      y,
      color: colors[anime.random(0, colors.length - 1)] ?? "#FF1461",
      radius: anime.random(16, 32),
      endPos: { x: 0, y: 0 },
      draw: () => {},
    };
    p.endPos = setParticuleDirection(p);
    p.draw = function () {
      if (!ctx.value) return;
      ctx.value.beginPath();
      ctx.value.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
      ctx.value.fillStyle = p.color;
      ctx.value.fill();
    };
    return p;
  }
  function createCircle(x: number, y: number): Circle {
    const p: Circle = {
      x,
      y,
      color: "#FFF",
      radius: 0.1,
      alpha: 0.5,
      lineWidth: 6,
      draw: () => {},
    };
    p.draw = function () {
      if (!ctx.value) return;
      ctx.value.globalAlpha = p.alpha;
      ctx.value.beginPath();
      ctx.value.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
      ctx.value.lineWidth = p.lineWidth;
      ctx.value.strokeStyle = p.color;
      ctx.value.stroke();
      ctx.value.globalAlpha = 1;
    };
    return p;
  }
  function renderParticule(anim: anime.AnimeInstance) {
    for (let i = 0; i < anim.animatables.length; i++) {
      const animatable = anim.animatables[i];
      if (animatable && 'draw' in (animatable.target as unknown as object)) {
        (animatable.target as unknown as Particule | Circle).draw();
      }
    }
  }
  function animateParticules(x: number, y: number) {
    const circle = createCircle(x, y);
    const particules: Particule[] = [];
    for (let i = 0; i < numberOfParticules; i++) {
      particules.push(createParticule(x, y));
    }
    anime
      .timeline()
      .add({
        targets: particules,
        x: function (p: Particule) {
          return p.endPos.x;
        },
        y: function (p: Particule) {
          return p.endPos.y;
        },
        radius: 0.1,
        duration: anime.random(1200, 1800),
        easing: "easeOutExpo",
        update: renderParticule,
      })
      .add({
        targets: circle,
        radius: anime.random(80, 160),
        lineWidth: 0,
        alpha: {
          value: 0,
          easing: "linear",
          duration: anime.random(600, 800),
        },
        duration: anime.random(1200, 1800),
        easing: "easeOutExpo",
        update: renderParticule,
        offset: 0,
      });
  }

  function autoClick() {
    animateParticules(anime.random(centerX.value - 200, centerX.value + 200), anime.random(centerY.value - 400, centerY.value + 400));
    anime({ duration: 200 }).finished.then(autoClick);
  }

  function startFirework() {
    const tap = "ontouchstart" in window || navigator.maxTouchPoints ? "touchstart" : "mousedown";

    const render = anime({
      duration: Infinity,
      update: function () {
        if (ctx.value && canvasEl.value) {
          ctx.value.clearRect(0, 0, canvasEl.value.width, canvasEl.value.height);
        }
      },
    });

    document.addEventListener(
      tap,
      function (e) {
        render.play();
        updateCoords(e);
        animateParticules(pointerX.value, pointerY.value);
      },
      false
    );

    autoClick();
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize, false);
  }

  onMounted(() => {
    document.getElementById("bb-logo-link")?.classList.add("hidden");

    document.getElementById("logo-wrapper")!.insertAdjacentHTML(
      "beforeend",
      `<div id="logo-present" class="z-10"><svg class="mt-6 p-3 text-bb-charcoal dark:text-bb-light" style="width:85px;height:85px" viewBox="-3.5 -3 30 30">
        <path fill="currentColor" d="M22,12V20A2,2 0 0,1 20,22H4A2,2 0 0,1 2,20V12A1,1 0 0,1 1,11V8A2,2 0 0,1 3,6H6.17C6.06,5.69 6,5.35 6,5A3,3 0 0,1 9,2C10,2 10.88,2.5 11.43,3.24V3.23L12,4L12.57,3.23V3.24C13.12,2.5 14,2 15,2A3,3 0 0,1 18,5C18,5.35 17.94,5.69 17.83,6H21A2,2 0 0,1 23,8V11A1,1 0 0,1 22,12M4,20H11V12H4V20M20,20V12H13V20H20M9,4A1,1 0 0,0 8,5A1,1 0 0,0 9,6A1,1 0 0,0 10,5A1,1 0 0,0 9,4M15,4A1,1 0 0,0 14,5A1,1 0 0,0 15,6A1,1 0 0,0 16,5A1,1 0 0,0 15,4M3,8V10H11V8H3M13,8V10H21V8H13Z" />
    </svg></div>`
    );
    setTimeout(function () {
      startFirework();
    }, 21000);
  });

  onBeforeUnmount(() => {
    document.getElementById("bb-logo-link")?.classList.remove("hidden");
    document.getElementById("logo-present")?.remove();
  });
}
</script>

<style>
.poem p:nth-child(3) {
  animation: 2s ease-out 2s 1 animateleft;
  animation-fill-mode: forwards;
}

.poem p:nth-child(4) {
  animation: 2s ease-out 5s 1 animateleft;
  animation-fill-mode: forwards;
}

.poem p:nth-child(5) {
  animation: 2s ease-out 8s 1 animateleft;
  animation-fill-mode: forwards;
}

.poem p:nth-child(6) {
  animation: 2s ease-out 11s 1 animateleft;
  animation-fill-mode: forwards;
}

.poem p:nth-child(7) {
  animation: 2s ease-out 14s 1 animateleft;
  animation-fill-mode: forwards;
}

.poem p:nth-child(8) {
  animation: 2s ease-out 17s 1 animateleft;
  animation-fill-mode: forwards;
}

.poem p:nth-child(9) {
  animation: 2s ease-out 20s 1 animateleft;
  animation-fill-mode: forwards;
}

.poem p:nth-child(10) {
  animation: 2s ease-out 23s 1 animateleft;
  animation-fill-mode: forwards;
}

@keyframes animateleft {
  from {
    left: -300px;
    opacity: 0;
  }
  to {
    left: 0;
    opacity: 1;
  }
}
</style>
