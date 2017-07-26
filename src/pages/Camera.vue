<template>
  <div>
    <mu-appbar title="相机">
      <mu-icon-button icon="arrow_back" slot="left" to="/" />
    </mu-appbar>
    <br />
    <mu-card>
      <mu-card-media>
        <img :src="image" style="    transform: rotate(180deg);" />
      </mu-card-media>
      <mu-card-actions>
        <mu-flat-button label="拍照" @click="qiezi" />
        <mu-flat-button label="视频" />
      </mu-card-actions>
    </mu-card>
  </div>
</template>


<script>

export default {
  name: 'camera',
  data () {
    return {
      image: ''
    }
  },
  created () {
    if (localStorage['CameraDefaultImage'] != null) {
      this.image = localStorage['CameraDefaultImage']
    }
  },
  methods: {
    qiezi () {
      this.$http.post(this.HomeService.api + 'os', {'key': 'picture'}).then(res => {
        this.image = res.body
        localStorage['CameraDefaultImage'] = this.image
        this.$toast('获取图片成功', 3000)
      })
      this.$alert('拍照成功，正在获取数据中...')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
