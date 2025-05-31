<template>
  <q-page class="q-pa-md">
    <q-btn label="Cadastrar Exercício" color="primary" @click="showDialog = true" class="q-mb-md" />

    <q-list bordered>
      <q-item v-for="exercise in exercises" :key="exercise.id">
        <q-item-section avatar>
          <q-avatar square>
            <img :src="exercise.image" alt="imagem" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ exercise.name }}</q-item-label>
          <q-item-label caption>Músculo alvo: {{ exercise.muscle }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <!-- Modal para cadastrar novo exercício -->
    <q-dialog v-model="showDialog">
      <q-card style="min-width: 300px">
        <q-card-section>
          <div class="text-h6">Novo Exercício</div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input v-model="form.name" label="Nome" outlined />
          <q-select
            v-model="form.muscle"
            :options="muscleOptions"
            label="Músculo alvo"
            outlined
            emit-value
            map-options
          />
          <q-input v-model="form.image" label="Link da imagem" outlined />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn label="Salvar" color="primary" @click="addExercise" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Modal onboarding com carrossel -->
    <q-dialog v-model="showOnboarding" persistent>
      <q-card>
        <q-carousel
          v-model="slide"
          animated
          swipeable
          navigation
          navigation-position="bottom"
          control-color="primary"
          arrows
          arrows-color="primary"
          infinite
        >
          <q-carousel-slide
            v-for="(slideContent, index) in onboardingSlides"
            :key="index"
            :name="index"
          >
            <div class="q-pa-md column items-center text-center">
              <div class="text-h6 q-mb-md">{{ slideContent.title }}</div>
              <div>{{ slideContent.description }}</div>
              <img
                v-if="slideContent.image"
                :src="slideContent.image"
                alt="Ilustração"
                style="width: 100%; max-width: 200px"
              />
            </div>
          </q-carousel-slide>
        </q-carousel>

        <q-card-actions align="right">
          <q-btn flat label="Fechar" @click="showOnboarding = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showDialog = ref(false)
const showOnboarding = ref(false)
const slide = ref(0)

const form = ref({
  name: '',
  muscle: '',
  image: '',
})

const muscleOptions = [
  'Peito',
  'Costas',
  'Bíceps',
  'Tríceps',
  'Ombros',
  'Pernas',
  'Glúteos',
  'Panturrilhas',
  'Abdômen',
]

const exercises = ref([])

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

function loadFromStorage() {
  const data = localStorage.getItem('exercises')
  if (data) {
    exercises.value = JSON.parse(data)
  }
  if (exercises.value.length === 0) {
    // abre modal onboarding se não tem exercício
    showOnboarding.value = true
  }
}

function saveToStorage() {
  localStorage.setItem('exercises', JSON.stringify(exercises.value))
}

function addExercise() {
  if (!form.value.name || !form.value.muscle || !form.value.image) return

  exercises.value.push({
    id: generateId(),
    name: form.value.name,
    muscle: form.value.muscle,
    image: form.value.image,
  })

  saveToStorage()

  form.value = { name: '', muscle: '', image: '' }
  showDialog.value = false
}

const onboardingSlides = [
  {
    title: 'Bem-vindo!',
    description: 'Vamos te mostrar como cadastrar um exercício para acompanhar seu treino.',
    image: 'https://cdn-icons-png.flaticon.com/512/709/709496.png',
  },
  {
    title: 'Nome do Exercício',
    description: 'Dê um nome claro e fácil de identificar para o exercício.',
    image: 'https://cdn-icons-png.flaticon.com/512/1256/1256650.png',
  },
  {
    title: 'Músculo Alvo',
    description: 'Selecione o músculo que será trabalhado para organizar melhor seus treinos.',
    image: 'https://cdn-icons-png.flaticon.com/512/616/616408.png',
  },
  {
    title: 'Link da Imagem',
    description:
      'Use um LINK direto para a imagem do exercício (não é upload). Por exemplo, imagens hospedadas na internet.',
    image: 'https://cdn-icons-png.flaticon.com/512/2076/2076655.png',
  },
]

onMounted(loadFromStorage)
</script>
