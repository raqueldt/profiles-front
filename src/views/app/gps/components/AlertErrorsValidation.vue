<template>
  <div>

    <span
     v-for="( error, key) in errors" :key="key"
     class="text-danger"
    >
       {{ error }}
    </span>

  </div>
</template>

<script>

export default {

  name: 'AlertErrorsValidation',

  props: ['validationErrors'],

  computed: {

    errors () {

      return Object.values(this.validationErrors).flat(Infinity)

    }

  }


}

</script>
