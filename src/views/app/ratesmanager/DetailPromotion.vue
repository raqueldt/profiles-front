<template>
  <b-row>
    <b-colxx>
      <table class="table no-border">
        <tbody>
          <tr>
            <td>Reference</td>
            <td class="font-medium">{{ rseId.rseReference }}</td>
          </tr>

          <tr>
            <td>Description</td>
            <td v-if=" rseId.rseDetail" class="font-medium">{{ rseId.rseDetail }}</td>
            <td v-else class="font-medium">No description</td>
          </tr>

          <tr v-if="rseId.rseType == 1">
            <td>Seasons</td>

            <td>
              <span v-for="precios in rseId['priIds']" :key="precios.priId">
                {{ precios.cruName }} {{ precios.priName }},
              </span>
            </td>
          </tr>
          <tr v-if="rseId.rseType == 2">
            <td>Values Apply</td>

            <td>
              <span v-for="precios in rseId['custom']" :key="precios.cruId">
                <span>
                  {{ precios.cruName }} <span v-if="precios.dprAmount">$ </span
                  >{{ precios.dprAmount }} {{ precios.dprPercent }}
                  <span v-if="precios.dprPercent">% </span>
                </span>
                ,
              </span>
            </td>
          </tr>

          <tr v-if="rseId.rseType == 2">
            <td>Season Apply</td>

            <td>
              <span v-for="precios in rseId['priIds']" :key="precios.priId">
                {{ precios.cruName }} {{ precios.priName }},
              </span>
            </td>
          </tr>

          <tr>
            <td>Apply</td>
            <td class="font-medium">
              {{ moment(rseId.rseDateFrom).format("DD MMM YYYY, ddd") }} to
              {{ moment(rseId.rseDateTo).format("DD MMM YYYY, ddd") }}
            </td>
          </tr>
          <tr>
            <td>Departures</td>
            <td class="font-medium">
              {{
                moment(rseId.rseDepartureStart).format("DD MMM YYYY, ddd")
              }}
              to {{ moment(rseId.rseDepartureEnd).format("DD MMM YYYY, ddd") }}
            </td>
          </tr>
          <tr>
            <td>Itineraries</td>
            <td class="font-medium">
              <span
                v-for="itinearios in rseId['itinIds']"
                :key="itinearios.itiId"
              >
                {{ itinearios.cruName }} {{ itinearios.itiCode }},
              </span>
            </td>
          </tr>
          <tr>
            <td>Clients</td>
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
        </tbody>
      </table>
    </b-colxx>
  </b-row>
</template>
<script>
import IconCard from "../../../components/Cards/IconCard";

export default {
  props: ["rseId"],
  components: {
    "icon-card": IconCard,
  },
};
</script>
