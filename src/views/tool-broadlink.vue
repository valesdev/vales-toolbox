<template>
  <div>
    <div class="row">

      <div class="col-md-5">

        <p>
          <textarea rows="10" class="form-control" v-model="inputText" placeholder="Input" />
        </p>

      </div>

      <div class="col-md-2 align-self-center">

        <p>
          <a
            href="javascript:void(0);"
            class="btn btn-block btn-secondary"
            @click="outputText = hextob64(inputText)"
          >Hex to Base64</a>
        </p>

        <p>
          <a
            href="javascript:void(0);"
            class="btn btn-block btn-secondary"
            @click="outputText = b64tohex(inputText)"
          >Base64 to Hex</a>
        </p>

        <p>
          <a
            href="javascript:void(0);"
            class="btn btn-block btn-secondary"
            @click="outputText = hextosig(inputText)"
          >IR Hex to Raw</a>
        </p>

        <p>
          <a
            href="javascript:void(0);"
            class="btn btn-block btn-secondary"
            @click="outputText = sigtohex(inputText)"
          >Raw to IR Hex</a>
        </p>

        <p>
          <a
            href="javascript:void(0);"
            class="btn btn-block btn-secondary"
            @click="outputText = sigtonec(inputText)"
          >Read NEC from Raw</a>
        </p>

      </div>

      <div class="col-md-5">

        <p>
          <textarea rows="10" class="form-control" :value="outputText" placeholder="Output" />
        </p>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputText: '',
      outputText: ''
    }
  },
  methods: {

    hextobin (input) {
      const ret = []
      for (let i = 0; i < input.length; i += 2) {
        ret.push(String.fromCharCode(`0x${input[i]}${input[i + 1]}`))
      }
      return ret.join('')
    },

    bintohex (input) {
      const ret = []
      for (let i = 0; i < input.length; i++) {
        ret.push(this._padStart(input.charCodeAt(i).toString(16), 2, '0'))
      }
      return ret.join('')
    },

    hextob64 (input) {
      const decoded = this.hextobin(input)
      let encoded
      try {
        encoded = window.btoa(decoded)
      } catch (error) {
        window.alert(error.message)
        return
      }
      return encoded
    },

    b64tohex (input) {
      let decoded
      try {
        decoded = window.atob(input)
      } catch (error) {
        window.alert(error.message)
        return
      }
      return this.bintohex(decoded)
    },

    hextosig (input) {
      const inputBin = this.hextobin(input)

      // const type = inputBin.charCodeAt(0)
      // const repeat = inputBin.charCodeAt(1)
      const length = inputBin.charCodeAt(2) | inputBin.charCodeAt(3) << 8
      const offset = 4

      const ret = []
      for (let i = 0; i < (length - 3); i++) {
        let byte = inputBin.charCodeAt(offset + i)

        if (byte === 0) {
          byte = inputBin.charCodeAt(offset + i + 2) | inputBin.charCodeAt(offset + i + 1) << 8
          i += 2
        }

        ret.push(Math.round(byte * 8192 / 269) + ', ')

        if (ret.length % 3 === 2) ret.push('\n')
      }
      return ret.join('')
    },

    sigtohex (input) {
      const inputArr = input.replace(/[^\d\x2c]/g, '').split(',').map(v => parseInt(v)).filter(v => v > 0)

      // 信号
      const bytes = []
      for (let signal of inputArr) {
        const byte = Math.round(signal * 269 / 8192)

        if (byte < 256) {
          bytes.push(byte)
        } else {
          bytes.push(0x00)
          bytes.push(byte >> 8)
          bytes.push(byte % 256)
        }
      }
      bytes.push(0x00, 0x0d, 0x05)

      const ret = []

      // 类型
      ret.push(0x26)

      // 重复次数
      ret.push(0x00)

      // 信号长度
      ret.push(bytes.length % 256)
      ret.push(bytes.length >> 8)

      // 信号
      bytes.forEach(byte => ret.push(byte))

      // 结尾
      ret.push(0x00, 0x00, 0x00, 0x00)

      return ret.map(byte => this._padStart(byte.toString(16), 2, '0')).join('')
    },

    sigtonec (input) {
      const inputArr = input.replace(/[^\d\x2c]/g, '').split(',').map(v => parseInt(v)).filter(v => v > 0)

      const ret = []

      const OFFSET = 100

      for (let i = 0; i < inputArr.length; i++) {
        // 0
        if (inputArr[i] >= 460 && inputArr[i] < 660 + OFFSET && inputArr[i + 1] >= 465 && inputArr[i + 1] < 665 + OFFSET) {
          ret.push(0)
          i++
          continue
        }
        // 1
        if (inputArr[i] >= 465 && inputArr[i] < 665 + OFFSET && inputArr[i + 1] >= 1585 - OFFSET && inputArr[i + 1] < 1785) {
          ret.push(1)
          i++
          continue
        }
        // 起始码
        if (inputArr[i] >= 8500 && inputArr[i] < 9500 && inputArr[i + 1] >= 4000 && inputArr[i + 1] < 5000) {
          ret.push('始')
          i++
          continue
        }
        // 连接码
        if (inputArr[i] >= 465 && inputArr[i] < 665 + OFFSET && inputArr[i + 1] >= 19500 && inputArr[i + 1] < 20500) {
          ret.push('接')
          i++
          continue
        }
        // 连接码
        if (inputArr[i] >= 465 && inputArr[i] < 665 + OFFSET && inputArr[i + 1] >= 39500 && inputArr[i + 1] < 40500) {
          ret.push('终')
          i++
          continue
        }
        continue
      }

      return ret.join('\n')
    },

    _padStart (input, length, string) {
      let ret = String(input)
      while (ret.length < (length || 0)) {
        ret = `${string}${ret}`
      }
      return ret
    }

  },
  metaInfo: {
    title: 'Broadlink'
  }
}
</script>
