<template>
  <div class="tags" v-if="showTags">
    <ul>
      <li class="tags-li" v-for="(item,index) in tagsList" :title="item.title"
          :class="{'active': isActive(item.path)}" :key="index">
        <router-link :to="item.path" class="tags-li-title" v-if="index == 0">
          {{item.title}} <i class="el-icon-arrow-right" v-if="tagsList.length > 1"></i>
        </router-link>
        <router-link :to="item.path" class="tags-li-title" v-if="index != 0">
          {{item.title}}
        </router-link>
        <span class="tags-li-icon" @click="closeTags(index)"><i
          :class="item.path === '/index'? '' : 'el-icon-close'"></i>
        </span>
      </li>
      <li class="tags-li" @click="closeAll">
        <a href="javascript:void(0)" class="tags-li-title close-all">关闭所有标签</a>

      </li>
    </ul>

  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      tagsList: [{
        title: '首页',
        path: '/index',
        name: 'index'
      }]
    }
  },
  methods: {
    isActive (path) {
      return path === this.$route.path
    },
    // 关闭单个标签
    closeTags (index) {
      const delItem = this.tagsList.splice(index, 1)[0]
      const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1]
      if (item) {
        delItem.name === this.$route.name && this.$router.push(item.path)
      } else {
        // 保留首页
        this.tagsList = [{
          title: '首页',
          path: '/index',
          name: 'index'
        }]
        this.$router.push('/index')
      }
    },
    // 关闭全部标签
    closeAll () {
      // 保留首页
      this.tagsList = [{
        title: '首页',
        path: '/index',
        name: 'index'
      }]
      this.$router.push('/index')
    },
    // 关闭其他标签
    closeOther () {
      const curItem = this.tagsList.filter(item => {
        return item.path === this.$route.fullPath
      })
      // 保留首页
      this.tagsList = [{
        title: '首页',
        path: '/index',
        name: 'index'
      }]

      if (curItem[0].name !== 'index') {
        this.tagsList.push(curItem[0])
      }
      // 调转到当前路由
      this.$router.push(curItem[0].path)
    },
    // 设置标签
    setTags (route) {
      // 判断是否重复
      const isExist = this.tagsList.some(item => {
        return item.path === route.path
      })
      if (!isExist) {
        // 当标签超过8个删除第一个
        if (this.tagsList.length >= 7) {
          this.tagsList.splice(1, 1)
        }
        this.tagsList.push({
          title: route.meta.title,
          path: route.fullPath,
          name: route.matched[1].components.default.name
        })
      } else {
        this.tagsList.forEach(item => {
          if (item.name === route.name) {
            item.path = route.fullPath
          }
        })
      }
      // bus.$emit('tags', this.tagsList)
    },
    handleTags (command) {
      command === 'other' ? this.closeOther() : this.closeAll()
    }
  },
  computed: {
    showTags () {
      return this.tagsList.length > 0
    }
  },
  watch: {
    $route (newValue, oldValue) {
      this.setTags(newValue)
    }
  },
  created () {
    this.setTags(this.$route)
  }
}

</script>

<style scoped>
  .tags {
    top: -5px;
    position: relative;
    padding: 8px 5px 8px 5px;
    height: 34px;
    line-height: 34px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 5px 10px #ddd;
  }

  .tags ul {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .tags-li {
    display: inline-block;
    margin: 3px 10px 2px 3px;
    border-radius: 3px;
    font-size: 12px;
    overflow: hidden;
    cursor: pointer;
    height: 23px;
    line-height: 23px;
    /*border: 1px solid #e9eaec;*/
    background: #fff;
    padding: 0 5px 0 12px;
    vertical-align: middle;
    color: #666;
    -webkit-transition: all .3s ease-in;
    -moz-transition: all .3s ease-in;
    transition: all .3s ease-in;
  }

  /*.tags-li:not(.active):hover {*/
  /*  background: #f8f8f8;*/
  /*  color:#f8f8f8 ;*/
  /*}*/

  .tags-li.active {
    color: #2196f3;
  }

  .tags-li-title {
    display: inline-block;
    float: left;
    max-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 5px;
    color: #a2a1a1;
  }

  .right-font {
    position: relative;
    top: 1px;
    margin-left: 15px;
    color: #a2a1a1;
  }

  .tags-li.active .tags-li-title {
    color: #2196f3;
  }

  .tags-close-box {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    padding-top: 1px;
    text-align: center;
    width: 110px;
    height: 30px;
    box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
    z-index: 10;
  }

  /* 自定义样式 */
  .tags-li.active {
    /* border: 1px solid #009688 !important; */
    /* background-color: #009688 !important; */
  }

  .close-all {
    cursor: pointer;
    max-width: 120px;
    position: absolute;
    right: 20px;
  }

</style>
