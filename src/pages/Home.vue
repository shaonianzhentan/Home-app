<template>
  <div>
    <mu-appbar title="家庭控制系统">
      <mu-icon-button icon="menu" slot="left" @click="toggle(true)" />
      <mu-icon-menu icon="more_vert" slot="right">
        <mu-menu-item title="拍照" to="/Camera" />
        <mu-menu-item title="消息" to="/Message" />
        <mu-menu-item title="截图" @click="program('screenshots')" />

      </mu-icon-menu>
    </mu-appbar>
    <br/><br/><br/>
    <mu-drawer :open="open" :docked="docked" @close="toggle(false)">
      <mu-appbar title="设置" />
      <mu-list>
        <mu-sub-header>开关设置</mu-sub-header>
        <mu-list-item disableRipple title="红外遥控开关" @click="toggleInfrared">
          <mu-switch v-model="infraredSwitch" disabled slot="right" :label="infraredSwitch?'开':'关'" labelLeft    />
        </mu-list-item>
      </mu-list>
 <mu-divider />
      <mu-list @itemClick="docked ? '' : toggle(false)">
        <mu-list-item title="校准时间" @click="os('date')" />
        <mu-divider />
        <mu-list-item title="重启程序" @click="os('reset')"/>
        <mu-list-item title="重启服务" @click="os('reset_service')"/>
         <mu-divider />
        <mu-list-item title="关机" @click="os('shutdown')" />
        <mu-list-item title="重启" @click="os('reboot')" />
                 <mu-divider />
        <mu-list-item title="刷新" onclick="location.reload()" />
      </mu-list>

    </mu-drawer>


  <mu-list>
            <mu-list-item title="语音命令">
      <mu-avatar icon="keyboard_voice" slot="leftAvatar" backgroundColor="black" />
      <span slot="describe">
        <mu-text-field hintText="控制命令" fullWidth v-model="mojing" @keyup.enter.native="sendvoice" />
      </span>
    </mu-list-item>
     <mu-divider />
    <mu-sub-header inset>系统信息</mu-sub-header>
    <mu-divider />
    <mu-list-item title="声音">
      <mu-avatar icon="settings_system_daydream" slot="leftAvatar" backgroundColor="#a4c639" />
      <mu-badge :content="SystemInfo.volume" primary slot="right" />
    </mu-list-item>
    <mu-list-item title="接口">
      <mu-avatar icon="settings_system_daydream" slot="leftAvatar" backgroundColor="#a4c639" />
      <span slot="describe">
        <mu-text-field hintText="API地址" fullWidth v-model="api" />
        <br/>
      </span>
      <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
        <mu-menu-item title="更新系统状态" @click="init" />
        <mu-menu-item title="获取远程API" @click="getapi" />
        <mu-menu-item title="设置本地API" @click="setapi" />
      </mu-icon-menu>
    </mu-list-item>
    <mu-list-item title="IP地址" v-bind:describeText="this.SystemInfo.ip">
      <mu-avatar icon="settings_system_daydream" slot="leftAvatar" backgroundColor="#a4c639" />
    </mu-list-item>
    <mu-list-item title="开机时间" v-bind:describeText="this.SystemInfo.BootTime">
      <mu-avatar icon="settings_system_daydream" slot="leftAvatar" backgroundColor="#a4c639" />
    </mu-list-item>
    <mu-list-item title="运行时间" v-bind:describeText="this.SystemInfo.ProgramTime">
      <mu-avatar icon="settings_system_daydream" slot="leftAvatar" backgroundColor="#a4c639" />
    </mu-list-item>
    <mu-list-item title="系统时间" v-bind:describeText="this.SystemInfo.ServerTime">
      <mu-avatar icon="settings_system_daydream" slot="leftAvatar" backgroundColor="#a4c639" />
    </mu-list-item>
  
  </mu-list>


  <mu-divider/>
  <mu-list>
    <mu-sub-header inset>设备信息</mu-sub-header>
    <mu-divider />
    <mu-list-item title="CPU温度">
      <mu-avatar icon="desktop_windows" slot="leftAvatar" backgroundColor="#7e57c2" />
      <mu-badge v-bind:content="SystemInfo.CPU_Temperature" slot="right" />
    </mu-list-item>
    <mu-list-item title="CPU使用率">
      <mu-avatar icon="desktop_windows" slot="leftAvatar" backgroundColor="#7e57c2" />
      <mu-badge v-bind:content="SystemInfo.CPU_Use" slot="right" />
    </mu-list-item>
    <mu-list-item title="内存总量">
      <mu-avatar icon="desktop_windows" slot="leftAvatar" backgroundColor="#7e57c2" />
      <mu-badge v-bind:content="SystemInfo.RAM_Total" slot="right" />
    </mu-list-item>
    <mu-list-item title="内存使用量">
      <mu-avatar icon="desktop_windows" slot="leftAvatar" backgroundColor="#7e57c2" />
      <mu-badge v-bind:content="SystemInfo.RAM_Used" slot="right" />
    </mu-list-item>
    <mu-list-item title="内存空闲量">
      <mu-avatar icon="desktop_windows" slot="leftAvatar" backgroundColor="#7e57c2" />
      <mu-badge v-bind:content="SystemInfo.RAM_Free" slot="right" />
    </mu-list-item>
    <mu-list-item title="磁盘总量">
      <mu-avatar icon="desktop_windows" slot="leftAvatar" backgroundColor="#7e57c2" />
      <mu-badge v-bind:content="SystemInfo.DISK_Total_Space" slot="right" />
    </mu-list-item>
    <mu-list-item title="磁盘使用量">
      <mu-avatar icon="desktop_windows" slot="leftAvatar" backgroundColor="#7e57c2" />
      <mu-badge v-bind:content="SystemInfo.DISK_Used_Space" slot="right" />
    </mu-list-item>
    <mu-list-item title="磁盘空闲量">
      <mu-avatar icon="desktop_windows" slot="leftAvatar" backgroundColor="#7e57c2" />
      <mu-badge v-bind:content="SystemInfo.DISK_Used_Percentage" slot="right" />
    </mu-list-item>
  </mu-list>
  <mu-divider/>

      <mu-list>
        <mu-sub-header inset>程序信息</mu-sub-header>
