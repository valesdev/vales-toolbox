<template>
  <main>
    <h2>博联信号转换</h2>
    <hr />

    <div class="row">
      <div class="col-md-5">
        <div class="mb-3">
          <textarea
            rows="12"
            class="form-control font-monospace"
            v-model="inputText"
            placeholder="输入" />
        </div>
      </div>

      <div class="col-md-2 align-self-center">
        <div class="mb-3">
          <div class="d-grid gap-2">
            <a
              href="javascript:void(0);"
              class="btn btn-secondary"
              @click="onClickHexToB64">Hex &rarr; Base64</a>
            <a
              href="javascript:void(0);"
              class="btn btn-secondary"
              @click="onClickB64ToHex">Base64 &rarr; Hex</a>
            <a
              href="javascript:void(0);"
              class="btn btn-secondary"
              @click="onClickHexToSig">IR Hex &rarr; Raw</a>
            <a
              href="javascript:void(0);"
              class="btn btn-secondary"
              @click="onClickSigToHex">Raw &rarr; IR Hex</a>
            <a
              href="javascript:void(0);"
              class="btn btn-secondary"
              @click="onClickSigToNec">Raw &rarr; NEC</a>
          </div>
        </div>
      </div>

      <div class="col-md-5">
        <div class="mb-3">
          <textarea
            rows="12"
            class="form-control font-monospace"
            :value="outputText"
            placeholder="输出"
            readonly />
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const inputText = ref<string>('')
const outputText = ref<string>('')

const hexToBin = (input: string): string => {
  const ret = []
  for (let i = 0; i < input.length; i += 2) {
    ret.push(String.fromCharCode(parseInt(`${input[i]}${input[i + 1]}`, 16)))
  }
  return ret.join('')
}

const binToHex = (input: string): string => {
  const ret = []
  for (let i = 0; i < input.length; i++) {
    ret.push(input.charCodeAt(i).toString(16).padStart(2, '0'))
  }
  return ret.join('')
}

const hexToB64 = (input: string): string => {
  const decoded = hexToBin(input)
  let encoded
  try {
    encoded = window.btoa(decoded)
  } catch (error) {
    window.alert(error instanceof Error ? error.message : '错误')
    return ''
  }
  return encoded
}

const b64ToHex = (input: string): string => {
  let decoded
  try {
    decoded = window.atob(input)
  } catch (error) {
    window.alert(error instanceof Error ? error.message : '错误')
    return ''
  }
  return binToHex(decoded)
}

const hexToSig = (input: string): string => {
  const inputBin = hexToBin(input)

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
}

const sigToHex = (input: string): string => {
  const inputArr = input.replace(/[^\d\x2c]/g, '').split(',').map(v => parseInt(v)).filter(v => v > 0)

  // 信号
  const bytes = []
  for (const signal of inputArr) {
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

  return ret.map(byte => byte.toString(16).padStart(2, '0')).join('')
}

const sigToNec = (input: string): string => {
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
}

const padStart = (input: string, length: number, string: string) => {
  let ret = String(input)
  while (ret.length < (length || 0)) {
    ret = `${string}${ret}`
  }
  return ret
}

const onClickHexToB64 = () => {
  outputText.value = hexToB64(inputText.value)
}

const onClickB64ToHex = () => {
  outputText.value = b64ToHex(inputText.value)
}

const onClickHexToSig = () => {
  outputText.value = hexToSig(inputText.value)
}

const onClickSigToHex = () => {
  outputText.value = sigToHex(inputText.value)
}

const onClickSigToNec = () => {
  outputText.value = sigToNec(inputText.value)
}
</script>
