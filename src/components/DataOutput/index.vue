<template>
  <div>
    <div class="mb-3 row">
      <div class="col-auto">
        <div class="form-check form-check-inline">
          <label class="form-check-label">
            <input type="radio" class="form-check-input" v-model="mode" :value="Mode.None" /> 不显示
          </label>
        </div>

        <div class="form-check form-check-inline">
          <label class="form-check-label">
            <input type="radio" class="form-check-input" v-model="mode" :value="Mode.Text" /> 文本
          </label>
        </div>

        <div class="form-check form-check-inline">
          <label class="form-check-label">
            <input type="radio" class="form-check-input" v-model="mode" :value="Mode.Hex" /> 16 进制
          </label>
        </div>

        <div class="form-check form-check-inline">
          <label class="form-check-label">
            <input type="radio" class="form-check-input" v-model="mode" :value="Mode.Base64" /> Base64
          </label>
        </div>
      </div>

      <div class="col-auto">
        <a href="javascript:void(0);" @click="onClickCopyText">复制文本</a>
      </div>

      <div class="col-auto">
        <a href="javascript:void(0);" @click="onClickCopyHex">复制 16 进制</a>
      </div>

      <div class="col-auto">
        <a href="javascript:void(0);" @click="onClickCopyBase64">复制 Base64</a>
      </div>

      <div class="col-auto">
        <a href="javascript:void(0);" @click="onClickFile">另存为文件</a>
      </div>

      <div class="col-auto">
        <span>{{ value.byteLength }} 字节</span>
      </div>
    </div>

    <div class="mb-3">
      <template v-if="mode === Mode.Text">
        <textarea rows="3" class="form-control font-monospace" v-model="outputText" placeholder="输出" readonly />
      </template>

      <template v-if="mode === Mode.Hex">
        <textarea rows="3" class="form-control font-monospace" v-model="outputHex" placeholder="输出" readonly />
      </template>

      <template v-if="mode === Mode.Base64">
        <textarea rows="3" class="form-control font-monospace" v-model="outputBase64" placeholder="输出" readonly />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

import { saveAs } from 'file-saver'

enum Mode {
  None,
  Text,
  Hex,
  Base64,
}

const props = defineProps<{
  value: ArrayBuffer
}>()

const mode = ref<Mode>(Mode.Text)

const outputText = computed<string>(() => {
  return new TextDecoder().decode(props.value)
})

const outputHex = computed<string>(() => {
  return [...new Uint8Array(props.value)].map(x => x.toString(16).padStart(2, '0')).join('')
})

const outputBase64 = computed<string>(() => {
  return window.btoa(String.fromCharCode.apply(null, [...new Uint8Array(props.value)]))
})

const onClickFile = () => {
  saveAs(new Blob([new Uint8Array(props.value, 0, props.value.byteLength)]), 'data')
}

const onClickCopyText = () => {
  _setClipboard(outputText.value)
}

const onClickCopyHex = () => {
  _setClipboard(outputHex.value)
}

const onClickCopyBase64 = () => {
  _setClipboard(outputBase64.value)
}

const _setClipboard = async (input: string): Promise<void> => {
  return window.navigator.clipboard.writeText(input)
    .catch(error => {
      window.alert(error.message)
    })
}
</script>
