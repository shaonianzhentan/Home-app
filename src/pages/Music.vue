<template>
  <div>
    <mu-appbar title="音乐">
      <mu-icon-button icon="arrow_back" slot="left" to="/" />
      <mu-icon-menu icon="more_vert" slot="right">
        <mu-menu-item title="添加" to="/MusicAdd" />
        <mu-menu-item title="遥控器" to="/RemoteControl" />
      </mu-icon-menu>
    </mu-appbar>
    <br /><br /><br />
      <mu-list v-for="k in list">
        <mu-sub-header>{{k.k}}</mu-sub-header>
        <template v-for="item in k.v">
          <mu-list-item :title="item.title">
          <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
            <mu-menu-item title="播放" @click="load(item.link)" />
            <mu-menu-item title="编辑" @click="edit(item)" />
            <mu-menu-item title="预览" target="_blank" v-bind:href="item.link" />
            <mu-menu-item title="删除" @click="del(item)" />
          </mu-icon-menu>
          <mu-avatar color="purple500" :style="{'margin-left': '-8px'}" backgroundColor="transparent" slot="leftAvatar">
          {{item.title[0]}}</mu-avatar>
          </mu-list-item>
           <mu-divider inset/>
</template>

      </mu-list>
  </div>
</template>


<script>

export default {
  name: 'music',
  data () {
    return {
      list: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.$emit('loading', true)
      this.$http.post(this.HomeService.api + 'music', { 'key': 'get' }).then(res => {
        this.list = []
        this.$toast('获取信息成功', 3000)
        var music = {}
        res.body.forEach((ele) => {
          if (!music[ele.type]) {
            music[ele.type] = []
          }
          music[ele.type].push(ele)
        })
        for (var k in music) {
          this.list.push({
            k: k,
            v: music[k]
          })
        }
        console.log(this.list)
        this.$emit('loading', false)
      })
      localStorage.removeItem('FM-DATA')
    },
    load (link) {
      this.$emit('loading', true)
      var _self = this
      this.$http.post(this.HomeService.api + 'music', { 'key': 'load', 'value': link }).then(res => {
        // alert(res.body)
        setTimeout(() => {
          this.$toast('开始播放', 3000)
          _self.$emit('loading', false)
        }, 5000)
        this.$toast('载入链接成功，5秒后播放', 4000)
        console.log(res.body)
      })
    },
    del (item) {
      if (confirm('确定删除？')) {
        this.$http.post(this.HomeService.api + 'music', { 'key': 'del', 'value': item.id }).then(res => {
          console.log(res.body)
          this.$toast('删除成功', 3000)
          this.init()
        })
      }
    },
    edit (item) {
      this.$router.push({ name: 'MusicAdd', params: item })
    },
    play () {
      this.$http.post(this.HomeService.api + 'music', { 'key': 'play' }).then(data => {
        this.$emit('loading', false)
        this.$toast('播放', 3000)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.mu-paper {
  padding: 60px 0;
  height:100%;
}

.mu-appbar {
  position: fixed;
  top: 0;
}

.mu-bottom-nav {
  position: fixed;
  bottom: 0;
}
</style>
