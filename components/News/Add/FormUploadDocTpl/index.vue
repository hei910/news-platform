<template>
  <div class="customDocUpload d-inline-block" @click="onClick">
    <b-form-file 
      ref="fileInputRef"
      class="d-none" 
      accept=".doc, .docx, .docm, .pdf" 
      @change="onFileUpload"
    />
    <b-button><b-icon-file-earmark-word-fill class="mr-1" />用Word/PDF形式上传</b-button>
  </div>
</template>

<script lang="ts" src="./script.ts"></script>
<style lang="scss" scoped>
</style>