<script setup>
import AppLayout from './components/layout/AppLayout.vue'
import IPChecker from './components/ip-checker/IPChecker.vue'
import ContentSections from './components/content/ContentSections.vue'
</script>

<template>
  <AppLayout>
    <IPChecker />
    <ContentSections />
  </AppLayout>
</template>

<style scoped>
/* 主应用样式已拆分到各个组件中 */
</style>
