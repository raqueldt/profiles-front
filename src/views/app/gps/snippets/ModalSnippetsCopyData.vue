<template>
  <div class="container-fluid mt-0">
    <b-button
      data-toggle="tooltip"
      data-placement="top"
      @click="showModalSnippets"
      size="sm"
      :title="$t('gps.tooltips.add-snippets')"
      type="submit"
      variant="outline-light"
      v-tooltip="{
        content: `Snippets`,
        placement: 'top',
        classes: ['itineraries']
      }"
      class="mb-1 border-0 menu-button-mobile d-xs-block d-sm-block"
    >
      <i class="simple-icon-book-open"></i>
    </b-button>

    <b-modal ref="my-modal-snippets" hide-footer title="Snippets" size="lg">
      <b-row>

        <b-col lg="12" class="mb-2 text-right">
            <i class="text-warning glyph-icon iconsminds-green-energy"></i> 
            <span class="text-muted">TIP: Next time, press <b>Shift + S</b> to open Snippets</span>
        </b-col>

        <b-col lg="12">

          <b-row>
            <!-- <b-col><h5>Search by:</h5></b-col> -->
            <b-col lg="5" >
              <!-- <h5>Search by:</h5> -->
              <label>Search by:</label>
              
              <v-select
                :style="searchByTitle.length > 0 ? 'border-bottom: 1px solid #CB5F10;' :''"
                multiple
                :options="listSnippets"
                label="sntTitulo"
                placeholder="Select snippet by name"
                @input="searchingByTitle()"
                v-model="searchByTitle"
                tabindex="1"
                id="initFilter"
              />
              
            </b-col>
            <!-- <b-col lg="12">
              <label>Shortcut:</label>

              <v-select
                multiple
                :options="listSnippets"
                label="sntCodigo"
                placeholder="Select snippet by shortcut"
                @input="searchingByShortcut()"
                v-model="searchByShortcut"
              />
            </b-col> -->
            <!-- <b-col lg="12" class="mt-3">
              <h5>Or search by:</h5>
            </b-col> -->

            <b-col lg="7">
              <!-- <center><h5>Or search by:</h5></center> -->
              <b-row>
                <b-col class="p-0">
                    <label>Or search by:</label>
                    <b-form-group id="input-group-reference">
                      <v-select
                        :style="Boolean(snippetType) ? 'border-bottom: solid 1px #CB5F10;' :''"
                        :options="listSnippetsTypes"
                        label="sniTipo"
                        placeholder="Select snippet(s) type"
                        @input="getSnippetsTextsBySniId(snippetType.sniId)"
                        v-model="snippetType"
                        tabindex="2"
                      />
                    </b-form-group>
                </b-col>
                <b-col class="p-0">
                        <label> </label>
                    <b-form-group id="input-group-reference" class="mt-2">
                      <v-select
                        :style="snippetTitle.length > 0 ? 'border-bottom: solid 1px #CB5F10;' :''"
                        multiple
                        :disabled="!snippetType"
                        placeholder="Select snippet(s) name"
                        :options="listSnippetsTitles"
                        v-model="snippetTitle"
                        label="sntTitulo"
                        @input="searchingBySnippet()"
                      />
                      <small v-if="!snippetType">Select a snippet type</small>
                    </b-form-group>
                </b-col>
              </b-row>



            </b-col>

            <b-col lg="12">
             
            </b-col>
          </b-row>
        </b-col>
        <b-col lg="12" class="h-100" >
          <label>Text: </label>

          <!-- <quill-editor
            :style="{ border: setGreenColor}"
            v-model="snippetText"
            :options="editorOption"
          >
          </quill-editor> -->

          <div 
            contenteditable="true" 
            v-html="snippetText"  
            ref="myTextEditor"
            id="myTextEditor"
            class="editable p-1">
          </div>

        </b-col>
      </b-row>

      <div class="row justify-content-center">
        <div class="col-md-12">
          <b-row>
            <b-colxx xss="12">
              <b-button
                data-toggle="tooltip"
                data-placement="top"
                @click="copyToClipboard('myTextEditor')"
                :disabled="!snippetText"
                :title="$t('gps.tooltips.insert-snippets')"
                type="submit"
                variant="primary"
                class="mt-3 mb-2 mx-2 float-right"
              >
                Copy
              </b-button>
              <b-button
                data-toggle="tooltip"
                data-placement="top"
                :title="$t('gps.pax.cancel-button')"
                type="submit"
                variant="secondary"
                class="mt-3 mb-2  mx-2 float-right"
                @click="closeModalSnippets"
              >
                {{ $t("gps.pax.cancel-button") }}
              </b-button>
              <b-button
                data-toggle="tooltip"
                data-placement="top"
                @click="clearAll"
                :title="$t('gps.tooltips.insert-snippets')"
                type="submit"
                variant="outline-primary"
                class="mt-3 mb-2 float-left"
              >
                {{ $t("gps.clear-all") }}
              </b-button>
            </b-colxx>

          </b-row>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script src="vue.min.js"></script>
