<template>
  <div>
    <Modal
      v-model:open="dialogVisible"
      :canFullscreen="false"
      :title="t('cropper.modalTitle')"
      maxHeight="380px"
      width="800px"
    >
      <div class="cropper-am">
        <div :class="`cropper-am-left`">
          <div :class="`cropper-am-cropper`">
            <CropperImage
              v-if="src"
              :circled="circled"
              :src="src"
              height="300px"
              @cropend="handleCropend"
              @ready="handleReady"
            />
          </div>

          <div :class="`cropper-am-toolbar`">
            <Upload :beforeUpload="handleBeforeUpload" :fileList="[]" accept="image/*">
              <Tooltip :title="t('cropper.selectImage')" placement="bottom">
                <XButton :preIcon="uploadImg" type="primary" />
              </Tooltip>
            </Upload>

            <Tooltip :title="t('cropper.btn_reset')" placement="bottom">
              <XButton
                :disabled="!src"
                :preIcon="refresh"
                size="small"
                type="primary"
                @click="handlerToolbar('reset')"
              />
            </Tooltip>
            <Tooltip :title="t('cropper.btn_rotate_left')" placement="bottom">
              <XButton
                :disabled="!src"
                :preIcon="rotateLeft"
                size="small"
                type="primary"
                @click="handlerToolbar('rotate', -45)"
              />
            </Tooltip>
            <Tooltip :title="t('cropper.btn_rotate_right')" placement="bottom">
              <XButton
                :disabled="!src"
                :preIcon="rotateRight"
                size="small"
                type="primary"
                @click="handlerToolbar('rotate', 45)"
              />
            </Tooltip>
            <Tooltip :title="t('cropper.btn_scale_x')" placement="bottom">
              <XButton
                :disabled="!src"
                :preIcon="flipHorizontal"
                size="small"
                type="primary"
                @click="handlerToolbar('scaleX')"
              />
            </Tooltip>
            <Tooltip :title="t('cropper.btn_scale_y')" placement="bottom">
              <XButton
                :disabled="!src"
                :preIcon="flipVertical"
                size="small"
                type="primary"
                @click="handlerToolbar('scaleY')"
              />
            </Tooltip>
            <Tooltip :title="t('cropper.btn_zoom_in')" placement="bottom">
              <XButton
                :disabled="!src"
                :preIcon="enlarge"
                size="small"
                type="primary"
                @click="handlerToolbar('zoom', 0.1)"
              />
            </Tooltip>
            <Tooltip :title="t('cropper.btn_zoom_out')" placement="bottom">
              <XButton
                :disabled="!src"
                :preIcon="zoomin"
                size="small"
                type="primary"
                @click="handlerToolbar('zoom', -0.1)"
              />
            </Tooltip>
          </div>
        </div>
        <div :class="`cropper-am-right`">
          <div :class="`cropper-am-preview`">
            <img v-if="previewSource" :alt="t('cropper.preview')" :src="previewSource" />
          </div>
          <template v-if="previewSource">
            <div :class="`cropper-am-group`">
              <Avatar :src="previewSource" size="large" />
              <Avatar :size="48" :src="previewSource" />
              <Avatar :size="64" :src="previewSource" />
              <Avatar :size="80" :src="previewSource" />
            </div>
          </template>
        </div>
      </div>
      <template #footer>
        <Button type="primary" @click="handleOk">{{ t('cropper.okText') }}</Button>
      </template>
    </Modal>
  </div>
</template>
<script lang="ts" setup>
import { dataURLtoBlob } from '@/utils/filt'
import { useI18n } from 'vue-i18n'
import type { CropendResult, Cropper } from './types'
import { CropperImage } from '@/components/Cropper'
import { Avatar, Button, Upload, Modal, Tooltip } from 'ant-design-vue'
import { XButton } from '@/components/XButton'
import uploadImg from '@/assets/img/upload.svg'
import refresh from '@/assets/img/refresh.svg'
import rotateLeft from '@/assets/img/rotateLeft.svg'
import rotateRight from '@/assets/img//rotateRight.svg'
import zoomin from '@/assets/img/zoomin.svg'
import flipHorizontal from '@/assets/img/flipHorizontal.svg'
import flipVertical from '@/assets/img/flipVertical.svg'
import enlarge from '@/assets/img/enlarge.svg'
defineOptions({ name: 'CopperModal' })

const props = defineProps({
  srcValue: { type: String, default: '' },
  circled: { type: Boolean, default: true },
})
const emit = defineEmits(['uploadSuccess'])
const { t } = useI18n()

const src = ref(props.srcValue)
const previewSource = ref('')
const cropper = ref<Cropper>()
const dialogVisible = ref(false)
let filename = ''
let scaleX = 1
let scaleY = 1

// Block upload
function handleBeforeUpload(file: File) {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  src.value = ''
  previewSource.value = ''
  reader.onload = function (e) {
    src.value = (e.target?.result as string) ?? ''
    filename = file.name
  }
  return false
}

function handleCropend({ imgBase64 }: CropendResult) {
  previewSource.value = imgBase64
}

function handleReady(cropperInstance: Cropper) {
  cropper.value = cropperInstance
}

function handlerToolbar(event: string, arg?: number) {
  if (event === 'scaleX') {
    scaleX = arg = scaleX === -1 ? 1 : -1
  }
  if (event === 'scaleY') {
    scaleY = arg = scaleY === -1 ? 1 : -1
  }
  cropper?.value?.[event]?.(arg)
}

async function handleOk() {
  const blob = dataURLtoBlob(previewSource.value)
  emit('uploadSuccess', { source: previewSource.value, data: blob, filename: filename })
}

function openModal() {
  dialogVisible.value = true
}

function closeModal() {
  dialogVisible.value = false
}

defineExpose({ openModal, closeModal })
</script>
<style lang="scss">
.cropper-am {
  display: flex;

  &-left,
  &-right {
    height: 340px;
  }

  &-left {
    width: 55%;
  }

  &-right {
    width: 45%;
  }

  &-cropper {
    height: 300px;
    background: #eee;
    background-image: linear-gradient(45deg, rgb(0 0 0 / 25%) 25%, transparent 0, transparent 75%, rgb(0 0 0 / 25%) 0),
      linear-gradient(45deg, rgb(0 0 0 / 25%) 25%, transparent 0, transparent 75%, rgb(0 0 0 / 25%) 0);
    background-position:
      0 0,
      12px 12px;
    background-size: 24px 24px;
  }

  &-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
  }

  &-preview {
    width: 220px;
    height: 220px;
    margin: 0 auto;
    overflow: hidden;
    border: 1px solid;
    border-radius: 50%;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &-group {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-top: 8px;
    margin-top: 8px;
    border-top: 1px solid;
  }
}
</style>
