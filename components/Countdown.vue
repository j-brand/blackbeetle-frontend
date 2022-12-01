<template>
  <div id="countdown" class="countdown flex flex-col justify-center items-center lg:flex-row lg:pt-20">
    <div class="bloc-time days">
      <span class="count-title">Tage</span>

      <div class="figure hours hours-1" ref="daysone">
        <span class="top">0</span>
        <span class="top-back">
          <span>0</span>
        </span>
        <span class="bottom">0</span>
        <span class="bottom-back">
          <span>0</span>
        </span>
      </div>

      <div class="figure hours hours-2" ref="daystwo">
        <span class="top">0</span>
        <span class="top-back">
          <span>0</span>
        </span>
        <span class="bottom">0</span>
        <span class="bottom-back">
          <span>0</span>
        </span>
      </div>
    </div>
    <div class="bloc-time hours">
      <span class="count-title">Stunden</span>

      <div class="figure hours hours-1" ref="hoursone">
        <span class="top">0</span>
        <span class="top-back">
          <span>0</span>
        </span>
        <span class="bottom">0</span>
        <span class="bottom-back">
          <span>0</span>
        </span>
      </div>

      <div class="figure hours hours-2" ref="hourstwo">
        <span class="top">0</span>
        <span class="top-back">
          <span>0</span>
        </span>
        <span class="bottom">0</span>
        <span class="bottom-back">
          <span>0</span>
        </span>
      </div>
    </div>

    <div class="bloc-time min">
      <span class="count-title">Minuten</span>

      <div class="figure min min-1" ref="minutesone">
        <span class="top">0</span>
        <span class="top-back">
          <span>0</span>
        </span>
        <span class="bottom">0</span>
        <span class="bottom-back">
          <span>0</span>
        </span>
      </div>

      <div class="figure min min-2" ref="minutestwo">
        <span class="top">0</span>
        <span class="top-back">
          <span>0</span>
        </span>
        <span class="bottom">0</span>
        <span class="bottom-back">
          <span>0</span>
        </span>
      </div>
    </div>

    <div class="bloc-time sec">
      <span class="count-title">Sekunden</span>

      <div class="figure sec sec-1" ref="secondsone">
        <span class="top">0</span>
        <span class="top-back">
          <span>0</span>
        </span>
        <span class="bottom">0</span>
        <span class="bottom-back">
          <span>0</span>
        </span>
      </div>

      <div class="figure sec sec-2" ref="secondstwo">
        <span class="top">0</span>
        <span class="top-back">
          <span>0</span>
        </span>
        <span class="bottom">0</span>
        <span class="bottom-back">
          <span>0</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap, Quart } from "gsap";

const secondsone = ref<HTMLDivElement>();
const secondstwo = ref<HTMLDivElement>();

const secOne = ref(0);
const secTwo = ref(0);

const minutesone = ref<HTMLDivElement>();
const minutestwo = ref<HTMLDivElement>();

const minOne = ref(0);
const minTwo = ref(0);

const hoursone = ref<HTMLDivElement>();
const hourstwo = ref<HTMLDivElement>();

const houOne = ref(0);
const houTwo = ref(0);

const daysone = ref<HTMLDivElement>();
const daystwo = ref<HTMLDivElement>();

const dayOne = ref(0);
const dayTwo = ref(0);

const props = defineProps({
  dateString: { type: String, required: true },
});

const endTime = new Date(props.dateString);
var from = endTime.getTime();

function animate(el: HTMLDivElement, value: number) {
  const top = el.getElementsByClassName("top")[0];
  const bottom = el.getElementsByClassName("bottom")[0];
  const topBack = el.getElementsByClassName("top-back")[0];
  const bottomBack = el.getElementsByClassName("bottom-back")[0];

  topBack.getElementsByTagName("span")[0].innerHTML = String(value);
  bottomBack.getElementsByTagName("span")[0].innerHTML = String(value);

  gsap.to(top, 0.8, {
    rotationX: "-180deg",
    transformPerspective: 300,
    ease: Quart.easeOut,
    onComplete: function () {
      top.innerHTML = String(value);
      bottom.innerHTML = String(value);
      gsap.set(top, { rotationX: 0 });
    },
  });

  gsap.to(topBack, 0.8, {
    rotationX: 0,
    transformPerspective: 300,
    ease: Quart.easeOut,
    clearProps: "all",
  });
}