<script src="dist/vue-clipboard.min.js"></script>

<script>
//import SnippetsServices from "../../../../../services/gps/snippets/SnippetsServices";
import SnippetsServices from "../../../../services/gps/snippets/SnippetsServices";
import SnippetTextServices from "../../../../services/gps/snippets/SnippetTextServices";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import { copyToClipBoard } from "./../reports/utils";

export default {
  name: "DeparturesSlots",
  components: {
    "v-select": vSelect,
    "quill-editor": quillEditor
  },

  data() {
    return {
      searchByTitle: "",
      searchByShortcut: "",

      snippetType: "",
      snippetTitle: "",
      snippetText: "",
      snippetShortcut: "",
      listSnippetsTypes: [],
      listSnippetsTitles: [],
      listSnippets: [],

      editorOption: {
        placeholder: "",
        modules: {
          toolbar: [["bold"], [{ list: "ordered" }, { list: "bullet" }]]
        }
      },
      setGreenColor: "none",
      //setGreenColor: '1px solid green',

    };
  },
  watch: {


  },
  methods: {

    copyToClipboard() {
      copyToClipBoard("myTextEditor");
      var type = "success filled";
      var title = "Success";
      var mensaje = "Snippetd copied";
      this.$notify(type, title, mensaje, { duration: 3000, permanent: false });
      //this.setGreenColor = "1px solid green";
    },
    showModalSnippets() {

      if( this.$refs["my-modal-snippets"] != undefined)  this.$refs["my-modal-snippets"].show();

    },
    closeModalSnippets() {
      this.clearAll();
      this.$refs["my-modal-snippets"].hide();
    },
    getSnippetsType() {
      SnippetsServices.getAllSnippets()
        .then(response => {
          this.listSnippetsTypes = response.data.data;
         
        })
        .catch(error => console.log(error))
        .finally(() => {
          // this.$emit("updateIncludes");
        });
    },
    clearFieldsWhenSearchByType() {
      this.listSnippetsTitles = [];
      this.snippetTitle = "";
      this.snippetText = "";
      this.snippetShortcut = "";
      this.searchByTitle = "";
      this.searchByShortcut = "";
    },
    clearAll() {
      this.listSnippetsTitles = [];
      this.snippetTitle = "";
      this.snippetText = "";
      this.snippetShortcut = "";
      this.searchByTitle = "";
      this.searchByShortcut = "";
      this.setGreenColor = "none";
    },
    clearFieldWheSearch() {
      this.snippetType = "";
      this.snippetTitle = "";
      this.listSnippetsTitles = [];
    },
    clearFieldsWhenSearchByTitle() {
      this.clearFieldWheSearch();
      this.searchByShortcut = "";
    },
    clearFieldsWhenSearchByShortcut() {
      this.clearFieldWheSearch();
      this.searchByTitle = "";
    },
    getAllSnippets() {
      SnippetTextServices.getAllSnippetText()
        .then(response => {
          this.listSnippets = response.data.data;


          this.listSnippets.forEach((elemento) => {                   
              elemento.sntTitulo = `${elemento.sntTitulo} (${elemento.sntCodigo}) `;
            }) 

        })
        .catch(error => console.log(error))
        .finally(() => {
          // this.$emit("updateIncludes");
        });
    },
    getSnippetsTextsBySniId(sniId) {
      this.clearFieldsWhenSearchByType();
      this.listSnippetsTitles = this.listSnippets.filter(
        item => item.sniId === sniId
      );
    },
    searchingBySnippet() {
      this.concatText(this.snippetTitle);
    },

    // METODOS CUANDO SE BUSCA SNIPPETS POR SNIPPET Y POR SHORTCUT
    searchingByTitle() {
      this.clearFieldsWhenSearchByTitle();
      this.concatText(this.searchByTitle);
    },
    searchingByShortcut() {
      this.clearFieldsWhenSearchByShortcut();
      this.concatText(this.searchByShortcut);
    },
    concatText(searchModel) {
      var self = this;
      this.snippetText = searchModel.reduce(
        (p, c) => `${p} ${c.sntTexto} \n\n`,
        ""
      );
    },
    insertText() {
      this.$emit("insertText", this.snippetText);
      this.closeModalSnippets();
    }
  },
  async mounted() {
    await this.getSnippetsType();
    await this.getAllSnippets();
    await this.clearAll();

    var self = this;
     window.addEventListener('keyup', function(event) {
      if (event.shiftKey && event.keyCode === 83) {
        self.showModalSnippets();        
      }     
    });    
  }
};
</script>

<style lang="css" scoped>
* >>> .ql-container {
  height: 275px !important;
}


* >>> .editable {
    width: 100%;
    height: 450px !important;
    overflow-y: auto;
    border: 1px solid #d7d7d7 !important;
    padding: 2px;
}

* >>> .modal-header {
    height: 55px !important;
    padding: 15px ;   
}

</style>
