<template>
  <div>
    <mu-appbar title="闹钟">
      <mu-icon-button icon="arrow_back" slot="left" to="/" />
      <mu-icon-menu icon="more_vert" slot="right">
        <mu-menu-item title="报时" @click="baoshi" />
        <mu-menu-item title="添加" to="/ClockAdd" />
      </mu-icon-menu>
    </mu-appbar>
    <br/><br/><br/>
    <mu-list>
      <mu-sub-header>CLOCK</mu-sub-header>
      <template v-for="item in list">
        <mu-list-item :title="item.time" v-bind:key="item.id">
          <mu-avatar icon="access_time" slot="leftAvatar" backgroundColor="red" />
          <span slot="describe">
            {{item.voice}}
          </span>
          <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
            <mu-menu-item title="删除" @click="del(item)" />
          </mu-icon-menu>
        </mu-list-item>
        <mu-divider v-bind:key="item.id" />
      </template>

    </mu-list>

  </div>
</template>


<script>

export default {
  name: 'home',
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
      this.$http.post(this.HomeService.api + 'clock', { 'key': 'get' }).then(res => {
        this.list = res.body
        this.$toast('获取信息成功', 3000)
        console.log(res.body)
      })
    },
    del (item) {
      if (confirm('确认删除？')) {
        this.$http.post(this.HomeService.api + 'clock', { 'key': 'del', 'value': { id: item.id } }).then(res => {
          // alert(res.body)
          this.$toast('删除成功', 3000)
          this.init()
        })
      }
    },
    baoshi () {
      this.$http.post(this.HomeService.api + 'clock', { 'key': 'baoshi', 'value': 'test' }).then(res => {
        // alert(res.body)
        this.$toast('报时成功', 3000)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
