<template>
  <q-page class="q-pa-md column">
    <q-btn label="Registrar treino" color="primary" class="q-mb-md" @click="registrarTreino" />

    <div v-if="fotoEditada" class="q-my-md">
      <img :src="fotoEditada" alt="Foto do treino" class="q-mb-md" style="max-width: 100%" />
      <div class="row q-gutter-sm">
        <q-btn label="Salvar Imagem" color="secondary" @click="salvarImagem" />
        <q-btn label="Compartilhar" color="primary" @click="compartilharImagem" />
      </div>
    </div>

    <div class="q-my-md">
      <div class="text-h6 q-mb-sm">Treinos feitos:</div>
      <div
        v-for="(treino, index) in treinosFeitos"
        :key="index"
        class="q-pa-sm bg-grey-2 q-mb-sm rounded row items-center justify-between"
      >
        <div>{{ treino.nome }} - {{ treino.data }}</div>
        <q-btn icon="delete" color="negative" dense flat @click="excluirTreinoFeito(index)" />
      </div>
    </div>

    <!-- Modal da câmera -->
    <q-dialog v-model="showCameraModal" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Tirar foto do treino</div>
          <video ref="video" autoplay playsinline style="width: 100%; border-radius: 8px" />
          <canvas ref="canvas" style="display: none"></canvas>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Cancelar" flat color="primary" v-close-popup />
          <q-btn label="Tirar Foto" color="primary" @click="tirarFoto" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Modal de confirmação de exclusão -->
    <q-dialog v-model="confirmarExcluir">
      <q-card>
        <q-card-section class="text-h6">Confirmar exclusão</q-card-section>
        <q-card-section>Tem certeza que deseja excluir este treino?</q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Excluir" color="negative" @click="confirmarExclusao" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      series: JSON.parse(localStorage.getItem('series') || '[]'),
      treinoSelecionado: null,
      treinosFeitos: JSON.parse(localStorage.getItem('treinosFeitos') || '[]'),
      showCameraModal: false,
      fotoEditada: null,
      excluirIndex: null,
      confirmarExcluir: false,
    }
  },
  methods: {
    registrarTreino() {
      if (!this.series.length) {
        alert('Nenhuma série cadastrada.')
        return
      }

      this.treinoSelecionado = this.series[0] // Pega a primeira por enquanto
      this.abrirCamera()
    },

    abrirCamera() {
      this.showCameraModal = true

      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        this.$refs.video.srcObject = stream
      })
    },

    tirarFoto() {
      const video = this.$refs.video
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')

      const width = video.videoWidth
      const height = video.videoHeight
      canvas.width = width
      canvas.height = height

      ctx.drawImage(video, 0, 0, width, height)

      // Textos
      const treinoNome = this.treinoSelecionado?.nome || 'Treino'
      const data = new Date().toLocaleDateString()

      ctx.fillStyle = 'white'
      ctx.font = `${Math.floor(width * 0.035)}px sans-serif`
      ctx.shadowColor = 'black'
      ctx.shadowBlur = 4
      ctx.textBaseline = 'bottom'
      ctx.fillText(`${treinoNome} - ${data}`, 20, height - 20)

      // Logo
      const logo = new Image()
      logo.src = '/logo.png'
      logo.onload = () => {
        const logoSize = width * 0.2
        ctx.shadowBlur = 0
        ctx.drawImage(logo, width - logoSize - 20, height - logoSize - 20, logoSize, logoSize)

        const finalImage = canvas.toDataURL('image/png')
        this.fotoEditada = finalImage

        // Salva no histórico
        this.treinosFeitos.unshift({
          nome: treinoNome,
          data,
          imagem: finalImage,
        })
        localStorage.setItem('treinosFeitos', JSON.stringify(this.treinosFeitos))

        // Para a câmera
        const stream = video.srcObject
        if (stream) {
          stream.getTracks().forEach((track) => track.stop())
        }

        this.showCameraModal = false
      }
    },

    salvarImagem() {
      const link = document.createElement('a')
      link.href = this.fotoEditada
      link.download = `treino-${new Date().toISOString()}.png`
      link.click()
    },

    compartilharImagem() {
      if (navigator.share && this.fotoEditada) {
        fetch(this.fotoEditada)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], 'treino.png', { type: blob.type })
            navigator
              .share({
                title: 'Meu treino de hoje 💪',
                files: [file],
              })
              .catch((err) => console.error('Erro ao compartilhar', err))
          })
      } else {
        alert('Seu navegador não suporta compartilhamento.')
      }
    },

    excluirTreinoFeito(index) {
      this.excluirIndex = index
      this.confirmarExcluir = true
    },

    confirmarExclusao() {
      if (this.excluirIndex !== null) {
        this.treinosFeitos.splice(this.excluirIndex, 1)
        localStorage.setItem('treinosFeitos', JSON.stringify(this.treinosFeitos))
        this.excluirIndex = null
        this.confirmarExcluir = false
      }
    },
  },
}
</script>
