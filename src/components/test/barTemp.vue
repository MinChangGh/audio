<template>
    <div class="bar" ref="bar"></div>
</template>

<script>
export default {
  name: 'bar',
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
    col () {
      return this.$store.state.collapse
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
        color: ['#F2A724', '#AF7BF2'],
        xData: [],
        series: [],
        legend: {
          show: true,
          right: '20%'
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
      this.myChart = this.$echarts.init(this.$refs.bar)
      let option = {
        title: {
          text: opt.title
        },
        legend: opt.legend,
        toolbox: opt.toolbox,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#283b56'
            }
          }
        },
        color: opt.color,
        xAxis: {
          type: 'category',
          data: opt.xData
        },
        yAxis: {
          type: 'value'
        },
        series: this.option.series
      }
      this.myChart.setOption(option)
      window.addEventListener('resize', this.reset, false)
    },
    reset () {
      console.log('3')
      this.myChart.resize()
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.reset, false)
  },
  watch: {
    option: {
      handler (val) {
        this.init()
      },
      deep: true
    },
    col (val, Nval) {
      setTimeout(() => {
        if (val !== Nval) {
          this.myChart.resize()
        }
      }, 310)
    }
  }

}
</script>

<style scoped lang="scss">
  .bar {
    width: 100%;
    height: 100%;
  }
</style>
