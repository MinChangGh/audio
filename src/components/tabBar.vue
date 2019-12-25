<template>
  <div class="tab">
    <ul class="tabBox">
      <li :class="{'tabActive':curIndex == index}" :key="index" @click="tabs(index)" v-for="(item, index) in menus">{{item}}</li>
    </ul>
    <slot class="right" name="right"></slot>
  </div>
</template>

<script>
export default {
  name: 'tabBar',
  data () {
    return {
      curIndex: 0
    }
  },
  props: {
    menus: {
      type: Array
    }
  },
  computed: {},
  components: {},
  created () {

  },
  mounted () {

  },

  methods: {
    tabs (index) {
      this.curIndex = index
      this.$emit('setMenuInfo', this.menus[index], index)
    }
  }

}
</script>

<style lang="scss">
  .tabActive {
    background: url("../assets/img/tab1.png")no-repeat left center /100% 100% !important;
    color: #ffffff !important;
  }
  .tab {
    padding-left: 50px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(235,241,249,1);
    .right {
      line-height: 36px;
      margin-right: 50px;
    }
    .tabBox{
      display: flex;
      li {
        cursor: pointer;
        width: 140px;
        height: 36px;
        color: #26282C;
        background: url("../assets/img/tab.png")no-repeat left center/ 100% 100%;
        text-align: center;
        line-height: 36px;
      }
    }
  }

</style>
