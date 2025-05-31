<template>
  <q-page class="q-pa-md">
    <q-btn label="Cadastrar Exercício" color="primary" @click="openCreateDialog" class="q-mb-md" />

    <q-list bordered>
      <q-item
        v-for="exercise in exercises"
        :key="exercise.id"
        clickable
        @click="openEditDialog(exercise)"
      >
        <q-item-section avatar>
          <q-avatar square>
            <img :src="exercise.image" alt="imagem" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ exercise.name }}</q-item-label>
          <q-item-label caption>Músculo alvo: {{ exercise.muscle }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn flat icon="delete" color="negative" @click.stop="deleteExercise(exercise.id)" />
        </q-item-section>
      </q-item>
    </q-list>

    <!-- Modal de Cadastro/Edição -->
    <q-dialog v-model="showDialog">
      <q-card style="min-width: 300px">
        <q-card-section>
          <div class="text-h6">{{ isEditing ? 'Editar Exercício' : 'Novo Exercício' }}</div>
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
          <q-btn label="Salvar" color="primary" @click="saveExercise" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Onboarding -->
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
const isEditing = ref(false)
const editingId = ref(null)
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
    showOnboarding.value = true
  }
}

function saveToStorage() {
  localStorage.setItem('exercises', JSON.stringify(exercises.value))
}

function openCreateDialog() {
  isEditing.value = false
  form.value = { name: '', muscle: '', image: '' }
  showDialog.value = true
}

function openEditDialog(exercise) {
  isEditing.value = true
  editingId.value = exercise.id
  form.value = { name: exercise.name, muscle: exercise.muscle, image: exercise.image }
  showDialog.value = true
}

function saveExercise() {
  if (!form.value.name || !form.value.muscle || !form.value.image) return

  if (isEditing.value) {
    const index = exercises.value.findIndex((e) => e.id === editingId.value)
    if (index !== -1) {
      exercises.value[index] = { id: editingId.value, ...form.value }
    }
  } else {
    exercises.value.push({
      id: generateId(),
      name: form.value.name,
      muscle: form.value.muscle,
      image: form.value.image,
    })
  }

  saveToStorage()
  showDialog.value = false
  form.value = { name: '', muscle: '', image: '' }
  editingId.value = null
  isEditing.value = false
}

function deleteExercise(id) {
  exercises.value = exercises.value.filter((e) => e.id !== id)
  saveToStorage()
}

const onboardingSlides = [
  {
    title: 'Bem-vindo!',
    description: 'Vamos te mostrar como cadastrar um exercício para acompanhar seu treino.',
    image: '/logofundo.png',
  },
  {
    title: 'Nome do Exercício',
    description: 'Dê um nome claro e fácil de identificar para o exercício.',
    image: '/peso.png',
  },
  {
    title: 'Músculo Alvo',
    description: 'Selecione o músculo que será trabalhado para organizar melhor seus treinos.',
    image: '/logofundo.png',
  },
  {
    title: 'Link da Imagem',
    description: 'Use um link direto para a imagem do exercício (não é upload).',
    image: '/logofundo.png',
  },
]

onMounted(loadFromStorage)
</script>
