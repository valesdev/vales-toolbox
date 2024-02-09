<template>
  <main>
    <h2>数据处理</h2>
    <hr />

    <div class="mb-3">
      <div class="row">
        <div class="col-auto">
          <h5>输入</h5>
        </div>
        <div class="col-auto">
          <a href="javascript:void(0);" @click="onClickClearInput">清空</a>
        </div>
        <div class="col-auto">
          <a href="javascript:void(0);" @click="onClickCloneToOutput">复制到输出</a>
        </div>
      </div>
    </div>

    <div class="mb-4">
      <DataInput v-model:value="inputValue" />
    </div>

    <div class="mb-3">
      <h5>处理</h5>
    </div>

    <div class="mb-3">
      <div class="btn-group">
        <button
          type="button"
          class="btn btn-outline-secondary"
          :class="{ 'active': menu === Menu.Encoding }"
          @click="menu = Menu.Encoding">编码</button>
        <button
          type="button"
          class="btn btn-outline-secondary"
          :class="{ 'active': menu === Menu.MessageDigests }"
          @click="menu = Menu.MessageDigests">摘要</button>
        <button
          type="button"
          class="btn btn-outline-secondary"
          :class="{ 'active': menu === Menu.CiphersEncrypt }"
          @click="menu = Menu.CiphersEncrypt">加密</button>
        <button
          type="button"
          class="btn btn-outline-secondary"
          :class="{ 'active': menu === Menu.CiphersDecrypt }"
          @click="menu = Menu.CiphersDecrypt">解密</button>
        <!--
        <button
          type="button"
          class="btn btn-outline-secondary"
          :class="{ 'active': menu === Menu.PkiEncrypt }"
          @click="menu = Menu.PkiEncrypt">证书加密</button>
        <button
          type="button"
          class="btn btn-outline-secondary"
          :class="{ 'active': menu === Menu.PkiDecrypt }"
          @click="menu = Menu.PkiDecrypt">证书解密</button>
        -->
      </div>
    </div>

    <div class="mb-3">
      <template v-if="menu === Menu.Encoding">
        <div class="row">
          <div class="col-auto">
            <a href="javascript:void(0);" @click="onClickEncodingUrl">URL Encoded</a>
          </div>
          <div class="col-auto">
            <a href="javascript:void(0);" @click="onClickEncodingAscii">ASCII</a>
          </div>
          <div class="col-auto">
            <a href="javascript:void(0);" @click="onClickEncodingHtmlUnicode">Unicode HTML</a>
          </div>
          <div class="col-auto">
            <a href="javascript:void(0);" @click="onClickEncodingHtmlUtf8">UTF-8 HTML</a>
          </div>
        </div>
      </template>

      <template v-if="menu === Menu.MessageDigests">
        <div class="row align-items-center">
          <div class="col-auto">
            <a href="javascript:void(0);" @click="onClickMessageDigestsMd5">MD5</a>
          </div>
          <div class="col-auto">
            <a href="javascript:void(0);" @click="onClickMessageDigestsSha1">SHA1</a>
          </div>
          <div class="col-auto">
            <a href="javascript:void(0);" @click="onClickMessageDigestsSha256">SHA256</a>
          </div>
          <div class="col-auto">
            <a href="javascript:void(0);" @click="onClickMessageDigestsSha384">SHA384</a>
          </div>
          <div class="col-auto">
            <a href="javascript:void(0);" @click="onClickMessageDigestsSha512">SHA512</a>
          </div>

          <div class="col-auto">
            <div class="form-check">
              <label class="form-check-label"><input type="checkbox" class="form-check-input" v-model="isHmac" /> HMAC</label>
            </div>
          </div>
        </div>
      </template>

      <template v-if="menu === Menu.CiphersEncrypt">
        <div class="row">
          <div class="col-auto">
            <a href="javascript:void(0);" @click="CiphersEncryptAesEcb">AES-ECB</a>
          </div>
          <div class="col-auto">
            <a href="javascript:void(0);" @click="CiphersEncryptAesCbc">AES-CBC</a>
          </div>
          <div class="col-auto">
            <a href="javascript:void(0);" @click="CiphersEncryptAesCfb">AES-CFB</a>
          </div>
          <div class="col-auto">
            <a href="javascript:void(0);" @click="CiphersEncryptAesOfb">AES-OFB</a>
          </div>
          <div class="col-auto">
            <a href="javascript:void(0);" @click="CiphersEncryptAesCtr">AES-CTR</a>
          </div>
          <div class="col-auto">
            <a href="javascript:void(0);" @click="CiphersEncryptAesGcm">AES-GCM</a>
          </div>
          <div class="col-auto">
            <a href="javascript:void(0);" @click="CiphersEncrypt3desEcb">3DES-ECB</a>
          </div>
          <div class="col-auto">
            <a href="javascript:void(0);" @click="CiphersEncrypt3desCbc">3DES-CBC</a>
          </div>
          <div class="col-auto">
            <a href="javascript:void(0);" @click="CiphersEncryptDesEcb">DES-ECB</a>
          </div>
          <div class="col-auto">
            <a href="javascript:void(0);" @click="CiphersEncryptDesCbc">DES-CBC</a>
          </div>
        </div>
      </template>

      <template v-if="menu === Menu.CiphersDecrypt">
        <div class="row">
          <div class="col-auto">
            <a href="javascript:void(0);" @click="CiphersDecryptAesEcb">AES-ECB</a>
          </div>
          <div class="col-auto">
            <a href="javascript:void(0);" @click="CiphersDecryptAesCbc">AES-CBC</a>
          </div>
          <div class="col-auto">
            <a href="javascript:void(0);" @click="CiphersDecryptAesCfb">AES-CFB</a>
          </div>
          <div class="col-auto">
            <a href="javascript:void(0);" @click="CiphersDecryptAesOfb">AES-OFB</a>
          </div>
          <div class="col-auto">
            <a href="javascript:void(0);" @click="CiphersDecryptAesCtr">AES-CTR</a>
          </div>
          <div class="col-auto">
            <a href="javascript:void(0);" @click="CiphersDecryptAesGcm">AES-GCM</a>
          </div>
          <div class="col-auto">
            <a href="javascript:void(0);" @click="CiphersDecrypt3desEcb">3DES-ECB</a>
          </div>
          <div class="col-auto">
            <a href="javascript:void(0);" @click="CiphersDecrypt3desCbc">3DES-CBC</a>
          </div>
          <div class="col-auto">
            <a href="javascript:void(0);" @click="CiphersDecryptDesEcb">DES-ECB</a>
          </div>
          <div class="col-auto">
            <a href="javascript:void(0);" @click="CiphersDecryptDesCbc">DES-CBC</a>
          </div>
        </div>
      </template>
    </div>

    <template v-if="(menu === Menu.MessageDigests && isHmac)">
      <div class="mb-3">
        <label class="form-label">密钥（16 进制）</label>
        <input type="text" class="form-control font-monospace" v-model="keyHex" placeholder="密钥（16 进制）" />
      </div>
    </template>

    <template v-if="menu === Menu.CiphersEncrypt || menu === Menu.CiphersDecrypt">
      <div class="row">
        <div class="col-12 col-md-6">
          <div class="mb-3">
            <label class="form-label">密钥（16 进制）</label>
            <input type="text" class="form-control font-monospace" v-model="keyHex" placeholder="密钥（16 进制）" />
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="mb-3">
            <label class="form-label">IV（16 进制）</label>
            <input type="text" class="form-control font-monospace" v-model="ivHex" placeholder="IV（16 进制）" />
          </div>
        </div>
      </div>
    </template>

    <div class="mb-3">
      <div class="row">
        <div class="col-auto">
          <h5>输出</h5>
        </div>
        <div class="col-auto">
          <a href="javascript:void(0);" @click="onClickClearOutput">清空</a>
        </div>
        <div class="col-auto">
          <a href="javascript:void(0);" @click="onClickCloneToInput">复制到输入</a>
        </div>
      </div>
    </div>

    <template v-if="outputError === null">
      <div class="mb-4">
        <DataOutput :value="outputValue" />
      </div>
    </template>

    <template v-else>
      <div class="mb-4">
        <div class="alert alert-warning" role="alert">{{ outputError.message }}</div>
      </div>
    </template>

  </main>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'

