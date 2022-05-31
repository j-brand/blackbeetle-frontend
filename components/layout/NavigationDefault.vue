<template>
  <div class="bg-bb-lighter">
    <div class="lg:hidden z-50 absolute top-0 right-0">
      <button @click="toggleNav()" :class="navOpen ? 'is-active' : ''" class="hamburger block hamburger--spin" type="button">
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>
    </div>
    <header class="w-full flex flex-row-reverse absolute justify-between items-center duration-500 h-14 z-30 bg-bb-lighter" :class="navOpen ? 'mt-96' : 'mt-0'">
      <ClientOnly>
        <ThemeSwitch class="left-0 top-4 lg:top-5 fixed lg:absolute z-10 ml-4" />
      </ClientOnly>
      <NuxtLink to="/" alt="home" class="mx-auto">
        <div id="logo-wrapper" class="w-24 left-0 right-0 z-10 logo-wrapper relative lg:absolute">
          <img v-if="colorMode.value == 'light'" class="bg-bb-lighter rounded-full p-3" src="/img/bb-logo.png" alt="Blackbeetle Logo" />
          <img v-if="colorMode.value == 'dark'" class="bg-bb-charcoal-dark rounded-full p-3" src="/img/bb-logo_light.png" alt="Blackbeetle Logo" />
        </div>
      </NuxtLink>

      <nav
        :class="navOpen ? 'h-96' : 'h-0'"
        class="duration-500 lg:duration-[0ms] w-full overflow-hidden fixed bg-bb-lighter dark:bg-bb-charcoal-dark top-0 lg:h-auto lg:relative lg:overflow-x-visible"
      >
        <div class="relative text-center text-bb-charcoal top-1/4 lg:flex lg:justify-end">
          <NuxtLink to="/" exact class="nav-item lg:pr-6">Home</NuxtLink>
          <NuxtLink to="/about" class="nav-item lg:pt-6 lg:pr-6">About</NuxtLink>
          <NuxtLink to="/blog" class="nav-item lg:pt-6 lg:pr-6">Blog</NuxtLink>
          <NuxtLink to="/gallery" class="nav-item lg:pt-6 lg:pr-10">Gallery</NuxtLink>
        </div>
      </nav>
    </header>
    <div :class="navOpen ? 'h-116' : 'h-20'" class="shadow-dummy duration-500 lg:duration-[0ms] w-20 lg:w-22 left-0 right-0 mx-auto absolute bg-bb-lighter dark:bg-bb-charcoal-dark rounded-full"></div>
  </div>
</template>

<script setup lang="ts">
const navOpen = useState("navOpen", () => false);
const colorMode = useColorMode(); 

function toggleNav() {
  navOpen.value = !navOpen.value;
}
</script>

<style lang="scss" scoped>
.shadow-dummy {
  box-shadow: 0 15px 10px 0 rgba(0, 0, 0, 0.1);
}
.logo-wrapper {
  height: 80px;
  width: 80px;
  padding-top: 1.4rem;
  margin: 0 auto;
  border-radius: 50%;
  &::before {
    position: absolute;
    content: "";
    width: 150%;
    height: 3.5rem;
    left: -25%;
    top: 0;
    background: theme("colors.bb-lighter");
    z-index: -1;
  }

  &::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border-radius: 50%;
  }
}
.dark .logo-wrapper::before {
  background: theme("colors.bb-charcoal-dark");
}
header {
  box-shadow: 0px 0px 11px 2px rgba(0, 0, 0, 0.1);
}
@media screen and (min-width: 1024px) {
  .logo-wrapper {
    top: 0px;
    height: 90px;
    width: 90px;
    padding-top: 1rem;
    box-shadow: 0 19px 7px 0 rgba(0, 0, 0, 0.1);
    &::before {
      top: -2px;
      height: 4rem;
    }
  }
  .shadow-dummy {
    box-shadow: 0 27px 8px 0 rgba(0, 0, 0, 0.1);
  }

  header {
    box-shadow: 0px 0px 11px 2px rgba(0, 0, 0, 0.3);
  }
}
.hamburger {
  padding: 15px 15px;
  display: inline-block;
  cursor: pointer;
  transition-property: opacity, filter;
  transition-duration: 0.15s;
  transition-timing-function: linear;
  font: inherit;
  color: inherit;
  text-transform: none;
  background-color: transparent;
  border: 0;
  margin: 0;
  overflow: visible;

  .hamburger-box {
    width: 30px;
    height: 24px;
    display: inline-block;
    position: relative;
  }
}
.hamburger-inner {
  display: block;
  top: 50%;
  margin-top: -2px;
}
.hamburger-inner,
.hamburger-inner::before,
.hamburger-inner::after {
  width: 30px;
  height: 3px;
  background-color: theme("colors.bb-charcoal");
  border-radius: 4px;
  position: absolute;
  transition-property: transform;
  transition-duration: 0.15s;
  transition-timing-function: ease;
}
.hamburger-inner::before,
.hamburger-inner::after {
  content: "";
  display: block;
}
.hamburger-inner::before {
  top: -10px;
}
.hamburger-inner::after {
  bottom: -10px;
}
.hamburger--spin {
  .hamburger-inner {
    transition-duration: 0.22s;
    transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);

    &::before {
      transition: top 0.1s 0.25s ease-in, opacity 0.1s ease-in;
    }

    &::after {
      transition: bottom 0.1s 0.25s ease-in, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
  }
  &.is-active {
    .hamburger-inner {
      transform: rotate(225deg);
      transition-delay: 0.12s;
      transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      &::before {
        top: 0;
        opacity: 0;
        transition: top 0.1s ease-out, opacity 0.1s 0.12s ease-out;
      }

      &::after {
        bottom: 0;
        transform: rotate(-90deg);
        transition: bottom 0.1s ease-out, transform 0.22s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1);
      }
    }
  }
}
.router-link-active {
  border: none;
  //color: #333333;
  text-overflow: clip;
  letter-spacing: 3px;
  text-shadow: -1px 0 1px #1ef2f1, 1px 0 1px #f6050a;
}
</style>
