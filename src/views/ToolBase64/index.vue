<template>
  <main>
    <h2>Base64 编码和解码</h2>
    <hr />

    <div class="row">
      <div class="col-md-5">
        <div class="mb-3">
          <label class="form-label">Input Type</label>
          <div>
            <div class="form-check form-check-inline">
              <label class="form-check-label">
                <input type="radio" class="form-check-input" v-model="inputType" value="text" /> Text
              </label>
            </div>
            <div class="form-check form-check-inline">
              <label class="form-check-label">
                <input type="radio" class="form-check-input" v-model="inputType" value="file" /> File
              </label>
            </div>
          </div>
        </div>

        <div class="mb-3">
          <template v-if="inputType === 'text'">
            <label class="form-label">Input Text</label>
            <textarea rows="5" class="form-control font-monospace" v-model="inputText" placeholder="Input" />
          </template>

          <template v-if="inputType === 'file'">
            <label class="form-label">Input File</label>
            <div>
              <input type="file" @change="readInputFile" />
            </div>
          </template>
        </div>
      </div>

      <div class="col-md-2 align-self-center">
        <div class="mb-3">
          <div class="d-grid gap-2">
            <a href="javascript:void(0);" class="btn btn-secondary" @click="toEncode">Encode</a>
            <a href="javascript:void(0);" class="btn btn-secondary" @click="toDecode">Decode</a>
          </div>
        </div>
      </div>

      <div class="col-md-5">
        <div class="mb-3">
          <label class="form-label">Output Type</label>
          <div>
            <div class="form-check form-check-inline">
              <label class="form-check-label">
                <input type="radio" class="form-check-input" v-model="outputType" value="text" /> Text
              </label>
            </div>
            <div class="form-check form-check-inline">
              <label class="form-check-label">
                <input type="radio" class="form-check-input" v-model="outputType" value="file" /> File
              </label>
            </div>
          </div>
        </div>

        <template v-if="outputType === 'text'">
          <div class="mb-3">
            <label class="form-label">Output Text</label>
            <textarea rows="5" class="form-control font-monospace" :value="outputText" placeholder="Output" readonly />
          </div>
        </template>
      </div>
    </div>
  </main>
</template>

<script>
import FileSaver from 'file-saver'
import Files from 'file-promisify'

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
      this.inputFile = event.target.files[0]
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
          Files.blobToBase64(this.inputFile)
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
          Files.blobToString(this.inputFile)
            .then(result => {
              this.output(window.atob(result))
            })
          break
      }
    },

    output (string) {
      switch (this.outputType) {
        case 'text':
          this.outputText = string
          break
        case 'file':
          Files.stringToBlob(string)
            .then(blob => {
              FileSaver.saveAs(blob, 'data')
            })
      }
    }
  }
}
</script>
