<template>
  <section class="roxy-ip-hero min-h-[900px] pt-6 px-1 desktop:w-80 laptop:w-72 tablet:w-64 mx-auto tablet:pb-12 tablet:pt-8 tablet:h-[100vh] tablet:justify-between tablet:text-center flex flex-col items-center">
    <div class="roxy-ip-title w-full flex flex-col tablet:px-0">
      <h1 class="text-2xl text-center tablet:text-[2rem] leading-[1.2]">
        IP Address Lookup:<br class="block tablet:hidden" />
        What Is My IP?
      </h1>
      <p class="text-base text-center leading-[1.5] text-neutral-600 mt-[0.5rem]">
        Instantly find the location and details of any IP address.<br
          class="hidden tablet:block"
        />
        <strong>Your public IP is detected automatically below.</strong>
      </p>
    </div>
    
    <div class="w-full tablet:px-2 desktop:px-6 mt-2 tablet:mt-0">
      <div class="roxy-ip-data flex flex-col tablet:flex-row w-full">
        <IPDisplay
          :ip-address="ipResult.ip"
          :longitude="ipResult.longitude"
          :latitude="ipResult.latitude"
          :status="animationStatus"
        />
        <IPInfoCard
          :ip-info="ipResult"
          :status="animationStatus"
        />
      </div>
    </div>
    
    <IPSearchForm
      v-model:ip-input="ipInput"
      :is-loading="isLoading"
      @search="handleSearch"
    />
  </section>
</template>

<script setup>
import { useIPChecker } from '../../composables/useIPChecker.js'
import IPDisplay from './IPDisplay.vue'
import IPInfoCard from './IPInfoCard.vue'
import IPSearchForm from './IPSearchForm.vue'

// 使用 IP 查询逻辑
const {
  ipResult,
  ipInput,
  animationStatus,
  isLoading,
  handleSearch
} = useIPChecker()
</script>

<style scoped>
.roxy-ip-hero h1 {
  font-family: "Archivo";
  font-weight: 700;
}

.roxy-ip-data {
  background-color: #fff;
  border-radius: 24px;
  border: 1px solid #e5e5e5;
  padding: 0.5rem;
  overflow: hidden;
}
</style>