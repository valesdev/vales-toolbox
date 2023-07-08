<template>
  <main>
    <h2>二维码生成</h2>
    <hr />

    <div class="row">
      <div class="col-md-8">
        <template v-if="isBatch === false">
          <div class="row">
            <div class="col-8 col-lg-9">
              <div class="mb-3">
                <label class="form-label">内容</label>
                <textarea rows="6" class="form-control font-monospace" v-model="content" placeholder="内容" />
              </div>
            </div>

            <div class="col-4 col-lg-3">
              <div class="mb-3">
                <label class="form-label">预览</label>
                <div>
                  <template v-if="previewImageUrl !== null">
                    <img :src="previewImageUrl" style="display: block; width: 100%; height: auto;" />
                  </template>
                  <template v-else>
                    <span class="text-muted">无内容</span>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template v-if="isBatch === true">
          <div class="row">
            <div class="col-12 col-xl-6">
              <div class="mb-3">
                <label class="form-label">内容</label>
                <textarea rows="9" class="form-control font-monospace" v-model="contents" placeholder="内容列表，一行一个。例如：&NewLine;https://www.bing.com/&NewLine;https://www.duckduckgo.com/&NewLine;https://www.wolframalpha.com/" />
              </div>
            </div>

            <div class="col-12 col-xl-6">
              <div class="mb-3">
                <label class="form-label">文件名</label>
                <textarea rows="9" class="form-control font-monospace" v-model="names" placeholder="文件名列表，一行一个。例如：&NewLine;Bing&NewLine;DuckDuckGo&NewLine;WolframAlpha" />
              </div>
            </div>
          </div>
        </template>
      </div>

      <div class="col-md-4">
        <div class="row">
          <div class="col-6 col-md-12 col-xl-6">
            <div class="mb-3">
              <label class="form-label">是否批量生成</label>
              <div>
                <div class="form-check form-check-inline">
                  <label class="form-check-label">
                    <input type="radio" class="form-check-input" v-model="isBatch" :value="true" /> 是
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <label class="form-check-label">
                    <input type="radio" class="form-check-input" v-model="isBatch" :value="false" /> 否
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="col-6 col-md-12 col-xl-6">
            <div class="mb-3">
              <label class="form-label">纠错等级</label>
              <select class="form-select" v-model="errorCorrectionLevel">
                <option value="L">L – 允许约 7% 损坏</option>
                <option value="M">M – 允许约 15% 损坏</option>
                <option value="Q">Q – 允许约 25% 损坏</option>
                <option value="H">H – 允许约 30% 损坏</option>
              </select>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-6 col-md-12 col-xl-6">
            <div class="mb-3">
              <label class="form-label">图片宽度</label>
              <div class="input-group">
                <input type="number" class="form-control" v-model.number="width" step="1" min="64" max="1024" />
                <span class="input-group-text">像素</span>
              </div>
            </div>
          </div>

          <div class="col-6 col-md-12 col-xl-6">
            <div class="mb-3">
              <label class="form-label">图片边距</label>
              <div class="input-group">
                <input type="number" class="form-control" v-model.number="margin" step="1" min="0" max="128" />
                <span class="input-group-text">像素</span>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-6 col-md-12 col-xl-6">
            <div class="mb-3">
              <label class="form-label">空白区域</label>
              <div class="input-group">
                <input type="number" class="form-control" v-model.number="quietZone" step="1" min="0" max="16" />
                <span class="input-group-text">点</span>
              </div>
            </div>
          </div>

          <div class="col-6 col-md-12 col-xl-6">
            <div class="mb-3">
              <label class="form-label">图片格式</label>
              <select class="form-select" v-model="format">
                <option value="image/png">PNG</option>
                <option value="image/jpeg">JPEG</option>
                <option value="image/webp">webP</option>
              </select>
            </div>
          </div>
        </div>

        <!--
        <div class="mb-3">
          <label class="form-label">Scale</label>
          <div class="input-group">
            <input type="number" class="form-control" v-model.number="scale" step="1" min="1" max="16" />
            <span class="input-group-text">px per dots</span>
          </div>
        </div>
        -->

        <div class="row">
          <div class="col-6 col-md-12 col-xl-6">
            <div class="mb-3">
              <label class="form-label">覆盖图片</label>
              <FormFile v-model="overlay" accept="image/*" />
            </div>
          </div>

          <div class="col-6 col-md-12 col-xl-6">
            <div class="mb-3">
              <label class="form-label">覆盖背景</label>
              <select class="form-select" v-model="overlayBg">
                <option :value="null">无</option>
                <option value="white_rounded">白色，圆角</option>
              </select>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-6 col-md-12 col-xl-6">
            <div class="mb-3">
              <label class="form-label">前景色</label>
              <input type="color" class="form-control form-control-color" v-model="fgColor" />
            </div>
          </div>

          <div class="col-6 col-md-12 col-xl-6">
            <div class="mb-3">
              <label class="form-label">背景色</label>
              <input type="color" class="form-control form-control-color" v-model="bgColor" />
            </div>
          </div>
        </div>

        <div>
          <a href="javascript:void(0);" class="btn btn-secondary" @click="toExport">
            <template v-if="isBatch === false">导出为 {{ formatLabel }} 文件</template>
            <template v-else>导出 {{ previewCount }} {{ formatLabel }} 个文件（ZIP）</template>
          </a>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'

