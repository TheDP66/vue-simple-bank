<script setup>
import { useTransferStore } from "@/stores/transferStore";
import { AreaPlot } from "ant-design-charts-vue";
import { onMounted } from "vue";

const props = defineProps(["dataSource"]);

// const data = reactive(["1D", "5D", "1M", "All"]);
const transferStore = useTransferStore();

let refDom = null;
const onChartRef = (ref) => {
  refDom = ref;
};

onMounted(() => {
  refDom.on("plot:click", (e) => {});
});
</script>

<template>
  <a-spin :spinning="transferStore.loading">
    <a-card hoverable size="small" style="height: 317.35px">
      <AreaPlot
        :chartRef="onChartRef"
        :config="{
          data: props.dataSource,
          height: 290,
          autoFit: true,
          xField: 'created_at',
          yField: 'amount',
          seriesField: 'type',
          smooth: true,
          meta: {
            value: {
              max: 15,
            },
          },
        }"
      />
    </a-card>
  </a-spin>
</template>
