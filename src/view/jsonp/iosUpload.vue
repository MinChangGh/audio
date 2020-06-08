<template>
  <div class="pp">
    <input type="file" @change="upload">
    <br/>

    <img id="img" :src="src" alt="">
    <br/>
    <img :src="src64" alt="">

  </div>

</template>

<script>
  export default {
    name: "iosUpload",
    data() {
      return {
        src:'',
        src64:''
      }
    },
    computed: {},
    components: {},
    created() {

    },
    mounted() {

    },

    methods: {
      // getBase64Image(img) {
      //   var canvas = document.createElement("canvas");
      //   canvas.width = 100;
      //   canvas.height = 120;
      //   var ctx = canvas.getContext("2d");
      //   ctx.drawImage(img, 0, 0, 100, 120);
      //   var dataURL = canvas.toDataURL("image/jpeg", 1);
      //   return dataURL
      // },
      upload(e) {
        let that = this
        let ad = window.URL.createObjectURL(e.target.files[0])
        var img = document.getElementById('img');
        // let img = new Image()
        img.src = ad;
        let Orientation,dataURL
        let scale = 0.4
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");

        img.onload=function () {
          canvas.width = img.height*scale;
          canvas.height = img.offsetWidth*scale;
          EXIF.getData(img, function(){
            Orientation = EXIF.getTag(this, 'Orientation')    
            setTimeout(()=>{
              if (Orientation && Orientation != 1) {
                switch (Orientation) {
                  case 6:
                    ctx.rotate(Math.PI / 2);
                    ctx.drawImage(img, 0,-this.height*scale, this.width*scale, this.height*scale);
                    dataURL = canvas.toDataURL("image/jpeg", 1);
                    that.src64= dataURL
                    break;
                  case 3:     // 旋转180度
                    ctx.rotate(Math.PI);
                    ctx.drawImage(this, this.width * scale, -this.height * scale,  this.width * scale, this.height * scale);
                    dataURL = canvas.toDataURL("image/jpeg", 1);
                    break;
                  case 8:     // 旋转-90度
                    ctx.rotate(3 * Math.PI / 2);
                    ctx.drawImage(this, - this.width * scale, 0,  this.width * scale, this.height * scale);
                    dataURL = canvas.toDataURL("image/jpeg", 1);
                }
              }
            },50)

          });
        }




      },
    }

  }
</script>

<style scoped>
  html,body {
    width: 100%;
  }
  .pp {
    width: 100%;
    overflow: hidden;
  }
  #img {
    position: fixed;
    top: 0;
    left: 0;
    width: 1000px;
    z-index: -100;
    visibility: hidden;
  }
</style>
