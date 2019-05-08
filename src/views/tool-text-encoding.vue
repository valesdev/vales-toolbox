<template>
  <div>
    <div class="row">

      <p class="col-sm-6 col-md-4">
        <label>Input</label>
        <textarea rows="3" class="form-control" v-model="input" placeholder="Input" />
      </p>

      <p class="col-sm-6 col-md-4">
        <label>URL Encoded</label>
        <textarea rows="3" class="form-control" :value="outputUrlencoded" placeholder="Output" disabled />
      </p>

      <p class="col-sm-6 col-md-4">
        <label>ASCII</label>
        <textarea rows="3" class="form-control" :value="outputAscii" placeholder="Output" disabled />
      </p>

      <p class="col-sm-6 col-md-4">
        <label>Unicode HTML</label>
        <textarea rows="3" class="form-control" :value="outputUnicodeHtml" placeholder="Output" disabled />
      </p>

      <p class="col-sm-6 col-md-4">
        <label>UTF-8 HTML</label>
        <textarea rows="3" class="form-control" :value="outputUtf8Html" placeholder="Output" disabled />
      </p>

    </div>
  </div>
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
        let code = Number(chars[i].charCodeAt(0))
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
        return escape($0).replace(/(%u)(\w{4})/gi, '&#x$2;')
      })
    }
  },
  metaInfo: {
    title: 'Text Encoding'
  }
}
</script>
