<template>
    <div class="alert">
        <div class="alert-wrap">
            <div class="text">
                {{alertMsg}}
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
      data() {
        return {}
      },
      computed: mapState({
        alertMsg: state => state.com.alertMsg
      })
    }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .alert
    z-index: 1000
    .alert-wrap
      position: fixed
      width: 250px
      height: 90px
      line-height: 90px
      text-align: center
      left: 50%
      top: 50%
      transform: translate(-50%, -50%)
      border-radius: 45px
      background: #20A0FF
      .text
        font-size: 18px
        color: #fff
</style>
