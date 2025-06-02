<template>
  <q-layout view="lHh Lpr lFf" :class="$q.dark.isActive ? 'bg-dark' : 'bg-grey-1'">
    <q-header>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <div header class="text-h6 q-mb-none text-white">
            <q-img src="/logo.png" alt="Logo imagem" width="40px" />
            CLDfit
          </div>
        </q-toolbar-title>

        <q-btn
          dense
          flat
          round
          :icon="$q.dark.isActive ? 'brightness_7' : 'brightness_4'"
          @click="toggleDarkMode"
          aria-label="Toggle dark mode"
          class="q-mr-md"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list padding>
        <q-item-label header class="text-h6 text-primary q-mb-md">
          <div v-if="username" class="q-mr-md">
            👋 Olá, <strong>{{ username }}</strong>
          </div></q-item-label
        >

        <q-item clickable v-ripple @click="goTo('index')">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section> Início </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goTo('exercicio')">
          <q-item-section avatar>
            <q-icon name="fitness_center" />
          </q-item-section>
          <q-item-section> Exercícios </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goTo('serie')">
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section> Séries </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goTo('santinho')" v-if="!santinho">
          <q-item-section avatar>
            <q-icon name="auto_fix_high" />
          </q-item-section>
          <q-item-section> Santinho </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goTo('treino')">
          <q-item-section avatar>
            <q-icon name="photo_camera" />
          </q-item-section>
          <q-item-section> Registrar Treino </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goTo('avaliacao')">
          <q-item-section avatar>
            <q-icon name="straighten" />
          </q-item-section>
          <q-item-section> Avaliações </q-item-section>
        </q-item>

        <q-separator class="q-my-md" />

        <q-item clickable v-ripple v-if="canInstall" @click="installPWA">
          <q-item-section avatar>
            <q-icon name="download" />
          </q-item-section>
          <q-item-section> Instalar o aplicativo </q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="logout">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section> Sair </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <!-- FOOTER -->
    <q-footer class="text-white" style="background: linear-gradient(135deg, #ff9ff3, #70a1ff)">
      <div class="text-center">
        <div class="text-subtitle">
          Desenvolvido com <span class="text-bold">💙</span> por
          <q-btn
            flat
            dense
            no-caps=""
            @click="showAboutDialog = true"
            class="text-white text-weight-bold"
          >
            ClaudioJr
          </q-btn>
        </div>
        <q-btn
          unelevated
          flat
          icon="share"
          label="Compartilhar"
          text-color="primary"
          @click="shareApp"
        />
      </div>
    </q-footer>

    <!-- MODAL -->
    <q-dialog v-model="showAboutDialog">
      <q-card style="max-width: 400px; width: 90vw">
        <q-card-section class="row items-center q-pb-none">
          <q-avatar size="80px" class="q-mr-md">
            <img src="/claudio.png" alt="Claudio Jr" />
          </q-avatar>
          <div>
            <div class="text-primary text-bold" style="font-size: 32px">Claudio Jr</div>
            <div class="text-subtitle">Desenvolvedor do CLDfit</div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none q-mt-lg">
          <div class="row justify-center q-gutter-sm">
            <q-btn
              flat
              rounded
              dense
              icon="code"
              label="GitHub"
              color="primary"
              href="https://github.com/claudio-asj"
              target="_blank"
            />
            <q-btn
              flat
              rounded
              dense
              icon="business"
              label="LinkedIn"
              color="primary"
              href="https://linkedin.com/in/claudio-junior-537319162"
              target="_blank"
            />
            <q-btn
              flat
              rounded
              dense
              icon="photo_camera"
              label="Instagram"
              color="primary"
              href="https://instagram.com/claudio_almeida"
              target="_blank"
            />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat icon="close" label="Fechar" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const router = useRouter()

const leftDrawerOpen = ref(false)
const username = ref('')
const santinho = ref(1)
const deferredPrompt = ref(null)
const canInstall = ref(false)
const showAboutDialog = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function toggleDarkMode() {
  $q.dark.toggle()
}

function goTo(routeName) {
  router.push({ name: routeName })
  leftDrawerOpen.value = false
}

function logout() {
  localStorage.removeItem('username')
  localStorage.removeItem('exercises')
  localStorage.removeItem('series')
  localStorage.removeItem('santoSetupDone')
  username.value = ''
  router.replace({ name: 'login' })
}

const installPWA = async () => {
  if (!deferredPrompt.value) return

  const promptEvent = deferredPrompt.value
  promptEvent.prompt()

  const choiceResult = await promptEvent.userChoice
  if (choiceResult.outcome === 'accepted') {
    console.log('Usuário aceitou instalar o PWA')
  } else {
    console.log('Usuário recusou instalar o PWA')
  }

  deferredPrompt.value = null
  canInstall.value = false
}

const shareApp = async () => {
  try {
    if (navigator.share) {
      await navigator.share({
        title: 'CLDfit',
        text: 'Confira o app de treino CLDfit!',
        url: 'https://cld-fit.vercel.app',
      })
    } else {
      $q.notify({
        type: 'warning',
        message: 'Compartilhamento não suportado neste dispositivo.',
      })
    }
  } catch (err) {
    console.error('Erro ao compartilhar:', err)
    $q.notify({ type: 'negative', message: 'Erro ao compartilhar' })
  }
}

onMounted(() => {
  const savedUser = localStorage.getItem('username')
  if (savedUser) {
    username.value = savedUser
  }

  santinho.value = localStorage.getItem('santoSetupDone') === 'true'

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt.value = e
    canInstall.value = true
    console.log('beforeinstallprompt disparado e armazenado.')
  })
})
</script>
