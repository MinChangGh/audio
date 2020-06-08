<template>
  <div>
    <div v-for="(item, index) in treeItem">
      <h4 @click="extend(index)">{{item.label}}</h4>
      <div v-show="isOpen">
        <tree v-if="item.child" :treeItem="item.child"></tree>
      </div>
    </div>
  </div>
</template>

<script>
  import tree from './tree'
  export default {
    name: "tree",
    data() {
      return {
        indexAct: null,
        isOpen: false
      }
    },
    props: {
      treeItem: Array
    },
    computed: {},
    components: {
      tree
    },
    created() {

    },
    mounted() {

    },

    methods: {
      extend (index) {
        this.isOpen = !this.isOpen
        // if (index == this.indexAct) {
        //   this.indexAct = null
        // } else {
        //   this.indexAct = index
        // }

      }
    }

  }
</script>

<style scoped>
  h4{
    cursor: pointer;
  }
  .un {
    display: none;
  }
  .act {
    display: block !important;
  }
</style>
