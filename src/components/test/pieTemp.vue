<template>
    <div class="pie" ref="pie"></div>
</template>

<script>
export default {
  name: 'pieTemp',
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
        legend: {
          show: true,
          right: '20%'
        },
        tooltip: {
          trigger: 'item'
        },
        toolbox: {
          feature: {
            saveAsImage: {
              pixelRatio: 2
            }
          }
        }
      }
      Object.assign(opt, this.option)
      let fOpt = {
        title: {
          text: opt.title
        },
        legend: opt.legend,
        tooltip: opt.tooltip,
        toolbox: opt.toolbox,
        series: opt.series
      }
      this.myChart = this.$echarts.init(this.$refs.pie)
      this.myChart.setOption(fOpt)
      let that = this
      window.addEventListener('resize', that.reset, false)
    },
    reset () {
      this.myChart.resize()
    }
  },
  beforeDestroy () {
    let that = this
    window.removeEventListener('resize', that.reset, false)
  },
  watch: {
    option: {
      handler (val) {
        this.init()
      },
      deep: true
    },
    col (val, nVal) {
      setTimeout(() => {
        if (val !== nVal) {
          this.myChart.resize()
        }
      }, 310)
    }
  },
  computed: {
    col () {
      return this.$store.state.collapse
    }
  }
}
</script>

<style scoped lang="scss">
.pie{
  width: 100%;
  height: 100%;
}
</style>
