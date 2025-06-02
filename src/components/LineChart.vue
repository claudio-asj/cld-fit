<template>
  <div>
    <h6 class="text-subtitle1 q-mb-sm">{{ label }}</h6>
    <LineChartJS :data="chartData" :options="options" />
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js'
import { Line as LineChartJS } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

export default {
  name: 'LineChart',
  components: { LineChartJS },
  props: {
    label: String,
    labels: Array,
    dados: Array,
  },
  computed: {
    chartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: this.label,
            data: this.dados,
            borderColor: '#027be3',
            fill: false,
            tension: 0.3,
          },
        ],
      }
    },
    options() {
      return {
        responsive: true,
        maintainAspectRatio: false,
      }
    },
  },
}
</script>

<style scoped>
div {
  height: 300px;
}
</style>
