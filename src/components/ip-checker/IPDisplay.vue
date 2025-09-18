<template>
  <div class="roxy-ip-address flex w-full desktop:flex-6 flex-col text-left justify-between">
    <Globe class="tablet:block hidden" />
    <div class="relative z-2">
      <p class="text-sm text-center data-label tablet:text-base tablet:text-left">
        You current IP Address:
      </p>
      <p class="text-[1.875rem] text-center data-ip tablet:text-[2.5rem] tablet:text-left">
        <HyperText
          :text="ipAddress || '0.0.0.0'"
          :status="status"
          :loading-refresh-speed="30"
          :delete-speed="10"
          :typing-speed="50"
        />
      </p>
    </div>
    <div class="relative z-2">
      <p class="data-location hidden tablet:block tablet:text-left tablet:text-base">
        <HyperText
          :text="coordinates"
          :status="status"
          :loading-refresh-speed="30"
          :delete-speed="10"
          :typing-speed="40"
        />
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Globe from '../Globe.vue'
import HyperText from '../HyperText.vue'

const props = defineProps({
  ipAddress: {
    type: String,
    default: ''
  },
  longitude: {
    type: String,
    default: ''
  },
  latitude: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: 'idle'
  }
})

const coordinates = computed(() => {
  if (props.longitude && props.latitude) {
    return `${props.longitude}，${props.latitude}`
  }
  return '0.0000，0.0000'
})
</script>

<style scoped>
.roxy-ip-address {
  padding: 0.75rem 1.5rem;
  position: relative;
}

.globe {
  position: absolute;
  left: -6rem;
  bottom: -1rem;
  opacity: 0.4;
}

.data-ip {
  font-family: "Geist Mono";
  font-weight: 500;
}

.data-location {
  font-family: "Geist Mono";
}
</style>