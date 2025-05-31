<template>
  <q-page padding>
    <div v-if="exercicios.length > 0">
      <div class="row justify-between items-center q-mb-md">
        <div class="text-h6">Minhas séries</div>
        <q-btn label="Adicionar Série" color="primary" icon="add" @click="adicionarSerie" />
      </div>

      <q-tabs
        v-model="tab"
        dense
        active-color="primary"
        indicator-color="primary"
        align="left"
        class="q-mb-md"
      >
        <q-tab
          v-for="(s, index) in series"
          :key="s.id"
          :name="`serie-${s.id}`"
          :label="s.nome ? s.nome : `Série ${index + 1}`"
        />
      </q-tabs>

      <q-separator />

      <div
        v-for="(serie, index) in series"
        :key="serie.id"
        v-show="tab === `serie-${serie.id}`"
        class="q-mt-md"
      >
        <q-card flat bordered class="q-pa-md q-mb-xl shadow-2">
          <q-input
            v-model="serie.nome"
            label="Nome da Série"
            dense
            class="q-mb-md"
            placeholder="Ex: Segunda-feira - Peito e Tríceps"
          />

          <div class="text-subtitle1 text-primary q-mb-sm">
            {{ serie.nome ? serie.nome : `Série ${index + 1}` }}
          </div>

          <div v-for="(exercicioItem, i) in serie.exercicios" :key="i" class="q-mb-md">
            <q-card flat bordered class="bg-grey-2 q-pa-sm">
              <div class="row items-start q-col-gutter-sm">
                <q-select
                  v-model="exercicioItem.exercicio"
                  :options="exercicios"
                  label="Exercício"
                  dense
                  emit-value
                  map-options
                  class="col-10"
                />

                <q-btn
                  dense
                  flat
                  round
                  icon="delete"
                  color="negative"
                  class="col-auto q-mt-sm"
                  @click="removerExercicio(index, i)"
                />
              </div>

              <div class="row q-col-gutter-sm q-mt-sm">
                <q-input
                  v-model="exercicioItem.carga"
                  label="Carga (kg)"
                  type="number"
                  dense
                  class="col-4"
                />
                <q-input
                  v-model="exercicioItem.series"
                  label="Séries"
                  type="number"
                  dense
                  class="col-4"
                />
                <q-input
                  v-model="exercicioItem.repeticoes"
                  label="Repetições"
                  type="number"
                  dense
                  class="col-4"
                />
              </div>

              <q-input
                v-model="exercicioItem.obs"
                label="Observações"
                dense
                type="textarea"
                autogrow
                class="q-mt-sm"
                placeholder="Anotações sobre o exercício"
              />
            </q-card>
          </div>

          <div class="row q-gutter-sm justify-end">
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
            <q-btn
              dense
              flat
              label="Excluir Série"
              icon="delete"
              color="negative"
              @click="removerSerie(index)"
            />
          </div>
        </q-card>
      </div>
    </div>

    <div v-else class="q-mt-xl text-center">
      <q-img
        src="https://i.gifer.com/40Oj.gif"
        style="max-width: 200px; margin: auto"
        alt="Nenhuma Série"
        class="q-mb-md"
      />
      <div class="text-h6 q-mb-sm">Nenhum exercício encontrado</div>
      <div class="text-subtitle2">Adicione um exercício para começar.</div>
      <q-btn label="Adicionar Exercícios" color="primary" to="/menu/exercicio" class="q-mt-md" />
    </div>

    <!-- Modal de confirmação -->
    <q-dialog v-model="dialogSalvo">
      <q-card>
        <q-card-section class="row items-center">
          <q-icon name="check_circle" color="positive" size="md" class="q-mr-sm" />
          <div class="text-subtitle1">Série salva com sucesso!</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const tab = ref(null)
const series = ref([])
const exercicios = ref([])
const dialogSalvo = ref(false)

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
  const serie = series.value[index]
  const exerciciosValidos = serie.exercicios.filter((ex) => ex.exercicio)

  serie.exercicios =
    exerciciosValidos.length > 0
      ? exerciciosValidos
      : [{ exercicio: null, carga: null, repeticoes: null, series: null, obs: '' }]

  localStorage.setItem('series', JSON.stringify(series.value))
  dialogSalvo.value = true
}

function adicionarSerie() {
  const novaSerie = {
    id: gerarId(),
    nome: '',
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

function removerSerie(index) {
  series.value.splice(index, 1)
  if (series.value.length > 0) {
    tab.value = `serie-${series.value[0].id}`
  } else {
    tab.value = null
  }
  localStorage.setItem('series', JSON.stringify(series.value))
}
</script>
