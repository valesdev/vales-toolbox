<template>
  <div>
    <template v-if="value !== null">
      <div class="input-group mb-3">
        <input type="text" class="form-control font-monospace" :value="value.name" readonly />
        <a href="javascript:void(0);" class="btn btn-outline-secondary" @click="onClickDeselect">&times;</a>
      </div>
    </template>
    
    <template v-else>
      <div class="input-group mb-3">
        <input type="text" class="form-control font-monospace" value="(none)" readonly />
        <a href="javascript:void(0);" class="btn btn-outline-secondary" @click="onClickSelect">选择文件</a>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import Files from 'file-promisify'

const props = withDefaults(defineProps<{
  value?: File | null
  accept?: string
}>(), {
  value: null,
  accept: '*/*'
})

const emit = defineEmits<{
  (e: 'update:value', value: File | null): void
}>()

const onClickSelect = () => {
  const instance = new Files()
  instance.select({
    multiple: false,
    accept: props.accept
  })
    .then((fileList: FileList) => {
      emit('update:value', fileList[0])
    })
}

const onClickDeselect = () => {
  emit('update:value', null)
}
</script>
