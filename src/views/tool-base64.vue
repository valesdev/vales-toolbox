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
          <a href="javascript:void(0);" class="btn btn-block btn-secondary" @click="toEncode">Encode</a>
        </p>

        <p>
          <a href="javascript:void(0);" class="btn btn-block btn-secondary" @click="toDecode">Decode</a>
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
import FileSaver from 'file-saver'
export default {
  data () {
    return {
      inputType: 'text',
      inputText: '',
      inputFile: '',
      outputType: 'text',
      outputText: ''
    }
  },
  methods: {
    readInputFile (event) {
      this.$set(this, 'inputFile', event.target.files[0])
    },

    readBlobAsString (blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = function () {
          resolve(this.result)
        }
        reader.readAsText(blob, 'UTF-8')
      })
    },

    readBlobAsBase64 (blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = function () {
          const result = this.result.substring(this.result.indexOf(';base64,') + 8)
          resolve(result)
        }
        reader.readAsDataURL(blob)
      })
    },

    readStringAsByteArray (string) {
      const byteNumbers = new Array(string.length)
      for (let i = 0; i < string.length; i++) {
        byteNumbers[i] = string.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      return byteArray
    },

    toEncode () {
      switch (this.inputType) {
        case 'text':
          this.output(window.btoa(this.inputText))
          break
        case 'file':
          this.readBlobAsBase64(this.inputFile)
            .then(result => {
              this.output(result)
            })
          break
      }
    },

    toDecode () {
      switch (this.inputType) {
        case 'text':
          this.output(window.atob(this.inputText))
          break
        case 'file':
          this.readBlobAsString(this.inputFile)
            .then(result => {
              this.output(window.atob(result))
            })
          break
      }
    },

    output (string) {
      switch (this.outputType) {
        case 'text':
          this.$set(this, 'outputText', string)
          break
        case 'file':
          const byteArray = this.readStringAsByteArray(string)
          const blob = new Blob([byteArray], { type: 'application/octet-stream' })
          FileSaver.saveAs(blob, 'data')
          break
      }
    }
  },
  metaInfo: {
    title: 'Base64'
  }
}
</script>
