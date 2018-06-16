<template>
  <div class="progress-bar" ref="progressBar">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
      @touchstart.prevent="progressTouchStart"
      @touchmove.prevent="progressTouchMove"
      @touchuend="progressTouchEnd">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
  const progressBtnWidth=16
export default {
  props:{
    percent:{
      type:Number,
      default:0
    }
  },
  created(){
    this.touch={}
  },
  methods:{
    progressTouchStart(e){
      this.touch.initiated=true
      this.touch.startX=e.touches[0].pageX

    },
    progressTouchMove(e){

    },
    progressTouchEnd(e){

    }
  },
  watch:{
    percent(newPercent){
      if(newPercent>=0){
        const barWidth=this.$refs.progressBar.clientWidth-progressBtnWidth
        const offsetWidth=newPercent*barWidth
        this.$refs.progress.style.width=`${offsetWidth}px`
      }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/variable.styl"
  .progress-bar
    height 30px
    .bar-inner
      position relative
      top:13px
      height 4px
      background rgba(0,0,0,.3)
      .progress
        position absolute
        height 100%
        background $color-theme
      .progress-btn-wrapper
        position absolute
        left -8px
        top -13px
        width 30px
        height 30px
        .progress-btn
          position relative
          top 7px
          left 7px
          box-sizing border-box
          width 16px
          height 16px
          border 3px solid $color-text
          background $color-theme
</style>
