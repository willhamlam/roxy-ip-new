<template>
  <div class="roxy-ip-form mt-1 tablet:mt-0 w-full flex flex-col gap-1 tablet:gap-2">
    <p class="roxy-ip-form-description text-base w-full tablet:w-27.5 mx-auto text-center leading-[1.5]">
      Enter any IP address in the box below to instantly view its
      location, network details, and more information.
    </p>
    <div class="roxy-ip-form-wrapper w-full tablet:w-30 flex justify-between tablet:mx-auto">
      <input
        type="text"
        placeholder="Enter IP address"
        v-model="localIpInput"
        @keydown.enter="handleSearch"
        :disabled="isLoading"
      />
      <button
        @click="handleSearch"
        :disabled="isLoading || !localIpInput?.trim()"
      >
        <img src="@/assets/ic_magnify.svg" alt="Lookup" />
        {{ isLoading ? "查询中..." : "Look Up" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  ipInput: {
    type: String,
    default: ''
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['search', 'update:ipInput'])

const localIpInput = ref(props.ipInput)

// 同步 props 到 local state
watch(() => props.ipInput, (newValue) => {
  localIpInput.value = newValue
})

// 同步 local state 到 parent
watch(localIpInput, (newValue) => {
  emit('update:ipInput', newValue)
})

const handleSearch = () => {
  if (localIpInput.value?.trim() && !props.isLoading) {
    emit('search', localIpInput.value.trim())
  }
}
</script>

<style scoped>
.roxy-ip-form-description {
  color: #fff;
}

.roxy-ip-form-wrapper {
  background: #fff;
  border-radius: 9px;
  padding: 2px;
  position: relative;
}

.roxy-ip-form-wrapper input {
  font-family: "Geist Mono";
  letter-spacing: normal;
  padding: 0.5rem 1rem;
  width: 100%;
}

.roxy-ip-form-wrapper input:focus {
  outline: none;
}

.roxy-ip-form-wrapper input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.roxy-ip-form-wrapper button {
  cursor: pointer;
  position: absolute;
  right: 2px;
  top: 2px;
  display: inline-flex;
  padding: 0.5rem 1rem;
  align-items: center;
  gap: 0.75rem;
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;
  border-radius: 8px;
  background: linear-gradient(105deg, #287bff 3.01%, #ffc6c6 110.56%);
}

.roxy-ip-form-wrapper button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>