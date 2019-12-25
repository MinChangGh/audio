<template>
  <div class="titleTemp">
    <div class="title">{{title}}</div>
    <div class="selected"><slot name="select"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'titleTemp',
  data () {
    return {}
  },
  props: {
    title: {
      type: String
    }
  },
  computed: {},
  components: {},
  created () {

  },
  mounted () {

  },

  methods: {}

}
</script>

<style scoped lang="scss">
.titleTemp {
  padding-left: 32px;
  background: #ffffff;
  height: 57px;
  display: flex;
  border-bottom: 1px solid #EBF1F9;
  justify-content: space-between;
  align-items: center;
  min-width: 500px;
  .title {
    font-size:18px;
    font-weight:600;
    color:rgba(38,40,44,1);
    line-height:57px;
  }
  .selected {
    height: 32px;
    margin-right: 30px;
  }
}
</style>
