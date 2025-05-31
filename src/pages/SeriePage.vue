<template>
  <q-page padding v-if="exercicios.length > 0">
    <q-btn label="Adicionar Série" color="primary" @click="adicionarSerie" class="q-mb-md" />

    <q-tabs v-model="tab" dense active-color="primary" indicator-color="primary" align="left">
      <q-tab
        v-for="(s, index) in series"
        :key="s.id"
        :name="`serie-${s.id}`"
        :label="`Série ${index + 1}`"
      />
    </q-tabs>

    <q-separator />

    <div
      v-for="(serie, index) in series"
      :key="serie.id"
      v-show="tab === `serie-${serie.id}`"
      class="q-pa-md"
    >
      <div
        v-for="(exercicioItem, i) in serie.exercicios"
        :key="i"
        class="row items-center q-gutter-sm q-mb-md"
      >
        <q-select
          v-model="exercicioItem.exercicio"
          :options="exercicios"
          label="Exercício"
          dense
          class="col-4"
          emit-value
          map-options
        />
        <q-input
          v-model="exercicioItem.carga"
          label="Carga (kg)"
          type="number"
          dense
          class="col-2"
        />
        <q-input
          v-model="exercicioItem.repeticoes"
          label="Repetições"
          type="number"
          dense
          class="col-2"
        />
        <q-input v-model="exercicioItem.series" label="Séries" type="number" dense class="col-2" />
        <q-input
          v-model="exercicioItem.obs"
          label="Observações"
          dense
          class="col-8 q-mt-sm"
          type="text"
          autogrow
          placeholder="Anotações sobre o exercício"
        />
        <q-btn
          dense
          round
          icon="delete"
          color="negative"
          class="col-1 q-mt-sm"
          @click="removerExercicio(index, i)"
          flat
        />
      </div>

      <div class="row q-gutter-sm">
        <q-btn
          dense
          label="Adicionar Exercício"
          icon="add"
          color="secondary"
          @click="adicionarExercicio(index)"
        />
        <q-btn
          dense
          label="Salvar Série"
          icon="save"
          color="positive"
          @click="salvarSerie(index)"
        />
      </div>
    </div>
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
      Nenhuma exercício encontrado. Adicione um exercício para começar.
      <br />
      <q-btn label="Adicionar Exercícios" color="primary" to="/menu/exercicio" class="q-mt-md" />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const tab = ref(null)
const series = ref([])

const exercicios = ref([])

function gerarId() {
  return Date.now() + Math.floor(Math.random() * 1000)
}

onMounted(() => {
  const dados = localStorage.getItem('exercises')
  if (dados) {
    const lista = JSON.parse(dados)
    exercicios.value = lista.map((e) => ({
      label: e.name,
      value: e.id,
    }))
  }

  const seriesSalvas = localStorage.getItem('series')
  if (seriesSalvas) {
    series.value = JSON.parse(seriesSalvas)
  } else {
    adicionarSerie()
  }

  if (series.value.length > 0) {
    tab.value = `serie-${series.value[0].id}`
  }
})

function salvarSerie(index) {
  // filtra exercícios válidos antes de salvar
  const serie = series.value[index]
  const exerciciosValidos = serie.exercicios.filter((ex) => ex.exercicio)
  serie.exercicios =
    exerciciosValidos.length > 0
      ? exerciciosValidos
      : [{ exercicio: null, carga: null, repeticoes: null, series: null, obs: '' }]
  localStorage.setItem('series', JSON.stringify(series.value))
}

function adicionarSerie() {
  const novaSerie = {
    id: gerarId(),
    exercicios: [
      {
        exercicio: null,
        carga: null,
        repeticoes: null,
        series: null,
        obs: '',
      },
    ],
  }
  series.value.push(novaSerie)
  tab.value = `serie-${novaSerie.id}`
  localStorage.setItem('series', JSON.stringify(series.value))
}

function adicionarExercicio(serieIndex) {
  series.value[serieIndex].exercicios.push({
    exercicio: null,
    carga: null,
    repeticoes: null,
    series: null,
    obs: '',
  })
}

function removerExercicio(serieIndex, exercicioIndex) {
  series.value[serieIndex].exercicios.splice(exercicioIndex, 1)
}
</script>
