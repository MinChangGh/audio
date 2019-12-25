<template>
  <div class="power-pie">
    <div class="chart" ref="pie"></div>
    <ul class="tips">
      <li
        :key="index"
        v-for="(item, index) in option.series[0].data">
        <i :style="makeColor(option.color[index])"></i>{{item.name}}: <span> <b>{{item.value}}</b>项</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'piePower',
  data () {
    return {
      myChart: null,
      color: ['#FFDA40', '#FF9341', '#FF6969', '#AE75F4', '#6885F7', '#267DFF', '#02D6D3', '#94F23D', '#FCFC5D'],
      tips: []
    }
  },
  props: {
    option: {
      type: Object
    }
  },
  computed: {},
  components: {},
  created () {

  },
  mounted () {
    this.init()
  },
  watch: {
    option: {
      handler (newName, oldName) {
        this.$nextTick(() => {
          this.init()
        })
      },
      deep: true
    }
  },
  methods: {
    makeColor (color) {
      return `background: ${color}`
    },
    init () {
      this.myChart = this.$echarts.init(this.$refs.pie)
      this.myChart.setOption(this.option, true)
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
    }
  }

}
</script>

<style lang="scss">
  .power-pie {
    width: 100%;
    height: 100%;
    display: flex;
    .chart {
      width: 70%;
      height: 100%;
    }
    .tips {
      width: 30%;
      padding-top: 40px;
      li {
        font-size: 12px;
        margin-bottom: 19px;
      }
      i {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right:5px;
      }
      span {
        color: #808489;
        font-size: 12px;
        line-height: 17px;
      }
      b {
        color: #292A2C;
        font-size: 14px;
      }
    }
  }
</style>
