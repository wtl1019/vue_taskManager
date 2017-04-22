<template>
    <div class="dialog">
        <div class="mask"></div>
        <div class="dialog-wrap">
            <div class="text">
                {{dialogMsg}}
                <!--确定报名？-->
             </div>
            <div class="btn-wrap">
                <div class="btn" @click="cancal">取消</div>
                <div class="btn" @click="confirm">确定</div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        dialogMsg: String,
        linkUrl: String
    },
    data () {
      return {
        }
    },
    methods: {
        confirm () {
          // this.$emit('confirm')
          this.$emit('cancel')
        },
        cancal () {
          this.$emit('cancel')
        }
    }

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .dialog
    z-index: 100
    .dialog-wrap
      position: fixed
      box-sizing: border-box
      padding: 40px
      width: 600px)
      height: 250px
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%)
      border-radius: 5px
      background: #fff;
      z-index: 1002;
      box-shadow: 0 19px 80px rgba(0,0,0,.298039), 0 15px 20px rgba(0,0,0,.219608);
      .text
        font-size: 15px
        line-height: 50px
        color: #555
      .btn-wrap
        display: flex
        position: absolute
        right: 40px
        bottom: 40px
        .btn
          padding: 10px 25px
          font-size: 14px
          &:last-child
          color: #76D49B
    .mask
      position: fixed
	    width: 100%
	    margin: 0 auto
	    top: 0
	    left: 0
	    bottom: 0
	    right: 0
	    z-index: 1001
	    background: rgba(0,0,0,.5)
</style>
