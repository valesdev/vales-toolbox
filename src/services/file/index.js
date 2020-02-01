export default {
  install (Vue, options) {
    Vue.prototype.$file = this

    // 初始化
    this.fileInput = null
  },

  async selectImage ({ multiple = false, accept = '*/*' }) {
    return new Promise((resolve, reject) => {
      this.fileInput = window.document.createElement('input')
      this.fileInput.type = 'file'
      this.fileInput.accept = accept
      multiple && (this.fileInput.multiple = true)

      this.fileInput.onchange = event => {
        if (event.target.files.length <= 0) {
          reject(new Error('未选择文件'))
          return
        }

        if (!multiple) {
          resolve(event.target.files[0])
        } else {
          resolve(event.target.files)
        }
      }

      this.fileInput.dispatchEvent(new MouseEvent('click'))
    })
  },

  async blobToDataUrl ({ blob }) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
      reader.onabort = error => reject(error)
      reader.readAsDataURL(blob)
    })
  },

  async blobToBase64 ({ blob }) {
    return this.blobToDataUrl({ blob })
      .then(dataUrl => {
        const separator = ';base64,'
        return dataUrl.substring(dataUrl.indexOf(separator) + separator.length)
      })
  },

  async blobToString ({ blob, encoding = 'UTF-8' }) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = function () {
        resolve(this.result)
      }
      reader.readAsText(blob, encoding)
    })
  },

  async dataUrlToBlob ({ dataUrl }) {
    return new Promise((resolve, reject) => {
      const parts = dataUrl.split(',')
      const mimeType = parts[0].match(/:(.*?);/)[1]
      const encoded = atob(parts[1])
      const arr = new Uint8Array(encoded.length)
      let n = encoded.length
      while (n--) {
        arr[n] = encoded.charCodeAt(n)
      }
      resolve(new Blob([arr], { type: mimeType }))
    })
  },

  async stringToByteArray ({ string }) {
    return new Promise((resolve, reject) => {
      const byteNumbers = new Array(string.length)
      for (let i = 0; i < string.length; i++) {
        byteNumbers[i] = string.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      resolve(byteArray)
    })
  },

  async stringToBlob ({ string, type = 'application/octet-stream' }) {
    return this.stringToByteArray(string)
      .then(byteArray => {
        return new Blob([byteArray], { type })
      })
  },

  _getMimeTypeFromDataUrl ({ dataUrl }) {
    const matches = /^data:(.+?);/.exec(dataUrl)
    if (matches && matches[1]) {
      return matches[1]
    }
  }
}
