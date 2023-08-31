<template>
  <div>
    <b-row>
      <b-colxx xxs="10" class="m-auto">
            <b-alert show :variant="type ? type:'info'" :class="class_add+' custom'">
              <b-row>
                  <b-colxx xxs="1">
                    <span v-if="type=='success'" class="alert-icon" :class="type"><i class="glyph-icon simple-icon-check"></i></span>
                    <span v-else-if="type=='warning'" class="alert-icon" :class="type"><i class="glyph-icon simple-icon-exclamation"></i></span>
                    <span v-else-if="type=='danger'" class="alert-icon" :class="type"><i class="glyph-icon simple-icon-close"></i></span>
                    <span v-else class="alert-icon" :class="type ? type:'info'"><i :class="class_icon ? class_icon:'glyph-icon simple-icon-info'"></i></span>
                  </b-colxx>
                  <b-colxx xxs="9" class="ml-5">
                    <div class="alert-title ml-3">{{ title }}</div>
                    <div class="alert-text  ml-3">{{ message }}</div>
                  </b-colxx>
              </b-row>
            </b-alert>
      </b-colxx>
    </b-row>
  </div>          
</template>

<script>
export default {
  components: {
      
  },
  props: ["title","message", "type", "class_add", "class_icon"]
};
</script>