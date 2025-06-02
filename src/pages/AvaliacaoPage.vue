<template>
  <q-page padding>
    <q-tabs v-model="abaAtiva" class="text-primary" align="justify">
      <q-tab name="avaliacoes" label="Avaliação Física" />
      <q-tab name="graficos" label="Gráficos" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="abaAtiva" animated>
      <!-- AVALIAÇÕES -->
      <q-tab-panel name="avaliacoes">
        <div class="q-mt-md">
          <q-btn label="Nova Avaliação" color="primary" @click="abrirModal = true" />

          <q-dialog v-model="abrirModal" persistent>
            <q-card style="min-width: 90vw; max-height: 90vh; overflow-y: auto">
              <q-card-section>
                <div class="text-h6">Nova Avaliação</div>
              </q-card-section>

              <q-card-section>
                <q-form @submit.prevent="adicionarAvaliacao">
                  <q-input v-model="novaAvaliacao.dia" label="Data" readonly />
                  <q-input v-model.number="novaAvaliacao.peso" label="Peso (kg)" type="number" />
                  <q-input
                    v-model.number="novaAvaliacao.altura"
                    label="Altura (cm)"
                    type="number"
                  />
                  <q-input
                    v-model.number="novaAvaliacao.percentualGordura"
                    label="% Gordura Corporal"
                    type="number"
                  />

                  <div class="q-mt-md text-subtitle2">Medidas Corporais (cm)</div>
                  <div class="row q-col-gutter-md">
                    <q-input
                      v-for="(label, key) in labelsCircunferencias"
                      :key="key"
                      v-model.number="novaAvaliacao.circunferencias[key]"
                      :label="label"
                      type="number"
                      class="col-6"
                    />
                  </div>

                  <q-card-actions align="right" class="q-mt-md">
                    <q-btn label="Cancelar" flat @click="abrirModal = false" />
                    <q-btn label="Salvar" color="primary" type="submit" />
                  </q-card-actions>
                </q-form>
              </q-card-section>
            </q-card>
          </q-dialog>

          <!-- Lista de Avaliações -->
          <div class="q-mt-lg" v-if="avaliacoes.length">
            <q-card v-for="(a, index) in avaliacoes" :key="index" class="q-mb-md">
              <q-card-section>
                <div class="text-h6">Dia: {{ a.dia }}</div>
                <div>Peso: {{ a.peso }} kg</div>
                <div>Altura: {{ a.altura }} cm</div>
                <div>% Gordura: {{ a.percentualGordura }}%</div>
              </q-card-section>
            </q-card>
          </div>

          <div v-else class="text-center text-grey">Nenhuma avaliação cadastrada.</div>
        </div>
      </q-tab-panel>

      <!-- GRÁFICOS -->
      <q-tab-panel name="graficos">
        <div v-if="avaliacoes.length">
          <div class="q-mb-xl">
            <line-chart :label="'Evolução do Peso'" :labels="labelsGrafico" :dados="dadosPeso" />
          </div>
          <div>
            <line-chart
              :label="'Evolução do % de Gordura'"
              :labels="labelsGrafico"
              :dados="dadosGordura"
            />
          </div>
        </div>
        <div v-else class="text-center text-grey">
          Cadastre pelo menos uma avaliação para ver os gráficos.
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import LineChart from '../components/LineChart.vue'

export default {
  name: 'AvaliacaoFisicaPage',
  components: { LineChart },
  setup() {
    const abaAtiva = ref('avaliacoes')
    const abrirModal = ref(false)

    const labelsCircunferencias = {
      pescoco: 'Pescoço',
      ombros: 'Ombros',
      torax: 'Tórax / Peitoral',
      bracoDireito: 'Braço Direito',
      bracoEsquerdo: 'Braço Esquerdo',
      antebracoDireito: 'Antebraço Direito',
      antebracoEsquerdo: 'Antebraço Esquerdo',
      cintura: 'Cintura',
      abdomen: 'Abdômen',
      quadril: 'Quadril',
      coxaDireita: 'Coxa Direita',
      coxaEsquerda: 'Coxa Esquerda',
      panturrilhaDireita: 'Panturrilha Direita',
      panturrilhaEsquerda: 'Panturrilha Esquerda',
    }

    const avaliacoes = ref([])

    const novaAvaliacao = ref({
      dia: new Date().toLocaleDateString('pt-BR'),
      peso: null,
      altura: null,
      percentualGordura: null,
      circunferencias: Object.fromEntries(Object.keys(labelsCircunferencias).map((k) => [k, null])),
    })

    const salvarLocalStorage = () => {
      localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes.value))
    }

    const carregarLocalStorage = () => {
      const data = localStorage.getItem('avaliacoes')
      if (data) avaliacoes.value = JSON.parse(data)
    }

    const adicionarAvaliacao = () => {
      avaliacoes.value.push({ ...novaAvaliacao.value })
      salvarLocalStorage()
      abrirModal.value = false
      novaAvaliacao.value = {
        dia: new Date().toLocaleDateString('pt-BR'),
        peso: null,
        altura: null,
        percentualGordura: null,
        circunferencias: Object.fromEntries(
          Object.keys(labelsCircunferencias).map((k) => [k, null])
        ),
      }
    }

    const labelsGrafico = computed(() => avaliacoes.value.map((a) => a.dia))
    const dadosPeso = computed(() => avaliacoes.value.map((a) => a.peso))
    const dadosGordura = computed(() => avaliacoes.value.map((a) => a.percentualGordura))

    onMounted(carregarLocalStorage)

    return {
      abaAtiva,
      abrirModal,
      labelsCircunferencias,
      novaAvaliacao,
      avaliacoes,
      adicionarAvaliacao,
      labelsGrafico,
      dadosPeso,
      dadosGordura,
    }
  },
}
</script>
