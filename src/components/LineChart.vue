<template>
  <div class="chart-container">
    <div class="chart-wrapper">
      <canvas ref="chartCanvas"></canvas>
    </div>
    <div class="chart-wrapper">
      <canvas ref="chartCanvas2"></canvas>
    </div>
    <div class="chart-wrapper">
      <canvas ref="chartCanvas3"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
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
}>();

const chartCanvas = ref<HTMLCanvasElement | null>(null);
const chartCanvas2 = ref<HTMLCanvasElement | null>(null);
const chartCanvas3 = ref<HTMLCanvasElement | null>(null);

const data_blood_pressure: ChartData<'line', (number | Point | null)[], unknown> = {
  labels: props.data.map((item) => new Date(item.upload_time).toLocaleDateString()),
  datasets: [{
    label: 'Blood Pressure',
    data: props.data.map((item) => Number(item.blood_pressure)),
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};
const data_heart_rate: ChartData<'line', (number | Point | null)[], unknown> = {
  labels: props.data.map((item) => new Date(item.upload_time).toLocaleDateString()),
  datasets: [{
    label: 'Heart Rate',
    data: props.data.map((item) => Number(item.heart_rate)),
    borderColor: 'rgb(255, 99, 132)',
    tension: 0.1
  }]
};
const data_oxygen_saturation: ChartData<'line', (number | Point | null)[], unknown> = {
  labels: props.data.map((item) => new Date(item.upload_time).toLocaleDateString()),
  datasets: [{
    label: 'Oxygen Saturation',
    data: props.data.map((item) => Number(item.oxygen_saturation)),
    borderColor: 'rgb(54, 162, 235)',
    tension: 0.1
  }]
};
onMounted(() => {
  if (chartCanvas.value) {
    new Chart(chartCanvas.value, {
      type: 'line',
      data: data_blood_pressure,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: '血压图表',
          },
        },
      },
    });
  }
  if (chartCanvas2.value) {
    new Chart(chartCanvas2.value, {
      type: 'line',
      data: data_heart_rate,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: '心率图表',
          },
        },
      },
    });
  }
  if (chartCanvas3.value) {
    new Chart(chartCanvas3.value, {
      type: 'line',
      data: data_oxygen_saturation,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: '血氧图表',
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
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.chart-wrapper {
  width: 100%;
  max-width: 800px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

canvas {
  width: 100%;
  height: 400px;
}
</style>
