<template>
<div ref="pie" class="singlePie"></div>
</template>

<script>
export default {
  name: 'singPie',
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
.singlePie {
  width: 100%;
  height: 100%;
}
</style>
