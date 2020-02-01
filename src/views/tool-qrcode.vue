<template>
  <div>

    <div class="row">

      <div class="col-md-8">

        <div class="form-group">
          <div>
            <label>Multiple</label>
          </div>
          <div class="form-check form-check-inline">
            <label class="form-check-label">
              <input type="radio" class="form-check-input" v-model="multiple" :value="true"> Yes
            </label>
          </div>
          <div class="form-check form-check-inline">
            <label class="form-check-label">
              <input type="radio" class="form-check-input" v-model="multiple" :value="false"> No
            </label>
          </div>
        </div>

        <template v-if="multiple === false">

          <div class="row">

            <div class="col-md-6">
              <p>Content</p>
              <p>
                <textarea rows="3" class="form-control" v-model="content" placeholder="QR Code content goes here." />
              </p>
            </div>

            <div class="col-md-6">
              <p>Preview</p>
              <p>
                <img :src="previewImageUrl" style="display: block; width: 100%; height: auto;" />
              </p>
            </div>

          </div>

        </template>

        <template v-if="multiple === true">

          <div class="row">

            <div class="col-md-6">
              <p>Content(s)</p>
              <p>
                <textarea rows="5" class="form-control" v-model="contents" placeholder="QR Code content goes here, one qr per line." />
              </p>
            </div>

            <div class="col-md-6">
              <p>Name(s)</p>
              <p>
                <textarea rows="5" class="form-control" v-model="names" placeholder="The name, one name per line." />
              </p>
            </div>

          </div>

        </template>

      </div>

      <div class="col-md-4">

        <div class="form-group">
          <div>
            <label>Error correction level</label>
          </div>
          <div class="form-check form-check-inline">
            <label class="form-check-label">
              <input type="radio" class="form-check-input" v-model="errorCorrectionLevel" value="L"> L
            </label>
          </div>
          <div class="form-check form-check-inline">
            <label class="form-check-label">
              <input type="radio" class="form-check-input" v-model="errorCorrectionLevel" value="M"> M
            </label>
          </div>
          <div class="form-check form-check-inline">
            <label class="form-check-label">
              <input type="radio" class="form-check-input" v-model="errorCorrectionLevel" value="Q"> Q
            </label>
          </div>
          <div class="form-check form-check-inline">
            <label class="form-check-label">
              <input type="radio" class="form-check-input" v-model="errorCorrectionLevel" value="H"> H
            </label>
          </div>
        </div>

        <div class="row">

          <div class="col-md-6">

            <div class="form-group">
              <div>
                <label>Image width</label>
              </div>
              <div class="input-group mb-3">
                <input type="number" class="form-control" v-model.number="width" step="1" min="64" max="1024" />
                <div class="input-group-append">
                  <span class="input-group-text">px</span>
                </div>
              </div>
            </div>

          </div>

          <div class="col-md-6">

            <div class="form-group">
              <div>
                <label>Margin</label>
              </div>
              <div class="input-group mb-3">
                <input type="number" class="form-control" v-model.number="margin" step="1" min="1" max="16" />
                <div class="input-group-append">
                  <span class="input-group-text">times</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        <!--
        <div class="form-group">
          <div>
            <label>Scale</label>
          </div>
          <div class="input-group mb-3">
            <input type="number" class="form-control" v-model.number="scale" step="1" min="1" max="16" />
            <div class="input-group-append">
              <span class="input-group-text">px</span>
            </div>
          </div>
        </div>
        -->

        <p>
          <a href="javascript:void(0);" class="btn btn-secondary" @click="toExport">
            <template v-if="multiple === false">Export PNG</template>
            <template v-else>Export {{ previewCount }} PNG(s) as ZIP archive</template>
          </a>
        </p>

      </div>

    </div>

  </div>
</template>

<script>
import FileSaver from 'file-saver'
import JSZip from 'jszip'
import QRCode from 'qrcode'
export default {
  data () {
    return {
      multiple: false,
      content: '',
      previewImageUrl: null,
      previewCount: 0,
      contents: '',
      names: '',
      errorCorrectionLevel: 'L',
      width: 512,
      margin: 2,
      scale: 4
    }
  },
  watch: {
    content () {
      this._previewSingle()
    },
    contents () {
      this._previewMultiple()
    },
    errorCorrectionLevel () {
      this._previewSingle()
    },
    width () {
      this._previewSingle()
    },
    margin () {
      this._previewSingle()
    },
    scale () {
      this._previewSingle()
    }
  },
  methods: {

    toExport () {
      if (this.multiple === false) {
        return this._submitSingle()
      } else {
        return this._submitMultiple()
      }
    },

    _submitSingle () {
      if (typeof this.content !== 'string' || this.content.length <= 0) {
        window.alert('No content provided.')
        return
      }

      return this._generateDataUrl(this.content)
        .then(dataUrl => {
          return this.$file.dataUrlToBlob({ dataUrl })
        })
        .then(blob => {
          FileSaver.saveAs(blob, 'qrcode.png')
        })
    },

    _submitMultiple () {
      if (typeof this.contents !== 'string' || this.contents.length <= 0) {
        window.alert('No contents provided.')
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
        window.alert('No contents provided.')
        return
      }

      return new Promise((resolve, reject) => {
        this._walkArray(contents, (_, index, callback) => {
          this._generateDataUrl(contents[index])
            .then(dataUrl => {
              return this.$file.dataUrlToBlob({ dataUrl })
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
            zip.file(`${results[i].name}.png`, results[i].blob)
          }

          return zip.generateAsync({ type: 'blob' })
            .then(blob => {
              FileSaver.saveAs(blob, 'qrcodes.zip')
            })
        })
    },

    _previewSingle () {
      if (typeof this.content !== 'string' || this.content.length <= 0) {
        this.$set(this, 'previewImageUrl', null)
        return
      }

      return this._generateDataUrl(this.content)
        .then(dataUrl => {
          this.$set(this, 'previewImageUrl', dataUrl)
        })
    },

    _previewMultiple () {
      if (typeof this.contents !== 'string' || this.contents.length <= 0) {
        this.$set(this, 'previewCount', 0)
        return
      }

      this.$set(this, 'previewCount', this.contents.split('\n').filter(el => el.length > 0).length)
    },

    _generateDataUrl (content) {
      return new Promise((resolve, reject) => {
        QRCode.toDataURL(content, {
          errorCorrectionLevel: this.errorCorrectionLevel,
          width: this.width,
          margin: this.margin,
          scale: this.scale
        }, (error, url) => {
          if (error) {
            reject(error)
            return
          }
          resolve(url)
        })
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

  },
  metaInfo: {
    title: 'QR Code'
  }
}
</script>
