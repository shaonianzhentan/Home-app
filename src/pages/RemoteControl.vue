<template>
  <div id="remoteControl">

    <link href="//cdn.bootcss.com/Buttons/2.0.0/css/buttons.min.css" rel="stylesheet" />
    <link href="http:" rel="stylesheet">
    <div>
      <span class="button-wrap">
        <button class="button button-circle button-raised button-inverse" @click="reload">
          <i class="fa fa-home"></i>
        </button>
      </span>

      <span class="button-wrap fr">
        <button class="button button-circle button-raised button-caution" onclick="window.history.back()">
<i class="fa fa-power-off"></i>
        </button>
      </span>
    </div>

    <div style="text-align:center;padding:40px 0;">
      <div class="direction-panel">
        <button class="button button-primary button-box button-giant button-longshadow-right" data-up @click="music('random')">
          <i class="fa fa-circle-thin"></i>
        </button>
        <button class="button button-royal button-box button-giant button-longshadow-left" data-right @click="music('next')">
          <i class="fa fa-circle-thin"></i>
        </button>
        <button class="button button-royal button-box button-giant button-longshadow-right button-longshadow-expand" data-left @click="music('prev')">
          <i class="fa fa-circle-thin"></i>
        </button>
        <button class="button button-primary button-box button-giant button-longshadow-left" data-down>
          <i class="fa fa-circle-thin"></i>
        </button>
      </div>
    </div>
    <div style="margin: 0 auto;
          font-size:14px;
          text-align: center;
          background: #444;
          border-radius: 10px;
          line-height: 30px;color:#eee;font-family:幼圆;">
      智能遥控器
    </div>
    <p style="text-align:center;">
      <span class="button-wrap">
        <a class="button button-pill button-raised button-primary" @click="system('lock','显示屏保')">锁屏</a>
      </span>
    </p>
    <div style="text-align:center;">

      <span class="button-wrap">
        <button class="button button-circle button-raised button-inverse " @click="music('play')">
          <i class="fa fa-play"></i>
        </button>
      </span>
      &emsp;&emsp;
      <span class="button-wrap">
        <button class="button button-circle button-raised button-inverse " @click="music('pause')">
          <i class="fa fa-stop"></i>
        </button>
      </span>
    </div>

    <div style="text-align:center;padding-top:40px;">
      <span class="button-wrap">
        <button class="button button-circle button-raised button-inverse " @click="os('vol_down','减少音量')">
          <i class="fa fa-volume-down"></i>
        </button>
      </span>
      &emsp;&emsp;
      <span class="button-wrap">
        <button class="button button-circle button-raised button-inverse " @click="os('vol_up','增加音量')">
          <i class="fa fa-volume-up"></i>
        </button>
      </span>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {

    }
  },
  created () {

  },
  methods: {
    music (cmd) {
      this.$http.post(this.HomeService.api + 'music', { 'key': cmd }).then(data => {
        this.$toast('发送成功', 3000)
      })
    },
    os (cmd, msg) {
      this.$http.post(this.HomeService.api + 'os', { 'key': cmd }).then(data => {
        this.$toast('发送成功', 3000)
      })
    },
    reload () {
      this.$http.post(this.HomeService.api + 'program', { 'key': 'reload' }).then(data => {
        this.$toast('发送成功', 3000)
      })
    }
  }
}

</script>
<style scoped>

#remoteControl {
  padding: 50px;
  height: 100%;
  background: #1f1f1f;
}

.fr {
  float: right;
}

.fl {
  float: left;
}

.direction-panel {
  width: 175px;
  height: 160px;
  transform: rotate(45deg);
  margin: 0 auto;
}

.direction-panel button {
  margin-bottom: 20px;
  margin-right: 12px;
}

.direction-panel button:nth-child(1) {
  border-top-left-radius: 100%;
}

.direction-panel button:nth-child(2) {
  border-top-right-radius: 100%;
}

.direction-panel button:nth-child(3) {
  border-top-left-radius: 100%;
  transform: rotate(-90deg);
}

.direction-panel button:nth-child(4) {
  border-top-right-radius: 100%;
  transform: rotate(90deg);
}
</style>
