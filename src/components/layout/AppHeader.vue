<template>
  <header class="w-full fixed">
    <div
      class="header-container px-1 tablet:px-2 w-full desktop:w-80 laptop:w-72 tablet:w-64 mx-auto flex items-center justify-between py-1 z-10 relative"
    >
      <img
        src="@/assets/rxip_logo.svg"
        alt="Roxy IP Checker"
        class="w-12 tablet:w-auto"
      />
      <ul class="flex items-center gap-4 text-sm">
        <li>
          <a href="https://roxybrowser.com" target="_blank">Home</a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup>
// Header 组件不需要任何响应式数据或逻辑
</script>

<style scoped>
header {
  z-index: 2;
}
</style>