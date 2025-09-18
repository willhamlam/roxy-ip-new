<template>
  <article class="intro-1">
    <h2>{{ content.title }}</h2>
    <div class="flex gap-1 my-2 tablet:my-5 items-center flex-col tablet:flex-row">
      <div class="desktop:flex-1 laptop:flex-5 tablet:flex-5">
        <p v-for="paragraph in content.paragraphs" :key="paragraph">
          {{ paragraph }}
        </p>
        <br v-if="content.paragraphs.length > 1" />
      </div>
      <div class="desktop:flex-1 laptop:flex-6 tablet:flex-6">
        <div class="roxy-ip-diagram">
          <img :src="content.diagram" alt="IP Address Lookup" />
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { contentData } from '../../data/content.js'

const content = contentData.introduction
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

p {
  color: var(--Color-Text-text-secondary, #645d59);
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 1rem;
}

strong {
  color: #000;
  font-weight: 600;
}
</style>