<template>
  <div class="py-20">
    <div id="countdown" class="countdown flex flex-col justify-center items-center lg:flex-row">
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
  </div>
</template>

<script setup lang="ts">
import { useTimer } from "vue-timer-hook";
import { gsap, Quart } from "gsap";

const secondsone = ref<HTMLDivElement>();
const secondstwo = ref<HTMLDivElement>();

const minutesone = ref<HTMLDivElement>();
const minutestwo = ref<HTMLDivElement>();

const hoursone = ref<HTMLDivElement>();
const hourstwo = ref<HTMLDivElement>();

const daysone = ref<HTMLDivElement>();
const daystwo = ref<HTMLDivElement>();

const times = new Date("January 4, 2023 15:15:00");
times.setSeconds(times.getSeconds());
const timer = useTimer(times.getTime());

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

function setStartValues() {
  animate(secondsone.value!, Math.floor(timer.seconds.value / 10));
  animate(secondstwo.value!, timer.seconds.value % 10);

  animate(minutesone.value!, Math.floor(timer.minutes.value / 10));
  animate(minutestwo.value!, timer.minutes.value % 10);

  animate(hoursone.value!, Math.floor(timer.hours.value / 10));
  animate(hourstwo.value!, timer.hours.value % 10);

  animate(daysone.value!, Math.floor(timer.days.value / 10));
  animate(daystwo.value!, timer.days.value % 10);
}

onMounted(() => {
  setStartValues();

  watchEffect(async () => {
    if (timer.isExpired.value) {
      console.warn("IsExpired");
    }
  });
  watch(timer.seconds, (newValue, oldValue) => {
    if (Math.floor(oldValue / 10) !== Math.floor(newValue / 10)) {
      animate(secondsone.value!, Math.floor(newValue / 10));
      animate(secondstwo.value!, newValue % 10);
    } else {
      animate(secondstwo.value!, newValue % 10);
    }
  });
  watch(timer.minutes, (newValue, oldValue) => {
    if (Math.floor(oldValue / 10) !== Math.floor(newValue / 10)) {
      animate(minutesone.value!, Math.floor(newValue / 10));
      animate(minutestwo.value!, newValue % 10);
    } else {
      animate(minutestwo.value!, newValue % 10);
    }
  });
  watch(timer.hours, (newValue, oldValue) => {
    if (Math.floor(oldValue / 10) !== Math.floor(newValue / 10)) {
      animate(hoursone.value!, Math.floor(newValue / 10));
      animate(hourstwo.value!, newValue % 10);
    } else {
      animate(hourstwo.value!, newValue % 10);
    }
  });
  watch(timer.days, (newValue, oldValue) => {
    if (Math.floor(oldValue / 10) !== Math.floor(newValue / 10)) {
      animate(daysone.value!, Math.floor(newValue / 10));
      animate(daystwo.value!, newValue % 10);
    } else {
      animate(daystwo.value!, newValue % 10);
    }
  });
});
</script>

<style scoped lang="scss">
@font-face {
  font-family: "Brass";
  font-weight: 400;
  font-display: swap;
  src: url("brass_mono.otf") format("opentype");
  font-display: swap;
}

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
    color: #1a1a1a;
    text-transform: uppercase;
  }

  .figure {
    position: relative;
    float: left;
    height: 110px;
    width: 100px;
    margin-right: 10px;
    background-color: #fff;
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
      color: #de4848;
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
      background-color: #f7f7f7;
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
      background-color: #f7f7f7;
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
      background-color: #fff;
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
