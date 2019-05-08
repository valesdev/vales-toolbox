<template>
  <div>
    <div class="row">

      <div class="col-md-5">

        <p>Input Type</p>

        <p>
          <span class="form-check form-check-inline">
            <label class="form-check-label">
              <input type="radio" class="form-check-input" v-model="inputType" value="text"> Text
            </label>
          </span>
          <span class="form-check form-check-inline">
            <label class="form-check-label">
              <input type="radio" class="form-check-input" v-model="inputType" value="file"> File
            </label>
          </span>
        </p>

        <template v-if="inputType === 'text'">
          <p>Input Text</p>
          <p>
            <textarea rows="5" class="form-control" v-model="inputText" placeholder="Input" />
          </p>
        </template>

        <template v-if="inputType === 'file'">
          <p>Input File</p>
          <p>
            <input type="file" @change="readInputFile">
          </p>
        </template>

      </div>

      <div class="col-md-2 align-self-center">

        <p>
          <a href="javascript:void(0);" class="btn btn-block btn-secondary" @click="encode">Encode</a>
        </p>

        <p>
          <a href="javascript:void(0);" class="btn btn-block btn-secondary" @click="decode">Decode</a>
        </p>

      </div>

      <div class="col-md-5">

        <p>Output Type</p>

        <p>
          <span class="form-check form-check-inline">
            <label class="form-check-label">
              <input type="radio" class="form-check-input" v-model="outputType" value="text"> Text
            </label>
          </span>
          <span class="form-check form-check-inline">
            <label class="form-check-label">
              <input type="radio" class="form-check-input" v-model="outputType" value="file"> File
            </label>
          </span>
        </p>

        <template v-if="outputType === 'text'">
          <p>Output Text</p>
          <p>
            <textarea rows="5" class="form-control" :value="outputText" placeholder="Output" />
          </p>
        </template>

      </div>

    </div>
  </div>
</template>

<script>
import Base64 from 'base64-js'
import FileSaver from 'file-saver'
export default {
  data () {
    return {
      inputType: 'text',
      inputText: '',
      inputFileByteArray: '',
      outputType: 'text',
      outputText: ''
    }
  },
  methods: {
    readInputFile (e) {
      const self = this
      const reader = new FileReader()
      reader.onload = function () {
        self.inputFileByteArray = new Uint8Array(this.result)
      }
      reader.readAsArrayBuffer(e.target.files[0])
    },
    encode () {
      switch (this.inputType) {
        case 'text':
          this.output(Base64.fromByteArray(this.toUTF8Array(this.inputText)))
          break
        case 'file':
          this.output(Base64.fromByteArray(this.inputFileByteArray))
          break
      }
    },
    decode () {
      switch (this.inputType) {
        case 'text':
          this.output(Base64.toByteArray(this.inputText))
          break
        case 'file':
          this.output(Base64.toByteArray(Buffer.from(this.inputFileByteArray).toString('utf-8')))
          break
      }
    },
    output (data) {
      switch (this.outputType) {
        case 'text':
          if (typeof data === 'object') {
            this.outputText = Buffer.from(data).toString('utf-8')
          }
          break
        case 'file':
          const blob = new Blob([data], { type: 'application/octet-stream' })
          FileSaver.saveAs(blob, 'data')
          break
      }
    },
    toUTF8Array (str) {
      const arr = []
      for (let i = 0; i < str.length; i++) {
        var charcode = str.charCodeAt(i)
        if (charcode < 0x80) {
          arr.push(charcode)
        } else if (charcode < 0x800) {
          arr.push(0xc0 | (charcode >> 6),
            0x80 | (charcode & 0x3f))
        } else if (charcode < 0xd800 || charcode >= 0xe000) {
          arr.push(0xe0 | (charcode >> 12),
            0x80 | ((charcode >> 6) & 0x3f),
            0x80 | (charcode & 0x3f))
        } else { // surrogate pair
          i++
          // UTF-16 encodes 0x10000-0x10FFFF by
          // subtracting 0x10000 and splitting the
          // 20 bits of 0x0-0xFFFFF into two halves
          charcode = 0x10000 + (((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff))
          arr.push(0xf0 | (charcode >> 18),
            0x80 | ((charcode >> 12) & 0x3f),
            0x80 | ((charcode >> 6) & 0x3f),
            0x80 | (charcode & 0x3f))
        }
      }
      return arr
    }
  },
  metaInfo: {
    title: 'Base64'
  }
}
</script>
