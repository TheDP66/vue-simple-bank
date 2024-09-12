<script setup>
import { legacyLogicalPropertiesTransformer, theme } from "ant-design-vue";
import { provide, shallowRef } from "vue";
import { RouterView } from "vue-router";
import layouts from "./layout";
import router from "./router";

const layout = shallowRef("div");

router.afterEach((to) => {
  layout.value = layouts[to.meta.layout] || "div";
});

provide("app:layout", layout);
</script>

<template>
  <a-style-provider
    hash-priority="high"
    :transformers="[legacyLogicalPropertiesTransformer]"
  >
    <a-config-provider
      :theme="{
        token: {
          colorPrimary: '#7091e6',
          colorInfo: '#7091e6',
          algorithm: theme.darkAlgorithm,
        },
      }"
    >
      <component :is="layout || 'div'">
        <RouterView />
      </component>
    </a-config-provider>
  </a-style-provider>
</template>
