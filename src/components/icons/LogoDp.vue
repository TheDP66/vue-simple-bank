<script setup>
const props = defineProps(["isCenter"]);
</script>

<template>
  <div
    :style="{
      fontWeight: 200,
      fontSize: '24px',
      textAlign: props.isCenter ? 'center' : 'left',
    }"
  >
    dp
  </div>
</template>
