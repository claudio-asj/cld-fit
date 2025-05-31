<template>
  <q-page class="q-pa-lg">
    <div class="text-center">
      <q-icon name="fitness_center" size="64px" color="primary" class="q-mb-md" />
      <h1 class="text-h5 q-mb-sm">Santo Setup 🙏</h1>
      <p class="text-subtitle2 q-mb-lg">
        Clique no botão abaixo para abençoar seu treino com os exercícios sagrados do CLDfit.
      </p>

      <q-btn
        label="Setup Santinho"
        icon="auto_fix_high"
        color="primary"
        size="lg"
        unelevated
        @click="setupSantinho"
      />

      <q-banner
        v-if="showBanner"
        class="q-mt-lg bg-positive text-white"
        dense
        icon="check_circle"
        @dismiss="showBanner = false"
      >
        Exercícios adicionados com sucesso! Vai com fé 💪
      </q-banner>

      <div v-if="exercises.length" class="q-mt-xl">
        <q-card v-for="exercise in exercises" :key="exercise.id" class="my-card">
          <q-card-section class="q-pa-none">
            <q-img :src="exercise.image" :alt="exercise.name" class="q-mb-md" />
          </q-card-section>
          <q-card-section>
            <div class="text-h6">{{ exercise.name }}</div>
            <div class="text-body2">{{ exercise.muscle }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const showBanner = ref(false)
const exercises = ref([])

function setupSantinho() {
  const defaultExercises = [
    {
      id: 'ex1',
      name: 'Flexão de Braço',
      muscle: 'Peito',
      image: 'https://link-da-imagem1.com/flexao.png',
    },
    {
      id: 'ex2',
      name: 'Agachamento',
      muscle: 'Pernas',
      image: 'https://link-da-imagem2.com/agachamento.png',
    },
    {
      id: 'ex3',
      name: 'Prancha',
      muscle: 'Core',
      image: 'https://link-da-imagem3.com/prancha.png',
    },
    {
      id: 'ex4',
      name: 'Barra Fixa',
      muscle: 'Costas',
      image: 'https://link-da-imagem4.com/barrafixa.png',
    },
    { id: 'ex5', name: 'Supino', muscle: 'Peito', image: 'https://link-da-imagem5.com/supino.png' },
    {
      id: 'ex6',
      name: 'Agachamento com Barra',
      muscle: 'Pernas',
      image: 'https://link-da-imagem6.com/agachamento-barra.png',
    },
    {
      id: 'ex7',
      name: 'Abdominal',
      muscle: 'Core',
      image: 'https://link-da-imagem7.com/abdominal.png',
    },
    {
      id: 'ex8',
      name: 'Remada',
      muscle: 'Costas',
      image: 'https://link-da-imagem8.com/remada.png',
    },
  ]

  const existing = JSON.parse(localStorage.getItem('exercises') || '[]')
  const updated = [...existing, ...defaultExercises]
  localStorage.setItem('exercises', JSON.stringify(updated))

  exercises.value = updated
  showBanner.value = true

  localStorage.setItem('santoSetupDone', 'true')
}
</script>

<style scoped>
.my-card {
  max-width: 300px;
  margin: 0 auto;
  margin-bottom: 20px;
}
</style>
