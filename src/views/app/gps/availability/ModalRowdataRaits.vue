<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
              <b-tabs card>
                            <b-tab title="Catalogs" active>
                              <b-card-text>
                                <div v-for="(group, groupName, index) in rowcatalogs" :key="index" class="card">

                                        <div class="card-body p-0">
                                            
                                                <div class="table-responsive-lg mt-1 mb-2 ">
                                                      <table
                                                        class="table table-striped tb-rate"
                                                      >
                                                      <thead>
                                                          <th colspan="3" class="text-center bg-muted text-white h6">
                                                            <p>{{groupName}}</p>
                                                            <!-- <pre>{{group.cruId}}</pre> -->
                                                          </th>
                                                          <th colspan="3" class="align-self-center text-right bg-info text-white h6 mr-4">
                                                          <div class="col align-self-end ">
                                                                <div class="row">
                                                                    <div class="col-lg-8">
                                                                        <p>Standard Rack:</p>
                                                                    </div>
                                                                    <div class="col-lg-4 text-left">
                                                                        <p>{{group[0].acaBaseRate}}</p>
                                                                    </div>
                                                                </div>
                                                          </div>
                                                      </th>
                                                        <tr class="table-secondary text-center">
                                                            <th scope="col">Season</th>
                                                            <!-- <th scope="col"> Test %</th> -->
                                                            <th scope="col">%</th>
                                                            <!-- <th scope="col"> Mount in $ (from %)</th> -->
                                                            <th scope="col">$</th>
                                                            <!-- <th scope="col"> Percent in % (from $)</th> -->
                                                            <th scope="col">Gross ($)</th>
                                                            <th scope="col">Net ($)</th>
                                                          </tr>
                                                      
                                                      </thead>
                                                      <tbody>
                                                          <tr v-for="item in group" :key="item.offId">
                                                              <td class="table-ligth text-center align-middle">{{item.priName}}</td>
                                                              <td class="table-ligth text-center align-middle">
                                                                    <div v-if="item.offDiscountPercent ==0 && item.offSurchargePercent ==0">
                                                                <!-- Todo es 0 -->
                                                                {{item.offDiscountPercent}}
                                                                  
                                                              </div>

                                                              <div
                                                                v-if="item.offDiscountPercent ==null && item.offSurchargePercent ==null"
                                                              >
                                                                  {{item.acaBaseRate}}
                                                              </div>

                                                              <div v-else-if="item.offSurchargePercent != 0">
                                                                <!-- Todo es 0 -->
                                                                {{item.offSurchargePercent}}
                                                                
                                                              </div>

                                                              <div v-else-if="item.offDiscountPercent != 0">
                                                              {{item.offDiscountPercent}}
                                                                
                                                              </div>
                                                              <!-- Mount in $ (from %) -->
                                                              <small class="text-muted">
                                                                <div
                                                                  v-if="item.offSurchargePercent != 0"
                                                                >($ {{item.acaBaseRate * (item.offSurchargePercent)/100 | filterDecimal}})</div>
                                                                <div
                                                                  v-else-if="item.offDiscountPercent != 0"
                                                                >($ {{item.acaBaseRate * (item.offDiscountPercent)/100 | filterDecimal}})</div>
                                                                <div
                                                                  v-if="item.offSurchargePercent == 0 && item.offDiscountPercent == 0"
                                                                >($ 0.00)</div>
                                                              </small>
                                                              <!-- Fin Mount in $ (from %) -->
                                                              <!-- Editor inline -->
                                                              </td>
                                                              <td class="table-ligth text-center align-middle">
                                                                  <div
                                                                v-if="item.offDiscountAmount ==0 && item.offSurchargeAmount ==0"
                                                              >
                                                                <!-- Todo es 0 -->
                                                                {{item.offDiscountAmount}}
                                                                  
                                                              </div>

                                                              <div
                                                                v-if="item.offDiscountAmount ==null && item.offSurchargeAmount ==null"
                                                              >
                                                                <!-- Todo es 0 -->
                                                                {{item.acaBaseRate}}
                                                              </div>

                                                              <div v-else-if="item.offDiscountAmount != 0">
                                                                <!-- Todo es 0 -->
                                                                {{item.offDiscountAmount}}
                                                                  
                                                              </div>
                                                              <div v-else-if="item.offSurchargeAmount != 0">
                                                                <!-- Todo es 0 -->
                                                                {{item.offSurchargeAmount}}
                                                                
                                                              </div>
                                                              <!-- Percent in % (from $) -->
                                                              <small class="text-muted">
                                                                <div
                                                                  v-if="item.offDiscountAmount != 0"
                                                                >({{item.offDiscountAmount * 100 /item.acaBaseRate | filterDecimal}} %)</div>
                                                                <div
                                                                  v-else-if="item.offSurchargeAmount != 0"
                                                                >({{item.offSurchargeAmount * 100 /item.acaBaseRate | filterDecimal}} %)</div>
                                                                <div
                                                                  v-if="item.offDiscountAmount == 0 && item.offSurchargeAmount == 0"
                                                                >(0.00 %)</div>
                                                              </small>
                                                              <!-- Percent in % (from $) -->
                                                              </td>
                                                              <td class="table-ligth text-center text-success align-middle">
                                                              <!-- {{item.offGrossRate | filterDecimal}} -->
                                                            {{item.offGrossRate}}
                                                              
                                                            </td>
                                                              <td class="table-ligth text-center align-middle">{{item.offNetRate | filterDecimal}}</td>
                                                          </tr>
                                                      </tbody>
                                                      </table>
                                              </div>
                                            
                                        </div>
                                    </div>
                              </b-card-text>
                            </b-tab>
                            <b-tab title="Pricing">
                                 <b-card-text v-if="this.depPricing.length>0 && temrate>0">
                                      <table class="table table-hover table-striped tb-rate table-sm">
                                   <thead>
                                     <th colspan="5" class="align-self-center text-center bg-info text-white h6 mr-4">Pricing</th>
                                     <tr class="table-secondary text-center">
                                            <th scope="col">%</th>
                                             <!-- <th scope="col"> Mount in $ (from %)</th> -->
                                            <th scope="col">CURRENT RACK</th>
                                            <!-- <th scope="col"> Percent in % (from $)</th> -->
                                            <th scope="col">CURRENT NET</th>
                                            <!-- <th scope="col"> Mount in $ (from %)</th> -->
                                            <th scope="col">ORIGINAL RACK</th>
                                            <!-- <th scope="col"> Percent in % (from $)</th> -->
                                            <th scope="col">ORIGINAL NET</th>
                                          </tr>
                                   </thead>
                                   <tbody>
                                      
                                     <tr class="text-center">
                                       <td>35%</td>
                                       <td> {{temrate}}</td>
                                        <td v-if="temrate>grossRate">{{temrate-(temrate * 35 / 100)| filterDecimal}}<br><small><i class="glyph-icon simple-icon-arrow-up-circle"></i>{{(temrate-(temrate * 35 / 100))-(grossRate-(grossRate * 35 / 100))| filterDecimal}}</small></td>
                                        <td v-else>{{temrate-(temrate * 35 / 100)| filterDecimal}}<br><small><i class="glyph-icon simple-icon-arrow-down-circle"></i>{{(grossRate-(grossRate * 35 / 100))-(temrate-(temrate * 35 / 100))| filterDecimal}}</small></td>
                                       <td>{{grossRate}}</td>
                                       <td>{{grossRate-(grossRate * 35 / 100) | filterDecimal}}</td>
                                     </tr>
                                     <tr class="text-center">
                                       <td>30%</td>
                                       <td>{{temrate}}</td>
                                        <td v-if="temrate>grossRate">{{temrate-(temrate * 30 / 100)| filterDecimal}}<br><small><i class="glyph-icon simple-icon-arrow-up-circle"></i>{{(temrate-(temrate * 30 / 100))-(grossRate-(grossRate * 30 / 100))| filterDecimal}}</small></td>
                                        <td v-else>{{temrate-(temrate * 30 / 100)| filterDecimal}}<br><small><i class="glyph-icon simple-icon-arrow-down-circle"></i>{{(grossRate-(grossRate * 30 / 100))-(temrate-(temrate * 30 / 100))| filterDecimal}}</small></td>
                                       <td>{{grossRate}}</td>
                                       <td>{{grossRate-(grossRate * 30 / 100 )| filterDecimal}}</td>
                                     </tr>
                                     <tr class="text-center">
                                       <td>28%</td>
                                       <td> {{temrate}}</td>
                                        <td v-if="temrate>grossRate">{{temrate-(temrate * 28 / 100)| filterDecimal}}<br><small><i class="glyph-icon simple-icon-arrow-up-circle"></i>{{(temrate-(temrate * 28 / 100))-(grossRate-(grossRate * 28 / 100))| filterDecimal}}</small></td>
                                        <td v-else>{{temrate-(temrate * 28 / 100)| filterDecimal}}<br><small><i class="glyph-icon simple-icon-arrow-down-circle"></i>{{(grossRate-(grossRate * 28 / 100))-(temrate-(temrate * 28 / 100))| filterDecimal}}</small></td>
                                       <td>{{grossRate}}</td>
                                       <td>{{grossRate-(grossRate * 28 / 100 )| filterDecimal}}</td>
                                     </tr>
                                     <tr class="text-center">
                                       <td>25%</td>
                                       <td> {{temrate}}</td>
                                        <td v-if="temrate>grossRate">{{temrate-(temrate * 25 / 100)| filterDecimal}}<br><small><i class="glyph-icon simple-icon-arrow-up-circle"></i>{{(temrate-(temrate * 25 / 100))-(grossRate-(grossRate * 25 / 100))| filterDecimal}}</small></td>
                                        <td v-else>{{temrate-(temrate * 25 / 100)| filterDecimal}}<br><small><i class="glyph-icon simple-icon-arrow-down-circle"></i>{{(grossRate-(grossRate * 25 / 100))-(temrate-(temrate * 25 / 100))| filterDecimal}}</small></td>
                                       <td>{{grossRate}}</td>
                                       <td>{{grossRate-(grossRate * 25 / 100 )| filterDecimal}}</td>
                                     </tr>
                                     <tr class="text-center">
                                       <td>20%</td>
                                       <td> {{temrate}}</td>
                                       <td v-if="temrate>grossRate">{{temrate-(temrate * 20 / 100)| filterDecimal}}<br><small><i class="glyph-icon simple-icon-arrow-up-circle"></i>{{(temrate-(temrate * 20 / 100))-(grossRate-(grossRate * 20 / 100))| filterDecimal}}</small></td>
                                        <td v-else>{{temrate-(temrate * 20 / 100)| filterDecimal}}<br><small><i class="glyph-icon simple-icon-arrow-down-circle"></i>{{(grossRate-(grossRate * 20 / 100))-(temrate-(temrate * 20 / 100))| filterDecimal}}</small></td>
                                       <td>{{grossRate}}</td>
                                       <td>{{grossRate-(grossRate * 20 / 100 )| filterDecimal}}</td>
                                     </tr>
                                     <tr class="text-center">
                                       <td>15%</td>
                                       <td> {{temrate}}</td>
                                       <td v-if="temrate>grossRate">{{temrate-(temrate * 15 / 100)| filterDecimal}}<br><small><i class="glyph-icon simple-icon-arrow-up-circle"></i>{{(temrate-(temrate * 15 / 100))-(grossRate-(grossRate * 15 / 100))| filterDecimal}}</small></td>
                                       <td v-else>{{temrate-(temrate * 15 / 100)| filterDecimal}}<br><small><i class="glyph-icon simple-icon-arrow-down-circle"></i>{{(grossRate-(grossRate * 15 / 100))-(temrate-(temrate * 15 / 100))| filterDecimal}}</small></td>
                                       <td>{{grossRate}}</td>
                                       <td>{{grossRate-(grossRate * 15 / 100 )| filterDecimal}}</td>
                                     </tr>
                                   </tbody>
                                </table>
                                 </b-card-text>
                              <b-card-text v-else>
                                <table class="table table-hover tb-rate table-striped table-sm">
                                   <thead>
                                     <th colspan="3" class="align-self-center text-center bg-info text-white h6 mr-4">Pricing</th>
                                     <tr class="table-secondary text-center">
                                            <th scope="col">%</th>
                                            <!-- <th scope="col"> Mount in $ (from %)</th> -->
                                            <th scope="col">CURRENT RACK</th>
                                            <!-- <th scope="col"> Percent in % (from $)</th> -->
                                            <th scope="col">CURRENT NET</th>
                                          </tr>
                                   </thead>
                                   <tbody>
                                     <tr class="text-center">
                                       <td>35%</td>
                                       <td>{{grossRate}}</td>
                                       <td>{{grossRate-(grossRate * 35 / 100) | filterDecimal}}</td>
                                     </tr>
                                     <tr class="text-center">
                                       <td>30%</td>
                                       <td>{{grossRate}}</td>
                                       <td>{{grossRate-(grossRate * 30 / 100 )| filterDecimal}}</td>
                                     </tr>
                                     <tr class="text-center">
                                       <td>28%</td>
                                       <td>{{grossRate}}</td>
                                       <td>{{grossRate-(grossRate * 28 / 100 )| filterDecimal}}</td>
                                     </tr>
                                     <tr class="text-center">
                                       <td>25%</td>
                                       <td>{{grossRate}}</td>
                                       <td>{{grossRate-(grossRate * 25 / 100 )| filterDecimal}}</td>
                                     </tr>
                                     <tr class="text-center">
                                       <td>20%</td>
                                       <td>{{grossRate}}</td>
                                       <td>{{grossRate-(grossRate * 20 / 100 )| filterDecimal}}</td>
                                     </tr>
                                     <tr class="text-center">
                                       <td>15%</td>
                                       <td>{{grossRate}}</td>
                                       <td>{{grossRate-(grossRate * 15 / 100 )| filterDecimal}}</td>
                                     </tr>
                                   </tbody>
                                </table>
                                </b-card-text>
                                <b-card-text v-if="this.depPricing.length>0">
                                    <table class="table table-hover tb-rate table-striped table-sm">
                                        <thead>
                                            <th colspan="7" class="align-self-center text-center bg-info text-white h6 mr-4">Pricing History</th>
                                             <tr v-for="(item, index) in totalPricing" :key="index">
                                                 <td class="text-center">
                                                     <i v-if="item.dprStatus==='1'" class="glyph-icon simple-icon-check" :title="formatDepPrceStatus(item.dprStatus)"></i>
                                                     <i v-else class="glyph-icon simple-icon-exclamation text-danger" :title="formatDepPrceStatus(item.dprStatus)"></i>
                                                 {{item.dprOrder}}</td>
                                                 <td class="text-center"><span class="text-gray-dark">{{item.priName}}</span><span v-if="item.rseRate!=0" style="color:#456789;font-size:60%;">( {{item.rseRate}}  )</span>
                                                 <span v-else style="color:#456789;font-size:60%;">( {{grossRate}} )</span></td>
                                                 <td class="text-center">{{item.departure_price_end_date}}</td>
		                                    		<td class="text-center">{{item.rate_set_date_from}}</td>
		                                    		<td class="text-center">{{item.rate_set_date_to}}</td>
                                                   <td v-if="item.dprStatus==1" class="txt-oflo text-center">{{item.rseTime}} {{item.unit_time}} 
                                                    <p class="pb-0 mb-0">
                                                        <span class="small text-info">{{item.tiempo_restante}} remaining</span>
                                                    </p>
                                                 </td>
                                                 <td class="txt-oflo text-center">{{item.rseReference}}</td>
                                             </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </b-card-text>
                            </b-tab>
                          </b-tabs>
                
            </div>
        </div>
    </div>
