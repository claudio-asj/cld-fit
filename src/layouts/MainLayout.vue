<template>
  <q-layout view="lHh Lpr lFf" :class="$q.dark.isActive ? 'bg-dark' : 'bg-grey-1'">
    <q-header>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>CLDfit</q-toolbar-title>

        <div v-if="username" class="q-mr-md">
          Olá, <strong>{{ username }}</strong>
        </div>

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
        <q-item-label header class="text-h6 q-mb-md"> Menu CLDfit </q-item-label>

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

        <q-separator class="q-my-md" />

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

    <q-footer
      class="text-white q-pa-md"
      style="background: linear-gradient(135deg, #ff9ff3, #70a1ff)"
    >
      <div class="text-center">
        <div class="text-subtitle2 q-mb-sm">
          Desenvolvido com <span class="text-bold">💙</span> por <strong>ClaudioJr</strong>
        </div>
        <div class="row justify-center q-gutter-sm">
          <q-btn
            flat
            rounded
            dense
            icon="code"
            label="GitHub"
            color="white"
            text-color="black"
            href="https://github.com/claudio-asj"
            target="_blank"
          />
          <q-btn
            flat
            rounded
            dense
            icon="business"
            label="LinkedIn"
            color="white"
            text-color="black"
            href="https://linkedin.com/in/claudio-junior-537319162"
            target="_blank"
          />
          <q-btn
            flat
            rounded
            dense
            icon="photo_camera"
            label="Instagram"
            color="white"
            text-color="black"
            href="https://instagram.com/claudio_almeida"
            target="_blank"
          />
        </div>
      </div>
    </q-footer>
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

onMounted(() => {
  const savedUser = localStorage.getItem('username')
  if (savedUser) {
    username.value = savedUser
  }
  santinho.value = localStorage.getItem('santoSetupDone') === 'true'
})
</script>
