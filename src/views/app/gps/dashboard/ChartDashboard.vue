<template>
  <b-card :title="$t('dashboards.product-categories')" class="text-primary">
    <div class="dashboard-donut-chart">
      <polar-area-chart :data="PolarAreaChart" shadow />
    </div>
  </b-card>
</template>
<script>
  import PolarAreaChart from "../../../../components/Charts/PolarArea";
  import {
    ThemeColors
  } from '../../../../utils'
  const colors = ThemeColors()

  export default {
    components: {
      "polar-area-chart": PolarAreaChart
    },
    data() {
      return {
        //polarAreaChartGPS
        PolarAreaChart: {
          labels: ['Blocked', 'Quotes', 'Confirmed'],
          datasets: [{
            data: [805, 908, 701],
            borderWidth: 2,
            borderColor: [colors.themeColor1, colors.themeColor2, colors.themeColor3],
            backgroundColor: [
              colors.themeColor1_10,
              colors.themeColor2_10,
              colors.themeColor3_10
            ]
          }]
        }
      };
    }
  };

</script>
