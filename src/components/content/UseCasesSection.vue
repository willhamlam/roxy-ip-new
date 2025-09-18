<template>
  <section class="roxy-ip-use p-1 phone:p-3 desktop:w-80 laptop:w-72 tablet:w-64 mx-auto">
    <h2>{{ content.title }}</h2>
    <p class="mt-1">
      {{ content.description }}
    </p>
    <div class="flex gap-2 my-2 flex-col tablet:flex-row">
      <div 
        v-for="(useCase, index) in firstRow" 
        :key="useCase.title"
        :class="['use-case', useCase.flex]"
      >
        <p class="case-title">{{ useCase.title }}</p>
        <p :class="['case-description', useCase.width]">
          {{ useCase.description }}
        </p>
      </div>
    </div>
    <div class="flex gap-2 flex-col tablet:flex-row">
      <div 
        v-for="(useCase, index) in secondRow" 
        :key="useCase.title"
        :class="['use-case', useCase.flex]"
      >
        <p class="case-title">{{ useCase.title }}</p>
        <p :class="['case-description', useCase.width]">
          {{ useCase.description }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { contentData } from '../../data/content.js'

const content = contentData.useCases

// 将用例分为两行
const firstRow = computed(() => content.cases.slice(0, 2))
const secondRow = computed(() => content.cases.slice(2, 4))
</script>

<style scoped>
.roxy-ip-use {
  margin-top: 3rem;
  border-radius: 24px;
  background: #fff;
}

h2 {
  font-size: 1.25rem;
  line-height: 1.2;
  font-weight: 600;
}

.use-case {
  padding: 2rem;
  background: #f1f6fe;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 24px;
  height: 15rem;
  gap: 0.5rem;
}

.case-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #000;
}

p {
  color: var(--Color-Text-text-secondary, #645d59);
  font-size: 16px;
  line-height: 1.6;
}

strong {
  color: #000;
  font-weight: 600;
}
</style>