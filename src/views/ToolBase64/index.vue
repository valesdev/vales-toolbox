<template>
  <main>
    <h2>Base64 编码和解码</h2>
    <hr />

    <div class="row">
      <div class="col-md-5">
        <div class="mb-3">
          <label class="form-label">输入类型</label>
          <div>
            <div class="form-check form-check-inline">
              <label class="form-check-label">
                <input type="radio" class="form-check-input" v-model="inputType" value="text" /> 文本
              </label>
            </div>
            <div class="form-check form-check-inline">
              <label class="form-check-label">
                <input type="radio" class="form-check-input" v-model="inputType" value="file" /> 文件
              </label>
            </div>
          </div>
        </div>

        <div class="mb-3">
          <template v-if="inputType === 'text'">
            <label class="form-label">文本输入</label>
            <textarea rows="5" class="form-control font-monospace" v-model="inputText" placeholder="输入" />
          </template>

          <template v-if="inputType === 'file'">
            <label class="form-label">文件输入</label>
            <div>
              <input type="file" @change="readInputFile" />
            </div>
          </template>
        </div>
      </div>

      <div class="col-md-2 align-self-center">
        <div class="mb-3">
          <div class="d-grid gap-2">
            <a href="javascript:void(0);" class="btn btn-secondary" @click="onClickEncode">编码</a>
            <a href="javascript:void(0);" class="btn btn-secondary" @click="onClickDecode">解码</a>
          </div>
        </div>
      </div>

      <div class="col-md-5">
        <div class="mb-3">
          <label class="form-label">输出类型</label>
          <div>
            <div class="form-check form-check-inline">
              <label class="form-check-label">
                <input type="radio" class="form-check-input" v-model="outputType" value="text" /> 文本
              </label>
            </div>
            <div class="form-check form-check-inline">
              <label class="form-check-label">
                <input type="radio" class="form-check-input" v-model="outputType" value="file" /> 文件
              </label>
            </div>
          </div>
        </div>

        <template v-if="outputType === 'text'">
          <div class="mb-3">
            <label class="form-label">文本输出</label>
            <textarea rows="5" class="form-control font-monospace" :value="outputText" placeholder="输出" readonly />
          </div>
        </template>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { saveAs } from 'file-saver'
import Files from 'file-promisify'

const inputType = ref<'text' | 'file'>('text')
const inputText = ref<string>('')
const inputFile = ref<Blob | null>(null)
const outputType = ref<'text' | 'file'>('text')
const outputText = ref<string>('')

const readInputFile = (event: Event) => {
  if (event.target instanceof HTMLInputElement) {
    if (event.target.files === null || event.target.files.length === 0) {
      window.alert('请选择文件')
      return
    }

    inputFile.value = event.target.files[0]
  }
}

const onClickEncode = () => {
  switch (inputType.value) {
    case 'text':
      output(window.btoa(inputText.value))
      break
    case 'file':
      if (inputFile.value === null) {
        window.alert('请选择文件')
        return
      }

      Files.blobToBase64(inputFile.value)
        .then(result => {
          if (result === null) throw new Error('转换失败')
          output(result)
        })
        .catch(error => {
          window.console.error(error)
          window.alert(error instanceof Error ? error.message : '错误')
        })
      break
  }
}

const onClickDecode = () => {
  switch (inputType.value) {
    case 'text':
      output(window.atob(inputText.value))
      break
    case 'file':
      if (inputFile.value === null) {
        window.alert('请选择文件')
        return
      }

      Files.blobToString(inputFile.value)
        .then(result => {
          if (result === null) throw new Error('转换失败')
          output(window.atob(result))
        })
        .catch(error => {
          window.console.error(error)
          window.alert(error instanceof Error ? error.message : '错误')
        })
      break
  }
}

const output = (data: string) => {
  switch (outputType.value) {
    case 'text':
      outputText.value = data
      break
    case 'file':
      Files.stringToBlob(data)
        .then(blob => {
          saveAs(blob, 'data')
        })
        .catch(error => {
          window.console.error(error)
          window.alert(error instanceof Error ? error.message : '错误')
        })
  }
}
</script>
