<template>
  <section class="semana-grid">
    <div
      v-for="dia in semana"
      :key="dia.dataString"
      class="text-center dia-card"
      :class="getDiaClass(dia)"
    >
      <div>
        <strong>{{ dia.nome }}</strong>
      </div>
      <div>{{ formatDiaMes(dia.dataString) }}</div>
      <div class="icon">{{ getStatusIcon(dia.dataString) }}</div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Carrega os treinos feitos do localStorage
function carregarTreinosLocalStorage() {
  const dados = localStorage.getItem('treinosFeitos')
  if (!dados) return []
  try {
    return JSON.parse(dados)
  } catch {
    return []
  }
}

// Estado dos treinos feitos
const treinosFeitos = ref([])

// Formata Date para yyyy-mm-dd
function formatData(date) {
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

// Converte dd/mm/yyyy para yyyy-mm-dd
function parseDataDDMMYYYY(data) {
  const [dd, mm, yyyy] = data.split('/')
  return `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`
}

// Formata para mostrar só dia/mês (dd/mm)
function formatDiaMes(dataString) {
  const [, mm, dd] = dataString.split('-')
  return `${dd}/${mm}`
}

// Hoje e hojeString (yyyy-mm-dd)
const hoje = new Date()
const hojeString = formatData(hoje)

// Pega o domingo da semana atual
function getInicioSemana(date) {
  const diaSemana = date.getDay()
  const inicio = new Date(date)
  inicio.setDate(date.getDate() - diaSemana)
  return inicio
}

const inicioSemana = getInicioSemana(hoje)

// Gera os 7 dias da semana atual (domingo a sábado)
const semana = ref([])

onMounted(() => {
  treinosFeitos.value = carregarTreinosLocalStorage()

  semana.value = Array.from({ length: 7 }, (_, i) => {
    const diaData = new Date(inicioSemana)
    diaData.setDate(inicioSemana.getDate() + i)
    return {
      nome: diaData.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', ''),
      data: diaData,
      dataString: formatData(diaData),
    }
  })
})

// Verifica se treino foi feito naquela data
function treinoFoiFeito(dataCalendarioString) {
  return treinosFeitos.value.some(
    (treino) => parseDataDDMMYYYY(treino.data) === dataCalendarioString
  )
}

// Classe para destacar o dia de hoje
function getDiaClass(dia) {
  return dia.dataString === hojeString ? 'bg-primary text-white' : ''
}

// Retorna ícone correto conforme regra
function getStatusIcon(dataString) {
  const hojeTimestamp = new Date(hojeString).getTime()
  const dataTimestamp = new Date(dataString).getTime()
  const foiFeito = treinoFoiFeito(dataString)

  if (foiFeito) return '✅'
  if (dataTimestamp < hojeTimestamp) return '❌'
  if (dataTimestamp === hojeTimestamp) return '🔥'
  return '🕒'
}
</script>

<style scoped>
.semana-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  overflow-x: auto;
  padding: 10px;
  gap: 10px;
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
  padding: 6px;
}

.dia-card:not(.bg-primary):hover {
  background-color: #e0e0e0;
  border-color: #bbb;
}

.icon {
  font-size: 24px;
  margin-top: 6px;
}
</style>
