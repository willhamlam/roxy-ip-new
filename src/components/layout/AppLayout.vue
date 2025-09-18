<template>
  <div id="roxy-ip-checker">
    <AppHeader />
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup>
import AppHeader from './AppHeader.vue'
</script>

<style scoped>
#roxy-ip-checker {
  width: 100%;
}

main {
  width: 100%;
  position: relative;
  overflow: hidden;
  overflow-y: auto;
}

main > :deep(section) {
  position: relative;
  z-index: 1;
}

main::before {
  content: "";
  position: absolute;
  z-index: 0;
  top: 16rem;
  left: 50%;
  transform: translateX(-50%);
  width: 2000px;
  height: 2000px;
  background-image: url("@/assets/rxip_blob.svg");
  background-position: center;
  pointer-events: none;
}

.divider {
  width: 100%;
  border-top: 1px dashed #000;
  opacity: 0.2;
}
</style>