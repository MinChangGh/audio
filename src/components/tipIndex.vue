<template>
  <div class="left-box">
    <div class="title">{{tips.title}}</div>
    <div class="main">
      <div class="left">
        <div class="num">
          <img v-if="tips.direct" src="../assets/img/rise.png">
          <img v-else src="../assets/img/down.png">
          <div>
            <p class="p1">{{tips.num}}</p>
            <p class="p2">提升率</p>
          </div>
        </div>
      </div>
      <div ref="right" class="right">

      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'tipIndex',
  data () {
    return {
      myChart: null
    }
  },
  props: {
    option: {
      type: Object
    },
    tips: {
      type: Object
    }
  },
  computed: {},
  components: {

  },
  created () {

  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.myChart = this.$echarts.init(this.$refs.right)
      this.myChart.setOption(this.option)
    }
  }

}
</script>

<style lang="scss">
  .left-box {
    border: 1px solid #E8EBF0;
    height: 100%;
    margin-left: 20px;
    padding-left: 20px;
    .title {
      line-height: 40px;
      font-size: 14px;
      color: #333437;
      font-weight:600;
    }
    .main {
      height: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
      .left {
        .num{
          display: flex;
          align-items: center;
          img {
            width: 22px;
            height: 22px;
            margin-right: 10px;
          }
          .p1 {
            font-size:28px;
            color:rgba(53,57,67,1);
            line-height:34px;
          }
          .p2 {
            font-size:12px;
            color:rgba(113,113,114,1);
            line-height:17px;
          }
        }
      }
      .right {
        width: 200px;
        height: 100%;
      }
    }
  }
</style>