import forge from 'node-forge'

enum Menu {
  Encoding,
  MessageDigests,
  CiphersEncrypt,
  CiphersDecrypt,
  PkiEncrypt,
  PkiDecrypt,
}

const inputValue = ref<ArrayBuffer>(new ArrayBuffer(0))
const outputValue = ref<ArrayBuffer>(new ArrayBuffer(0))
const outputError = ref<Error | null>(null)

const menu = ref<Menu>(Menu.Encoding)
const isHmac = ref<boolean>(false)
const keyHex = ref<string>('')
const ivHex = ref<string>('00'.repeat(16))

watch(outputValue, () => {
  outputError.value = null
})

const _inputValueText = computed<string>(() => {
  return new TextDecoder().decode(inputValue.value)
})

const _iv = computed<ArrayBuffer>(() => {
  return new Uint8Array((ivHex.value.match(/[0-9a-f]{2}/ig) ?? []).map(h => parseInt(h, 16)))
})

const _outputValueText = computed<string>({
  get (): string {
    return new TextDecoder().decode(outputValue.value)
  },
  set (v: string) {
    outputValue.value = new TextEncoder().encode(v)
  }
})

const _outputValueHex = computed<string>({
  get (): string {
    return [...new Uint8Array(outputValue.value)].map(x => x.toString(16).padStart(2, '0')).join('')
  },
  set (v: string) {
    outputValue.value = new Uint8Array((v.match(/[0-9a-f]{2}/ig) ?? []).map(h => parseInt(h, 16)))
  }
})

