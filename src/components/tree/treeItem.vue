<template>
  <li class="list-item-li" :class="{'listItemActive': isOpen}">
        <div class="name" @click="toggle">
            <div class="arrow">
              <i v-if="isOpen&&hasChild" class="el-icon-arrow-right"></i>
              <i v-if="!isOpen&&hasChild" class="el-icon-arrow-down"></i>
            </div>
          <!-- 末节点 -->
          <div class="c-box">
            <el-checkbox-group @change="setCheck(data)" v-model="checkList">
              <el-checkbox :disabled="data[treeProps.label]=='金华市'" :label="data[treeProps.label]"></el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
    <ul class="list-item" v-show="isOpen" v-if="hasChild">
      <tree-item v-on="$listeners" :Dtype="Dtype" v-for="(item, index) in data[treeProps.child]" :data="item" :key="index"
                 :treeProps="treeProps"></tree-item>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'TreeItem', // 递归组件必须有name
  props: {
    data: {
      type: [Object, Array], // 多个可能的类型
      required: true
    },
    // label、children 默认值
    treeProps: {
      type: Object,
      default: () => ({
        child: 'child',
        label: 'label'
      })
    },
    Dtype: {
      type: [String, Number]
    }
  },
  data () {
    return {
      checkList: ['金华市'],
      isOpen: false,
      clearTree: this.$store.state.clearTree
    }
  },
  watch: {
    '$route': function (val) {
      this.checkList = ['金华市']
    },
    '$store.state.clearTree': function () {
      this.checkList = []
    }
  },
  computed: {
    // 判断当前级别是否还有children
    hasChild () {
      return this.data[this.treeProps.child] && this.data[this.treeProps.child].length
    }
  },
  methods: {
    clearList () {
      this.checkList = []
    },
    // 点击子菜单也要判断是否有children，有就展开
    toggle () {
      if (this.hasChild) {
        this.isOpen = !this.isOpen
      }
    },
    setCheck (data) {
      data.color = this.$$.randomHexColor()
      this.$emit('insert', data, this.Dtype)
    }
  }
}
</script>

<style lang="scss" scoped>
  .listItemActive {
    max-height: 450px !important;
    transition: 0.5s;
  }
  .list-item-li {
    max-height: 27px;
    transition: 0.5s;
    .name {
      display: flex;
      width: 180px;
      font-size:14px;
      font-weight:400;
      color:rgba(90,94,110,1);
      line-height:20px;
      .arrow {
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }
    }
  }
  .list-item {
    list-style: none;
    margin: 5px 0px;
    padding-left: 5px;
  }
</style>
