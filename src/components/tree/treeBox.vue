<template>
  <div class="compare">
    <p>对比</p>
    <div class="treeBox">
      <i class="arrow1"></i><b class="arrow2"></b>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'treeBox',
  data () {
    return {}
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

<style lang="scss" scoped>
  .compare {
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      font-size: 14px;
      font-weight: 400;
      color: rgba(173, 179, 188, 1);
      padding: 5px 20px;
      border-radius: 3px;
      border: 1px solid rgba(216, 220, 230, 1);
    }

    &:hover .treeBox {
      display: block;
    }
  }
  .treeBox {
    display: none;
    position: absolute;
    top: 59px;
    transition: 0.5s;
    width: 160px;
    min-height: 300px;
    max-height: 310px;
    right: -20px;
    z-index: 100;
    background: #ffffff;
    border: 1px solid #cccccc;
    border-radius: 4px;
    padding: 5px 10px;

    .arrow1 {
      width: 0px;
      height: 0px;
      border: 8px;
      border-style: solid;
      border-color: transparent transparent #cccccc transparent;
      position: absolute;
      top: -16px;
      right: 20px;
    }

    .arrow2 {
      width: 0px;
      height: 0px;
      border: 8px;
      border-style: solid;
      border-color: transparent transparent #ffffff transparent;
      position: absolute;
      top: -15px;
      right: 20px;
    }
  }
</style>