import Files from 'file-promisify'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import QRCode from 'qrcode'

const isBatch = ref<boolean>(false)

const content = ref<string>('')
const previewImageUrl = ref<string | null>(null)
const previewCount = ref<number>(0)

const contents = ref<string>('')
const names = ref<string>('')

const format = ref<string>('image/png')
const margin = ref<number>(40)
const overlay = ref<Blob | null>(null)
const overlayBg = ref<string | null>(null)
const errorCorrectionLevel = ref<'L' | 'M' | 'Q' | 'H'>('L')
const scale = ref<number>(0)
const quietZone = ref<number>(0)
const width = ref<number>(800)
const fgColor = ref<string>('#000000')
const bgColor = ref<string>('#ffffff')

const formatLabel = computed(() => {
  switch (format.value) {
    case 'image/png': return 'PNG'
    case 'image/jpeg': return 'JPG'
    case 'image/webp': return 'WEBP'
    default: return '(未知格式)'
  }
})

const formatFileSuffix = computed(() => {
  switch (format.value) {
    case 'image/png': return '.png'
    case 'image/jpeg': return '.jpg'
    case 'image/webp': return '.webp'
    default: return ''
  }
})

const toExport = () => {
  if (isBatch.value === false) {
    return submitSingle()
  } else {
    return submitMultiple()
  }
}

const submitSingle = () => {
  if (content.value.length === 0) {
    window.alert('No content entered.')
    return
  }

  return stringToQrcodeDataUrl(content.value)
    .then(dataUrl => {
      return Files.dataUrlToBlob(dataUrl)
    })
    .then(blob => {
      saveAs(blob, `qrcode${formatFileSuffix}`)
    })
}

const submitMultiple = () => {
  if (contents.value.length === 0) {
    window.alert('请输入内容')
    return
  }

  const srcContents = contents.value.split('\n').filter(el => el.length > 0)
  const srcNames = names.value.split('\n').filter(el => el.length > 0)

  const contentList: Array<string> = []
  const nameList: Array<string> = []

  for (let i = 0; i < srcContents.length; i++) {
    if (typeof srcContents[i] === 'string' && srcContents[i].length >= 1) {
      contentList.push(srcContents[i])
      nameList.push(
        srcNames[i] !== undefined && srcNames[i].length >= 1
          ? srcNames[i]
          : `qrcode-${String(i + 1).padStart(2, '0')}`
      )
    }
  }

  if (contentList.length === 0) {
    window.alert('请输入内容')
    return
  }

  return new Promise<Array<{ blob: Blob, name: string } | null>>((resolve, reject) => {
    walkArray<string, { blob: Blob, name: string }>(
      contentList,
      (item, index, callback) => {
        stringToQrcodeDataUrl(contentList[index])
          .then(dataUrl => {
            return Files.dataUrlToBlob(dataUrl)
          })
          .then(blob => {
            callback(null, { blob, name: nameList[index] })
          })
          .catch(error => {
            callback(error, null)
          })
      },
      (error, results) => {
        if (error) {
          reject(error)
          return
        }
        resolve(results)
      }
    )
  })
    .then(results => {
      const zip = new JSZip()
      for (const result of results) {
        if (result !== null) {
          zip.file(`${result.name}${formatFileSuffix}`, result.blob)
        }
      }

      return zip.generateAsync({ type: 'blob' })
        .then(blob => {
          saveAs(blob, 'qrcodes.zip')
        })
    })
}

const previewSingle = () => {
  if (typeof content.value !== 'string' || content.value.length <= 0) {
    previewImageUrl.value = null
    return
  }

  return stringToQrcodeDataUrl(content.value)
    .then(dataUrl => {
      previewImageUrl.value = dataUrl
    })
}

