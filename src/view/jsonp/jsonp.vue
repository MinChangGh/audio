<template>
  <div>
    <input @change="upload($event)" ref="file" type="file">
    <button @click="merge">提交</button>
    <video class="video" controls src="http://192.168.0.173:90/video"></video>
  </div>
</template>

<script>
  import {api} from '@/api/apis'

  export default {
    name: "jsonp",
    data() {
      return {
        src: null
      }
    },
    computed: {},
    components: {},
    created() {
      // this.getVideo()
      // this.getLrc()
      // this.getJs()

    },
    mounted() {

    },

    methods: {
      getVideo () {
        api.get({},'/video').then(res=>{
          this.src = res
        })
      },
      merge () {
        api.get({}, '/merge').then((res) => {
          console.log(res)
        })
      },
      upload(e) {
        var bytesPerPiece = 1*1024 * 1024; // 每个文件切片大小定为1MB .
        var totalPieces;
        var blob = e.target.files[0];
        var start = 0;
        var end;
        var index = 0;
        var filesize = blob.size;
        var filename = blob.name;

        //计算文件切片总数
        totalPieces = Math.ceil(filesize / bytesPerPiece);
        while(start < filesize) {
          end = start + bytesPerPiece;
          if(end > filesize) {
            end = filesize;
          }

          var chunk = blob.slice(start,end);//切割文件
          var sliceIndex= blob.name + index;
          var formData = new FormData();
          console.log(chunk)
          formData.append("file", chunk, filename);
          $.ajax({
            url: 'http://192.168.0.173:90/upload',
            type: 'POST',
            cache: false,
            data: formData,
            processData: false,
            contentType: false,
            success: (res)=>{

            }
          })
          start = end;
          index++;
        }
      },
      getJs() {
        api.get({}, '/getJs').then((res) => {
          eval(res)
        })
      },
      getLrc() {
        api.get({}, '/home/3').then((res) => {
          //eval(res)
          console.log(res)
        })
      },
    }

  }
</script>

<style scoped>
  .video {
    width: 400px;
    height: 300px;
    background: #cccccc;
  }

</style>
