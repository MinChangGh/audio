<template>
  <div class="outer">
    <ul v-for="(item,index) in data" :key="index">
      <tree-item :Dtype="Dtype" v-on="$listeners" :data="item" :treeProps="treeProps"></tree-item>
    </ul>
  </div>
</template>

<script>
import treeItem from './treeItem'

export default {
  props: {
    data: {
      type: [Object, Array],
      required: true
    },
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
  components: {
    treeItem
  },
  created () {
  }
}
</script>
<style lang="scss" scoped>
.outer {
  overflow: scroll;
}
</style>
