<template>
  <button :class="classes" @click="handleClick" @dblclick="handleDoubleClick">
    <slot>{{ text }}</slot>
  </button>
</template>

<script>
export default {
  props: {
    text: String, // Propiedad para el texto del botón
    variant: {
      type: String,
      default: "primary", // Variante por defecto
    },
  },
  computed: {
    classes() {
      return [
        "btn",
        `btn-${this.variant}`,
      ];
    },
  },
  methods: {
    handleClick() {
      // Emitir el evento personalizado 'click'
      this.$emit("click");
    },
    handleDoubleClick() {
      // Emitir el evento personalizado 'dblclick'
      this.$emit("dblclick");
    },
  },
};
</script>
