<template>
  <div ref="chart" class="lines"></div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'lineTemp',
  data () {
    return {
      myChart: null
    }
  },
  props: {
    option: {
      type: Object
    },
    add: {
      type: Boolean | String,
      default: false
    }
  },
  watch: {
    option: {
      handler (newName, oldName) {
        this.$nextTick(() => {
          this.init()
        })
      },
      deep: true
    },
    size (n, o) {
      if (n !== o) {
        setTimeout(() => {
          this.myChart.resize()
        }, 260)
      }
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
    this.init()
  },

  methods: {
    init () {
      if (this.option.series.length === 0) {
        return
      }
      this.myChart = this.$echarts.init(this.$refs.chart)
      let opt = {
        legend: {
          top: 20,
          right: 30,
          icon: 'circle',
          itemWidth: 6
        },
        grid: {
          bottom: 20,
          top: 40
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          axisLine: {
            lineStyle: {
              color: '#ADB3BC'
            }
          }
        },
        yAxis: {
          splitNumber: 2,
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          },
          type: 'value',
          nameGap: 20,
          axisLine: {
            symbol: ['none', 'path://M809,450.408753 L805.435788,456.745131 L804.564212,456.254869 L809.064212,448.254869 L809.5,447.480136 L809.935788,448.254869 L814.435788,456.254869 L813.564212,456.745131 L810,450.408753 L810,456.5 L810,469 L809,469 L809,456.5 L809,450.408753 Z'],
            symbolOffset: 10,
            symbolSize: [20, 25],
            lineStyle: {
              color: '#ADB3BC'
            }
          },
          axisTick: {
            show: false
          }
        },
        series: []
      }
      this.$$.deepObjectMerge(opt, this.option)
      if (this.add) {
        let defult = {
          barWidth: 24,
          areaStyle: {
            opacity: 0.2
          },
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: 'top'
              }
            }
          }
        }
        let len = this.option.series.length
        for (let i = 0; i < len; i++) {
          Object.assign(opt.series[i], defult)
        }
      }
      this.myChart.setOption(opt, true)
      let that = this
      window.addEventListener('resize', that.clear)
    },
    clear () {
      this.myChart.resize()
    }
  },
  beforeDestroy () {
    if (this.myChart) {
      this.myChart.dispose()
      window.removeEventListener('resize', this.clear)
      this.myChart = null
    }
  }

}
</script>

<style lang="scss">
  .lines {
    width: 100%;
    height: 100%;
  }
</style>
