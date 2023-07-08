<template>
  <main>
    <h2>字符映射表</h2>
    <hr />

    <div class="row">
      <div class="col-sm-6 mb-3">
        <label class="form-label">开始</label>
        <div class="input-group">
          <span class="input-group-text">0x</span>
          <input type="text" class="form-control" v-model="charFrom" placeholder="0000" />
        </div>
      </div>

      <div class="col-sm-6 mb-3">
        <label class="form-label">结束</label>
        <div class="input-group">
          <span class="input-group-text">0x</span>
          <input type="text" class="form-control" v-model="charTo" placeholder="0000" />
        </div>
      </div>
    </div>

    <div class="ToolCharMap__list">
      <template v-for="char in chars" :key="char">
        <div class="ToolCharMap__item">
          <div class="ToolCharMap__item-char">{{ char }}</div>
          <div class="ToolCharMap__item-label"><code>{{ labelForChar(char) }}</code></div>
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
.ToolCharMap {
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