function setValues() {
  var now = new Date().getTime();
  var timeleft = from - now;
  var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
  var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

  secOne.value = Math.floor(seconds / 10);
  secTwo.value = seconds % 10;

  minOne.value = Math.floor(minutes / 10);
  minTwo.value = minutes % 10;

  houOne.value = Math.floor(hours / 10);
  houTwo.value = hours % 10;

  dayOne.value = Math.floor(days / 10);
  dayTwo.value = days % 10;
}

onMounted(() => {
  watch(secOne, (value) => {
    animate(secondsone.value!, value);
  });

  watch(secTwo, (value) => {
    animate(secondstwo.value!, value);
  });

  watch(minOne, (value) => {
    animate(minutesone.value!, value);
  });

  watch(minTwo, (value) => {
    animate(minutestwo.value!, value);
  });

  watch(houOne, (value) => {
    animate(hoursone.value!, value);
  });

  watch(houTwo, (value) => {
    animate(hourstwo.value!, value);
  });

  watch(dayOne, (value) => {
    animate(daysone.value!, value);
  });

  watch(dayTwo, (value) => {
    animate(daystwo.value!, value);
  });

  setInterval(() => {
    setValues();
  }, 1000);
});
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
  color: #1a1a1a;
}

// Variables
$lato: "Lato";

// Countdown
.countdown {
  .bloc-time {
    @screen lg {
      margin-right: 45px;
    }
    float: left;
    text-align: center;
    margin-bottom: 1rem;
    &:last-child {
      margin-right: 0;
    }
  }

  .count-title {
    display: block;
    margin-bottom: 15px;
    font-size: 1.4rem;
    text-transform: uppercase;
    @apply text-bb-charcoal dark:text-bb-light;
  }

  .figure,
  .top,
  .bottom-back,
  .top-back {
    @apply bg-bb-white dark:bg-bb-lighter;
  }

  .figure {
    position: relative;
    float: left;
    height: 110px;
    width: 100px;
    margin-right: 10px;
    border-radius: 8px;
    box-shadow: (0 3px 4px 0 rgba(0, 0, 0, 0.2), inset 2px 4px 0 0 rgba(255, 255, 255, 0.08));

    &:last-child {
      margin-right: 0;
    }

    > span {
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      font-size: 6.3rem;
      line-height: 1.2;
      font-family: Brass;
      font-weight: 700;
      color: theme("colors.bb-red");
    }

    .top,
    .bottom-back {
      &:after {
        content: "";
        position: absolute;
        z-index: -1;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }
    }

    .top {
      z-index: 3;
      transform-origin: 50% 100%;
      -webkit-transform-origin: 50% 100%;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      transform: perspective(200px);
    }

    .bottom {
      z-index: 1;

      &:before {
        content: "";
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        width: 100%;
        height: 50%;
        background-color: rgba(0, 0, 0, 0.02);
      }
    }

    .bottom-back {
      z-index: 2;
      top: 0;
      height: 50%;
      overflow: hidden;

      border-top-left-radius: 10px;
      border-top-right-radius: 10px;

      span {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: auto;
      }
    }

    .top,
    .top-back {
      height: 50%;
      overflow: hidden;
      backface-visibility: hidden;
    }

    .top-back {
      z-index: 4;
      bottom: 0;
      -webkit-transform-origin: 50% 0;
      transform-origin: 50% 0;
      transform: (perspective(200px) rotateX(180deg));
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      span {
        position: absolute;
        top: -100%;
        left: 0;
        right: 0;
        margin: auto;
      }
    }
  }
}
</style>
