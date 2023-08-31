<template>
  <div v-if="Boolean(startDate) && Boolean(endDate)">
    <b-row>    
      <b-colxx lg="12" class="text-center small text-muted" >
        TOUR DATES
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx lg="9" class="mx-auto">
          <b-row>
            <b-colxx class="pr-0">
              <div class="d-flex float-right">
                <div class="day align-self-start" style="font-size:1.4rem;  font-weight: 600;">
                  {{ moment(startDate,"YYYY-MM-DD").format("DD")}}
                </div>
                <div class="month-year align-self-start" style="line-height: 10px;margin-top: 0.4rem;font-size: 0.7rem;margin-left: 0.2rem;" >
                  <div class="month">
                    {{ moment(startDate,"YYYY-MM-DD").format("MMM YYYY") }}
                  </div>
                  <div>
                    {{ moment(startDate,"YYYY-MM-DD").format("dddd")}}
                  </div>
                </div>
              
              </div>
            </b-colxx>
            <b-colxx class="date-departure pl-0 pr-0" style="flex: 0 0 13.66667%;max-width: 13.66667%;">
              <div class="separator" style="margin-left: auto;margin-right: auto;padding: .5rem 0; border-left:0;">
                <div style="
                background: #bdb1b1;
                text-align: center;
                position: relative;
                top: -2px;
                vertical-align: middle;
                padding: 11px 0.05rem;
                margin: 0 auto;
                width: 1px;
                ">
                </div>
              </div>
            </b-colxx>
            <b-colxx class="pl-0">
              <div class="d-flex float-left">
                  <div class="day" style="font-size:1.4rem; font-weight: 600;">
                    {{ moment(endDate,"YYYY-MM-DD").format("DD")}}
                  </div>
                  <div class="month-year"  style="line-height: 10px;margin-top: 0.4rem;font-size: 0.7rem;margin-left: 0.2rem;">
                    <div class="month">
                      {{ moment(endDate,"YYYY-MM-DD").format("MMM YYYY")}}
                    </div>
                    <div>
                      {{moment(endDate,"YYYY-MM-DD").format("dddd")}}
                    </div>
                  </div>
              </div>
            </b-colxx>
          </b-row>
      </b-colxx>
    </b-row>      
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "FormatedDate",
  props: ["startDate", "endDate"],
  components: {},

  data() {
    return {};
  },
  created() {},

  async mounted() {},
  computed: {},
  methods: {}
};
</script>
