<template>
  <div class="col col-12 container-fluid">
    <h1>{{heading}}</h1>
    <span>
      <ul class="nav pt-0 breadcrumb-container d-none d-sm-block d-lg-inline-block">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/app/dashboard" class="active" target="_self">{{ $t("menu.home") }}</a>
          </li>
          <li class="breadcrumb-item active">
            <span aria-current="location">{{heading}}</span>
          </li>
        </ol>
      </ul>
    </span>
    <div class="separator mb-3"></div>
  </div>
</template>

<script>
  export default {
    props: ["heading"],
    components: {},
    data() {
      return {

      };
    },
    computed: {

    },
    mounted() {

    }
  };

</script>