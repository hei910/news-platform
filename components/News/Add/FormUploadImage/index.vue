<template>
  <div class="formUploadImage mb-3">
    <div class="preview" :class="{ noImage: !image }" @click="onUpload">
      <b-icon-card-image v-if="!image"/>
      <span v-if="!image">點擊上載圖片</span>
      <img v-else :src="image" alt="preview">
    </div>
    <b-form-group label="上传封面：" label-for="input-image" class="input">
      <b-form-file id="input-image" ref="uploadInputRef" accept=".jpg, .png, .gif, .jpeg" @input="onImageInputChange"></b-form-file>
      <div class="desc">
        建议尺寸为：960PX*640PX 大小500k以内<br>
        文件格式：GIF、JPG、JPEG、PNG
      </div>
    </b-form-group>
  </div>
</template>

<script lang="ts" src="./script.ts"></script>
<style lang="scss" scoped src="./styles.scss"></style>