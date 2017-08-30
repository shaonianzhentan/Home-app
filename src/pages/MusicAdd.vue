<template>
  <div>
    <mu-appbar title="添加音乐">
      <mu-icon-button icon="arrow_back" slot="left" to="/Music" />

    </mu-appbar>
<br /><br /><br />

  <mu-list>
    <mu-sub-header>MUSIC ADD</mu-sub-header>
   <mu-list-item title="标题">
      <mu-avatar icon="music_note" slot="leftAvatar" backgroundColor="purple500" />
      <span slot="describe">
          <mu-text-field hintText="输入音乐标题" fullWidth v-model="item.title" /><br/>
      </span>
    </mu-list-item>
    <mu-divider />
   <mu-list-item title="歌单ID">
      <mu-avatar icon="music_note" slot="leftAvatar" backgroundColor="purple500" />
      <span slot="describe">
          <mu-text-field hintText="输入歌单ID" fullWidth v-model="item.link" /><br/>
      </span>
    </mu-list-item>

    <mu-divider />
   <mu-list-item title="类型">
      <mu-avatar icon="music_note" slot="leftAvatar" backgroundColor="purple500" />
      <mu-select-field v-model="item.type" fullWidth>        
        <mu-menu-item value="网易云音乐" title="网易云音乐" />
      </mu-select-field>
   </mu-list-item>
  </mu-list>



    <mu-raised-button class="demo-raised-button" label="保 存" icon="save" primary fullWidth
    @click="save"
    style="position:fixed;bottom:0;"/>
  </div>

</template>


<script>

export default {
  name: 'music',
  data () {
    return {
      item: {
        id: '',
        type: '网易云音乐',
        title: '',
        link: ''
      }
    }
  },
  created: function () {
    console.log(1)
  },
  mounted: function () {
    var item = this.$route.params
    console.log('edit', item)
    if (item['id']) {
      this.item = item
    }
  },
  methods: {
    save () {
      if (this.item.title !== '' && this.item.link !== '') {
        this.$http.post(this.HomeService.api + 'music', { 'key': 'save', 'value': this.item }).then(res => {
          // alert(res.body)
          if (this.item.id) {
            this.$router.push({ name: 'Music' })
            return
          }

          this.$toast('保存成功', 3000)
          this.item = {
            title: '',
            link: ''
          }
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
