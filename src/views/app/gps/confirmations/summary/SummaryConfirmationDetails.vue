<template>

  <div class="text-center" v-if="!isLoadingRow">
    <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner" type="grow" variant="primary"></b-spinner>
  </div>
  <div v-else>
<!-- <pre>{{ summaryDetails}}</pre> -->
    <b-card :title="$t('gps.confirmation_details')" class="sub_titles shadow h-75" v-if="Boolean(summaryDetails)">
      <b-row>
        <b-colxx>
          {{$t('gps.arrival_date')}}
        </b-colxx>
        <b-colxx>      
          <span  class="text-primary" style="cursor: pointer;"   v-b-modal.dateSettings> {{moment(summaryDetails.cofInicio ).format("DD MMM YYYY, ddd ")}}</span>
        </b-colxx>
      </b-row>
      <b-row>
        <b-colxx>
          {{$t('gps.departure_date')}}
        </b-colxx>
        <b-colxx>
          <!-- {{ summaryDetails.cofFinal }} -->
         

<span class="text-primary" style="cursor: pointer;"   v-b-modal.dateSettings> {{moment(summaryDetails.cofFinal ).format("DD MMM YYYY, ddd ")}}</span>

        </b-colxx>
      </b-row>
      <b-row>
        <b-colxx>
          {{$t('gps.confirmation_date')}}
        </b-colxx>
        <b-colxx>
          <!-- {{ summaryDetails.cofFechaVenta }} -->
          {{moment(summaryDetails.cofFechaVenta ).format("DD MMM YYYY, ddd ")}}
        </b-colxx>
      </b-row>
      <b-row>
        <b-colxx>
          {{$t('gps.arrival_passengers')}}
        </b-colxx>
        <b-colxx>
          <template v-if="summaryDetails.llegaDiasPax>0">
            {{ summaryDetails.llegaDiasPax }} days
          </template>
          <template v-else>
            Arrived
          </template>
        </b-colxx>
      </b-row>
          <!-- Modal Extend Period Confirmation -->
    <b-modal
      id="dateSettings"
      ref="dateSettings"
      modal-class="modal-right"
      title="Change Period Confirmation"
    >
      <modal-setting-period-confirmation
        :cofId="cofId"
        @update="getConfirmacionesInfoSummary"
      >
      </modal-setting-period-confirmation>
      <template slot="modal-footer">
        <b-button
          class="mt-2 mb-2"
          variant="secondary "
          @click="hideModal('dateSettings')"
          >{{ $t("gps.close") }}</b-button
        >
      </template>
    </b-modal>
      <b-row>
        <b-colxx>
          {{$t('gps.seller')}}
        </b-colxx>
        <b-colxx>
          {{ summaryDetails.vendedorName }} {{ summaryDetails.vendedorLastName }}
        </b-colxx>

      </b-row>
          <b-row>
        <b-colxx>
          {{$t('gps.operator')}}
        </b-colxx>
        <b-colxx>
          {{ summaryDetails.operadorName }} {{ summaryDetails.operadorLastName }}
        </b-colxx>

      </b-row>

      <!-- Ultimo Comentario -->
      <div class="container" v-if="Boolean(lastComment)">
        <div class="row justify-content-md-center">
          <b-row class="notes_message container-fluid w-100" >
            <b-card class="mx-auto w-100">

              <strong>{{$t('gps.confirmationslabels.general-note')}}: </strong>{{ lastComment.creado_en }}
              <p class="mb-0">{{ lastComment.cfnNota }}</p>
              <footer class="blockquote-footer text-right">
                <cite title="Source Title">{{ lastComment.name }} {{ lastComment.lastname }}</cite>
              </footer>

            </b-card>
          </b-row>
        </div>
      </div>
      <!-- Fin Ultimo Comentario -->

    </b-card>
    <b-card :title="$t('gps.confirmation_details')" v-else>
      <alertsglobal type='warning' :title=" $t('gps.confirmationslabels.no-confirmation-details') " class="w-100"
        message=" ">
      </alertsglobal>
    </b-card>

  </div>

</template>

<script>
  import ConfirmacionesSummaryServices from "../../../../../services/gps/confirmaciones/ConfirmacionesSummaryServices"
  export default {
    props: ["cofId", "lastComment"],
    name: 'SummaryConfirmationDetails',
    data() {
      return {
        summaryDetails: [],
        isLoadingRow: false
      }
    },
    created() {
      this.getConfirmacionesInfoSummary();
    },
    methods: {
      getConfirmacionesInfoSummary() {
        this.isLoadingRow = false;
        const cofId = this.cofId;
        ConfirmacionesSummaryServices.getConfirmacionesInfoSummary(cofId)
          .then(response => {
            this.summaryDetails = response.data.data;
            let cotId = this.summaryDetails.cotId;
            this.$emit('cotId', cotId);
            this.$emit('summaryDetails', this.summaryDetails);
          })
          .catch(error => {
            console.log("Error: " + error);
          }).finally(() => {
            this.isLoadingRow = true;
          });
      },
      hideModal(refname) {
        this.$refs[refname].hide();
      },      
    },
  }
</script>