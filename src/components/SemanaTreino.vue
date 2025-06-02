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
      <div>{{ formatDiaMes(dia.data) }}</div>
      <div class="icon">{{ getStatusIcon(dia.dataString) }}</div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// Lista de treinos feitos
const treinosFeitos = ref([
  { nome: 'teste', data: '01/06/2025', imagem: '...' },
  { nome: 'ombro', data: '02/06/2025', imagem: '...' },
])

// Funções de formatação
function formatData(date) {
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

function formatDiaMes(date) {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
  })
}

const hoje = new Date()
const hojeString = formatData(hoje)

// Início da semana (domingo)
function getInicioSemana(date) {
  const diaSemana = date.getDay()
  const inicio = new Date(date)
  inicio.setDate(date.getDate() - diaSemana)
  return inicio
}

const inicioSemana = getInicioSemana(hoje)

const semana = ref(
  Array.from({ length: 7 }, (_, i) => {
    const diaData = new Date(inicioSemana)
    diaData.setDate(inicioSemana.getDate() + i)
    return {
      nome: diaData.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', ''),
      data: diaData,
      dataString: formatData(diaData),
    }
  })
)

// Checa se um treino foi feito em uma data (formato YYYY-MM-DD)
function treinoFoiFeito(dataString) {
  return treinosFeitos.value.some((treino) => {
    const [dia, mes, ano] = treino.data.split('/')
    const treinoDataString = `${ano}-${mes}-${dia}`
    return treinoDataString === dataString
  })
}

function getDiaClass(dia) {
  return dia.dataString === hojeString ? 'bg-primary text-white' : ''
}

function getStatusIcon(dataString) {
  const hojeTimestamp = new Date(hojeString).getTime()
  const dataTimestamp = new Date(dataString).getTime()

  const foiFeito = treinoFoiFeito(dataString)

  if (foiFeito) {
    return dataString === hojeString ? '🔥' : '✅'
  }

  if (dataTimestamp < hojeTimestamp) {
    return '❌' // Passado e não feito
  }

  return '🕒' // Futuro (ou hoje) e ainda não feito
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
