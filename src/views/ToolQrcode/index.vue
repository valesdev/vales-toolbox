<template>
  <main>
    <h2>二维码生成</h2>
    <hr />

    <div class="row">
      <div class="col-md-8">
        <template v-if="batch === false">
          <div class="row">
            <div class="col-8 col-lg-9">
              <div class="mb-3">
                <label class="form-label">Content</label>
                <textarea rows="6" class="form-control font-monospace" v-model="content" placeholder="QR Code content" />
              </div>
            </div>

            <div class="col-4 col-lg-3">
              <div class="mb-3">
                <label class="form-label">Preview</label>
                <div>
                  <template v-if="previewImageUrl !== null">
                    <img :src="previewImageUrl" style="display: block; width: 100%; height: auto;" />
                  </template>
                  <template v-else>
                    <span class="text-muted">No content entered.</span>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template v-if="batch === true">
          <div class="row">
            <div class="col-12 col-xl-6">
              <div class="mb-3">
                <label class="form-label">Content(s)</label>
                <textarea rows="9" class="form-control font-monospace" v-model="contents" placeholder="QR Code content list, one entry per line. e.g.:&NewLine;https://www.bing.com/&NewLine;https://www.duckduckgo.com/&NewLine;https://www.wolframalpha.com/" />
              </div>
            </div>

            <div class="col-12 col-xl-6">
              <div class="mb-3">
                <label class="form-label">File name(s)</label>
                <textarea rows="9" class="form-control font-monospace" v-model="names" placeholder="The file name list, one entry per line. e.g.:&NewLine;Bing&NewLine;DuckDuckGo&NewLine;WolframAlpha" />
              </div>
            </div>
          </div>
        </template>
      </div>

      <div class="col-md-4">
        <div class="row">
          <div class="col-6 col-md-12 col-xl-6">
            <div class="mb-3">
              <label class="form-label">Batch generation</label>
              <div>
                <div class="form-check form-check-inline">
                  <label class="form-check-label">
                    <input type="radio" class="form-check-input" v-model="batch" :value="true" /> Yes
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <label class="form-check-label">
                    <input type="radio" class="form-check-input" v-model="batch" :value="false" /> No
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="col-6 col-md-12 col-xl-6">
            <div class="mb-3">
              <label class="form-label">Error correction level</label>
              <select class="form-select" v-model="errorCorrectionLevel">
                <option value="L">L – up to ~7% damage</option>
                <option value="M">M – up to ~15% damage</option>
                <option value="Q">Q – up to ~25% damage</option>
                <option value="H">H – up to ~30% damage</option>
              </select>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-6 col-md-12 col-xl-6">
            <div class="mb-3">
              <label class="form-label">Image width</label>
              <div class="input-group">
                <input type="number" class="form-control" v-model.number="width" step="1" min="64" max="1024" />
                <span class="input-group-text">pixels</span>
              </div>
            </div>
          </div>

          <div class="col-6 col-md-12 col-xl-6">
            <div class="mb-3">
              <label class="form-label">Quite zone</label>
              <div class="input-group">
                <input type="number" class="form-control" v-model.number="margin" step="1" min="0" max="16" />
                <span class="input-group-text">dots</span>
              </div>
            </div>
          </div>
        </div>

        <!--
        <div class="mb-3">
          <label class="form-label">Scale</label>
          <div class="input-group">
            <input type="number" class="form-control" v-model.number="scale" step="1" min="1" max="16" />
            <span class="input-group-text">px per dots</span>
          </div>
        </div>
        -->

        <div class="row">
          <div class="col-6 col-md-12 col-xl-6">
            <div class="mb-3">
              <label class="form-label">Foreground color</label>
              <input type="color" class="form-control form-control-color" v-model="fgColor" />
            </div>
          </div>

          <div class="col-6 col-md-12 col-xl-6">
            <div class="mb-3">
              <label class="form-label">Background color</label>
              <input type="color" class="form-control form-control-color" v-model="bgColor" />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-6 col-md-12 col-xl-6">
            <div class="mb-3">
              <label class="form-label">Overlay image</label>
              <form-file v-model="overlay" accept="image/*" />
            </div>
          </div>

          <div class="col-6 col-md-12 col-xl-6">
            <div class="mb-3">
              <label class="form-label">Image format</label>
              <select class="form-select" v-model="format">
                <option value="image/png">PNG</option>
                <option value="image/jpeg">JPEG</option>
                <option value="image/webp">webP</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <a href="javascript:void(0);" class="btn btn-secondary" @click="toExport">
            <template v-if="batch === false">Export as {{ formatLabel }} file</template>
            <template v-else>Export {{ previewCount }} {{ formatLabel }} file(s) as ZIP archive</template>
          </a>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Files from 'file-promisify'
import FileSaver from 'file-saver'
import JSZip from 'jszip'
import QRCode from 'qrcode'

