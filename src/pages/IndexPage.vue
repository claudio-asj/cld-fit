<template>
  <q-page padding v-if="series.length > 0">
    <div>
      <SemanaTreino />
    </div>
    <q-select
      v-model="serieSelecionadaIndex"
      :options="seriesOptions"
      label="Selecione a Série"
      outlined
      class="q-mb-md q-mt-lg"
      emit-value
      map-options
    />

    <div v-if="serieSelecionada" class="q-gutter-md q-pt-md">
      <div
        v-for="(exercicioItem, index) in serieSelecionada.exercicios"
        :key="index"
        class="q-pa-sm rounded shadow-2 row items-center q-gutter-sm cursor-pointer"
        :class="{ feito: exercicioItem.feito }"
        @click="exercicioItem.feito = !exercicioItem.feito"
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
          <div style="font-size: 24px; line-height: 24px; font-weight: bold">
            {{ getExercicioNome(exercicioItem.exercicio) || 'Exercício não encontrado' }}
          </div>
          <div>
            <q-icon name="fitness_center" /> {{ exercicioItem.carga }}Kg &nbsp; | &nbsp;
            <q-icon name="tag" /> {{ exercicioItem.series }}x{{ exercicioItem.repeticoes }}
          </div>
          <div v-if="exercicioItem.obs">Obs: {{ exercicioItem.obs }}</div>
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
      <q-card
        class="bg-transparent shadow-none"
        style="
          max-width: 100%;
          max-height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        "
      >
        <q-img :src="imagemModal" class="full-width" contain />
        <q-btn
          icon="close"
          label="fechar"
          color="primary"
          flat
          round
          dense
          @click="modalAberto = false"
        />
      </q-card>
    </q-dialog>
  </q-page>

  <q-page padding v-else>
    <div class="text-center text-h4">
      <q-img
        src="https://i.gifer.com/40Oj.gif"
        style="max-width: 200px; margin: auto"
        alt="Nenhuma Série"
        class="q-mb-md"
      />
      <div class="text-h6 q-mb-sm">Nenhuma série encontrada</div>
      <div class="text-subtitle2">Adicione uma série para começar.</div>
      <q-btn label="Adicionar Série" color="primary" to="/menu/serie" class="q-mt-md" />
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import SemanaTreino from 'components/SemanaTreino.vue'

const series = ref([])
const exercicios = ref([])
const serieSelecionadaIndex = ref(null)

const modalAberto = ref(false)
const imagemModal = ref('')

onMounted(() => {
  const seriesStorage = localStorage.getItem('series')
  if (seriesStorage) {
    const listaSeries = JSON.parse(seriesStorage)
    // Aqui mantemos o 'nome' da série e adicionamos o feito nos exercícios
    series.value = listaSeries.map((serie) => ({
      nome: serie.nome, // importante ter o nome aqui
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
  series.value.map((serie, i) => ({
    label: serie.nome || `Série ${i + 1}`, // mostra o nome salvo ou fallback
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
