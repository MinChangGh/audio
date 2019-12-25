<template>
  <div class="radar" ref="radar"></div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'radar',
  data () {
    return {
      myChart: null
    }
  },
  props: {
    option: {
      type: Object
    }
  },
  computed: {
    ...mapState({
      ext: state => state.collapse
    })
  },
  watch: {
    option: {
      handler (val) {
        this.myChart.resize()
      },
      deep: true
    },
    ext (val, nVal) {
      setTimeout(() => {
        if (val !== nVal) {
          this.myChart.resize()
        }
      }, 310)
    }
  },
  components: {},
  created () {
  },
  mounted () {
    this.init()
  },

  methods: {
    init () {
      let opt = {
        title: '',
        color: ['#8AFF67', '#FBFF80'],
        tooltip: {},
        legend: {},
        toolbox: {}
      }
      Object.assign(opt, this.option)
      let fOpt = {
        title: {
          text: opt.title
        },
        color: opt.color,
        tooltip: opt.tooltip,
        legend: opt.legend,
        radar: opt.radar,
        series: opt.series,
        toolbox: opt.toolbox
      }
      this.myChart = this.$echarts.init(this.$refs.radar)
      this.myChart.setOption(fOpt)
      window.addEventListener('resize', this.reset, false)
    },
    reset () {
      console.log('1')
      this.myChart.resize()
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.reset, false)
  }
}
</script>

<style scoped lang="scss">

</style>
