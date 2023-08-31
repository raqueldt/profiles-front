<template>

  <div>

    <b-row>

        <b-col cols="12">
            <h1>Requests</h1>
            <span>
                <ul class="nav pt-0 breadcrumb-container d-none d-sm-block d-lg-inline-block">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a href="/app/dashboard" class="active" target="_self">{{ $t("menu.home") }}</a>
                        </li>
                        <li class="breadcrumb-item active">
                            <span aria-current="location">Availability</span>
                        </li>
                    </ol>
                </ul>
            </span>
            <div class="separator mb-5"></div>
        </b-col>


    </b-row>

  </div>


</template>

<script>

export default {

  name: 'AvailabilityRequests',



}


/*

        <!-- MODAL REQUEST-->
    <b-modal  ref="my-modal-request" hide-footer size="xl"
              ok-variant="secondary" ok-only ok-title="Close"
              content-class="custom-price">

      <template #modal-header>
        <b-col lg="12">
          <b-row>
            <b-col class="h5">
              <i class="glyph-icon iconsminds-check"></i> Requests
            </b-col>

                <formated-dates  :startDate="departure.depStartDate"
                                  :endDate="departure.depEndDate" >
                </formated-dates>

          </b-row>
        </b-col>
      </template>

      <modal-request
        :depId="departure.depId"
        @closeModalRequest="closeModalRequest"
        >

      </modal-request>
    </b-modal>
    <!-- MODAL REQUEST -->

*/

</script>


