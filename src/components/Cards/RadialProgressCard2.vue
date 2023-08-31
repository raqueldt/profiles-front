<template>
    <div class="progress-bar-circle">
        <radial-progress-bar :diameter="60" :strokeWidth="3" :completed-steps="percent" :total-steps=100>{{percent}}%</radial-progress-bar>
    </div>
</template>

<script>
import RadialProgressBar from 'vue-radial-progress'
export default {
    props: ['title', 'percent', 'noSuffle'],
    components: {
        'radial-progress-bar' : RadialProgressBar
    }
}
</script>
