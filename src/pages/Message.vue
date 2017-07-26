<template>
  <div>
    <mu-appbar title="消息">
      <mu-icon-button icon="arrow_back" slot="left" to="/" />
      <mu-icon-menu icon="more_vert" slot="right">
        <mu-menu-item title="消息" @click="handleTabChange('tab1')" />
        <mu-menu-item title="语音" @click="handleTabChange('tab2')" />
      </mu-icon-menu>
    </mu-appbar>

    <mu-list>
      <mu-sub-header inset>Message</mu-sub-header>
      <mu-list-item title="发送信息" describeText="Jan 20, 2014">
        <mu-avatar icon="message" backgroundColor="yellow" slot="leftAvatar" />
        <mu-icon value="info" slot="right" />
      </mu-list-item>
      <mu-list-item v-bind:title="item.msg" :describeText="item.date" v-for="(item,index) in list" :key="index">
        <mu-avatar icon="message" backgroundColor="blue" slot="leftAvatar" />
        <mu-icon value="info" slot="right" />
      </mu-list-item>
    </mu-list>

    <div class="footer-fixed" v-if="activeTab === 'tab1'">
      <mu-divider />
      <mu-text-field hintText="消息" type="text" icon="comment" v-model="msg" @keyup.enter.native="send" fullWidth />
    </div>

    <div class="footer-fixed" v-if="activeTab === 'tab2'">
      <mu-raised-button class="demo-raised-button" label="发送" icon="email" backgroundColor="#a4c639" fullWidth @click="sendFile" />
      <audio id="audio" controls style="margin:0 auto;width:100%;"></audio>
      <mu-raised-button class="demo-raised-button" v-bind:label="isStart?'停止录音'+time+'S':'开始录音'" @click="recored" icon="settings_voice" primary fullWidth/>
    </div>
  </div>
</template>

<script>
import MP3Recorder from '../scripts/recorder.js'

export default {
  data () {
    return {
      activeTab: 'tab1',
      msg: '',
      list: [],
      recorder: null,
      isStart: false,
      timer: null,
      time: 0,
      formData: null
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      var _self = this
      this.recorder = new MP3Recorder({
        // numChannels: 1,     // 声道数,默认为1
        // sampleRate: 8000,   // 采样率,一般由设备提供,比如 48000
        bitRate: 64,        // 比特率,不要低于64,否则可能录制无声音（人声）

        // 录音结束事件
        complete: function (data, type) {
          console.log('complete')
          var blob = new Blob(data, { type: type })
          var url = URL.createObjectURL(blob)
          var mp3Name = 'recording_' + Date.now() + '.mp3'
          document.querySelector('#audio').setAttribute('src', url)
          console.log(url, mp3Name)
          _self.time = 0

          var form = new FormData()
          form.append('mp3', blob)
          _self.formData = form
        }
      })
      console.log('初始化成功')
    },
    handleTabChange (val) {
      this.activeTab = val
    },
    send () {
      var msg = this.msg
      console.log(msg)
      if (msg === '') return
      this.program('speak', msg)
      this.list.push({msg: msg, date: (new Date()).toLocaleTimeString()})
      this.msg = ''
    },
    recored () {
      if (!this.recorder.support) {
        this.$toast('当前设备不支持录音！', 3000)
        return
      }
      this.isStart = !this.isStart
      if (this.isStart) {
        // 开始录音
        console.log('start')
        this.recorder.start(() => {
          this.timer = setInterval(() => {
            this.time += 1
          }, 1000)
        }, function (e) {
          console.log(e)
        })
      } else {
        // 停止录音
        console.log('stop')
        this.recorder.stop()
        if (this.timer) clearInterval(this.timer)
      }
    },
    sendFile () {
      this.$toast('发送语音信息！', 3000)
      this.$http.post('http://23.105.217.23/recored', this.formData).then(response => {
        this.program('voice', 'http://23.105.217.23/recored/' + response.body)
      }, error => {
        console.log(error)
      })
    },
    program (k, v) {
      this.$http.post(this.HomeService.api + 'program', { 'key': k, 'value': v }).then(res => {
        this.$toast(res.body, 3000)
      })
    }
  }
}

</script>

<style scoped>
.mu-paper {
  padding: 60px 0;
  height: 100%;
  overflow: auto;
}

.mu-appbar {
  position: fixed;
  top: 0;
}

.footer-fixed {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: white;
}

video{width:100%;}
</style>