const onClickClearInput = () => {
  inputValue.value = new ArrayBuffer(0)
}

const onClickClearOutput = () => {
  outputValue.value = new ArrayBuffer(0)
}

const onClickCloneToInput = () => {
  inputValue.value = outputValue.value
}

const onClickCloneToOutput = () => {
  outputValue.value = inputValue.value
}

const onClickEncodingUrl = () => {
  _run(() => {
    _outputValueText.value = (function (input: string) {
      return window.encodeURIComponent(input)
    })(_inputValueText.value)
  })
}

const onClickEncodingAscii = () => {
  _run(() => {
    _outputValueText.value = (function (input: string) {
      const chars = input.split('')
      let output = ''
      for (let i = 0; i < chars.length; i++) {
        const code = Number(chars[i].charCodeAt(0))
        let charAscii = code.toString(16)
        charAscii = ('0000').substring(charAscii.length, 4) + charAscii
        output += `\\u${charAscii}`
      }
      return output
    })(_inputValueText.value)
  })
}

const onClickEncodingHtmlUnicode = () => {
  _run(() => {
    _outputValueText.value = (function (input: string) {
      let output = ''
      for (let i = 0; i < input.length; i++) {
        output += `&#${input.charCodeAt(i)};`
      }
      return output
    })(_inputValueText.value)
  })
}

const onClickEncodingHtmlUtf8 = () => {
  _run(() => {
    _outputValueText.value = (function (input: string) {
      return input.replace(/[^\u0000-\u00FF]/g, function ($0) {
        return window.escape($0).replace(/(%u)(\w{4})/gi, '&#x$2;')
      })
    })(_inputValueText.value)
  })
}

const _runMessageDigests = (algorithm: 'md5' | 'sha1' | 'sha256' | 'sha384' | 'sha512') => {
  _run(() => {
    _outputValueHex.value = (function (input: ArrayBuffer, isHmac: boolean) {
      if (isHmac) {
        const i = forge.hmac.create()
        i.start(algorithm, keyHex.value)
        i.update(forge.util.createBuffer(input).getBytes())
        return i.digest().toHex()
      } else {
        const i = forge.md[algorithm].create()
        i.update(forge.util.createBuffer(input).getBytes())
        return i.digest().toHex()
      }
    })(inputValue.value, isHmac.value)
  })
}

