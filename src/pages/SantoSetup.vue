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
  //usar planilhas google para salvar os exercícios https://fitnessprogramer.com/
  const defaultExercises = [
    // Peito (Chest)
    {
      id: 'ex1',
      name: 'Flexão de Braço',
      muscle: 'Peito',
      image: 'https://i.pinimg.com/originals/00/f5/9f/00f59f57546095f6f80697a3ba188304.gif',
    },
    {
      id: 'ex2',
      name: 'Supino Reto com Barra',
      muscle: 'Peito',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/BarbellBenchPress.gif/300px-BarbellBenchPress.gif',
    },
    {
      id: 'ex3',
      name: 'Supino Inclinado com Halteres',
      muscle: 'Peito',
      image:
        'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Incline-Bench-Press.gif',
    },
    {
      id: 'ex4',
      name: 'Crucifixo Reto com Halteres',
      muscle: 'Peito',
      image: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Fly.gif',
    },
    {
      id: 'ex5',
      name: 'Mergulho nas Paralelas (Dips)',
      muscle: 'Peito', // Foco também em Tríceps
      image: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Triceps-Dips.gif',
    },
    {
      id: 'ex6',
      name: 'Crossover (Polia Alta)',
      muscle: 'Peito',
      image: 'https://fitnessprogramer.com/wp-content/uploads/2021/04/Cable-Crossover.gif',
    },

    // Costas (Back)
    {
      id: 'ex7',
      name: 'Barra Fixa (Puxada Pronada)',
      muscle: 'Costas',
      image: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Pull-up.gif',
    },
    {
      id: 'ex8',
      name: 'Remada Curvada com Barra',
      muscle: 'Costas',
      image: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bent-Over-Row.gif',
    },
    {
      id: 'ex9',
      name: 'Remada Cavalinho',
      muscle: 'Costas',
      image: 'https://fitnessprogramer.com/wp-content/uploads/2022/07/T-Bar-Row.gif',
    },
    {
      id: 'ex10',
      name: 'Puxada Alta (Pulley Costas)',
      muscle: 'Costas',
      image: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif',
    },
    {
      id: 'ex11',
      name: 'Remada Unilateral com Halter (Serrote)',
      muscle: 'Costas',
      image: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Row.gif',
    },
    {
      id: 'ex12',
      name: 'Levantamento Terra',
      muscle: 'Costas', // Também Pernas e Core
      image: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Deadlift.gif',
    },

    // Pernas (Legs)
    {
      id: 'ex13',
      name: 'Agachamento Livre com Barra',
      muscle: 'Pernas',
      image: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Squat.gif',
    },
    {
      id: 'ex14',
      name: 'Leg Press 45º',
      muscle: 'Pernas',
      image: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Leg-Press.gif',
    },
    {
      id: 'ex15',
      name: 'Cadeira Extensora',
      muscle: 'Pernas (Quadríceps)',
      image: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Leg-Extension.gif',
    },
    {
      id: 'ex16',
      name: 'Mesa Flexora',
      muscle: 'Pernas (Posteriores)',
      image: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lying-Leg-Curl.gif',
    },
    {
      id: 'ex17',
      name: 'Agachamento Afundo (Avanço)',
      muscle: 'Pernas',
      image: 'https://fitnessprogramer.com/wp-content/uploads/2021/5/Dumbbell-Lunge.gif', // Corrigido '05' para '5' ou manter '05' se o link for esse. Fitnessprogramer costuma não usar zero à esquerda para meses em URLs.
    },
    {
      id: 'ex18',
      name: 'Panturrilha em Pé',
      muscle: 'Pernas (Panturrilhas)',
      image: 'https://fitnessprogramer.com/wp-content/uploads/2021/05/Standing-Calf-Raise.gif',
    },
    {
      id: 'ex19',
      name: 'Stiff com Barra',
      muscle: 'Pernas (Posteriores e Glúteos)',
      image:
        'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Romanian-Deadlift.gif',
    },

    // Ombros (Shoulders)
    {
      id: 'ex20',
      name: 'Desenvolvimento Militar com Barra (Em Pé)',
      muscle: 'Ombros',
      image: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Military-Press.gif',
    },
    {
      id: 'ex21',
      name: 'Desenvolvimento com Halteres (Sentado)',
      muscle: 'Ombros',
      image: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Shoulder-Press.gif',
    },
    {
      id: 'ex22',
      name: 'Elevação Lateral com Halteres',
      muscle: 'Ombros',
      image: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lateral-Raise.gif',
    },
    {
      id: 'ex23',
      name: 'Elevação Frontal com Halteres',
      muscle: 'Ombros',
      image: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Front-Raise.gif',
    },
    {
      id: 'ex24',
      name: 'Remada Alta com Barra',
      muscle: 'Ombros', // Também Trapézio
      image: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Upright-Row.gif',
    },

    // Bíceps
    {
      id: 'ex25',
      name: 'Rosca Direta com Barra',
      muscle: 'Bíceps',
      image: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bicep-Curl.gif',
    },
    {
      id: 'ex26',
      name: 'Rosca Alternada com Halteres',
      muscle: 'Bíceps',
      image:
        'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Alternate-Bicep-Curl.gif',
    },
    {
      id: 'ex27',
      name: 'Rosca Concentrada com Halter',
      muscle: 'Bíceps',
      image:
        'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Concentration-Curl.gif',
    },
    {
      id: 'ex28',
      name: 'Rosca Martelo com Halteres',
      muscle: 'Bíceps', // Também Antebraço
      image: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Hammer-Curl.gif',
    },

    // Tríceps
    {
      id: 'ex29',
      name: 'Tríceps Testa com Barra',
      muscle: 'Tríceps',
      image:
        'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Lying-Triceps-Extension.gif',
    },
    {
      id: 'ex30',
      name: 'Tríceps Pulley (Barra Reta ou Corda)',
      muscle: 'Tríceps',
      image: 'https://fitnessprogramer.com/wp-content/uploads/2021/05/Cable-Pushdown.gif',
    },
    {
      id: 'ex31',
      name: 'Tríceps Francês com Halter (Unilateral ou Bilateral)',
      muscle: 'Tríceps',
      image:
        'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Overhead-Triceps-Extension.gif',
    },
    {
      id: 'ex32',
      name: 'Mergulho no Banco (Triceps Dip on Bench)',
      muscle: 'Tríceps',
      image: 'https://fitnessprogramer.com/wp-content/uploads/2021/06/Bench-Dips.gif',
    },

    // Core (Abdômen e Lombar)
    {
      id: 'ex33',
      name: 'Prancha Abdominal',
      muscle: 'Core',
      image: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Plank.gif',
    },
    {
      id: 'ex34',
      name: 'Abdominal Supra (Crunch)',
      muscle: 'Core (Abdômen Superior)',
      image: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Crunch.gif',
    },
    {
      id: 'ex35',
      name: 'Abdominal Infra (Elevação de Pernas)',
      muscle: 'Core (Abdômen Inferior)',
      image: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lying-Leg-Raise.gif',
    },
    {
      id: 'ex36',
      name: 'Prancha Lateral',
      muscle: 'Core (Oblíquos)',
      image: 'https://fitnessprogramer.com/wp-content/uploads/2021/05/Side-Plank.gif',
    },
    {
      id: 'ex37',
      name: 'Rotação Russa (Russian Twist)',
      muscle: 'Core (Oblíquos)',
      image: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Russian-Twist.gif',
    },
    {
      id: 'ex38',
      name: 'Hiperextensão Lombar (Superman)',
      muscle: 'Core (Lombar)',
      image: 'https://fitnessprogramer.com/wp-content/uploads/2021/08/Superman-exercise.gif',
    },

    // Antebraços (Forearms)
    {
      id: 'ex39',
      name: 'Rosca Punho (Palmas para Cima)',
      muscle: 'Antebraço',
      image: 'https://fitnessprogramer.com/wp-content/uploads/2021/06/Dumbbell-Wrist-Curl.gif',
    },
    {
      id: 'ex40',
      name: 'Rosca Punho Inversa (Palmas para Baixo)',
      muscle: 'Antebraço',
      image:
        'https://fitnessprogramer.com/wp-content/uploads/2021/06/Dumbbell-Reverse-Wrist-Curl.gif',
    },
    // Mais alguns exemplos gerais
    {
      id: 'ex41',
      name: 'Burpee',
      muscle: 'Corpo Inteiro',
      image: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Burpee.gif',
    },
    {
      id: 'ex42',
      name: 'Polichinelo (Jumping Jack)',
      muscle: 'Corpo Inteiro',
      image: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Jumping_Jacks.gif',
    },
    {
      id: 'ex43',
      name: 'Mountain Climber',
      muscle: 'Core', // Também Cardiovascular
      image: 'https://fitnessprogramer.com/wp-content/uploads/2021/08/Mountain-Climbers.gif',
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
