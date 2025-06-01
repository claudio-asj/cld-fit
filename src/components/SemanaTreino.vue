<template>
  <section
    class="section"
    style="max-width: 700px; margin: auto; white-space: nowrap"
    wrap="nowrap"
  >
    <div
      v-for="dia in semana"
      :key="dia.dataString"
      class="text-center dia-card"
      :class="getDiaClass(dia)"
      style="min-width: 80px"
    >
      <div>
        <strong>{{ dia.nome }}</strong>
      </div>
      <div>{{ formatDiaMes(dia.data) }}</div>
      <div style="font-size: 24px; margin-top: 6px">{{ getStatusIcon(dia.dataString) }}</div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// Criar uma semana exemplo começando hoje:
const hoje = new Date()

function formatData(date) {
  // Retorna string YYYY-MM-DD para key e comparação
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

function formatDiaMes(date) {
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  return `${dd}/${mm}`
}

// Monta os 7 dias da semana começando em hoje (pode ajustar para segunda etc)
const semana = ref(
  Array.from({ length: 7 }, (_, i) => {
    const diaData = new Date(hoje)
    diaData.setDate(hoje.getDate() + i)
    return {
      nome: diaData.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', ''),
      data: diaData,
      dataString: formatData(diaData),
    }
  })
)

function getDiaClass(dia) {
  // Marca o dia atual com classe bg-primary
  if (dia.dataString === formatData(hoje)) {
    return 'bg-primary text-white'
  }
  return ''
}

function getStatusIcon(dataString) {
  // Para exemplo, coloca emoji verde para dias passados ou hoje, vermelho para futuros
  const hojeStr = formatData(hoje)
  if (dataString < hojeStr) {
    return '✅' // passado
  } else if (dataString === hojeStr) {
    return '🔥' // hoje
  } else {
    return '❌' // futuro
  }
}
</script>


<style scoped>
.section {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  overflow: scroll;
  padding: 10px; /* Added padding for better spacing */
  gap: 10px; /* Added gap between the cards */
}
.bg-primary {
  background-color: #027be3 !important;
  border-color: #027be3 !important;
}

.dia-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: default;
  user-select: none;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  min-width: 80px;
  max-width: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.dia-card:not(.bg-primary):hover {
  background-color: #e0e0e0;
  border-color: #bbb;
}
</style>
