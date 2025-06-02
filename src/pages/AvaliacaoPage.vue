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
          <q-btn label="Nova Avaliação" color="primary" @click="abrirModalParaNova" />

          <q-dialog v-model="abrirModal" persistent>
            <q-card style="min-width: 90vw; max-height: 90vh; overflow-y: auto">
              <q-card-section>
                <div class="text-h6">
                  {{ avaliacaoEditando === null ? 'Nova Avaliação' : 'Editar Avaliação' }}
                </div>
              </q-card-section>

              <q-card-section>
                <q-form @submit.prevent="salvarAvaliacao">
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
                    <q-btn label="Cancelar" flat @click="fecharModal" />
                    <q-btn
                      v-if="avaliacaoEditando !== null"
                      label="Deletar"
                      color="negative"
                      flat
                      @click="deletarAvaliacao"
                    />
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
                <div v-if="a.percentualGordura">% Gordura: {{ a.percentualGordura }}%</div>
                <!-- Linha do IMC -->
                <div v-if="a.peso && a.altura">
                  IMC: {{ calcularIMC(a.peso, a.altura).toFixed(2) }}
                </div>
                <!-- Linha do IAC -->
                <div v-if="a.circunferencias && a.circunferencias.quadril && a.altura">
                  IAC: {{ calcularIAC(a.circunferencias.quadril, a.altura).toFixed(2) }}
                </div>
                <div class="row align-center justify-end q-mt-md">
                  <q-btn
                    dense
                    flat
                    icon="edit"
                    label="Editar"
                    @click="abrirModalParaEditar(index)"
                  />
                </div>
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
    const avaliacaoEditando = ref(null) // índice da avaliação que está sendo editada

    const labelsCircunferencias = {
      ombros: 'Ombros',
      torax: 'Tórax / Peitoral',
      bracoDireito: 'Braço Direito',
      bracoEsquerdo: 'Braço Esquerdo',
      antebracoDireito: 'Antebraço Direito',
      antebracoEsquerdo: 'Antebraço Esquerdo',
      cintura: 'Cintura',
      gluteos: 'Glúteos',
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

    const abrirModalParaNova = () => {
      avaliacaoEditando.value = null
      novaAvaliacao.value = {
        dia: new Date().toLocaleDateString('pt-BR'),
        peso: null,
        altura: null,
        percentualGordura: null,
        circunferencias: Object.fromEntries(
          Object.keys(labelsCircunferencias).map((k) => [k, null])
        ),
      }
      abrirModal.value = true
    }

    const abrirModalParaEditar = (index) => {
      avaliacaoEditando.value = index
      novaAvaliacao.value = JSON.parse(JSON.stringify(avaliacoes.value[index])) // clone profundo para evitar ligação direta
      abrirModal.value = true
    }

    const salvarAvaliacao = () => {
      if (avaliacaoEditando.value === null) {
        // nova avaliação
        avaliacoes.value.push({ ...novaAvaliacao.value })
      } else {
        // editar existente
        avaliacoes.value[avaliacaoEditando.value] = { ...novaAvaliacao.value }
      }
      salvarLocalStorage()
      fecharModal()
    }

    const deletarAvaliacao = () => {
      if (avaliacaoEditando.value !== null) {
        avaliacoes.value.splice(avaliacaoEditando.value, 1)
        salvarLocalStorage()
        fecharModal()
      }
    }

    const fecharModal = () => {
      abrirModal.value = false
      avaliacaoEditando.value = null
    }

    const calcularIMC = (peso, alturaCm) => {
      const alturaM = alturaCm / 100
      return peso / (alturaM * alturaM)
    }

    const calcularIAC = (circunferenciaQuadrilCm, alturaCm) => {
      const alturaM = alturaCm / 100
      return circunferenciaQuadrilCm / (alturaM * Math.sqrt(alturaM)) - 18
    }

    const labelsGrafico = computed(() => avaliacoes.value.map((a) => a.dia))
    const dadosPeso = computed(() => avaliacoes.value.map((a) => a.peso))
    const dadosGordura = computed(() => avaliacoes.value.map((a) => a.percentualGordura))

    onMounted(carregarLocalStorage)

    return {
      calcularIMC,
      calcularIAC,
      abaAtiva,
      abrirModal,
      avaliacaoEditando,
      labelsCircunferencias,
      novaAvaliacao,
      avaliacoes,
      abrirModalParaNova,
      abrirModalParaEditar,
      salvarAvaliacao,
      deletarAvaliacao,
      fecharModal,
      labelsGrafico,
      dadosPeso,
      dadosGordura,
    }
  },
}
</script>
