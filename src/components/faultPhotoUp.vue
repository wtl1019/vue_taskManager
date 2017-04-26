<template>
  <div class="add-pet">
    <div class="c-Publish">
      <div class="Pu-img">
        <span v-for="value in imgArr">
           <a href="javascript:;">
             <img :src="value.src" alt="img">
           </a>
        </span>
        <a href="javascript:;" class="Pu-Add-img">
          <div class="addImg">+</div>
          <input type="file" v-on:change="addImg">
        </a>
      </div>
    </div>
    <a @click="submitInfo" class="btn-b">发 布</a>
  </div>
</template>

<script>
  import axios from 'axios';
  import router from '../router';

  export default{
    data: function () {
      return {
        imgArr: []
      }
    },
    methods: {
      submitInfo: function () {
        if(this.imgArr.length === 0){
          alert('发布消息不能为空')
        }else
        {
          let url = 'http://www.sherlochao.com:9091/photosharing/sharedapi/publishShared';
          let i=0,len = this.imgArr.length,urlArr=[];
          for(i;i<len;i++)
          {
            urlArr.push(encodeURIComponent(this.imgArr[i].src.substring(23)));
          }

          let memberId = localStorage.getItem('memberId');

          let params = 'sharedContent=' + this.message + '&memberId=' + memberId + '&sharedPhoto=' + urlArr
          this.post(url,params,function (res) {
            if(res.result === 0){
              alert(res.msg)
            }else if(res.result === 1){
              alert('发布成功')
              router.push('/')
            }else{
              alert('请先登陆')
              router.push('/')
            }
          })
        }
      },
      addImg: function (event) {
        let self = this;
        if (self.imgArr.length < 6) {
          var file = event.target.files[0];
          if (!/image\/\w+/.test(file.type)) {
            console.log('文件必须为图片！');
            return false;
          }
          var reader = new FileReader();
          reader.onload = function (e) {
            console.log(this.result);
            self.imgArr.push({src: this.result});
          }
          reader.readAsDataURL(file);
        } else {
          console.log('一次最多只能上传9张图片！');
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
.add-pet
  .c-Publish
    padding-top: .5rem
    border-bottom: 1px solid #f1f1f1
    .Pu-img
      margin: 1rem 0px
      overflow: hidden
      padding: 0px 0.5rem
      span a img
        width: 100%
      a
        position: relative
        display: inline-block
        width: 4rem
        height: 4rem
        overflow: hidden
        float: left
        margin: 0 1.9% .4rem 1.9%
        .addImg
          width: 3.888rem
          height: 3.9rem
          text-align: center
          line-height: 3.3rem
          font-size: 3.5rem
          color: #f9696c
          border: 1px solid #c7c7c7
          > img
            height: 4rem
      .Pu-Add-img input
        position: absolute
        width: 100%
        height: 100%
        top: 0
        left: 0
        opacity: 0
  .btn-b
    margin-top: px2rem(50)
</style>
