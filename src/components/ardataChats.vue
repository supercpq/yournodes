<template>
  <div style="width: 400px; margin-top: 15px">
    <LineChart v-bind="lineChartProps" :height="360" />
    <p :title="chartlable[0]">{{ chartlable[0] }}</p>
    <el-divider border-style="double" />
    <BarChart v-bind="barChartProps" :height="360" />
    <p :title="chartlable[1]">{{ chartlable[1] }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { BarChart, useBarChart, LineChart, useLineChart } from "vue-chart-3";
import { Chart, ChartData, ChartOptions, registerables } from "chart.js";
import { ardataStore } from "../store/modules/ardata";
const ardata = ardataStore();
Chart.register(...registerables);
const chartlable = ref([""]);
chartlable.value = ardata.chartlable; //["xx文章的阅读数据", "总数据"];

const chartData = computed(() => ({
  // barchart的数据
  labels: ardata.barLable, //["Paris", "Nîmes", "Toulon", "Perpiagnan", "Autre", "hello", "world"],
  datasets: [
    {
      data: ardata.barData,
      backgroundColor: ["#77CEFF", "#0079AF", "#123E6B", "#97B0C4", "#A5C8ED"],
    },
  ],
}));
const baroptions = computed<ChartOptions<"bar">>(() => ({
  plugins: {
    legend: {
      display: false,
    },
  },
}));

const { barChartProps, barChartRef } = useBarChart({
  options: baroptions,
  chartData,
});
const getData = computed<ChartData<"line">>(() => ({
  //line的数据
  labels: ardata.lineLable, //["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Bitcoin",
      data: ardata.lineData,
      fill: false,
      borderColor: "#4bc0c0",
    },
  ],
}));

const lineoptions = computed<ChartOptions<"line">>(() => ({
  plugins: {
    legend: {
      display: false,
    },
  },
}));

const { lineChartProps } = useLineChart({
  options: lineoptions,
  chartData: getData,
});

onMounted(() => {
  ardata.getardataAll();
  ardata.getChartLable();
});
</script>

<style scoped>
p {
  flex: 1 0 auto;
  font-size: 13px;
  line-height: 22px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  width: 100%;
}
</style>
