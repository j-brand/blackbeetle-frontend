// Type declarations for modules without TypeScript definitions

// Erlaubt definePageMeta({ beetles: false }) zum Deaktivieren des Käfer-Effekts.
declare module "vue-router" {
  interface RouteMeta {
    beetles?: boolean;
  }
}

declare module "lightgallery/plugins/thumbnail/lg-thumbnail.umd.js" {
  import lgThumbnail from "lightgallery/plugins/thumbnail";
  export default lgThumbnail;
}

declare module "lightgallery/plugins/zoom/lg-zoom.umd.js" {
  import lgZoom from "lightgallery/plugins/zoom";
  export default lgZoom;
}

declare module "lightgallery/plugins/autoplay/lg-autoplay.umd.js" {
  import lgAutoplay from "lightgallery/plugins/autoplay";
  export default lgAutoplay;
}

declare module "lightgallery/plugins/fullscreen/lg-fullscreen.umd.js" {
  import lgFullscreen from "lightgallery/plugins/fullscreen";
  export default lgFullscreen;
}
