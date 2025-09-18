<template>
  <div class="roxy-ip-info flex w-full desktop:flex-5">
    <ul class="text-sm tablet:text-base">
      <li class="gap-0 flex flex-col tablet:flex-row tablet:gap-0.5">
        <span class="roxy-ip-info-label">Country:</span>
        <span class="roxy-ip-info-value">
          <HyperText
            :text="ipInfo.country_long || 'Unknown'"
            :status="status"
            :loading-refresh-speed="30"
            :delete-speed="10"
            :typing-speed="30"
          />
        </span>
      </li>
      <li class="gap-0 flex flex-col tablet:flex-row tablet:gap-0.5">
        <span class="roxy-ip-info-label">Region:</span>
        <span class="roxy-ip-info-value">
          <HyperText
            :text="ipInfo.region || 'Unknown'"
            :status="status"
            :loading-refresh-speed="30"
            :delete-speed="10"
            :typing-speed="30"
          />
        </span>
      </li>
      <li class="gap-0 flex flex-col tablet:flex-row tablet:gap-0.5">
        <span class="roxy-ip-info-label">City:</span>
        <span class="roxy-ip-info-value">
          <HyperText
            :text="ipInfo.city || 'Unknown'"
            :status="status"
            :loading-refresh-speed="30"
            :delete-speed="10"
            :typing-speed="30"
          />
        </span>
      </li>
      <li class="gap-0 flex flex-col tablet:flex-row tablet:gap-0.5">
        <span class="roxy-ip-info-label">Timezone:</span>
        <span class="roxy-ip-info-value">
          <HyperText
            :text="ipInfo.timezone || 'Unknown'"
            :status="status"
            :loading-refresh-speed="30"
            :delete-speed="10"
            :typing-speed="30"
          />
        </span>
      </li>
      <li class="gap-0 flex flex-col tablet:flex-row tablet:gap-0.5">
        <span class="roxy-ip-info-label">Latitude:</span>
        <span class="roxy-ip-info-value">
          <HyperText
            :text="ipInfo.latitude || '0.0000'"
            :status="status"
            :loading-refresh-speed="30"
            :delete-speed="10"
            :typing-speed="30"
          />
        </span>
      </li>
      <li class="gap-0 flex flex-col tablet:flex-row tablet:gap-0.5">
        <span class="roxy-ip-info-label">Longitude:</span>
        <span class="roxy-ip-info-value">
          <HyperText
            :text="ipInfo.longitude || '0.0000'"
            :status="status"
            :loading-refresh-speed="30"
            :delete-speed="10"
            :typing-speed="30"
          />
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import HyperText from '../HyperText.vue'

const props = defineProps({
  ipInfo: {
    type: Object,
    default: () => ({
      country_long: '',
      region: '',
      city: '',
      timezone: '',
      latitude: '',
      longitude: ''
    })
  },
  status: {
    type: String,
    default: 'idle'
  }
})
</script>

<style scoped>
.roxy-ip-info {
  display: flex;
  flex-direction: column;
  gap: 0;
  background: #f1f6fe;
  padding: 0.75rem 1.5rem;
  border-radius: 1rem;
}

.roxy-ip-info ul li {
  padding: 0.75rem 0rem;
  text-align: left;
  font-family: "Geist Mono";
  border-bottom: 1px dashed #e5e5e5;
}

.roxy-ip-info ul li:last-child {
  border-bottom: none;
}

.roxy-ip-info-label {
  font-weight: 500;
  opacity: 0.6;
  flex: 3;
}

.roxy-ip-info-value {
  font-weight: 500;
  flex: 7;
}
</style>