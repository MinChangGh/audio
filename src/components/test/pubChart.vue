<template>
  <div ref="chart"></div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'pubChart',
  data () {
    return {
      myChart: null,
      chartData: {
        pie: {
          title: '',
          legend: {
            show: true,
            right: '20%'
          },
          tooltip: {
            trigger: 'item'
          }
        },
        bar: {
          title: {
            text: ''
          },
          legend: {},
          toolbox: {},
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#283b56'
              }
            }
          },
          xAxis: {
            type: 'category',
            data: opt.xData
          },
          yAxis: {
            type: 'value'
          }
        },
        radar: {
          title: {
            text: ''
          },
          color: ['#8AFF67', '#FBFF80'],
          tooltip: {},
          legend: {}
        }
      }
    }
  },
  props: {
    option: {
      type: Object
    }
  },
  computed: {
    ...mapState({
      size: state => state.collapse
    })
  },
  components: {},
  created () {

  },
  mounted () {
    setTimeout(() => {
      // this.init()
    }, 100)
  },

  methods: {
    init () {
      // let key = this.option.type
      let opt = this.chartData.bar
      // Object.assign(opt, this.option)
      console.log(this.option)

      this.myChart = this.$echarts.init(this.$refs.chart)
      this.myChart.setOption()
      let that = this
      window.addEventListener('resize', () => {
        that.myChart.resize()
      })
      // window.addEventListener('resize', () => {
      //   this.myChart.resize()
      // })
    },
    reset () {
      console.log('sd')
      this.myChart.resize()
    }
  },
  watch: {
    option: {
      handler (val) {
        this.init()
      },
      deep: true
    },
    size (val, nVal) {
      setTimeout(() => {
        if (val !== nVal) {
          this.reset()
        }
      }, 400)
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.reset)
  }

}
</script>

<style scoped>

</style>
