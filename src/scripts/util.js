export default {
  install (Vue, options) {
    class HomeService {
      constructor () {
        // this.api = localStorage['REMOTE-IP'] || 'http://127.0.0.1:8888/'
        this.api = 'http://' + location.host + '/'
        // this.api = 'http://localhost:8888/'
      }

      setapi (url) {
        this.api = url
        localStorage['REMOTE-IP'] = url
      }

      getapi (cb) {
        /*
        var _self = this
        var xmlHttp = new XMLHttpRequest()
        xmlHttp.open('GET', 这里本来是获取远端API的，根据自己需要开启, true)
        xmlHttp.send(null)
        xmlHttp.onreadystatechange = function () {
          if (xmlHttp.readyState === 4) {
            _self.setapi(xmlHttp.responseText)
            cb()
          }
        }
        */
        cb()
      }
    }

    let hs = new HomeService()
    Vue.prototype.HomeService = hs
  }
}
