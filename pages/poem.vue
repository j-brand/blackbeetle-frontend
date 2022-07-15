<template>
  <div id="poem" class="h-full flex justify-center">
    <div class="poem inline-block ml-8 md:ml-20 py-40">
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
    <canvas ref="canvasEl" id="fireworks" class="fireworks absolute w-full mx-auto max-w-full"> </canvas>
  </div>
</template>

<script setup lang="ts">
import anime from "animejs/lib/anime.es.js";
const canvasEl = ref<HTMLElement | any>(null);

useHead({
  title: "Poem",
});

if (process.client) {
  const centerX = ref(document.getElementById("fireworks").width);
  const centerY = ref(document.getElementById("fireworks").height);
  const numberOfParticules = 30;
  const colors = ["#FF1461", "#18FF92", "#5A87FF", "#FBF38C"];
  const pointerX = ref(0);
  const pointerY = ref(0);

  const ctx = computed(() => {
    return canvasEl.value.getContext("2d");
  });

  function setCanvasSize() {
    canvasEl.value.width = document.getElementById("poem").offsetWidth;
    canvasEl.value.height = document.getElementById("poem").offsetHeight;

    canvasEl.value.style.width = document.getElementById("poem").offsetWidth + "px";
    canvasEl.value.style.height = document.getElementById("poem").offsetHeight + "px";
    canvasEl.value.getContext("2d").scale(2, 2);
  }

  function updateCoords(e) {
    pointerX.value = e.clientX || e.touches[0].clientX;
    pointerY.value = e.clientY || e.touches[0].clientY;
  }

  function setParticuleDirection(p) {
    const angle = (anime.random(0, 360) * Math.PI) / 180;
    const value = anime.random(50, 180);
    const radius = [-1, 1][anime.random(0, 1)] * value;
    return {
      x: p.x + radius * Math.cos(angle),
      y: p.y + radius * Math.sin(angle),
    };
  }
  function createParticule(x, y): any {
    const p: any = {};
    p.x = x;
    p.y = y;
    p.color = colors[anime.random(0, colors.length - 1)];
    p.radius = anime.random(16, 32);
    p.endPos = setParticuleDirection(p);
    p.draw = function () {
      ctx.value.beginPath();
      ctx.value.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
      ctx.value.fillStyle = p.color;
      ctx.value.fill();
    };
    return p;
  }
  function createCircle(x, y) {
    const p: any = {};
    p.x = x;
    p.y = y;
    p.color = "#FFF";
    p.radius = 0.1;
    p.alpha = 0.5;
    p.lineWidth = 6;
    p.draw = function () {
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
  function renderParticule(anim) {
    for (let i = 0; i < anim.animatables.length; i++) {
      anim.animatables[i].target.draw();
    }
  }
  function animateParticules(x, y) {
    const circle = createCircle(x, y);
    const particules: any[] = [];
    for (let i = 0; i < numberOfParticules; i++) {
      particules.push(createParticule(x, y));
    }
    anime
      .timeline()
      .add({
        targets: particules,
        x: function (p) {
          return p.endPos.x;
        },
        y: function (p) {
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
        ctx.value.clearRect(0, 0, canvasEl.value.width, canvasEl.value.height);
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
    document.getElementById("logo-wrapper")!.innerHTML = `<svg class="bg-bb-lighter rounded-full p-3 dark:bg-bb-charcoal-dark dark:text-bb-light" style="width:85px;height:85px" viewBox="-3.5 -3 30 30">
        <path fill="currentColor" d="M22,12V20A2,2 0 0,1 20,22H4A2,2 0 0,1 2,20V12A1,1 0 0,1 1,11V8A2,2 0 0,1 3,6H6.17C6.06,5.69 6,5.35 6,5A3,3 0 0,1 9,2C10,2 10.88,2.5 11.43,3.24V3.23L12,4L12.57,3.23V3.24C13.12,2.5 14,2 15,2A3,3 0 0,1 18,5C18,5.35 17.94,5.69 17.83,6H21A2,2 0 0,1 23,8V11A1,1 0 0,1 22,12M4,20H11V12H4V20M20,20V12H13V20H20M9,4A1,1 0 0,0 8,5A1,1 0 0,0 9,6A1,1 0 0,0 10,5A1,1 0 0,0 9,4M15,4A1,1 0 0,0 14,5A1,1 0 0,0 15,6A1,1 0 0,0 16,5A1,1 0 0,0 15,4M3,8V10H11V8H3M13,8V10H21V8H13Z" />
    </svg>`;
    setTimeout(function () {
      startFirework();
    }, 21000);
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

