<template>
  <main>
    <h2>字符映射表</h2>
    <hr />

    <div class="row">
      <div class="col-sm-6 mb-3">
        <label class="form-label">开始</label>
        <div class="input-group">
          <span class="input-group-text">0x</span>
          <input type="text" class="form-control" v-model="formState.charFrom" placeholder="0000" />
        </div>
      </div>

      <div class="col-sm-6 mb-3">
        <label class="form-label">结束</label>
        <div class="input-group">
          <span class="input-group-text">0x</span>
          <input type="text" class="form-control" v-model="formState.charTo" placeholder="0000" />
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

<script>
export default {
  data () {
    return {
      formState: {
        charFrom: '0000',
        charTo: '3400'
      }
    }
  },
  computed: {
    chars () {
      const ret = []

      const from = /^[0-9a-f]+$/.test(this.formState.charFrom) ? eval('0x' + this.formState.charFrom) : 0x0000
      const to = /^[0-9a-f]+$/.test(this.formState.charTo) ? eval('0x' + this.formState.charTo) : 0x3400

      for (let i = from; i < to; i++) {
        ret.push(
          String.fromCharCode(i)
        )
      }

      return ret
    }
  },
  methods: {
    labelForChar (char) {
      const code = Number(char.charCodeAt(0))
      let charAscii = code.toString(16)
      charAscii = ('0000').substring(charAscii.length, 4) + charAscii
      return 'U+' + charAscii
    }
  }
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