const onClickMessageDigestsMd5 = () => _runMessageDigests('md5')

const onClickMessageDigestsSha1 = () => _runMessageDigests('sha1')

const onClickMessageDigestsSha256 = () => _runMessageDigests('sha256')

const onClickMessageDigestsSha384 = () => _runMessageDigests('sha384')

const onClickMessageDigestsSha512 = () => _runMessageDigests('sha512')

const _runCiphersEncrypt = (algorithm: 'AES-ECB' | 'AES-CBC' | 'AES-CFB' | 'AES-OFB' | 'AES-CTR' | 'AES-GCM' | '3DES-ECB' | '3DES-CBC' | 'DES-ECB' | 'DES-CBC') => {
  _run(() => {
    _outputValueHex.value = (function (input: ArrayBuffer) {
      const i = forge.cipher.createCipher(algorithm, forge.util.createBuffer(keyHex.value))
      i.start({ iv: forge.util.createBuffer(_iv.value) })
      i.update(forge.util.createBuffer(input))
      i.finish()
      return i.output.toHex()
    })(inputValue.value)
  })
}

const CiphersEncryptAesEcb = () => _runCiphersEncrypt('AES-ECB')

const CiphersEncryptAesCbc = () => _runCiphersEncrypt('AES-CBC')

const CiphersEncryptAesCfb = () => _runCiphersEncrypt('AES-CFB')

const CiphersEncryptAesOfb = () => _runCiphersEncrypt('AES-OFB')

const CiphersEncryptAesCtr = () => _runCiphersEncrypt('AES-CTR')

const CiphersEncryptAesGcm = () => _runCiphersEncrypt('AES-GCM')

const CiphersEncrypt3desEcb = () => _runCiphersEncrypt('3DES-ECB')

const CiphersEncrypt3desCbc = () => _runCiphersEncrypt('3DES-CBC')

const CiphersEncryptDesEcb = () => _runCiphersEncrypt('DES-ECB')

const CiphersEncryptDesCbc = () => _runCiphersEncrypt('DES-CBC')

const _runCiphersDecrypt = (algorithm: 'AES-ECB' | 'AES-CBC' | 'AES-CFB' | 'AES-OFB' | 'AES-CTR' | 'AES-GCM' | '3DES-ECB' | '3DES-CBC' | 'DES-ECB' | 'DES-CBC') => {
  _run(() => {
    _outputValueHex.value = (function (input: ArrayBuffer) {
      const i = forge.cipher.createDecipher(algorithm, forge.util.createBuffer(keyHex.value))
      i.start({ iv: forge.util.createBuffer(_iv.value) })
      i.update(forge.util.createBuffer(input))
      i.finish()
      return i.output.toHex()
    })(inputValue.value)
  })
}

const CiphersDecryptAesEcb = () => _runCiphersDecrypt('AES-ECB')

const CiphersDecryptAesCbc = () => _runCiphersDecrypt('AES-CBC')

const CiphersDecryptAesCfb = () => _runCiphersDecrypt('AES-CFB')

const CiphersDecryptAesOfb = () => _runCiphersDecrypt('AES-OFB')

const CiphersDecryptAesCtr = () => _runCiphersDecrypt('AES-CTR')

const CiphersDecryptAesGcm = () => _runCiphersDecrypt('AES-GCM')

const CiphersDecrypt3desEcb = () => _runCiphersDecrypt('3DES-ECB')

const CiphersDecrypt3desCbc = () => _runCiphersDecrypt('3DES-CBC')

const CiphersDecryptDesEcb = () => _runCiphersDecrypt('DES-ECB')

const CiphersDecryptDesCbc = () => _runCiphersDecrypt('DES-CBC')

const _run = (fun: () => void) => {
  try {
    fun()
  } catch (e) { outputError.value = e instanceof Error ? e : null }
}
</script>
