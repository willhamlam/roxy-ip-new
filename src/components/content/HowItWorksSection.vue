<template>
  <section>
    <article class="pt-4 tablet:pt-10">
      <h2>{{ content.title }}</h2>
      <p class="w-full tablet:w-1/2 mt-1">
        {{ content.description }}
      </p>
      <div class="flex gap-2 my-2 tablet:my-5 items-center flex-col tablet:flex-row">
        <div class="w-full desktop:flex-1 laptop:flex-5 tablet:flex-5">
          <ol>
            <li v-for="step in content.steps" :key="step.title">
              <p>
                <strong>{{ step.title }}</strong>: {{ step.description }}
              </p>
            </li>
          </ol>
        </div>
        <div class="desktop:flex-1 laptop:flex-6 tablet:flex-6">
          <div class="roxy-ip-diagram">
            <img :src="content.diagram" alt="IP Address Lookup" />
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<script setup>
import { contentData } from '../../data/content.js'

const content = contentData.howItWorks
</script>

<style scoped>
.roxy-ip-diagram {
  width: 100%;
}

h2 {
  font-size: 1.25rem;
  line-height: 1.2;
  font-weight: 600;
}

ol {
  list-style: decimal;
  padding-left: 1rem;
}

ol li {
  margin: 0.5rem 0;
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