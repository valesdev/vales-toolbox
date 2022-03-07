<template>
  <main>
    <h2>文本编码</h2>
    <hr />

    <div class="row">

      <div class="col-sm-6 col-md-4">
        <div class="mb-3">
          <label class="form-label">Input</label>
          <textarea rows="3" class="form-control font-monospace" v-model="input" placeholder="Input" />
        </div>
      </div>

      <div class="col-sm-6 col-md-4">
        <div class="mb-3">
          <label class="form-label">URL Encoded</label>
          <textarea rows="3" class="form-control font-monospace" :value="outputUrlencoded" placeholder="Output" readonly />
        </div>
      </div>

      <div class="col-sm-6 col-md-4">
        <div class="mb-3">
          <label class="form-label">ASCII</label>
          <textarea rows="3" class="form-control font-monospace" :value="outputAscii" placeholder="Output" readonly />
        </div>
      </div>

      <div class="col-sm-6 col-md-4">
        <div class="mb-3">
          <label class="form-label">Unicode HTML</label>
          <textarea rows="3" class="form-control font-monospace" :value="outputUnicodeHtml" placeholder="Output" readonly />
        </div>
      </div>

      <div class="col-sm-6 col-md-4">
        <div class="mb-3">
          <label class="form-label">UTF-8 HTML</label>
          <textarea rows="3" class="form-control font-monospace" :value="outputUtf8Html" placeholder="Output" readonly />
        </div>
      </div>

    </div>
  </main>
</template>

<script>
export default {
  data () {
    return {
      input: ''
    }
  },
  computed: {
    outputUrlencoded () {
      return encodeURIComponent(this.input)
    },
    outputAscii () {
      const chars = this.input.split('')
      let output = ''
      for (let i = 0; i < chars.length; i++) {
        const code = Number(chars[i].charCodeAt(0))
        let charAscii = code.toString(16)
        charAscii = ('0000').substring(charAscii.length, 4) + charAscii
        output += '\\u' + charAscii
      }
      return output
    },
    outputUnicodeHtml () {
      let output = ''
      for (let i = 0; i < this.input.length; i++) {
        output += '&#' + this.input.charCodeAt(i) + ';'
      }
      return output
    },
    outputUtf8Html () {
      // eslint-disable-next-line no-control-regex
      return this.input.replace(/[^\u0000-\u00FF]/g, function ($0) {
        return window.escape($0).replace(/(%u)(\w{4})/gi, '&#x$2;')
      })
    }
  }
}
</script>