<mu-divider />
          <mu-list-item title="相册超时">
              <mu-avatar icon="settings_applications" slot="leftAvatar" backgroundColor="blue" />
            <mu-badge content="0秒" slot="right" />
          </mu-list-item>
        <mu-list-item title="操作状态" v-bind:describeText="this.SystemInfo.MusicStatus">
          <mu-avatar icon="settings_applications" slot="leftAvatar" backgroundColor="blue" />
        </mu-list-item>
        <mu-list-item title="页面标题" v-bind:describeText="this.SystemInfo.MusicTitle">
          <mu-avatar icon="settings_applications" slot="leftAvatar" backgroundColor="blue" />
        </mu-list-item>
        <mu-list-item title="页面链接" v-bind:describeText="this.SystemInfo.MusicUrl">
          <mu-avatar icon="settings_applications" slot="leftAvatar" backgroundColor="blue" />
        </mu-list-item>
                <mu-list-item title="操作时间" v-bind:describeText="this.SystemInfo.MusicTime">
          <mu-avatar icon="settings_applications" slot="leftAvatar" backgroundColor="blue" />
        </mu-list-item>
      </mu-list>

<mu-card>
   <mu-card-header title="程序截图" >
  </mu-card-header>
  <mu-card-media>
    <img :src="SystemInfo.screenshots"/>
  </mu-card-media>
   <mu-card-actions>
    <mu-flat-button label="查看" :href="SystemInfo.screenshots" target="_blank" />
  </mu-card-actions>
</mu-card>


    <br/><br/><br/>
    <mu-bottom-nav :value="bottomNav" class="footerFixed" shift @change="handleChange">
      <mu-bottom-nav-item value="list" title="状态" icon="grid_on" />
      <mu-bottom-nav-item value="music" title="音乐" icon="queue_music" to="Music" />
      <mu-bottom-nav-item value="computer" title="遥控器" icon="control_point" to="RemoteControl" />
      <mu-bottom-nav-item value="pictures" title="图片" icon="photo" to="Picture" />
      <mu-bottom-nav-item value="access_time" title="时钟" icon="access_time" to="Clock" />
    </mu-bottom-nav>
  </div>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      bottomNav: 'movies',
      bottomNavColor: 'movies',
      SystemInfo: {},
      open: false,
      docked: true,
      api: '',
      mojing: '',
      infraredSwitch: false
    }
  },
  watch: {
    api () {
      this.HomeService.setapi(this.api)
    }
  },
  created () {
    this.init()
  },
  methods: {
    handleChange (val) {
      this.bottomNav = val
    },
    toggle (flag) {
      this.open = !this.open
      this.docked = !flag
    },
    init () {
      this.$emit('loading', true)
      this.api = this.HomeService.api
      this.$http.post(this.HomeService.api + 'os', { 'key': 'status' }).then(res => {
        this.$emit('loading', false)
        this.SystemInfo = res.body

        var EndTimeMsg = parseInt(new Date(this.SystemInfo.ServerTime) - new Date(this.SystemInfo.BootTime)) / 1000
        var h = Math.floor(EndTimeMsg / 60 / 60)
        var m = Math.floor((EndTimeMsg - h * 60 * 60) / 60)
        var s = Math.floor(EndTimeMsg - h * 60 * 60 - m * 60)
        this.SystemInfo.ProgramTime = parseInt(h / 24) + '天' + h + '时' + m + '分' + s + '秒'

        this.infraredSwitch = this.SystemInfo['infraredSwitch'] === '开'
        localStorage['LOCAL-IP'] = this.SystemInfo['ip']
        this.$toast('获取状态信息成功', 3000)
        console.log(res.body)
      }).catch(ex => {
        this.$emit('loading', false)
        this.$toast('出现错误', 3000)
      })
    },
    getapi () {
      this.HomeService.getapi(() => {
        this.api = this.HomeService.api
      })
    },
    setapi () {
      this.api = 'http://' + (localStorage['LOCAL-IP'] || '192.168.3.102') + ':8888/'
    },
    toggleInfrared () {
      this.toggle(false)
      this.$http.post(this.HomeService.api + 'os', { 'key': 'infrared', 'value': this.infraredSwitch ? '关' : '开' }).then(res => {
        this.infraredSwitch = !this.infraredSwitch
        this.$toast(res.body, 3000)
      })
    },
    os (key) {
      this.$confirm('确定执行？').then(() => {
        this.$http.post(this.HomeService.api + 'os', { 'key': key }).then(res => {
          this.$toast(res.body, 3000)
        })
      }).catch(() => {

      })
    },
    program (key) {
      this.$confirm('确定执行？').then(() => {
        this.$http.post(this.HomeService.api + 'program', { 'key': key }).then(res => {
          this.$toast(res.body, 3000)
        })
      }).catch(() => {

      })
    },
    sendvoice () {
      var msg = this.mojing
      if (msg === '') return
      this.mojing = ''
      this.$http.post(this.HomeService.api + 'program', { 'key': 'sendvoice', 'value': msg }).then(res => {
        this.$toast(res.body, 3000)
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

#app .footerFixed{
  position: fixed;
  bottom: 0;
}
</style>
