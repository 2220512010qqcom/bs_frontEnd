<template>
  <div class="chart-container">
    <swiper
      ref="swiperRef"
      :initial-slide="currentChart"
      :speed="400"
      :slides-per-view="1"
      :active-index="currentChart"
      :centeredSlides="true"
      class="my-swiper"
      :loop="slideCount > 1"
      style="width: 100vw;"
    >
      <swiper-slide>
        <div class="chart-wrapper">
          <canvas ref="chartCanvas"></canvas>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="chart-wrapper">
          <canvas ref="chartCanvas1"></canvas>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="chart-wrapper">
          <canvas ref="chartCanvas2"></canvas>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="chart-wrapper">
          <canvas ref="chartCanvas3"></canvas>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import Chart, { ChartData, Point } from 'chart.js/auto';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
interface UserUploads {
    upload_id: string;
    user_id: string;
    heart_rate: number;
    blood_pressure: string | number; // 血压可以是字符串格式如 '120/80'
    oxygen_saturation: number;
    upload_time: Date;
}

const props = defineProps<{
  data: UserUploads[];
}>();

const chartCanvas = ref<HTMLCanvasElement | null>(null);
const chartCanvas1 = ref<HTMLCanvasElement | null>(null);
const chartCanvas2 = ref<HTMLCanvasElement | null>(null);
const chartCanvas3 = ref<HTMLCanvasElement | null>(null);
const currentChart = ref(0);
const swiperRef = ref<any>(null);
const slideCount = 4;


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
const data_blood_pressure = computed(() => ({
  labels: props.data.map((item) => new Date(item.upload_time).toLocaleDateString()),
  datasets: [
    {
      label: '血压',
      data: props.data.map((item) => Number(item.blood_pressure)),
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
}));

const data_heart_rate = computed(() => ({
  labels: props.data.map((item) => new Date(item.upload_time).toLocaleDateString()),
  datasets: [
    {
      label: '心率',
      data: props.data.map((item) => Number(item.heart_rate)),
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.1,
    },
  ],
}));

const data_oxygen_saturation = computed(() => ({
  labels: props.data.map((item) => new Date(item.upload_time).toLocaleDateString()),
  datasets: [
    {
      label: '血氧',
      data: props.data.map((item) => Number(item.oxygen_saturation)),
      borderColor: 'rgb(54, 162, 235)',
      tension: 0.1,
    },
  ],
}));
const chartInstances = [ref<Chart|null>(null), ref<Chart|null>(null), ref<Chart|null>(null), ref<Chart|null>(null)];

function renderCharts() {
  // 综合图表
  if (chartCanvas.value) {
    if (chartInstances[0].value) chartInstances[0].value.destroy();
    chartInstances[0].value = new Chart(chartCanvas.value, {
      type: 'line',
      data: data.value,
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: '综合图表' },
        },
      },
    });
  }
  // 血压图表
  if (chartCanvas1.value) {
    if (chartInstances[1].value) chartInstances[1].value.destroy();
    chartInstances[1].value = new Chart(chartCanvas1.value, {
      type: 'line',
      data: data_blood_pressure.value,
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: '血压图表' },
        },
      },
    });
  }
  // 心率图表
  if (chartCanvas2.value) {
    if (chartInstances[2].value) chartInstances[2].value.destroy();
    chartInstances[2].value = new Chart(chartCanvas2.value, {
      type: 'line',
      data: data_heart_rate.value,
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: '心率图表' },
        },
      },
    });
  }
  // 血氧图表
  if (chartCanvas3.value) {
    if (chartInstances[3].value) chartInstances[3].value.destroy();
    chartInstances[3].value = new Chart(chartCanvas3.value, {
      type: 'line',
      data: data_oxygen_saturation.value,
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: '血氧图表' },
        },
      },
    });
  }
}

onMounted(() => {
  renderCharts();
});

watch(
  () => props.data,
  () => {
    renderCharts();
  },
  { deep: true }
);
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
  width: 100vw;
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
