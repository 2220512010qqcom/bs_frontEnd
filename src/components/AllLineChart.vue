<template>
  <div class="chart-container">
    <div class="chart-wrapper">
      <canvas ref="chartCanvas"></canvas>
    </div>
    <p>{{ name }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, toRef, watch } from 'vue';
import Chart, { ChartData, Point } from 'chart.js/auto';

interface UserUploads {
  upload_id: string;
  user_id: string;
  heart_rate: number;
  blood_pressure: string;
  oxygen_saturation: number;
  upload_time: Date;
}

const props = defineProps<{
  data: UserUploads[];
  name: string;
}>();

const chartCanvas = ref<HTMLCanvasElement | null>(null);

console.log("传进来的数据是", props.data);

const name = computed(() => {
  return props.name;
});

// const data: ChartData<'line', (number | Point | null)[], unknown> = {
const data =  computed(() => {
  return{
    labels: props.data.map((item) => new Date(item.upload_time).toLocaleDateString()),
    datasets: [
      {
        label: '血压',
        data: props.data.map((item) => Number(item.blood_pressure)),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: '心率',
        data: props.data.map((item) => Number(item.heart_rate)),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
      {
        label: '血氧',
        data: props.data.map((item) => Number(item.oxygen_saturation)),
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1,
      },
    ],
  }
  
});
// Chart.update();

// watch(data, (newValue) => {
//   if (Chart) {
//     Chart.setOption({
//       series: [
//         {
//           data: newValue,
//         },
//       ],
//     });
//   }
// });


onMounted(() => {
  console.log("AllLineChart onMounted方法被调用了");
  console.log("data.value", data.value);
  console.log("chartCanvas.value", chartCanvas.value);
  if (chartCanvas.value) {
    new Chart(chartCanvas.value, {
      type: 'line',
      data: data.value,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: '综合图表',
          },
        },
      },
    });
  }
});
</script>

<style scoped>
.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.chart-wrapper {
  width: 100%;
  max-width: 800px;
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

canvas {
  width: 100%;
  height: 400px;
}
</style>
