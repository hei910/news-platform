<template>
  <div class="customWordUpload d-inline-block" @click="onClick">
    <input ref="fileInput" type="file" class="d-none" @change="onFileUpload">
    <b-button-group>
      <b-button><b-icon-file-earmark-word-fill /></b-button>
      <b-button >用MS Word形式上傳</b-button>
    </b-button-group>
  </div>
</template>

<script lang="ts" src="./script.ts"></script>
<style lang="scss" scoped>
</style>