<template>
<transition name="slide">
  <div class="singer-detail">
    <music-list :song="song" :title="title" :bg-image="bgImage"></music-list>
  </div>

</transition>
</template>

<script>
  import {mapGetters} from  'vuex'
  import {getSingerDetail} from '../../api/singer'
  import {ERR_OK} from '../../api/config'
  import {createSong} from '../../common/js/song'
  import musicList from '../music-list/music-list'
export default {
    data(){
      return{
        song:[]
      }
    },
    computed:{
      title(){
        return this.singer.name
      },
      bgImage(){
        return this.singer.avatar
      },
    ...mapGetters([
      'singer'
      ])
    },
    created(){
    this._getDetail()
  },
    methods:{
    _getDetail(){
      if(!this.singer.id){
        this.$router.push('/singer')
      }
      getSingerDetail(this.singer.id).then(res=>{
        if(res.code===ERR_OK){
          this.song=this.normalizeSongs(res.data.list)
          console.log(this.song)
        }
      })
    },
    normalizeSongs(list){
      let ret=[]
      list.forEach((item)=>{
        let {musicData}=item
        if(musicData.songid&&musicData.albumid){
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  },
    components:{
      musicList
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/variable.styl"
  .singer-detail
    position fixed
    z-index 100
    top 0
    left 0
    right 0
    bottom 0
    background $color-background

  .slide-enter-active,.slide-leave-active
    transition all .3s
  .slide-enter,.slide-leave-to
    transform translate3d(100%,0,0)
</style>
