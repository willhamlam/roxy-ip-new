<template>
  <div class="mt-4 tablet:mt-0 px-1 tablet:px-0 relative z-2">
    <section class="roxy-ip-introductions mt-0 tablet:mt-[-7rem] p-1 phone:p-3 w-full desktop:w-80 laptop:w-72 tablet:w-64 mx-auto">
      <IntroductionSection />
      <div class="divider"></div>
      <InformationSection />
      <div class="divider"></div>
      <HowItWorksSection />
    </section>
  </div>
  <div class="px-1 tablet:px-0">
    <UseCasesSection />
  </div>
  <section class="roxy-ip-privacy"></section>
</template>

<script setup>
import IntroductionSection from './IntroductionSection.vue'
import InformationSection from './InformationSection.vue'
import HowItWorksSection from './HowItWorksSection.vue'
import UseCasesSection from './UseCasesSection.vue'
</script>

<style scoped>
.roxy-ip-introductions {
  border-radius: 24px;
  background: #fff;
}

.divider {
  width: 100%;
  border-top: 1px dashed #000;
  opacity: 0.2;
}
</style>