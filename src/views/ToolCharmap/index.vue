<template>
  <main>
    <h2>字符映射表</h2>
    <hr />

    <div class="mb-3">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>平面</th>
              <th>始末字元值</th>
              <th>中文名称</th>
              <th>英文名称</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0号平面</td>
              <td><code>U+0000</code> ~ <code>U+FFFF</code></td>
              <td>基本多文种平面</td>
              <td>Basic Multilingual Plane（BMP）</td>
            </tr>
            <tr>
              <td>1号平面</td>
              <td><code>U+10000</code> ~ <code>U+1FFFF</code></td>
              <td>多文种补充平面</td>
              <td>Supplementary Multilingual Plane（SMP）</td>
            </tr>
            <tr>
              <td>2号平面</td>
              <td><code>U+20000</code> ~ <code>U+2FFFF</code></td>
              <td>表意文字补充平面</td>
              <td>Supplementary Ideographic Plane（SIP）</td>
            </tr>
            <tr>
              <td>3号平面</td>
              <td><code>U+30000</code> ~ <code>U+3FFFF</code></td>
              <td>表意文字第三平面</td>
              <td>Tertiary Ideographic Plane（TIP）</td>
            </tr>
            <tr>
              <td>4号平面 ~ 13号平面</td>
              <td><code>U+40000</code> ~ <code>U+DFFFF</code></td>
              <td>（尚未使用）</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>14号平面</td>
              <td><code>U+E0000</code> ~ <code>U+EFFFF</code></td>
              <td>特别用途补充平面</td>
              <td>Supplementary Special-purpose Plane（SSP）</td>
            </tr>
            <tr>
              <td>15号平面</td>
              <td><code>U+F0000</code> ~ <code>U+FFFFF</code></td>
              <td>保留作为私人使用区（A区）</td>
              <td>Private Use Area-A（PUA-A）</td>
            </tr>
            <tr>
              <td>16号平面</td>
              <td><code>U+100000</code> ~ <code>U+10FFFF</code></td>
              <td>保留作为私人使用区（B区）</td>
              <td>Private Use Area-B（PUA-B）</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-6 mb-3">
        <div class="row align-items-center">
          <div class="col-auto">开始</div>
          <div class="col">
            <div class="input-group">
              <span class="input-group-text">0x</span>
              <input type="text" class="form-control" v-model="charFrom" placeholder="0000" />
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-6 mb-3">
        <div class="row align-items-center">
          <div class="col-auto">结束</div>
          <div class="col">
            <div class="input-group">
              <span class="input-group-text">0x</span>
              <input type="text" class="form-control" v-model="charTo" placeholder="0000" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="ToolCharmap__list">
      <template v-for="char in chars" :key="char">
        <div class="ToolCharmap__item">
          <div class="ToolCharmap__item-char">{{ char }}</div>
          <div class="ToolCharmap__item-label"><code>{{ labelForChar(char) }}</code></div>
        </div>
      </template>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

const charFrom = ref<string>('0000')
const charTo = ref<string>('3400')

const chars = computed<Array<string>>(() => {
  const ret = []

  const from = /^[0-9a-f]+$/.test(charFrom.value) ? eval(`0x${charFrom.value}`) : 0x0000
  const to = /^[0-9a-f]+$/.test(charTo.value) ? eval(`0x${charTo.value}`) : 0x3400

  for (let i = from; i < to; i++) {
    ret.push(
      String.fromCharCode(i)
    )
  }

  return ret
})

const labelForChar = (char: string): string => {
  const code = Number(char.charCodeAt(0))
  return `U+${code.toString(16)}`
}
</script>

<style lang="scss">
.ToolCharmap {
  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem
  }

  &__item {
    width: 4rem;
  }

  &__item-char {
    height: 3rem;
    background-color: #eeeeee;
    font-size: 2rem;
    line-height: 3rem;
    text-align: center;
    white-space: nowrap;
  }

  &__item-label {
    text-align: center;
  }
}
</style>