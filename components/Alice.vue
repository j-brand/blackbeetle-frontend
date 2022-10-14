<template>
  <div id="alice" class="relative overflow-hidden">
    <img id="img_center" class="top-0 left-0 right-0 bottom-0 absolute h-72 md:h-116 m-auto" src="/img/Mandala_01.png" alt="Alice im Wunderland und Flamingo" />
    <svg id="circles" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
      <defs>
        <path id="ci1" d="M0,300a300,300 0 1,0 600,0a300,300 0 1,0 -600,0" />
        <path id="ci2" d="M50,300a250,250 0 1,0 500,0a250,250 0 1,0 -500,0" />
        <path id="ci3" d="M100,300a200,200 0 1,0 400,0a200,200 0 1,0 -400,0" />
        <path id="ci4" d="M150,300a150,150 0 1,0 300,0a150,150 0 1,0 -300,0" />
        <path id="ci5" d="M200,300a100,100 0 1,0 200,0a100,100 0 1,0 -200,0" />
      </defs>

      <use xlink:href="#ci1" fill="none" />
      <circle id="c1" cx="300" cy="300" r="300" fill="#000" fill-opacity="0" />
      <g>
        <text fill="#000">
          <textPath xlink:href="#ci1">Aber ich möchte nicht unter Verrückte kommen.</textPath>
        </text>
      </g>

      <use xlink:href="#ci2" fill="none" />
      <circle id="c2" cx="300" cy="300" r="250" fill="#000" fill-opacity="0" />
      <g>
        <text fill="#000">
          <textPath xlink:href="#ci2">Oh, das kannst du wohl kaum verhindern. Wir sind hier nämlich alle verrückt. Ich bin verrückt. Du bist verrückt.</textPath>
        </text>
      </g>

      <use xlink:href="#ci3" fill="none" />
      <circle id="c3" cx="300" cy="300" r="200" fill="#000" fill-opacity="0" />
      <g>
        <text fill="#000">
          <textPath xlink:href="#ci3">Woher willst du wissen, dass ich verrückt bin?</textPath>
        </text>
      </g>

      <use xlink:href="#ci4" fill="none" />
      <circle id="c4" cx="300" cy="300" r="150" fill="#000" fill-opacity="0" />
      <g>
        <text fill="#000">
          <textPath xlink:href="#ci4">Wenn du es nicht wärest, stellte die Grinsekatze fest, dann wärest du nicht hier.</textPath>
        </text>
      </g>

      <use xlink:href="#ci5" fill="none" />
      <circle id="c5" cx="300" cy="300" r="100" fill="#000" fill-opacity="0" />
      <g>
        <text fill="#000">
          <textPath xlink:href="#ci5">&ndash; Lewis Carroll</textPath>
        </text>
      </g>
    </svg>
    <img id="alice-image" class="top-0 left-0 right-0 bottom-0 absolute h-16 md:h-28 m-auto" src="/img/alice_flamingo.svg" alt="Alice im Wunderland und Flamingo" />
  </div>
</template>

<script lang="ts">
export default {
  name: "BeetleAlice",
};
</script>

<style lang="scss" scope>
#alice {
  backface-visibility: hidden;
  perspective: 1000px;
  width: 270px;
  overflow: visible;
  transform: translateY(50px);
  padding-top: 35rem;
  @screen md {
    padding-top: 52rem;
    width: 450px;
  }
  #img_center {
    animation-name: rotate;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    transform-origin: center;
    animation-duration: 15s;
    animation-direction: reverse;
    margin: auto;
  }
  #alice-image:hover {
    animation: shake 0.5s;
    animation-iteration-count: infinite;
  }
  #circles {
    overflow: visible;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    circle {
      &:hover + g {
        transform-origin: center;
      }
    }
    g {
      transition-duration: 500ms;
      transition-timing-function: ease-in-out;
      transform-origin: center;
      overflow: hidden;
      pointer-events: none;
      text {
        animation-name: rotate;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        margin: auto;
        transform-origin: center;
        font-family: "Helvetica Neue", Arial;
        font-weight: bold;
      }
    }
  }
}
.dark #circles g text {
  color: theme("colors.bb-light");
}
#c1 {
  & + g text {
    animation-duration: 8s;
    font-size: 2.5rem;
  }
  &:hover + g {
    transform: scale(0.4);
  }
}
#c2 {
  & + g text {
    animation-duration: 15s;
    font-size: 1.2rem;
  }
  &:hover + g {
    transform: scale(1.8);
  }
}
#c3 {
  & + g text {
    animation-duration: 6s;
    font-size: 2.8rem;
  }
  &:hover + g {
    transform: scale(2);
  }
}
#c4 {
  & + g text {
    animation-duration: 10s;
    font-size: 1.4rem;
  }
  &:hover + g {
    transform: scale(2.5);
  }
}
#c5 {
  & + g text {
    animation-duration: 7s;
    font-size: 0.9rem;
  }
  &:hover + g {
    transform: scale(3.8);
  }
}
@keyframes rotate {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0);
  }
}
@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}
</style>
