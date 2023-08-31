<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12">

        <b-list-group >
          <b-list-group-item class="border-0">
            <b-row>
              <b-col lg="9" class="text-secondary text-center">
                <b class="h6">Descripción</b>
              </b-col>
              <b-col lg="3" class="text-center">
                <b class="h6">Valor</b>
              </b-col>
              <hr />
            </b-row>
          </b-list-group-item>
        </b-list-group>

        <component :is="settings.length > 3 ? 'vue-perfect-scrollbar' : 'div' "
          :class='settings.length > 3 ? "scroll-area" : ""'
          :settings="{ suppressScrollX: true, wheelPropagation: false }">
          <b-list-group>

            <template v-for="(setting, index) in settings">
              <b-list-group-item v-if="setting" :key="`key-${index}`">

                <b-row class="mb-2">
                  <b-col lg="10">
                    <span :class="isEditMode && selectedId === setting.appId ? 'font-weight-bold' : ''">
                      <!-- <i class="glyph-icon iconsminds-yes"></i> -->
                      {{ setting.appDescription }}
                    </span>
                  </b-col>
                  <b-col lg="2" class="text-center">
                    <b-button variant="link" 
                      data-toggle="tooltip" data-placement="top" title="Editar valor"
                      class="p-0" @click.prevent="handleEdit(setting.appId, setting.appValue)">
                      <template v-if="Boolean(setting.appValue)">
                        <!-- <strong>{{ setting.appValue | number("0") }}</strong> -->
                        <b-badge variant="primary" pill>{{ setting.appValue | number("0") }}</b-badge>
                      </template>
                      <template v-else>
                        <div class="font-italic">Empty</div>
                      </template>
                    </b-button>
                  </b-col>
                </b-row>

                <b-form :key="setting.appId" inline v-if="isEditMode && selectedId === setting.appId" class="my-3">
                  <label class="sr-only" for="inline-form-input-name">{{ setting.appName}}</label>
                  <b-form-input class="mb-2 mr-sm-2 mb-sm-0" v-model="selectedValue" maxlength="3"
                    @keypress="onlyNumber">
                  </b-form-input>
                  <b-button-group>
                    <b-button variant="secondary" squared @click="handleDiscard">Discard</b-button>
                    <b-button variant="primary" squared :disabled="isBusy" @click.prevent="handleSubmit">
                      <template v-if="isBusy">
                        <b-spinner small type="grow"></b-spinner>
                        Saving
                      </template>
                      <template v-else>
                        Save
                      </template>
                    </b-button>
                  </b-button-group>
                </b-form>

              </b-list-group-item>

            </template>


          </b-list-group>
        </component>

      </div>
    </div>
  </div>
</template>

<script>
  import AppSettingsServices from "@/services/gps/appsettings/AppSettingsServices";

  export default {
    name: "ModalCollectionAdministrator",
    // props: ["slots"],
    data() {
      return {
        settings: [],
        isEditMode: false,
        isBusy: false,
        selectedId: "",
        selectedValue: "",

      };
    },

    methods: {
      async getSettings() {
        const {
          data
        } = await AppSettingsServices.getAllSettings();
        this.settings = data.data;
        //console.log("settings: " + JSON.stringify(this.settings))
      },
      handleEdit(id, value) {
        this.selectedId = id;
        this.selectedValue = value;
        this.isEditMode = true;
        //this.displayMessageOK = false;
      },
      handleDiscard() {
        this.isEditMode = false;
        //this.displayMessageOK = false;
      },
      async handleSubmit() {
        try {
          this.isBusy = true;

          const dataToUpdate = {
            newAppValue: this.selectedValue
          };

          await AppSettingsServices.updateSettings(this.selectedId, dataToUpdate);

          this.isBusy = false;
          this.isEditMode = false;

          this.displaySuccessMessage();
          this.getSettings();

        } catch (e) {
          console.log("UNEXPECTED", e);

          if (e.response.status && e.response.status == 400) {
            const {
              data: errors
            } = e.response;
            this.errors = errors;
            this.isBusy = false;
          }
        }
      },
      displaySuccessMessage() {
        var type = "success filled";
        var title = "Success";
        var message = "Value updated successfully";
        this.$notify(type, title, message, {
          duration: 3000,
          permanent: false
        });
      },
      onlyNumber($event) {
        let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
        if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
          $event.preventDefault();
        }
      },

    },
    mounted() {
      this.getSettings();
    }
  };

</script>

<!-- <style lang="scss" scoped></style> -->


<style lang="scss" scoped>
  .scroll-area {
    position: relative;
    margin: 0px;
    width: auto;
    height: 375px;
  }

</style>
