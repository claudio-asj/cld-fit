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
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showDialog = ref(false)

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

onMounted(loadFromStorage)
</script>
