<template>
<div class="indexpie">
  <div class="piechart" ref="pie"></div>
  <div class="info" >
    <p>{{info.year}}年</p>
    <ul>
      <li>
        <div class="el1"></div>
        <div class="info-detail">
          <span>{{info.type1.num}}</span>
          <p>{{info.type1.name}}</p>
        </div>
      </li>
      <li>
        <div class="el2"></div>
        <div class="info-detail">
          <span>{{info.type2.num}}</span>
          <p>{{info.type2.name}}</p>
        </div>

      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: 'pieIndex',
  data () {
    return {
      myChart: null
    }
  },
  props: {
    info: {
      type: Object
    },
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

  methods: {
    init () {
      this.myChart = this.$echarts.init(this.$refs.pie)
      this.myChart.setOption(this.option)
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
.indexpie {
  width: 100%;
  height: 100%;
  display: flex;
  .piechart{
    width: 60%;
    height: 100%;
  }
  .info {
    width: 40%;
    li{
      margin-top: 10px;
      position: relative;
      display: flex;
      align-items: center;
      .info-detail {
        span{
          display: inline-block;
          font-size:24px;
          font-weight:500;
          color:rgba(53,57,67,1);
          line-height:30px;
        }
        p {
          font-size:13px;
          font-weight:400;
          color:rgba(131,132,138,1);
          line-height:19px;
        }
      }
      .el1 {
        width: 8px;
        height: 8px;
        background: #0BD6A6;
        border-radius: 50%;
        margin-right: 10px;
      }
      .el2 {
        width: 8px;
        height: 8px;
        background: #A8DA14;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }
}
</style>
