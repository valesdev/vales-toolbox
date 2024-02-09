<template>
  <div @drop.prevent="onDrop">
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
        <a href="javascript:void(0);" @click="onClickFile">从文件加载</a>
      </div>

      <div class="col-auto">
        <a href="javascript:void(0);" @click="onClickPaste">从剪贴板加载</a>
      </div>

      <div class="col-auto">
        <span>{{ value.byteLength }} 字节</span>
      </div>
    </div>

    <div class="mb-3">
      <template v-if="mode === Mode.Text">
        <textarea rows="3" class="form-control font-monospace" v-model="inputText" placeholder="输入" />
      </template>

      <template v-if="mode === Mode.Hex">
        <textarea rows="3" class="form-control font-monospace" v-model="inputHex" placeholder="输入" />
      </template>

      <template v-if="mode === Mode.Base64">
        <textarea rows="3" class="form-control font-monospace" v-model="inputBase64" placeholder="输入" />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

import Files from 'file-promisify'

enum Mode {
  None,
  Text,
  Hex,
  Base64,
}

const props = defineProps<{
  value: ArrayBuffer
}>()

const emit = defineEmits<{
  (e: 'update:value', value: ArrayBuffer | null): void
}>()

const mode = ref<Mode>(Mode.Text)

const inputText = computed<string>({
  get (): string {
    return new TextDecoder().decode(props.value)
  },
  set (v: string) {
    emit('update:value', new TextEncoder().encode(v))
  }
})

const inputHex = computed<string>({
  get (): string {
    return [...new Uint8Array(props.value)].map(x => x.toString(16).padStart(2, '0')).join('')
  },
  set (v: string) {
    emit('update:value', new Uint8Array((v.match(/[0-9a-f]{2}/ig) ?? []).map(h => parseInt(h, 16))))
  }
})

const inputBase64 = computed<string>({
  get (): string {
    return window.btoa(String.fromCharCode.apply(null, [...new Uint8Array(props.value)]))
  },
  set (v: string) {
    emit('update:value', Uint8Array.from(window.atob(v), c => c.charCodeAt(0)))
  }
})

const onClickPaste = () => {
  Promise.resolve()
    .then(() => {
      return navigator.clipboard.read()
        .then(clipboardItems => {
          if (clipboardItems.length > 0) {
            if (clipboardItems[0].types.length > 0) {
              clipboardItems[0].getType(clipboardItems[0].types[0])
                .then(blob => {
                  return _blobToArrayBuffer(blob)
                    .then(value => {
                      mode.value = Mode.None
                      emit('update:value', value)
                    })
                })
            }
          }
        })
    })
    .catch(error => {
      window.alert(error.message)
    })
}

const onClickFile = () => {
  const instance = new Files()
  instance.select()
    .then(fileList => {
      if (fileList.length === 1) {
        const blob = fileList[0]

        return _blobToArrayBuffer(blob)
          .then(value => {
            mode.value = Mode.None
            emit('update:value', value)
          })
      }
    })
    .catch(error => {
      window.alert(error.message)
    })
}

const onDrop = (event: DragEvent) => {
  console.log(event.dataTransfer)
}

const _blobToArrayBuffer = (input: Blob): Promise<ArrayBuffer | null> => {
  return new Promise<ArrayBuffer | null>((resolve, reject) => {
    var fileReader = new FileReader()
    fileReader.onabort = () => reject(new Error('abort'))
    fileReader.onerror = () => reject(new Error('error'))
    fileReader.onload = event => {
      if (event.target !== null && event.target.result instanceof ArrayBuffer) {
        resolve(event.target.result)
      } else {
        reject(new Error('invalid'))
      }
    }
    fileReader.readAsArrayBuffer(input)
  })
}
</script>
