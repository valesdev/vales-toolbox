<template>
  <div>
    <template v-if="modelValue !== null">
      <div class="input-group mb-3">
        <input type="text" class="form-control font-monospace" :value="modelValue.name" readonly />
        <a href="javascript:void(0);" class="btn btn-outline-secondary" @click="toDeselect">&times;</a>
      </div>
    </template>
    <template v-else>
      <div class="input-group mb-3">
        <input type="text" class="form-control font-monospace" value="(none)" readonly />
        <a href="javascript:void(0);" class="btn btn-outline-secondary" @click="toSelect">Choose file</a>
      </div>
    </template>
  </div>
</template>

<script>
import Files from 'file-promisify'

export default {
  name: 'FormFile',
  props: {
    modelValue: {
      type: Object,
      required: false,
      default: null
    },
    accept: {
      type: String,
      required: false,
      default: null
    }
  },
  methods: {
    toSelect () {
      const instance = new Files()
      instance.select({ multiple: false, accept: this.accept })
        .then(([blob]) => {
          this.$emit('update:modelValue', blob)
        })
    },
    toDeselect () {
      this.$emit('update:modelValue', null)
    }
  }
}
</script>
