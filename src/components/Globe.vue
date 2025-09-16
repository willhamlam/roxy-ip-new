<template>
  <div class="globe">
    <canvas
      ref="canvasRef"
      style="width: 500px; height: 250px"
      width="1000"
      height="1000"
    ></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import createGlobe from "cobe";

const canvasRef = ref(null);
let globe = null;
let phi = 0;

onMounted(() => {
  if (canvasRef.value) {
    globe = createGlobe(canvasRef.value, {
      devicePixelRatio: 2,
      width: 1000,
      height: 1000,
      phi: 0,
      theta: 0,
      dark: 0,
      diffuse: 1.2,
      scale: 1,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [1, 1, 1],
      markerColor: [1, 0.5, 1],
      glowColor: [1, 1, 1],
      offset: [0, 1000], // 向上偏移显示北半球
      markers: [{ location: [40.7128, -74.006], size: 0.1 }],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.001;
      },
    });
  }
});

onUnmounted(() => {
  if (globe) {
    globe.destroy();
  }
});
</script>

<style scoped>
.globe {
  width: 100%;
}
</style>
