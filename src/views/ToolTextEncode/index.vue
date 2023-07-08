<template>
  <main>
    <h2>文本编码</h2>
    <hr />

    <div class="row">

      <div class="col-sm-6 col-md-4">
        <div class="mb-3">
          <label class="form-label">输入</label>
          <textarea rows="3" class="form-control font-monospace" v-model="input" placeholder="输入" />
        </div>
      </div>

      <div class="col-sm-6 col-md-4">
        <div class="mb-3">
          <label class="form-label">URL Encoded</label>
          <textarea rows="3" class="form-control font-monospace" :value="outputUrlencoded" placeholder="输出" readonly />
        </div>
      </div>

      <div class="col-sm-6 col-md-4">
        <div class="mb-3">
          <label class="form-label">ASCII</label>
          <textarea rows="3" class="form-control font-monospace" :value="outputAscii" placeholder="输出" readonly />
        </div>
      </div>

      <div class="col-sm-6 col-md-4">
        <div class="mb-3">
          <label class="form-label">Unicode HTML</label>
          <textarea rows="3" class="form-control font-monospace" :value="outputUnicodeHtml" placeholder="输出" readonly />
        </div>
      </div>

      <div class="col-sm-6 col-md-4">
        <div class="mb-3">
          <label class="form-label">UTF-8 HTML</label>
          <textarea rows="3" class="form-control font-monospace" :value="outputUtf8Html" placeholder="输出" readonly />
        </div>
      </div>

    </div>

    <!--
    <h3>CJK</h3>

    <pre>⿰⿱⿲⿳⿴⿵⿶⿷⿸⿹⿺</pre>

    <div style="font-size: 4rem; font-family: 'Source Han Serif SC';">
      <div>⿺辶⿳穴⿰月⿰⿲⿱幺长⿱言马⿱幺长刂心</div>
      <div>⿺辶⿳穴⿰月⿰⿲⿱幺長⿱言馬⿱幺長刂心</div>
    </div>
    -->
  </main>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

const input = ref<string>('')

const outputUrlencoded = computed(() => {
  return encodeURIComponent(input.value)
})

const outputAscii = computed(() => {
  const chars = input.value.split('')
  let output = ''
  for (let i = 0; i < chars.length; i++) {
    const code = Number(chars[i].charCodeAt(0))
    let charAscii = code.toString(16)
    charAscii = ('0000').substring(charAscii.length, 4) + charAscii
    output += `\\u${charAscii}`
  }
  return output
})

const outputUnicodeHtml = computed(() => {
  let output = ''
  for (let i = 0; i < input.value.length; i++) {
    output += `&#${input.value.charCodeAt(i)};`
  }
  return output
})

const outputUtf8Html = computed(() => {
  return input.value.replace(/[^\u0000-\u00FF]/g, function ($0) {
    return window.escape($0).replace(/(%u)(\w{4})/gi, '&#x$2;')
  })
})
</script>
