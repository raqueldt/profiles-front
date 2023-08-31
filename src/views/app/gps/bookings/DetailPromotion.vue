<template>
  <b-row>
    <b-colxx>
      <table class="table no-border">
        <tbody>
          <tr>
            <td>Reference:</td>
     <!--        {{rseId}} -->
            <td class="font-medium">{{ rseId.rseReference }}</td>
          </tr>

          <tr>
            <td>Description:</td>
            <td v-if="rseId.rseDetail" class="font-medium">
              {{ rseId.rseDetail }}
            </td>
            <td v-else class="font-medium">No description</td>
          </tr>

          <tr v-if="rseId.rseType == 1">
            <td>Season:</td>

            <td class="font-medium">{{ rseId.priName }}</td>
          </tr>
          <tr v-if="rseId.rseType == 2">
            <td>Values Apply:</td>
            
            <td>
              <span>
                <span>
                  <span v-if="Boolean(rseId.dprAmount)">
                    <span  :class="rseId.dprAmount < 0 ? 'text-success' : 'text-danger'">$ {{ rseId.dprAmount }}</span>
                  </span>
                  <span v-if="Boolean(rseId.dprPercent)">
                    <span :class="rseId.dprPercent < 0 ? 'text-success' : 'text-danger'">{{ rseId.dprPercent }} % </span>
                  </span>
                </span>
              </span>
            </td>
          </tr>
                <tr v-if="rseId.rseType == 2">
            <td> Season Base:</td>

            <td>
              <span>
                <span>
                  <span v-if="rseId.priName"> </span>{{ rseId.priName }}
                  
                </span>
                
              </span>
            </td>
          </tr>

          <tr>
            <td>Apply:</td>
            <td class="font-medium">
              {{ moment(rseId.rseDateFrom).format("DD MMM YYYY, ddd") }} to
              {{ moment(rseId.rseDateTo).format("DD MMM YYYY, ddd") }}
            </td>
          </tr>

          <tr>
            <td>Clients:</td>
            <td v-if="rseId['clients'].length > 0" class="font-medium">
              <span
                v-for="clientes in rseId['clients']"
                :key="clientes.users_id"
              >
                {{ clientes.razon_social }} ,
              </span>
            </td>
            <td v-else class="font-medium">
              <span> All clients </span>
            </td>
          </tr>

          <tr>
            <td>Catalogs:</td>
            <td v-if="rseId['cabins'].length > 0" class="font-medium">
              <!-- <span v-for="cabin in rseId['cabins']" :key="cabin.decId">
                {{ cabin.catName }} ,
              </span> -->
              <template v-for="cabin in rseId['cabins']">
              <b-badge v-if="cabin" :key="cabin.decId"  variant="outline-primary" class="mr-1">{{ cabin.catName }}</b-badge>
              </template>
              
            </td>
          </tr>
        </tbody>
      </table>
    </b-colxx>
  </b-row>
</template>
<script>
import IconCard from "../../../../components/Cards/IconCard";

export default {
  props: ["rseId"],
  components: {
    "icon-card": IconCard,
  },
};
</script>
