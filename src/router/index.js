import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Message from '@/pages/Message'
import RemoteControl from '@/pages/RemoteControl'
import Clock from '@/pages/Clock'
import ClockAdd from '@/pages/ClockAdd'
import Music from '@/pages/Music'
import MusicAdd from '@/pages/MusicAdd'
import Picture from '@/pages/Picture'
import Camera from '@/pages/Camera'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Message',
      name: 'Message',
      component: Message
    },
    {
      path: '/RemoteControl',
      name: 'RemoteControl',
      component: RemoteControl
    },
    {
      path: '/Clock',
      name: 'Clock',
      component: Clock
    },
    {
      path: '/ClockAdd',
      name: 'ClockAdd',
      component: ClockAdd
    },
    {
      path: '/Music',
      name: 'Music',
      component: Music
    },
    {
      path: '/MusicAdd',
      name: 'MusicAdd',
      component: MusicAdd
    },
    {
      path: '/Picture',
      name: 'Picture',
      component: Picture
    },
    {
      path: '/Camera',
      name: 'Camera',
      component: Camera
    }
  ]
})
