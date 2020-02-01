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
          this.$file.blobToBase64({ blob: this.inputFile })
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
          this.$file.blobToString({ blob: this.inputFile })
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
          this.$file.stringToBlob({ string })
            .then(blob => {
              FileSaver.saveAs(blob, 'data')
            })
      }
    }
  },
  metaInfo: {
    title: 'Base64'
  }
}
</script>
