<template>
  <b-modal v-model="showModal" :size="modalSize" @hidden="closeModal" hide-footer hide-header>
    <template #modal-header="">
      <small>{{ title }}</small>
    </template>
    <slot></slot>
  </b-modal>
</template>

<script>
export default {
  props: {
    showModal: Boolean,
    modalSize: String,
  },
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
}
</script>
