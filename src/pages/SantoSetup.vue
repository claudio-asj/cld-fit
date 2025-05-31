<template>
  <q-page class="q-pa-lg">
    <div class="text-center">
      <q-icon name="fitness_center" size="64px" color="primary" class="q-mb-md" />
      <h1 class="text-h5 q-mb-sm">Santo Setup 🙏</h1>
      <p class="text-subtitle2 q-mb-lg">
        Clique no botão abaixo para abençoar seu treino com os exercícios sagrados do CLDfit.
        <br />
        <span class="text-body1 text-red-8 text-bold"
          >100 exercícios serão adicionados ao seu arsenal de treinos.</span
        >
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

      <div v-if="exercises.length" class="q-mt-xl row">
        <q-card
          v-for="exercise in exercises"
          :key="exercise.id"
          class="my-card col-12 col-md-6 col-lg-4"
        >
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
    {
      id: 'ex1',
      name: 'Flexão de Braço',
      muscle: 'Peito',
      image: 'https://www.mundoboaforma.com.br/wp-content/uploads/2021/04/flexao-de-bracos.gif',
    },
    {
      id: 'ex2',
      name: 'Supino Reto',
      muscle: 'Peito',
      image: 'https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/supino-reto.gif',
    },
    {
      id: 'ex3',
      name: 'Supino Inclinado',
      muscle: 'Peito',
      image:
        'https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/supino-inclinado-com-barra.gif',
    },
    {
      id: 'ex4',
      name: 'Supino Declinado',
      muscle: 'Peito',
      image: 'https://static.wixstatic.com/media/2edbed_720e6baee3934e61a44324fb2151574d~mv2.gif',
    },
    {
      id: 'ex5',
      name: 'Crucifixo Reto',
      muscle: 'Peito',
      image:
        'https://www.mundoboaforma.com.br/wp-content/uploads/2019/11/03081301-crucifixo-com-halteres.gif',
    },
    {
      id: 'ex6',
      name: 'Crucifixo Inclinado',
      muscle: 'Peito',
      image: 'https://cdn-icons-png.flaticon.com/512/3179/3179066.png',
    },
    {
      id: 'ex7',
      name: 'Crucifixo Declinado',
      muscle: 'Peito',
      image: 'https://www.hipertrofia.org/blog/wp-content/uploads/2024/07/dumbbell-decline-fly.gif',
    },
    {
      id: 'ex8',
      name: 'Cross-over (cabo)',
      muscle: 'Peito',
      image: 'https://meutreinador.com/wp-content/uploads/2024/04/Crossover-polia-alta.gif',
    },
    {
      id: 'ex9',
      name: 'Paralela (Mergulho)',
      muscle: 'Tríceps',
      image: 'https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/paralelas.gif',
    },
    {
      id: 'ex10',
      name: 'Flexão com Apoio de Joelhos',
      muscle: 'Peito',
      image: 'https://www.saberviver.pt/wp-content/uploads/2020/03/pushups.gif',
    },
    {
      id: 'ex11',
      name: 'Remada Curvada com Barra',
      muscle: 'Costas',
      image:
        'https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/costas-remada-curvada-com-pegada-invertida.gif',
    },
    {
      id: 'ex12',
      name: 'Remada Unilateral com Halteres',
      muscle: 'Costas',
      image: 'https://static.wixstatic.com/media/2edbed_cf8feb6f79494833b887104bc358843d~mv2.gif',
    },
    {
      id: 'ex13',
      name: 'Puxada Frontal no Pulley',
      muscle: 'Costas',
      image:
        'https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/costas-puxada-aberta-com-barra-no-pulley.gif',
    },
    {
      id: 'ex14',
      name: 'Levantamento Terra',
      muscle: 'Costas/Pernas',
      image: 'https://www.hipertrofia.org/blog/wp-content/uploads/2017/11/barbell-deadlift.gif',
    },
    {
      id: 'ex15',
      name: 'Rosca Direta com Barra',
      muscle: 'Bíceps',
      image:
        'https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/rosca-biceps-direta-na-barra-ez.gif',
    },
    {
      id: 'ex16',
      name: 'Rosca Alternada com Halteres',
      muscle: 'Bíceps',
      image:
        'https://www.treinoemalta.com.br/wp-content/uploads/2023/07/Rosca-Alternada-com-Halteres.gif',
    },
    {
      id: 'ex17',
      name: 'Rosca Martelo',
      muscle: 'Bíceps',
      image: 'https://static.wixstatic.com/media/2edbed_1d007cb76aa74ce48c485601497ac995~mv2.gif',
    },
    {
      id: 'ex18',
      name: 'Rosca Scott',
      muscle: 'Bíceps',
      image:
        'https://www.mundoboaforma.com.br/wp-content/uploads/2020/11/Rosca-Scott-com-halteres-com-dois-bracos.gif',
    },
    {
      id: 'ex19',
      name: 'Tríceps Testa com Barra',
      muscle: 'Tríceps',
      image:
        'https://www.mundoboaforma.com.br/wp-content/uploads/2021/03/rosca-triceps-testa-deitado-no-banco-com-barra-tradicional.gif',
    },
    {
      id: 'ex20',
      name: 'Tríceps Corda no Pulley',
      muscle: 'Tríceps',
      image:
        'https://www.mundoboaforma.com.br/wp-content/uploads/2021/07/triceps-puxada-no-pulley-com-corda.gif',
    },
    {
      id: 'ex21',
      name: 'Tríceps Barra no Pulley',
      muscle: 'Tríceps',
      image: 'https://static.wixstatic.com/media/2edbed_e0caf218d1a446368fea3ae11102b5ef~mv2.gif',
    },
    {
      id: 'ex22',
      name: 'Agachamento Livre',
      muscle: 'Pernas',
      image:
        'https://www.mundoboaforma.com.br/wp-content/uploads/2020/11/agachamento-com-barra.gif',
    },
    {
      id: 'ex23',
      name: 'Leg Press',
      muscle: 'Pernas',
      image:
        'https://lh5.googleusercontent.com/proxy/XiXoDIBCq2JIsdjmLIriIRgOwOjx-vAHYDmso4pDe1aOp0SXhUa3iow-JAn54pAdHDEPikUM6up1gqIzNDacqWBXn4E6KjiXWORICJT4Y9M',
    },
    {
      id: 'ex24',
      name: 'Cadeira Extensora',
      muscle: 'Pernas',
      image: 'https://karoldeliberato.com.br/wp-content/uploads/2023/04/image4-1.gif',
    },
    {
      id: 'ex25',
      name: 'Cadeira Flexora',
      muscle: 'Pernas',
      image: 'https://www.hipertrofia.org/blog/wp-content/uploads/2024/12/cadeira-flexora.gif',
    },
    {
      id: 'ex26',
      name: 'Cadeira Abdutora',
      muscle: 'Pernas',
      image: 'https://static.wixstatic.com/media/2edbed_a57ba733e4d54923850db3c7d81b3f07~mv2.gif',
    },
    {
      id: 'ex27',
      name: 'Cadeira Adutora',
      muscle: 'Pernas',
      image:
        'https://www.mundoboaforma.com.br/wp-content/uploads/2021/04/pernas-aducao-de-pernas-na-maquina.gif',
    },
    {
      id: 'ex28',
      name: 'Panturrilha em Pé',
      muscle: 'Panturrilha',
      image:
        'https://www.mundoboaforma.com.br/wp-content/uploads/2021/03/Elevacao-de-panturrilha-em-pe.gif',
    },
    {
      id: 'ex29',
      name: 'Panturrilha Sentado',
      muscle: 'Panturrilha',
      image:
        'https://www.hipertrofia.org/blog/wp-content/uploads/2018/10/lever-seated-calf-raise-.gif',
    },
    {
      id: 'ex30',
      name: 'Desenvolvimento com Barra',
      muscle: 'Ombros',
      image:
        'https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/ombros-desenvolvimento-de-ombros-frontal-com-barra.gif',
    },
    {
      id: 'ex31',
      name: 'Desenvolvimento com Halteres',
      muscle: 'Ombros',
      image:
        'https://www.treinoemalta.com.br/wp-content/uploads/2023/07/Desenvolvimento-com-Halteres-H.gif',
    },
    {
      id: 'ex32',
      name: 'Elevação Lateral com Halteres',
      muscle: 'Ombros',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoUP0Sn5_Ky7zT3eSP7aR67OsOFO4N63oEZg&s',
    },
    {
      id: 'ex33',
      name: 'Elevação Frontal com Halteres',
      muscle: 'Ombros',
      image: 'https://www.hipertrofia.org/blog/wp-content/uploads/2023/11/dumbbell-front-raise.gif',
    },
    {
      id: 'ex34',
      name: 'Remada Alta com Barra',
      muscle: 'Ombros',
      image:
        'https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/ombros-remada-alta-em-pe-com-halteres.gif',
    },
    {
      id: 'ex35',
      name: 'Crucifixo Invertido com Halteres',
      muscle: 'Ombros',
      image: 'https://www.hipertrofia.org/blog/wp-content/uploads/2023/11/dumbbell-reverse-fly.gif',
    },
    {
      id: 'ex36',
      name: 'Arremesso com Medicine Ball',
      muscle: 'Ombros',
      image:
        'https://static.vecteezy.com/ti/vetor-gratis/p1/8635574-mulher-fazendo-medicina-arremesso-bola-exercicio-ilustracao-plana-isolada-em-fundo-branco-treino-conjunto-de-caracteres-vetor.jpg',
    },
    {
      id: 'ex37',
      name: 'Abdominal Supra',
      muscle: 'Abdômen',
      image:
        'https://www.mundoboaforma.com.br/wp-content/uploads/2023/02/47271301-abdominal-supra.gif',
    },
    {
      id: 'ex38',
      name: 'Abdominal Infra',
      muscle: 'Abdômen',
      image: 'https://grandeatleta.com.br/wp-content/uploads/2024/03/Abdominal-infra-solo.gif',
    },
    {
      id: 'ex39',
      name: 'Prancha',
      muscle: 'Core',
      image:
        'https://pratiquefitness.com.br/blog/wp-content/uploads/2023/07/Por-quanto-tempo-e-necessario-permanecer-na-posicao-da-prancha-existe-um-periodo-ideal-2.jpg',
    },
    {
      id: 'ex40',
      name: 'Elevação de Pernas',
      muscle: 'Abdômen',
      image: 'https://i.makeagif.com/media/3-11-2021/Oi7RXf.gif',
    },
    {
      id: 'ex41',
      name: 'Abdominal Oblíquo',
      muscle: 'Abdômen',
      image:
        'https://www.mundoboaforma.com.br/wp-content/uploads/2021/03/abdominal-alternado-no-chao.gif',
    },
    {
      id: 'ex42',
      name: 'Pullover com Halteres',
      muscle: 'Peito/Costas',
      image:
        'https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/04331301-Dumbbell-Straight-Arm-Pullover_Chest-FIX_360_logo.gif',
    },
    {
      id: 'ex43',
      name: 'Stiff',
      muscle: 'Pernas/Costas',
      image:
        'https://www.mundoboaforma.com.br/wp-content/uploads/2021/09/levantamento-terra-deadlift-stiff-com-halteres-1.gif',
    },
    {
      id: 'ex44',
      name: 'Avanço (Passada)',
      muscle: 'Pernas',
      image: 'https://www.mundoboaforma.com.br/wp-content/uploads/2020/11/avanco-com-halteras.gif',
    },
    {
      id: 'ex45',
      name: 'Panturrilha no Leg Press',
      muscle: 'Panturrilha',
      image: 'https://i.pinimg.com/originals/28/71/f1/2871f10fe6278aa6e97e134a07faad57.gif',
    },
    {
      id: 'ex46',
      name: 'Rosca Concentrada',
      muscle: 'Bíceps',
      image: 'https://static.wixstatic.com/media/2edbed_796d605902f5410db0fc7a4263db4098~mv2.gif',
    },
    {
      id: 'ex47',
      name: 'Tríceps Francês com Halteres',
      muscle: 'Tríceps',
      image:
        'https://www.hipertrofia.org/blog/wp-content/uploads/2018/07/triceps-frances-unilateral.gif',
    },
    {
      id: 'ex48',
      name: 'Remada Sentada no Pulley',
      muscle: 'Costas',
      image:
        'https://www.mundoboaforma.com.br/wp-content/uploads/2021/09/remada-sentado-com-cabos-e-triangulo-para-costas.gif',
    },
    {
      id: 'ex49',
      name: 'Barra Fixa',
      muscle: 'Costas/Braços',
      image:
        'https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/costas-barra-fixa-pegada-aberta-palma-para-frente-chinup.gif',
    },
    {
      id: 'ex51',
      name: 'Glúteo 4 apoios',
      muscle: 'Glúteos',
      image:
        'https://www.mundoboaforma.com.br/wp-content/uploads/2021/09/quatro-apoios-com-elevacao-da-perna.gif',
    },
    {
      id: 'ex52',
      name: 'Abdução de Quadril em Pé',
      muscle: 'Glúteos',
      image: 'https://karoldeliberato.com.br/wp-content/uploads/2023/04/image152.gif',
    },
    {
      id: 'ex53',
      name: 'Elevação de Quadril (Hip Thrust)',
      muscle: 'Glúteos',
      image: 'https://static.wixstatic.com/media/2edbed_852ea3938607497aa100eb79e600e11a~mv2.gif',
    },
    {
      id: 'ex54',
      name: 'Prancha Lateral',
      muscle: 'Core',
      image: 'https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/prancha-lateral.gif',
    },
    {
      id: 'ex55',
      name: 'Mountain Climber',
      muscle: 'Core/Cardio',
      image: 'https://i.pinimg.com/originals/fb/fa/09/fbfa0902f381a5735972c21255935aff.gif',
    },
    {
      id: 'ex56',
      name: 'Burpee',
      muscle: 'Corpo Inteiro',
      image:
        'https://i0.wp.com/joshuaspodek.com/wp-content/uploads/2016/07/burpee.gif?resize=640%2C425&ssl=1',
    },
    {
      id: 'ex57',
      name: 'Kettlebell Swing',
      muscle: 'Corpo Inteiro',
      image: 'https://homeworkouts.org/wp-content/uploads/anim-kettlebell-swings.gif',
    },
    {
      id: 'ex58',
      name: 'Puxada na Barra Fixa com Pegada Supinada',
      muscle: 'Costas/Bíceps',
      image:
        'https://www.mundoboaforma.com.br/wp-content/uploads/2016/08/costas-barra-fixa-fechada-chinup.gif',
    },
    {
      id: 'ex59',
      name: 'Extensão Lombar',
      muscle: 'Costas Inferiores',
      image:
        'https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/extensao-lombar-de-brucos.gif',
    },
    {
      id: 'ex60',
      name: 'Agachamento Frontal',
      muscle: 'Pernas',
      image:
        'https://blogdahipertrofia.com/wp-content/uploads/2022/05/agachamento-livre-com-barra.gif',
    },
    {
      id: 'ex61',
      name: 'Agachamento Búlgaro',
      muscle: 'Pernas',
      image: 'https://www.hipertrofia.org/blog/wp-content/uploads/2024/06/agachamento-bulgaro.gif',
    },
    {
      id: 'ex62',
      name: 'Abdominal na Bola Suíça',
      muscle: 'Abdômen',
      image:
        'https://www.mundoboaforma.com.br/wp-content/uploads/2021/03/abdominal-padrao-na-bola-de-estabilizacao.gif',
    },
    {
      id: 'ex63',
      name: 'Prancha com Toque no Ombro',
      muscle: 'Core',
      image:
        'https://alcateiademonstros.com.br/wp-content/uploads/2024/08/7.-Prancha-com-Toque-no-Ombro_.gif',
    },
    {
      id: 'ex64',
      name: 'Elevação de Pernas na Barra Fixa',
      muscle: 'Abdômen',
      image: 'https://www.mundoboaforma.com.br/wp-content/uploads/2021/04/abdominal-na-barra.gif',
    },
    {
      id: 'ex65',
      name: 'Elevação de Ombros com Halteres',
      muscle: 'Trapézio',
      image:
        'https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/ombros-elevacao-lateral-de-ombros-com-halteres.gif',
    },
    {
      id: 'ex66',
      name: 'Face Pull',
      muscle: 'Ombros',
      image: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Face-Pull.gif',
    },
    {
      id: 'ex67',
      name: 'Agachamento Sumô com Halteres',
      muscle: 'Pernas/Glúteos',
      image:
        'https://www.mundoboaforma.com.br/wp-content/uploads/2021/09/agachamento-sumo-com-halter.gif',
    },
    {
      id: 'ex68',
      name: 'Ponte para Glúteos',
      muscle: 'Glúteos',
      image:
        'https://www.mundoboaforma.com.br/wp-content/uploads/2021/04/ponte-para-os-gluteos-com-elastico-nas-pernas.gif',
    },
    {
      id: 'ex69',
      name: 'Puxada na Barra Fixa com Pegada Pronada',
      muscle: 'Costas',
      image:
        'https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/costas-barra-fixa-pegada-aberta-palma-para-frente-chinup.gif',
    },
    {
      id: 'ex70',
      name: 'Abdominal Bicicleta',
      muscle: 'Abdômen',
      image:
        'https://www.mundoboaforma.com.br/wp-content/uploads/2021/03/abdominal-bicicleta-no-ar.gif',
    },
    {
      id: 'ex71',
      name: 'Puxada para Tríceps no Pulley',
      muscle: 'Tríceps',
      image:
        'https://www.mundoboaforma.com.br/wp-content/uploads/2021/07/triceps-puxada-no-pulley-com-corda.gif',
    },
    {
      id: 'ex72',
      name: 'Stiff com Halteres',
      muscle: 'Pernas/Costas',
      image:
        'https://www.mundoboaforma.com.br/wp-content/uploads/2021/09/levantamento-terra-deadlift-stiff-com-halteres-1.gif',
    },
    {
      id: 'ex73',
      name: 'Rosca Inversa com Barra',
      muscle: 'Bíceps/Antebraço',
      image:
        'https://i0.wp.com/omelhortreino.com.br/wp-content/uploads/2025/04/Rosca-Inversa.gif?resize=550%2C550&ssl=1',
    },
    {
      id: 'ex74',
      name: 'Rosca Punho',
      muscle: 'Antebraço',
      image: 'https://www.hipertrofia.org/blog/wp-content/uploads/2018/10/barbell-wrist-curl.gif',
    },
    {
      id: 'ex75',
      name: 'Barra Paralela para Tríceps',
      muscle: 'Tríceps',
      image: 'https://static.wixstatic.com/media/2edbed_45827997d7244f7ca6f4d10aae170e74~mv2.gif',
    },
    {
      id: 'ex76',
      name: 'Abdominal V-Up',
      muscle: 'Abdômen',
      image:
        'https://newlife.com.cy/wp-content/uploads/2019/11/05071301-Jackknife-Sit-Up_waist_360.gif',
    },
    {
      id: 'ex77',
      name: 'Levantamento de Peso Olímpico (Clean & Jerk)',
      muscle: 'Corpo Inteiro',
      image:
        'https://lh7-us.googleusercontent.com/Xip91Ua3QavLAXUAfB2hHl6aECmJzsgsILmyzlcZOKESlRXw-fYRBXnmhS4nLiIBnhZoHWWnVJ3-viCTx4DQJdtm3d_sVnHJuKLgNnbRkztFkGYnCVXMaH4trOcVx3-mOf1xEGM4DhFPqA3aVFuHHfg',
    },
    {
      id: 'ex78',
      name: 'Snatch',
      muscle: 'Corpo Inteiro',
      image: 'https://www.inspireusafoundation.org/wp-content/uploads/2022/07/barbell-snatch.gif',
    },
    {
      id: 'ex80',
      name: 'Agachamento com Salto',
      muscle: 'Pernas/Explosão',
      image:
        'https://www.mundoboaforma.com.br/wp-content/uploads/2021/11/agachamento-com-salto-tradicional.gif',
    },
    {
      id: 'ex81',
      name: 'Elevação Lateral no Cabo',
      muscle: 'Ombros',
      image:
        'https://www.treinoemalta.com.br/wp-content/uploads/2023/07/Elevacao-Unilateral-na-Polia.gif',
    },
    {
      id: 'ex82',
      name: 'Tríceps Testa com Halteres',
      muscle: 'Tríceps',
      image:
        'https://www.hipertrofia.org/blog/wp-content/uploads/2023/10/dumbbell-lying-triceps-extension.gif',
    },
    {
      id: 'ex83',
      name: 'Remada Curvada com Halteres',
      muscle: 'Costas',
      image:
        'https://www.hipertrofia.org/blog/wp-content/uploads/2023/11/dumbbell-bent-over-row.gif',
    },
    {
      id: 'ex84',
      name: 'Puxada Pulldown com Pegada Neutra',
      muscle: 'Costas',
      image: 'https://www.hipertrofia.org/blog/wp-content/uploads/2025/02/puxada-neutra.gif',
    },
    {
      id: 'ex85',
      name: 'Afundo',
      muscle: 'Pernas',
      image: 'https://www.hipertrofia.org/blog/wp-content/uploads/2024/09/Static-Lunge.gif',
    },
    {
      id: 'ex86',
      name: 'Abdominal na Prancha Inclinada',
      muscle: 'Abdômen',
      image:
        'https://cdn.fisiculturismo.com.br/monthly_2020_04/flexao-de-tronco-na-prancha-declinada-animacao.gif.a9a085194fbf1c41570ba8f769c7882e.gif',
    },
    {
      id: 'ex87',
      name: 'Rosca 21',
      muscle: 'Bíceps',
      image: 'https://static.wixstatic.com/media/2edbed_e513be8ffeef4d05b30c47b2563a729f~mv2.gif',
    },
    {
      id: 'ex89',
      name: 'Agachamento Isométrico na Parede',
      muscle: 'Pernas',
      image:
        'https://cdn.atletis.com.br/atletis-website/base/c17/fd9/bce/agachamento-isometrico.jpg',
    },
    {
      id: 'ex90',
      name: 'Ponte Isométrica para Glúteos',
      muscle: 'Glúteos',
      image: 'https://www.mundoboaforma.com.br/wp-content/uploads/2022/09/ponte-para-gluteos.jpg',
    },
    {
      id: 'ex91',
      name: 'Saltos Laterais',
      muscle: 'Cardio/Pernas',
      image: 'https://www.hipertrofia.org/blog/wp-content/uploads/2024/10/salto-lateral.gif',
    },
    {
      id: 'ex92',
      name: 'Elevação de Pernas Suspensa',
      muscle: 'Abdômen',
      image:
        'https://www.hipertrofia.org/blog/wp-content/uploads/2017/09/captains-chair-straight-leg-raise.gif',
    },
    {
      id: 'ex93',
      name: 'Levantamento Terra Romeno',
      muscle: 'Pernas/Costas',
      image:
        'https://www.hipertrofia.org/blog/wp-content/uploads/2024/07/Barbell-Romanian-Deadlift.gif',
    },
    {
      id: 'ex94',
      name: 'Flexão de Braço com Pés Elevados',
      muscle: 'Peito',
      image: 'https://www.hipertrofia.org/blog/wp-content/uploads/2019/12/decline-pushup.gif',
    },
    {
      id: 'ex96',
      name: 'Remada Cavalinho',
      muscle: 'Costas',
      image:
        'https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/costas-remada-em-pe-com-barra-T.gif',
    },
    {
      id: 'ex97',
      name: 'Extensão de Tríceps no Banco',
      muscle: 'Tríceps',
      image: 'https://www.mundoboaforma.com.br/wp-content/uploads/2021/04/triceps-no-banco.gif',
    },
    {
      id: 'ex98',
      name: 'Abdominal Oblíquo com Halteres',
      muscle: 'Abdômen',
      image:
        'https://www.mundoboaforma.com.br/wp-content/uploads/2021/09/abdominal-em-pe-com-inclinacao-lateral-e-halter.gif',
    },
    {
      id: 'ex99',
      name: 'Agachamento com Halteres',
      muscle: 'Pernas',
      image:
        'https://www.mundoboaforma.com.br/wp-content/uploads/2021/09/agachamento-com-halteres.gif',
    },
    {
      id: 'ex100',
      name: 'Pistol Squat',
      muscle: 'Pernas/Equilíbrio',
      image: 'https://static.wixstatic.com/media/2edbed_479dfeae9bf34f3fb4f84d29cae6a7cf~mv2.gif',
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
