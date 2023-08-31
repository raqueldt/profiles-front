<template>
  <div>
    <b-row>
      <b-colxx xxs="10" class="avai m-auto" :class="type ? type:'dark'">
            <b-row>
              <img :src="img" alt="" :style={width:width} >
            </b-row>
            <div class="alert-title">{{ title }}</div>
            <div class="alert-text">{{ message }}</div>
      </b-colxx>
    </b-row>
  </div>          
</template>

<script>

export default {
 
  components: {
      
  },
 
  props: [ "title",
           "message", 
           "type",
           "img",
           "width", 
           "class_add", 
           "class_icon"]
}

</script>