export default {
  data () {
    return {
      batch: false,
      content: '',
      previewImageUrl: null,
      previewCount: 0,
      contents: '',
      names: '',
      format: 'image/png',
      errorCorrectionLevel: 'L',
      scale: 0,
      margin: 0,
      width: 512,
      fgColor: '#000000',
      bgColor: '#ffffff',
      overlay: null
    }
  },
  watch: {
    content () {
      this._previewSingle()
    },
    contents () {
      this._previewMultiple()
    },
    format () {
      this._previewSingle()
    },
    errorCorrectionLevel () {
      this._previewSingle()
    },
    scale () {
      this._previewSingle()
    },
    margin () {
      this._previewSingle()
    },
    width () {
      this._previewSingle()
    },
    fgColor () {
      this._previewSingle()
    },
    bgColor () {
      this._previewSingle()
    },
    overlay () {
      this._previewSingle()
    }
  },
  computed: {
    formatLabel () {
      switch (this.format) {
        case 'image/png': return 'PNG'
        case 'image/jpeg': return 'JPG'
        case 'image/webp': return 'WEBP'
        default: return '(unknown format)'
      }
    },
    formatFileSuffix () {
      switch (this.format) {
        case 'image/png': return '.png'
        case 'image/jpeg': return '.jpg'
        case 'image/webp': return '.webp'
        default: return ''
      }
    }
  },
  methods: {
    toExport () {
      if (this.batch === false) {
        return this._submitSingle()
      } else {
        return this._submitMultiple()
      }
    },

    _submitSingle () {
      if (typeof this.content !== 'string' || this.content.length <= 0) {
        window.alert('No content entered.')
        return
      }

      return this._stringToQrcodeDataUrl(this.content)
        .then(dataUrl => {
          return Files.dataUrlToBlob(dataUrl)
        })
        .then(blob => {
          FileSaver.saveAs(blob, `qrcode${this.formatFileSuffix}`)
        })
    },

    _submitMultiple () {
      if (typeof this.contents !== 'string' || this.contents.length <= 0) {
        window.alert('No contents entered.')
        return
      }

      const _contents = this.contents.split('\n').filter(el => el.length > 0)
      const _names = this.names.split('\n').filter(el => el.length > 0)

      const contents = []
      const names = []

      for (let i = 0; i < _contents.length; i++) {
        if (typeof _contents[i] === 'string' && _contents[i].length >= 1) {
          contents.push(_contents[i])
          names.push(
            typeof _names[i] === 'string' && _names[i].length >= 1
              ? _names[i]
              : `qrcode-${this._padStart(String(i + 1), 2, '0')}`
          )
        }
      }

      if (contents.length <= 0) {
        window.alert('No contents entered.')
        return
      }

      return new Promise((resolve, reject) => {
        this._walkArray(contents, (_, index, callback) => {
          this._stringToQrcodeDataUrl(contents[index])
            .then(dataUrl => {
              return Files.dataUrlToBlob(dataUrl)
            })
            .then(blob => {
              callback(null, { blob, name: names[index] })
            })
            .catch(error => {
              callback(error, null)
            })
        }, (error, results) => {
          if (error) {
            reject(error)
            return
          }
          resolve(results)
        })
      })
        .then(results => {
          const zip = new JSZip()
          for (let i = 0; i < results.length; i++) {
            zip.file(`${results[i].name}${this.formatFileSuffix}`, results[i].blob)
          }

          return zip.generateAsync({ type: 'blob' })
            .then(blob => {
              FileSaver.saveAs(blob, 'qrcodes.zip')
            })
        })
    },

    _previewSingle () {
      if (typeof this.content !== 'string' || this.content.length <= 0) {
        this.previewImageUrl = null
        return
      }

      return this._stringToQrcodeDataUrl(this.content)
        .then(dataUrl => {
          this.previewImageUrl = dataUrl
        })
    },

    _previewMultiple () {
      if (typeof this.contents !== 'string' || this.contents.length <= 0) {
        this.previewCount = 0
        return
      }

      this.previewCount = this.contents.split('\n').filter(el => el.length > 0).length
    },

    _stringToQrcodeDataUrl (content) {
      return QRCode.toCanvas(content, {
        errorCorrectionLevel: this.errorCorrectionLevel,
        scale: this.scale,
        margin: this.margin,
        width: this.width,
        color: {
          dark: this.fgColor,
          light: this.bgColor
        }
      })
        .then(canvas => {
          if (this.overlay !== null) {
            return Promise.resolve(this.overlay)
              .then(blob => Files.blobToDataUrl(blob))
              .then(dataUrl => Files.urlToImage(dataUrl))
              .then(image => canvas.getContext('2d').drawImage(image, canvas.width * 0.36, canvas.height * 0.36, canvas.width * 0.28, canvas.height * 0.28))
              .then(() => canvas)
          }
          return canvas
        })
        .then(canvas => {
          return canvas.toDataURL(this.format)
        })
    },

    _padStart (input, length, string) {
      let ret = String(input)
      while (ret.length < (length || 0)) {
        ret = `${string}${ret}`
      }
      return ret
    },

    _walkArray (array, iteratee, callback) {
      let cur = 0
      const results = []

      const resolve = function (result) {
        results.push(result)
        cur++
        if (cur < array.length) {
          // continue walking
          walk()
        } else {
          // end when all elements walked
          callback(null, results)
        }
      }

      const reject = function (error) {
        // end immediately when error occurred
        callback(error, results)
      }

      const walk = function () {
        iteratee(array[cur], cur, function (error, result) {
          if (error) {
            reject(error)
            return
          }
          resolve(result)
        })
      }

      walk()
    }
  }
}
</script>