</template>

<script>
import PricingServices from "../../../../services/gps/pricing/PricingServices.js";

    export default {

        props: ['rowcatalogs','rowoffers','temdepId','temrate'],
        data(){
            return {
                depPricing:"",
                totalPricing:"",
            }
        },

        filters: {
            filterDecimal(value) {
            return parseFloat(value).toFixed();
            }
        },
        computed:{
          grossRate(){
            let offnet= this.rowoffers.filter(item => item.priId === 3);
          //return this.rowOffers[0].offNetRate;
          return offnet[0].offNetRate;
          },
         
        },
         methods: {
              getPricing(){
                  if(this.temdepId){
                      PricingServices.getDeparturersIdStatus(this.temdepId)
                    .then(response => {
                    this.depPricing = response.data.data;
                
                    })
                    .catch(error => {
                    console.log("Error: " + error);
                    });
                  }
                  
              },
               getRateDepartures(){

            	PricingServices.getDeparturersIdStatus(this.temdepId).then((response) => {
                        this.totalPricing = response.data.data;
                            console.log(this.totalPricing);
                    }).catch((error) => {
                        console.log("Error: " + error);
                    });
            },
             formatDepPrceStatus(status) {
                switch (status) {
                    case "1":
                    return "Active";
                    case "2":
                    return "Out of date";
                    case "3":
                    return "Finished";
                    default:
                    return "No defined";
                }
                },
          },
        mounted() {
            this.getPricing();
            this.getRateDepartures();
        }
    }
</script>