<template>
  <div class="container-fluid">

    <b-button data-toggle="tooltip" data-placement="top" @click="showModalSnippets" size="sm"
      :title="$t('gps.tooltips.add-snippets')" type="submit" variant="outline-primary"
      v-tooltip="{content: `${$t('gps.tooltips.add-snippets')}` , placement: 'top', classes: ['itineraries'],}"
      class="mb-1 border-0">
      <i class="simple-icon-pencil"></i>
    </b-button>    

    <b-modal ref="my-modal-snippets" hide-footer title="Add snippets">

      <div class="row justify-content-center">
        <div class="col-md-12">
          <!-- listSnippets: {{listSnippets.length}}     -->
          <b-row>

            <b-col lg="6">
              <label>Search by snippet:</label>
              <v-select multiple :options="listSnippets" label="sntTitulo" 
                placeholder="Select snippet by name"  
                @input="searchingByTitle()"
                v-model="searchByTitle" />
              <!-- <small>{{searchByTitle.length}}</small> -->

            </b-col>
            <b-col lg="6">
              <label>Search by shortcut:</label>

              <v-select multiple :options="listSnippets" label="sntCodigo" 
                placeholder="Select snippet by shortcut" 
                @input="searchingByShortcut()"
                v-model="searchByShortcut" />

            </b-col>

            <b-col lg="12" class="mt-4">
              <b-form-group id="input-group-reference" label="Type:" label-for="input-reference" label-cols="2"
                label-cols-lg="2" label-size="sm">
                <v-select :options="listSnippetsTypes" label="sniTipo"
                  placeholder="Select snippet(s) type"  
                  @input="getSnippetsTextsBySniId(snippetType.sniId)" v-model="snippetType" />
                <!-- //snippetType:{{snippetType}} -->
              </b-form-group>
            </b-col>

            <b-col lg="12">
              <b-form-group id="input-group-reference" label="Snippets:" label-for="input-reference" label-cols="2"
                label-cols-lg="2" label-size="sm">
                <v-select multiple :disabled="!snippetType" 
                placeholder="Select snippet(s) name"  
                :options="listSnippetsTitles" v-model="snippetTitle" 
                label="sntTitulo" @input="searchingBySnippet()"/>
                <small v-if="!snippetType">Select a snippet type</small>
              </b-form-group>

            </b-col>

            <b-col lg="12">
              <b-form-group id="input-group-reference" label="Text" label-for="input-reference" label-cols="2"
                label-cols-lg="2" label-size="sm">
                <!-- <b-form-textarea id="textarea-state" v-model="snippetText" maxlength="500" rows="10" max-rows="10">
                </b-form-textarea> -->

                <quill-editor ref="myTextEditor"
                              v-model="snippetText"
                              :options="editorOption">
                </quill-editor>

              </b-form-group>
            </b-col>

            <!-- <b-col lg="12">
              <b-form-group id="input-group-reference" label="Shortcut:" label-for="input-reference" label-cols="2"
                label-cols-lg="2" label-size="sm">
                <b-form-input v-model="snippetShortcut" id="input-reference" maxlength="10" autocomplete="off" required>
                </b-form-input>
              </b-form-group>
            </b-col> -->

            <b-colxx xss="12">
              <b-button data-toggle="tooltip" data-placement="top"
                @click="insertText"
                :disabled="!snippetText"
                :title="$t('gps.tooltips.insert-snippets')" type="submit" variant="primary"
                class="mt-3 mb-2 mx-2 float-right">
                <i class="iconsminds-download-1"></i> {{$t('gps.tooltips.insert-snippets')}}
              </b-button>              
              <b-button  data-toggle="tooltip" data-placement="top"
                :title="$t('gps.pax.cancel-button')" type="submit" variant="secondary"
                class="mt-3 mb-2  mx-2 float-right"
                @click="closeModalSnippets">
                {{$t('gps.pax.cancel-button')}}
              </b-button>                
              <b-button data-toggle="tooltip" data-placement="top"
                @click="clearAll "
                :title="$t('gps.tooltips.insert-snippets')" type="submit" variant="outline-primary"
                class="mt-3 mb-2 float-left">
                {{$t('gps.clear-all')}}
              </b-button>              
                          
            </b-colxx>

          </b-row>

        </div>
      </div>

    </b-modal>

  </div>
</template>

<script>
  //import SnippetsServices from "../../../../../services/gps/snippets/SnippetsServices";
  import SnippetsServices from "../../../../services/gps/snippets/SnippetsServices";
  import SnippetTextServices from "../../../../services/gps/snippets/SnippetTextServices";
  import vSelect from "vue-select";
  import "vue-select/dist/vue-select.css";
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { quillEditor } from 'vue-quill-editor'

  export default {
    name: 'DeparturesSlots',
    components: {
      "v-select": vSelect, 
      'quill-editor' : quillEditor
    },
    props: ["slots"],
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
          placeholder: '',
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline'],
              [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' }
              ],            
            ]
          }
        },         
      }
    },
    watch: {
      // snippetTitle() {
      //   this.setTextAndShortcut();
      // },
      // searchByTitle(){
      //   this.concatText(this.searchByTitle);
      // }
    },
    methods: {
      showModalSnippets() {
        this.$refs["my-modal-snippets"].show();
      },
      closeModalSnippets() {
        this.clearAll();
        this.$refs["my-modal-snippets"].hide();
      },
      getSnippetsType() {
        SnippetsServices.getAllSnippets()
          .then((response) => {
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
        this.clearFieldWheSearch()
        this.searchByTitle = "";
      },
      getAllSnippets() {
        SnippetTextServices.getAllSnippetText()
          .then((response) => {
            this.listSnippets = response.data.data;
          })
          .catch(error => console.log(error))
          .finally(() => {
            // this.$emit("updateIncludes");
          });
      },
      getSnippetsTextsBySniId(sniId) {
        this.clearFieldsWhenSearchByType();
        // SnippetTextServices.getAllSnippetTextBySniId(sniId)
        //     .then((response) => {
        //         this.listSnippetsTitles = response.data.data;
        //     })
        //     .catch(error => console.log(error))
        //     .finally(() => {
        //         // this.$emit("updateIncludes");
        //     });
        this.listSnippetsTitles = this.listSnippets.filter(item => item.sniId === sniId)
      },
      searchingBySnippet(){
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
      concatText(searchModel){
        var self = this; 
        this.snippetText = searchModel.reduce( (p,c) => `${p} ${c.sntTexto} \n\n`, "")
      },
      insertText(){
        this.$emit("insertText", this.snippetText);
        this.closeModalSnippets();
      }
    },
    mounted() {
      this.getSnippetsType();
      this.getAllSnippets();
      this.clearAll();
    }
  }

</script>

<style lang="css" scoped>
  * >>>.ql-container{
    height: 180px !important;    
  }
</style>
