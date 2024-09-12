<script setup>
const layoutFooterHeight = "64px";
const contentMinHeight = `calc(100vh - ${layoutFooterHeight})`;
</script>

<template>
  <a-layout>
    <a-layout-content
      :style="{
        minHeight: contentMinHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }"
    >
      <slot />
    </a-layout-content>
    <a-layout-footer
      :style="{
        textAlign: 'center',
        height: layoutFooterHeight,
        opacity: 0.3,
      }"
    >
      Vue Simple Bank ©2024 Created by Dharma
    </a-layout-footer>
  </a-layout>
</template>
