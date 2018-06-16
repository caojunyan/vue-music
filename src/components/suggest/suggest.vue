<template>
  <scroll :data="result"
          ref="suggest"
          class="suggest"
          :pullup="pullup"
          @scrollToEnd="searchMore"
          :beforeScroll="beforeScroll"
          @beforeScroll="listScroll"
  >
    <ul class="suggest-list">
      <li @click="selectItem(item)" class="suggest-item" v-for="item in result">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <!--<loading v-show="hasMore" title=""></loading>-->
    </ul>
    <!--<div class="no-result-wrapper" v-show="!hasMore&&result.length===0">-->
      <!--<no-result title="抱歉，暂无搜索结果"></no-result>-->
    <!--</div>-->
  </scroll>

</template>

<script >
  import {search} from '../../api/search'
  import {ERR_OK} from '../../api/config'
  import {createSong} from '../../common/js/song'
  import Scroll from '../../base/scroll/scroll.vue'
  const TYPE_SINGR='singer'
    export default {
      props:{
        query:{
          type:String,
          default:''
        },
        showSinger:{
          type:Boolean,
          default:true
        }
      },
      data(){
        return{
          page:1,
          result:[]
        }
      },
      methods:{
        search(){
          search(this.query,this.page,this.showSinger).then(res=>{
            if(res.code===ERR_OK){
              this.result=this._genResult(res.data)
            }
            console.log(this.result)
          })
        },
        getDisplayName(item){
          if(item.type===TYPE_SINGR){
            return item.singername
          }else{
            return `${item.name}-${(item.singer)}`
          }
        },
        getIconCls(item){
          if(item.type===TYPE_SINGR){
            return 'icon-mine'
          }else{
            return 'icon-music'
          }
        },
        _genResult(data){
          let ret=[]
          if(data.zhida && data.zhida.singerid){
            res.push({...data.zhida,...{type:TYPE_SINGR}})
          }
          if(data.song){
            ret =ret.concat(this._normalizeSongs(data.song.list))
          }
          console.log(ret)
          return ret
        },
        _normalizeSongs(list){
          let ret=[]
          list.forEach((musicData)=>{
            if(musicData.songid&&musicData.albumid){
              ret.push(createSong(musicData))
            }
          })
          return ret
        }
      },
      watch:{
        query(){
          this.search()
        }
      },
      components:{
        scroll
      }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