const previewMultiple = () => {
  if (typeof contents.value !== 'string' || contents.value.length <= 0) {
    previewCount.value = 0
    return
  }

  previewCount.value = contents.value.split('\n').filter(el => el.length > 0).length
}

const stringToQrcodeDataUrl = (content: string): Promise<string> => {
  // draw content within margin box
  const canvas = window.document.createElement('canvas')
  canvas.width = width.value
  canvas.height = width.value

  const ctx = canvas.getContext('2d')
  if (ctx === null) throw new Error('获取 Context 失败')

  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  return QRCode.toCanvas(content, {
    errorCorrectionLevel: errorCorrectionLevel.value,
    scale: scale.value,
    margin: quietZone.value,
    width: (width.value - margin.value * 2),
    color: {
      dark: fgColor.value,
      light: bgColor.value
    }
  })
    .then(canvasContent => {
      ctx.drawImage(canvasContent, margin.value, margin.value, canvasContent.width, canvasContent.height)
    })
    .then(() => {
      // draw overlay background
      if (overlayBg.value !== null) {
        switch (overlayBg.value) {
          case 'white_rounded':
            canvasRoundedRect(
              ctx,
              canvas.width * 0.36,
              canvas.height * 0.36,
              canvas.width * 0.28,
              canvas.height * 0.28,
              canvas.width * 0.04
            )
            ctx.fillStyle = '#ffffff'
            ctx.fill()
            break
        }
      }
    })
    .then(() => {
      // draw overlay foreground
      if (overlay.value !== null) {
        return Promise.resolve()
          .then(() => {
            return Files.blobToDataUrl(overlay.value!)
          })
          .then(dataUrl => {
            if (dataUrl === null) throw new Error('转换失败')

            return Files.urlToImage(dataUrl)
          })
          .then(image => {
            ctx.save()

            // clip
            switch (overlayBg.value) {
              case 'white_rounded':
                canvasRoundedRect(
                  ctx,
                  canvas.width * 0.37,
                  canvas.height * 0.37,
                  canvas.width * 0.26,
                  canvas.height * 0.26,
                  canvas.width * 0.03
                )
                ctx.clip()
                break
            }

            // draw overlay
            ctx.drawImage(
              image,
              canvas.width * 0.37,
              canvas.height * 0.37,
              canvas.width * 0.26,
              canvas.height * 0.26
            )
            ctx.restore()
          })
      }
    })
    .then(() => {
      return canvas.toDataURL(format.value)
    })
}

const canvasRoundedRect = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) => {
  context.beginPath()
  context.moveTo(x + r, y)
  context.lineTo(x + w - r, y)
  context.quadraticCurveTo(x + w, y, x + w, y + r)
  context.lineTo(x + w, y + h - r)
  context.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  context.lineTo(x + r, y + h)
  context.quadraticCurveTo(x, y + h, x, y + h - r)
  context.lineTo(x, y + r)
  context.quadraticCurveTo(x, y, x + r, y)
  context.closePath()
}

const walkArray = <T, U> (
  items: Array<T>,
  iteratee: (
    item: T,
    cur: number,
    callback: (error: Error | null, result: U | null) => void
  ) => void,
  callback: (error: Error | null, results: Array<U | null>) => void
): void => {
  let cur = 0
  const results: Array<U | null> = []

  const resolve = function (result: U | null) {
    results.push(result)
    cur++
    if (cur < items.length) {
      // continue walking
      walk()
    } else {
      // end when all elements walked
      callback(null, results)
    }
  }

  const reject = function (error: Error) {
    // end immediately when error occurred
    callback(error, results)
  }

  const walk = function () {
    iteratee(items[cur], cur, function (error: Error | null, result: U | null) {
      if (error !== null) {
        reject(error)
        return
      }
      resolve(result)
    })
  }

  walk()
}

watch(content, () => {
  previewSingle()
})

watch(contents, () => {
  previewMultiple()
})

watch(format, () => {
  previewSingle()
})

watch(margin, () => {
  previewSingle()
})

watch(overlay, () => {
  previewSingle()
})

watch(overlayBg, () => {
  previewSingle()
})

watch(errorCorrectionLevel, () => {
  previewSingle()
})

watch(scale, () => {
  previewSingle()
})

watch(quietZone, () => {
  previewSingle()
})

watch(width, () => {
  previewSingle()
})

watch(fgColor, () => {
  previewSingle()
})

watch(bgColor, () => {
  previewSingle()
})
</script>
