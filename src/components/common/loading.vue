<template>
  <div class="loading">
    <div class="mask"></div>
		<div class="loader-inner">
			<div class="loader-line-wrap">
				<div class="loader-line"></div>
			</div>
			<div class="loader-line-wrap">
				<div class="loader-line"></div>
			</div>
			<div class="loader-line-wrap">
				<div class="loader-line"></div>
			</div>
			<div class="loader-line-wrap">
				<div class="loader-line"></div>
			</div>
			<div class="loader-line-wrap">
				<div class="loader-line"></div>
			</div>
		</div>
  </div>
</template>
<script type="text/ecmascript-6">

export default {
  data() {
    return {
    };
  },
  mounted(){
  },
  methods: {
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
.loading {
    position: fixed;
    z-index: 100;
    .loader-inner {
        width: px2rem(280px);
        height: px2rem(280px);
        transform: translate(100%, 180%);
    position: absolute;
        z-index: 1002;
        .loader-line-wrap {
        animation: spin 2000ms cubic-bezier(.175, .885, .32, 1.275) infinite;
        box-sizing: border-box;
        height: 50px;
        left: 0;
        overflow: hidden;
        position: absolute;
        top: 0;
        transform-origin: 50% 100%;
        width: 100px;
            &:nth-child(1) {
                animation-delay: -50ms;
                .loader-line {
                    border-color: hsl(0, 80%, 60%);
                    height: 90px;
                    width: 90px;
                    top: 7px;
                }
            }
            &:nth-child(2) {
                animation-delay: -100ms;
                .loader-line {
                    border-color: hsl(60, 80%, 60%);
                    height: 76px;
                    width: 76px;
                    top: 14px;
                }
            }
            &:nth-child(3) {
                animation-delay: -150ms;
                .loader-line {
                    border-color: hsl(120, 80%, 60%);
                    height: 62px;
                    width: 62px;
                    top: 21px;
                }
            }
            &:nth-child(4) {
                animation-delay: -200ms;
                .loader-line {
                    border-color: hsl(180, 80%, 60%);
                    height: 48px;
                    width: 48px;
                    top: 28px;
                }
            }
            &:nth-child(5) {
                animation-delay: -250ms;
                .loader-line {
                    border-color: hsl(240, 80%, 60%);
                    height: 34px;
                    width: 34px;
                    top: 35px;
                }
            }
            .loader-line {
                border: 4px solid transparent;
                border-radius: 100%;
                box-sizing: border-box;
                height: 100px;
                left: 0;
                margin: 0 auto;
                position: absolute;
                right: 0;
                top: 0;
                width: 100px;
            }
    }
  }
    .mask {
        position: fixed;
      width: 100%;
      margin: 0 auto;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 1001;
      background: rgba(0,0,0,.7);
    }

  @keyframes spin {
    0%, 15% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
