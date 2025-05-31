<template>
  <div class="fullscreen bg-gradient flex flex-center">
    <div
      class="column items-center q-pa-xl q-ma-md shadow-3 rounded-borders animated-card"
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-white'"
      style="max-width: 420px; width: 100%"
    >
      <q-img src="/logo.png" style="width: 100%" />

      <h1 class="text-h5 text-center q-mb-sm">Olá! 👋</h1>
      <h2 class="text-subtitle1 text-center text-grey-8 q-mb-lg">
        Me conta seu nome pra gente começar!
      </h2>

      <q-input
        v-model="username"
        label="Seu nome"
        outlined
        rounded
        autofocus
        class="q-mb-md full-width"
        @keyup.enter="login"
      />

      <q-btn
        label="Bora Treinar! 💪"
        color="primary"
        class="full-width q-mb-sm"
        unelevated
        rounded
        @click="login"
      />
    </div>

    <!-- Banner estilo cookie -->
    <transition name="slide-up">
      <q-banner
        v-if="showBanner"
        class="cookie-banner bg-primary text-white text-body2"
        dense
        inline-actions
        icon="privacy_tip"
      >
        Seus dados ficam só no seu dispositivo. Sem servidores, sem espiões! 😎
        <template v-slot:action>
          <q-btn flat round icon="close" @click="showBanner = false" />
        </template>
      </q-banner>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const router = useRouter()
const username = ref('')
const showBanner = ref(false)

onMounted(() => {
  const savedUser = localStorage.getItem('username')
  if (savedUser) {
    router.replace('/menu')
  }

  // Mostra o banner após 1.5 segundos
  setTimeout(() => {
    showBanner.value = true
  }, 1500)
})

function login() {
  if (!username.value.trim()) {
    $q.notify({
      type: 'negative',
      message: 'Por favor, insira seu nome pra começar.',
    })
    return
  }
  localStorage.setItem('username', username.value.trim())
  router.replace('/menu')
}
</script>

<style scoped>
.bg-gradient {
  background: linear-gradient(135deg, #ff9ff3, #70a1ff);
}

.animated-card {
  animation: fadeInUp 0.6s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.cookie-banner {
  position: fixed;
  bottom: 12px;
  left: 12px;
  right: 12px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  z-index: 999;
}

/* Animação de slide-up */
.slide-up-enter-active {
  transition: all 0.5s ease;
}
.slide-up-leave-active {
  transition: all 0.3s ease;
  opacity: 0;
}
.slide-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}
.slide-up-enter-to {
  transform: translateY(0);
  opacity: 1;
}
</style>
