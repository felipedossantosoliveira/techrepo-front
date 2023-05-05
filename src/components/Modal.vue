<script>
  import ModalSetup from './config/ModalSetup.vue'

  export default {
    name: 'modal',
    props: {
      show: {
        type: Boolean,
        default: false
      },
      maxWidth: {
        type: String,
        default: '2xl'
      },
      closeable: {
        type: Boolean,
        default: true
      }
    },
    emits: ['close'],
    methods: {
      close() {
        this.$emit('close')
      }
    },
    components: {
      ModalSetup
    }
  }
</script>


<template>
  <ModalSetup
    :show="show"
    :max-width="maxWidth"
    :closeable="closeable"
    @close="close()"
  >
    <slot />
  </ModalSetup>
</template>