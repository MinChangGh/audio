<template>
  <div :style="styl" class="wrap">
    <div class="listwrap">
      <ul ref="list" class="list">
        <li :class="{'curline': index==actIndex}" v-for="(item,index) in lrcData">{{item.lrc}}</li>
      </ul>
    </div>
    <div class="audWrap" @mouseup="mUp($event)" @mousemove="mMove($event)">
      <div class="play">
        <i v-if="!isplay" @click="play" class="el-icon-video-play"></i>
        <i v-if="isplay" @click="pause" class="el-icon-video-pause"></i>
      </div>
      <div ref="line" class="line">
        <div class="progress" :style="progress">
        </div>
        <i @mousedown="mDown($event)" :style="circle" class="el-icon-s-help"></i>
      </div>
      <audio ref="aud" src="/static/mp3/lrc.mp3"></audio>
    </div>
  </div>


  <!--    <div>-->
  <!--      <input  v-model="value" @change="rangeVal" type="range">-->
  <!--    </div>-->


  <!--  </div>-->
</template>

<script>
  import {api} from '@/api/apis'

  export default {
    name: 'audio',
    data() {
      return {
        index: 1,
        percent: null,
        isdown: false,
        lineW: 400,
        beginLeft: 0,
        endLeft: null,
        startX: null,
        endX: null,
        value: '',
        duration: null,
        downLoc: {
          width: '0%'
        },
        progress: {
          width: '0%'
        },
        circle: {
          left: '0%'
        },
        isplay: false,
        actIndex: 0,
        lrcData: null,
        styl: {
          backgroundImage: 'url(/static/img/1.jpg)'
        }
      }
    },
    computed: {},
    components: {},
    created() {
      this.getLrc()
    },
    mounted() {
      this.lineW = this.$refs.line.offsetWidth
      let self = this
      this.animate()
      this.$refs.aud.addEventListener("canplay", function () {//监听audio是否加载完毕，如果加载完毕，则读取audio播放时间
        self.duration = (self.$refs.aud.duration).toFixed(3)
        let arr = self.duration.toString().split('.')
        self.duration = arr[0] * 1000 + parseInt(arr[1])
      })

      this.$refs.aud.addEventListener("timeupdate", function () {
        var timeDisplay = (self.$refs.aud.currentTime).toFixed(3)
        self.progress = {
          width: `${((self.$refs.aud.currentTime / self.duration) * 100000).toFixed(2)}%`

        }
        self.circle = {
          left: `${((self.$refs.aud.currentTime / self.duration) * 100000).toFixed(2)}%`
        }
        let arr = timeDisplay.toString().split('.')
        let total = arr[0] * 1000 + parseInt(arr[1])
        for (let i = 0; i < self.lrcData.length; i++) {
          if (self.lrcData[i].time < total && self.lrcData[i + 1].time > total) {
            self.actIndex = i
            self.$refs.list.style.top = `-${i * 30}px`
            break;
          }
        }
      }, false)

      // this.$refs.aud.addEventListener('playing', function () {
      //   // self.loopLrc()
      // }, false);
    },

    methods: {
      seltime() {
        let a = new Date(this.value1).getTime()
      },
      mOver(e) {
        console.log(e.target.style.left)
      },
      mDown(e) {
        let self = this
        this.isdown = true
        this.$refs.aud.pause()
        // window.addEventListener('mousemove',self.mMove(e))
        this.startX = e.x
        console.log(this.startX)
      },
      mMove(e) {
        if (!this.isdown) {
          return
        }
        console.log('xN--' + e.x)
        let dif = e.x - this.startX
        let persent = this.downLoc.width.toString().split('%')[0] / 100
        console.log('per---' + persent)
        let progressW = this.lineW * persent
        console.log('pw---' + progressW)
        console.log('dif---' + dif)
        let positionNow = progressW + dif
        if (this.index >= 2) {
          //console.log(this.progress.width)
          // alert(positionNow)
          // alert(persent)
        }

        if (positionNow < 0) {
          alert(1)
          positionNow = 0
          this.progress.width = '0%'
          this.circle.left = '0%'
          return
        }
        if (positionNow > this.lineW) {
          positionNow = 400
          this.progress.width = '100%'
          this.circle.left = '100%'
          return;
        }
        // console.log(positionNow)
        // this.percent = persent
        this.progress.width = `${((positionNow / this.lineW) * 100).toFixed(4)}%`
        // console.log(this.progress)
        this.circle.left = `${((positionNow / this.lineW) * 100).toFixed(4)}%`
        this.onmouseout(e)
      },
      onmouseout(event) {
        var div = document.getElementsByClassName("audWrap")[0];
        var x = event.clientX;
        var y = event.clientY;
        var divx1 = div.offsetLeft;
        var divy1 = div.offsetTop;
        var divx2 = div.offsetLeft + div.offsetWidth;
        var divy2 = div.offsetTop + div.offsetHeight;
        if (x < divx1 || x > divx2 || y < divy1 || y > divy2) {
          this.mUp()
        }
      },
      mUp(e) {
        let self = this
        this.downLoc = this.progress
        var persent = this.downLoc.width.toString().split('%')[0] / 100
        this.index++
        this.isdown = false
        this.$refs.aud.currentTime = Math.floor(this.$refs.aud.duration * persent)
        this.$refs.aud.play()
        this.isplay = true


      },
      rangeVal(val) {
        console.log(this.value)
      },
      animate() {
        let i = 0
        setInterval(() => {
          i++
          if (i >= 7) {
            i = 1
          }
          this.styl = {
            backgroundImage: `url(/static/img/${i}.jpg)`
          }
        }, 5000)
      },
      getLrc() {
        api.get({}, '/home/3').then((res) => {
          this.lrcData = res

        })
      },
      play() {
        this.isplay = true
        this.$refs.aud.play()
      },
      pause() {
        this.isplay = false
        this.$refs.aud.pause()
      },
      loopLrc() {
        for (let i = 0; i < this.lrcData.length; i++) {
          setTimeout(() => {
            this.$refs.list.innerHTML = this.lrcData[i].lrc
          }, this.lrcData[i].time)
        }
      }
    }

  }
</script>

<style scoped lang="scss">
  .curline {
    color: coral;
    font-weight: 700;
    font-size: 25px;
  }

  .wrap {
    position: relative;
    width: 600px;
    margin: 0 auto;
    height: 400px;
    padding-top: 30px;
    transition: .2s;
    box-sizing: border-box;
    background-repeat: no-repeat;
    background-size: cover;

    .listwrap {
      margin-top: 30px;
      width: 100%;
      height: 240px;
      overflow: hidden;
      position: relative;

      .list {
        margin-top: 80px;
        position: absolute;
        left: 50%;
        margin-left: -150px;
        width: 300px;
        top: 0px;
        color: #ffffff;
        text-align: center;
        font-size: 20px;
        transition: .5s;

        li {
          line-height: 30px;
          height: 30px;
        }
      }
    }

    .audWrap {
      padding: 0 50px;
      box-sizing: border-box;
      position: absolute;
      bottom: 0px;
      width: 600px;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #0BD6A6;
      font-size: 50px;

      .play {
        cursor: pointer;
        width: 50px;
      }

      .line {
        cursor: pointer;
        margin-left: 20px;
        width: 400px;
        height: 2px;
        background: #ffffff;
        box-sizing: border-box;
        position: relative;

        .progress {
          background: #0BD6A6;
          height: 2px;
        }

        i {
          position: absolute;
          left: -2px;
          top: -4px;
          font-size: 8px;
          margin-left: -2px;
        }

        &:hover i {
          display: block;
        }

      }
    }
  }
</style>
