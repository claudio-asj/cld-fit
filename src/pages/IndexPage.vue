<template>
  <q-page padding v-if="series.length > 0">
    <q-select
      v-model="serieSelecionadaIndex"
      :options="seriesOptions"
      label="Selecione a Série"
      dense
      outlined
      class="q-mb-md"
      emit-value
      map-options
    />

    <div v-if="serieSelecionada" class="q-gutter-md q-pt-md">
      <div
        v-for="(exercicioItem, index) in serieSelecionada.exercicios"
        :key="index"
        class="q-pa-md rounded shadow-2 row items-center q-gutter-sm cursor-pointer"
        :class="{ feito: exercicioItem.feito }"
      >
        <q-checkbox
          v-model="exercicioItem.feito"
          @click.stop
          class="col-auto"
          color="primary"
          dense
          keep-color
        />
        <div class="col">
          <div class="text-h6">
            {{ getExercicioNome(exercicioItem.exercicio) || 'Exercício não encontrado' }}
          </div>
          <div>Carga: {{ exercicioItem.carga ?? '-' }} kg</div>
          <div>Repetições: {{ exercicioItem.repeticoes ?? '-' }}</div>
          <div>Séries: {{ exercicioItem.series ?? '-' }}</div>
        </div>
        <q-img
          v-if="getExercicioImagem(exercicioItem.exercicio)"
          :src="getExercicioImagem(exercicioItem.exercicio)"
          alt="Imagem do Exercício"
          class="col-auto q-ma-xs"
          style="width: 100px; height: 70px; border-radius: 6px"
          @click="abrirModal(getExercicioImagem(exercicioItem.exercicio))"
        />
      </div>
    </div>

    <q-dialog v-model="modalAberto" persistent maximized>
      <q-card class="bg-transparent shadow-none">
        <q-img :src="imagemModal" class="full-width" contain />
        <q-btn
          icon="close"
          color="white"
          flat
          round
          dense
          class="absolute-top-right q-mt-md q-mr-md"
          @click="modalAberto = false"
        />
      </q-card>
    </q-dialog>
  </q-page>
  <q-page padding v-else>
    <div class="text-center text-h4">
      <q-img
        src="https://i.gifer.com/40Oj.gif"
        class="q-mb-md"
        style="max-width: 200px; margin: auto"
        alt="Nenhuma Série"
      />
      <br />
      Nenhuma série encontrada. Por favor, adicione séries para começar. <br />
      <q-btn to="/menu/serie" color="primary" class="q-mt-md" label="Adicionar Série" />
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const series = ref([])
const exercicios = ref([])
const serieSelecionadaIndex = ref(null)

const modalAberto = ref(false)
const imagemModal = ref('')

onMounted(() => {
  const seriesStorage = localStorage.getItem('series')
  if (seriesStorage) {
    const listaSeries = JSON.parse(seriesStorage)
    // Adiciona prop 'feito' para controle visual, não persistente
    series.value = listaSeries.map((serie) => ({
      exercicios: serie.exercicios.map((ex) => ({
        ...ex,
        feito: false,
      })),
    }))
    if (series.value.length) {
      serieSelecionadaIndex.value = 0
    }
  }

  const exerciciosStorage = localStorage.getItem('exercises')
  if (exerciciosStorage) {
    exercicios.value = JSON.parse(exerciciosStorage)
  }
})

const seriesOptions = computed(() =>
  series.value.map((_, i) => ({
    label: `Série ${i + 1}`,
    value: i,
  }))
)

const serieSelecionada = computed(() => {
  if (serieSelecionadaIndex.value !== null) {
    return series.value[serieSelecionadaIndex.value]
  }
  return null
})

function getExercicioById(id) {
  return exercicios.value.find((ex) => ex.id === id)
}

function getExercicioNome(id) {
  const ex = getExercicioById(id)
  return ex ? ex.name : null
}

function getExercicioImagem(id) {
  const ex = getExercicioById(id)
  return ex ? ex.image : null
}

function abrirModal(imagemUrl) {
  imagemModal.value = imagemUrl
  modalAberto.value = true
}
</script>

<style scoped>
.feito {
  text-decoration: line-through;
  opacity: 0.5;
  transition: opacity 0.3s ease, text-decoration 0.3s ease;
}
.cursor-pointer {
  transition: opacity 0.3s ease, text-decoration 0.3s ease;
}
</style>
