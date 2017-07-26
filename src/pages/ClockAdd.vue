<template>
  <div>
    <mu-appbar title="添加闹钟">
      <mu-icon-button icon="arrow_back" slot="left" to="/Clock" />

    </mu-appbar>
<br/><br/><br/>


  <mu-list>
    <mu-sub-header>CLOCK ADD</mu-sub-header>
    <mu-list-item title="选择时间">
      <mu-avatar icon="access_time" slot="leftAvatar" backgroundColor="red" />
      <span slot="describe">
         <mu-time-picker hintText="24小时制" format="24hr" fullWidth v-model="item.time" />
      </span>
    </mu-list-item>
    <mu-divider />
   <mu-list-item title="铃声">
      <mu-avatar icon="access_time" slot="leftAvatar" backgroundColor="red" />
      <span slot="describe">
        <mu-auto-complete hintText="输入铃声链接" fullWidth  v-model="item.voice" @input="handleInput" :dataSource="dataSource"/>
        <br/>
      </span>
    </mu-list-item>
  </mu-list>

    <mu-raised-button class="demo-raised-button" label="保 存" icon="save"
    @click="save"
     primary fullWidth style="position:fixed;bottom:0;"/>
  </div>

</template>

<script>
export default {
  name: 'music',
  data () {
    return {
      item: {
        id: '',
        time: '',
        voice: '',
        count: 0
      },
      dataSource: []
    }
  },
  methods: {
    save () {
      if (this.item.time !== '') {
        this.$http.post(this.HomeService.api + 'clock', { 'key': 'save', 'value': this.item }).then(res => {
          // alert(res.body)
          this.$toast('保存成功', 3000)
          this.item['time'] = ''
          this.item['voice'] = ''
        })
      }
    },
    handleInput (val) {
      this.dataSource = [
        'http://ngcdn001.cnr.cn/live/zgzs/index.m3u8',
        'http://ngcdn002.cnr.cn/live/jjzs/index.m3u8',
        'http://ngcdn003.cnr.cn/live/yyzs/index.m3u8',
        'http://ngcdn010.cnr.cn/live/wyzs/index.m3u8',
        'http://ngcdn004.cnr.cn/live/dyzs/index.m3u8'
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
